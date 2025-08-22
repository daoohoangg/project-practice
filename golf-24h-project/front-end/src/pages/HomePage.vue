<template>
  <div class="home-page">
    <Header />
    
    <main class="main-content">
      <HeroSection @booking="handleBooking" />
      <BookingStatus @day-click="handleDayClick" />
      <BookingSpace @email-click="handleEmailClick" @phone-click="handlePhoneClick" />
      <ActivityList @activity-click="handleActivityClick" />
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import BookingStatus from '../components/BookingStatus.vue'
import BookingSpace from '../components/BookingSpace.vue'
import ActivityList from '../components/ActivityList.vue'
import Footer from '../components/Footer.vue'

// Event handlers
const handleBooking = () => {
  console.log('立即預約 clicked')
  // Add booking logic here
}

import type { CalendarDay, Activity } from '../types/components'

const handleDayClick = (day: CalendarDay) => {
  console.log('Day clicked:', day)
  // Add day selection logic here
}

const handleEmailClick = () => {
  console.log('Email clicked')
  // Add email logic here
}

const handlePhoneClick = () => {
  console.log('Phone clicked')
  // Add phone logic here
}

const handleActivityClick = (activity: Activity) => {
  console.log('Activity clicked:', activity)
  // Add activity selection logic here
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.5rem;
  }
}
</style>
