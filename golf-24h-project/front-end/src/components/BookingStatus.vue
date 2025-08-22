<template>
  <section id="booking-status" class="section">
    <h3 class="section-title">預定狀況</h3>
    <div class="calendar-container">
      <div class="calendar-header">
        <h4>{{ currentMonth }}</h4>
      </div>
      <div class="calendar-grid">
        <div class="calendar-day" 
             v-for="day in calendarDays" 
             :key="day.date" 
             :class="{ 'booked': day.booked, 'available': !day.booked }"
             @click="handleDayClick(day)">
          {{ day.day }}
        </div>
      </div>
      <div class="calendar-legend">
        <div class="legend-item">
          <span class="legend-color booked"></span>
          <span>已被預約時間</span>
        </div>
        <div class="legend-item">
          <span class="legend-color available"></span>
          <span>目前沒有預約</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { CalendarDay } from '../types/components'

const props = defineProps<{
  month?: string
  year?: number
}>()

const emit = defineEmits<{
  dayClick: [day: CalendarDay]
}>()

const currentMonth = computed(() => props.month || '2025 年 08 月')

const calendarDays = ref<CalendarDay[]>([
  { day: 27, date: '2025-08-27', booked: false },
  { day: 28, date: '2025-08-28', booked: true },
  { day: 29, date: '2025-08-29', booked: false },
  { day: 30, date: '2025-08-30', booked: true },
  { day: 31, date: '2025-08-31', booked: false },
  { day: 1, date: '2025-09-01', booked: false },
  { day: 2, date: '2025-09-02', booked: true },
  { day: 3, date: '2025-09-03', booked: false },
  { day: 4, date: '2025-09-04', booked: false },
  { day: 5, date: '2025-09-05', booked: true },
  { day: 6, date: '2025-09-06', booked: false },
  { day: 7, date: '2025-09-07', booked: false },
  { day: 8, date: '2025-09-08', booked: false },
  { day: 9, date: '2025-09-09', booked: true },
  { day: 10, date: '2025-09-10', booked: false },
  { day: 11, date: '2025-09-11', booked: false },
  { day: 12, date: '2025-09-12', booked: true },
  { day: 13, date: '2025-09-13', booked: false },
  { day: 14, date: '2025-09-14', booked: false },
  { day: 15, date: '2025-09-15', booked: false },
  { day: 16, date: '2025-09-16', booked: true },
  { day: 17, date: '2025-09-17', booked: false },
  { day: 18, date: '2025-09-18', booked: false },
  { day: 19, date: '2025-09-19', booked: true },
  { day: 20, date: '2025-09-20', booked: false },
  { day: 21, date: '2025-09-21', booked: false },
  { day: 22, date: '2025-09-22', booked: false },
  { day: 23, date: '2025-09-23', booked: true },
  { day: 24, date: '2025-09-24', booked: false },
  { day: 25, date: '2025-09-25', booked: false },
  { day: 26, date: '2025-09-26', booked: true },
  { day: 27, date: '2025-09-27', booked: false },
  { day: 28, date: '2025-09-28', booked: false },
  { day: 29, date: '2025-09-29', booked: false },
  { day: 30, date: '2025-09-30', booked: true },
  { day: 1, date: '2025-10-01', booked: false },
  { day: 2, date: '2025-10-02', booked: false },
  { day: 3, date: '2025-10-03', booked: true },
  { day: 4, date: '2025-10-04', booked: false },
  { day: 5, date: '2025-10-05', booked: false },
  { day: 6, date: '2025-10-06', booked: false }
])

const handleDayClick = (day: CalendarDay) => {
  emit('dayClick', day)
}
</script>

<style scoped>
.section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.section-title {
  font-size: 2rem;
  color: #2c5530;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #4a7c59, #6b9c7a);
  border-radius: 2px;
}

.calendar-container {
  max-width: 800px;
  margin: 0 auto;
}

.calendar-header {
  text-align: center;
  margin-bottom: 2rem;
}

.calendar-header h4 {
  font-size: 1.5rem;
  color: #2c5530;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-bottom: 2rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar-day:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.calendar-day.booked {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.calendar-day.available {
  background: #a8e6cf;
  color: #2c5530;
  border-color: #a8e6cf;
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 5px;
}

.legend-color.booked {
  background: #ff6b6b;
}

.legend-color.available {
  background: #a8e6cf;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calendar-grid {
    gap: 5px;
  }
  
  .calendar-day {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 1rem;
  }
}
</style>
