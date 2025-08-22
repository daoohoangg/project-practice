<template>
  <section class="hero-section">
    <div class="hero-content">
      <h2 class="hero-title">VR Golf</h2>
      <p class="hero-subtitle">體驗虛擬實境高爾夫球的樂趣</p>
      <button class="cta-button" @click="handleBooking">立即預約</button>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  booking: []
}>()

const handleBooking = () => {
  emit('booking')
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #4a7c59 0%, #6b9c7a 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 15px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255,107,107,0.4);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255,107,107,0.6);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
}
</style>
