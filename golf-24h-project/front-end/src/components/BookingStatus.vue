<template>
  <div class="booking-container">
    <!-- City filter -->
    <div class="city-filter">
      <button
        v-for="city in cities"
        :key="city"
        :class="['city-btn', { active: selectedCity === city }]"
        @click="changeCity(city)"
      >
        {{ city }}
      </button>
    </div>

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
          <div
            v-for="(day, index) in daysInMonth"
            :key="index"
            :class="[
              'day',
              { 
                today: isToday(day.date),
                selected: isSelected(day.date),
                booked: isBooked(day.date),
                disabled: isPast(day.date)
              }
            ]"
            @click="!isPast(day.date) && selectDate(day.date)"
          >
            {{ day.label }}
            <div v-if="isBooked(day.date)" class="underline"></div>
          </div>
        </div>
      </div>

      <!-- Reservation Info -->
      <div class="reservation">
        <h3>{{ selectedCity }} 預約資訊</h3>
        <p v-if="!selectedDate">請選擇日期</p>
        <p v-else-if="bookedTimes.length === 0">目前沒有預約</p>
        <ul>
          <li v-for="time in bookedTimes" :key="time">{{ time }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const API_BASE = "http://localhost:3000"; 

const cities = ["全部城市", "台北", "新北", "新竹", "苗栗", "台中", "彰化", "高雄", "台東"];
const selectedCity = ref("全部城市");

const today = new Date();
today.setHours(0,0,0,0);
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const selectedDate = ref(null);

const weekDays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

const bookedDates = ref([]);  
const bookedTimes = ref([]);  

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
  fetchDayBookings();
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
  selectedCity.value = city;
  fetchBookedDays();
}


async function fetchBookedDays() {
  if (!selectedCity.value) return;
  try {
    const res = await fetch(
      `${API_BASE}/bookings?city=${encodeURIComponent(selectedCity.value)}&year=${currentYear.value}&month=${currentMonth.value + 1}`
    );
    bookedDates.value = await res.json(); // ví dụ trả về [25, 27, 28, 30]
  } catch (err) {
    console.error("fetchBookedDays error:", err);
    bookedDates.value = [];
  }
}


async function fetchDayBookings() {
  if (!selectedDate.value || !selectedCity.value) return;
  try {
    const y = selectedDate.value.getFullYear();
    const m = selectedDate.value.getMonth() + 1;
    const d = selectedDate.value.getDate();
    const dateStr = `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const res = await fetch(
      `${API_BASE}/bookings/day?city=${encodeURIComponent(selectedCity.value)}&date=${dateStr}`
    );
    bookedTimes.value = await res.json(); 
  } catch (err) {
    console.error("fetchDayBookings error:", err);
    bookedTimes.value = [];
  }
}

function isBooked(date) {
  if (!date) return false;
  return bookedDates.value.includes(date.getDate());
}


fetchBookedDays();
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
}
.city-btn {
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  background: #f7c8a0;
  cursor: pointer;
}
.city-btn.active {
  background: #f58220;
  color: white;
}
.calendar-wrapper {
  display: flex;
  gap: 20px;
}
.calendar {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #eee;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #f58220;
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
.reservation {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eee;
}
.reservation h3 {
  margin-bottom: 10px;
  color: #f58220;
}
</style>
