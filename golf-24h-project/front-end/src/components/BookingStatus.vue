<template>
  <div class="booking-container">
    <!-- City filter moved to its own component -->
    <CityFilter :cities="cities" :selectedCityId="selectedCityId" @change="changeCity" />

    <div class="calendar-wrapper">
      <!-- Calendar -->
      <div class="calendar">
        <div class="calendar-header">
          <button @click="prevMonth">‹</button>
          <span>{{ currentYear }} 年 {{ currentMonth + 1 }} 月</span>
          <button @click="nextMonth">›</button>
        </div>

        <div class="calendar-grid">
          <div class="day-name" v-for="d in weekDays" :key="d">{{ d }}</div>
          <div v-for="(day, index) in daysInMonth" :key="index" :class="[
            'day',
            {
              today: isToday(day.date),
              selected: isSelected(day.date),
              booked: isBooked(day.date),
              disabled: isPast(day.date)
            }
          ]" @click="!isPast(day.date) && selectDate(day.date)">
            {{ day.label }}
            <div v-if="isBooked(day.date)" class="underline"></div>
          </div>
        </div>
      </div>

      <!-- Stadiums with Timeslots -->
      <div class="stadiums-section">
        <Swiper :slides-per-view="1" :space-between="20" navigation pagination>
          <SwiperSlide v-for="stadium in stadiums" :key="stadium.id">
            <div class="stadium-card">
              <h4>{{ stadium.name }}</h4>

              <!-- Show timeslots only when a date is selected -->
              <div v-if="selectedDate && stadium.timeslots.length > 0" class="timeslots-section">
                <h5>時段資訊</h5>
                <div class="timeslots-grid">
                  <div v-for="timeslot in stadium.timeslots" :key="timeslot.id" :class="['timeslot-item', {
                    'booked': timeslot.isBooked,
                    'available': !timeslot.isBooked
                  }]">
                    <span class="time">{{ timeslot.startTimeText }} - {{ timeslot.endTimeText }}</span>
                    
                    <span :class="['status', timeslot.isBooked ? 'booked' : 'available']">
                      {{ timeslot.isBooked ? '已預約' : '可預約' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- No bookings for this stadium on selected date -->
              <div v-else-if="selectedDate && stadium.timeslots.length === 0" class="timeslots-section">
                <p class="no-booking">No bookings yet</p>
              </div>

              <!-- Show message when no date is selected -->
              <div v-if="!selectedDate" class="no-date-selection">
                <p class="select-date-message">請選擇日期查看時段資訊</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <!-- Pass flattened bookings to timeline component -->
    <SlotBookedADay :bookings="bookingsOnDate" :stadiums="stadiums" />
    <div>
      <h3>預約空間</h3>
      <CityFilter :cities="cities" :selectedCityId="selectedCityId" @change="changeCity" />
      <div class="stadiums-list stadiums-grid">
        <div v-for="stadium in stadiums" :key="stadium.id" class="stadium-item">
          <StadiumsList :stadium="stadium" />
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CityFilter from './CityFilter.vue';
import StadiumsList from './StadiumList.vue';
import SlotBookedADay from "./SlotBookedADay.vue";
const API_BASE = "http://localhost:3000";

const cities = ref([]);
const selectedCityId = ref(null);
const selectedCityName = computed(() => {
  const found = cities.value.find(c => c.id === selectedCityId.value);
  return found ? found.name : "全部城市";
});

const today = new Date();
today.setHours(0, 0, 0, 0);
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
// Default selected date to today
const selectedDate = ref(today);

const weekDays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

const bookedDates = ref([]);
const stadiums = ref([]);  // Changed from bookedTimes to stadiums
const bookingsOnDate = ref([]);

const daysInMonth = computed(() => {
  const days = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    days.push({ label: "", date: null });
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push({ label: d, date: new Date(currentYear.value, currentMonth.value, d) });
  }
  return days;
});

function selectDate(date) {
  if (!date) return;
  selectedDate.value = date;
  fetchBookingsByDate();
}

function isToday(date) {
  if (!date) return false;
  return date.toDateString() === today.toDateString();
}

function isSelected(date) {
  if (!date || !selectedDate.value) return false;
  return date.toDateString() === selectedDate.value.toDateString();
}

function isPast(date) {
  if (!date) return false;
  return date < today;
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  fetchBookedDays();
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  fetchBookedDays();
}

function changeCity(city) {
  selectedCityId.value = city.id;
  fetchBookedDays();
  fetchStadiumsByCity(); // Fetch stadiums immediately when city changes
  if (selectedDate.value) {
    fetchBookingsByDate();
  }
}

async function fetchBookedDays() {
  if (!selectedCityId.value) return;
  try {
    // No city-month endpoint yet. Keep empty or implement later.
    bookedDates.value = [];
  } catch (err) {
    console.error("fetchBookedDays error:", err);
    bookedDates.value = [];
  }
}

async function fetchStadiumsWithTimeslots() {
  if (!selectedDate.value || !selectedCityId.value) return;
  try {
    const y = selectedDate.value.getFullYear();
    const m = selectedDate.value.getMonth() + 1;
    const d = selectedDate.value.getDate();
    const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    // Update existing stadiums with timeslot information
    const updatedStadiums = await Promise.all(
      stadiums.value.map(async (stadium) => {
        const bRes = await fetch(`${API_BASE}/bookings/stadium/${stadium.id}?date=${dateStr}`);
        const bookings = bRes.ok ? await bRes.json() : [];
        const timeslots = bookings.map((b) => {
          const start = new Date(b.startTime);
          const end = new Date(b.endTime);
          return {
            id: `${b.stadiumId}-${start.toISOString()}`,
            // Keep ISO for computations (timeline) and a local text for display
            startTimeISO: b.startTime,
            endTimeISO: b.endTime,
            startTimeText: start.toLocaleTimeString('zh-TW', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            endTimeText: end.toLocaleTimeString('zh-TW', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            isBooked: true,
          };
        });

        return {
          ...stadium,
          timeslots,
        };
      })
    );
    stadiums.value = updatedStadiums;
  } catch (err) {
    console.error("fetchStadiumsWithTimeslots error:", err);
  }
}

// Consolidated fetch: all stadium bookings for the selected day (optionally by city)
async function fetchBookingsByDate() {
  if (!selectedDate.value || !selectedCityId.value) return;
  try {
    const y = selectedDate.value.getFullYear();
    const m = selectedDate.value.getMonth() + 1;
    const d = selectedDate.value.getDate();
    const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const url = `${API_BASE}/bookings/by-date?date=${dateStr}&cityId=${selectedCityId.value}`;
    const res = await fetch(url);
    const bookings = res.ok ? await res.json() : [];
    bookingsOnDate.value = bookings;

    // Also populate stadium.timeslots for the per-stadium card display
    const grouped = bookings.reduce((acc, b) => {
      (acc[b.stadiumId] ||= []).push(b);
      return acc;
    }, {});

    stadiums.value = stadiums.value.map((s) => {
      const list = grouped[s.id] || [];
      const timeslots = list.map((b) => {
        const start = new Date(b.startTime);
        const end = new Date(b.endTime);
        return {
          id: `${b.stadiumId}-${start.toISOString()}`,
          startTimeISO: b.startTime,
          endTimeISO: b.endTime,
          startTimeText: start.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }),
          endTimeText: end.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }),
          isBooked: true,
        };
      });
      return { ...s, timeslots };
    });
  } catch (err) {
    console.error("fetchBookingsByDate error:", err);
    bookingsOnDate.value = [];
  }
}

// Flatten stadium timeslots into bookings for the timeline component
const bookingsForSelectedDate = computed(() => {
  if (!selectedDate.value) return [];
  return stadiums.value.flatMap(s =>
    (s.timeslots || []).map(t => ({
      stadiumId: s.id,
      stadiumName: s.name,
      startTime: t.startTimeISO,
      endTime: t.endTimeISO,
    }))
  );
});

function isBooked(date) {
  if (!date) return false;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;
  return bookedDates.value.includes(dateStr);
}

async function fetchStadiumsByCity() {
  if (!selectedCityId.value) return;
  try {
    const stadRes = await fetch(`${API_BASE}/stadiums/city/${selectedCityId.value}`);
    const stadList = stadRes.ok ? await stadRes.json() : [];

    const stadiumsData = stadList.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description || "",
      img: s.img || null,
      rules: s.rules || "",
      location: s.location || "",
      parking: s.parking || "",
      availability: s.availability || "",
      price: s.price || "",
      city: s.city ? s.city.name : "",
      timeslots: []
    }));

    stadiums.value = stadiumsData;
  } catch (err) {
    console.error("fetchStadiumsByCity error:", err);
    stadiums.value = [];
  }
}


async function fetchCities() {
  try {
    const res = await fetch(`${API_BASE}/cities`);
    const data = await res.json();
    cities.value = data;
    if (data.length > 0) {
      selectedCityId.value = data[0].id;
      // Load stadiums and consolidated bookings for the default city/date
      await fetchStadiumsByCity();
      await fetchBookedDays();
      if (selectedDate.value) {
        await fetchBookingsByDate();
      }
    }
  } catch (err) {
    console.error("fetchCities error:", err);
  }
}
const loading = ref(false);
onMounted(() => {
  fetchCities();
});
</script>

<style scoped>
.booking-container {
  font-family: "Microsoft JhengHei", sans-serif;
  padding: 10px;

}

.city-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.city-btn {
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  background: #f7c8a0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.city-btn:hover {
  background: #f0b080;
}

.city-btn.active {
  background: #f58220;
  color: white;
}

.calendar-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.calendar {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #eee;
  min-width: 300px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #f58220;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #f58220;
  padding: 5px 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-name {
  font-size: 14px;
  text-align: center;
  color: #888;
  padding: 8px 0;
}

.day {
  height: 50px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.day:hover:not(.disabled) {
  background: #f0f0f0;
}

.day.today {
  border: 1px solid #f58220;
}

.day.selected {
  background: #f58220;
  color: white;
}

.day.booked .underline {
  position: absolute;
  bottom: 4px;
  left: 25%;
  right: 25%;
  height: 2px;
  background: #f58220;
  border-radius: 2px;
}

.day.disabled {
  color: #ccc;
  pointer-events: none;
  cursor: not-allowed;
}

.stadiums-section {
  flex: 2;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eee;
  min-height: 400px;
}

.stadiums-section h3 {
  margin-bottom: 20px;
  color: #f58220;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.no-selection,
.no-stadiums {
  text-align: center;
  color: #888;
  padding: 40px 20px;
}

.stadiums-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stadium-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background: #fafafa;
  transition: all 0.3s ease;
}

.stadium-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stadium-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.stadium-header h4 {
  margin: 0;
  color: #2c5530;
  font-size: 1.2rem;
}

.city-tag {
  background: #4a7c59;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.stadium-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.timeslots-section h5 {
  color: #2c5530;
  margin-bottom: 10px;
  font-size: 1rem;
}

.timeslots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin-bottom: 15px;
}

.timeslot-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: white;
}

.timeslot-item.available {
  border-color: #4caf50;
  background: #f1f8e9;
}

.timeslot-item.booked {
  border-color: #f44336;
  background: #ffebee;
}

.time {
  font-weight: 500;
  color: #333;
}

.status {
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 500;
}

.status.available {
  background: #4caf50;
  color: white;
}

.status.booked {
  background: #f44336;
  color: white;
}

.stadium-rules h5 {
  color: #2c5530;
  margin-bottom: 8px;
  font-size: 1rem;
}

.stadium-rules p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.no-date-selection {
  text-align: center;
  color: #888;
  padding: 20px 0;
}

.select-date-message {
  font-size: 0.9rem;
}

.no-booking {
  color: #888;
  font-style: italic;
  margin: 8px 0 12px;
}

.stadium-slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 16px;
  padding: 10px;
}

.stadium-slide {
  flex: 0 0 10%;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  scroll-snap-align: start;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calendar-wrapper {
    flex-direction: column;
  }

  .calendar {
    min-width: auto;
  }

  .timeslots-grid {
    grid-template-columns: 1fr;
  }

  .stadium-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
