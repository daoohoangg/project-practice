<template>
  <section id="booking-space" class="section">
    <h3 class="section-title">預約空間</h3>
    <div class="booking-info">
      <div class="contact-info">
        <h4>聯絡我們</h4>
        <div class="contact-item">
          <span class="contact-label">Email:</span>
          <a href="mailto:mak66design@gmail.com" class="contact-link">mak66design@gmail.com</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">電話:</span>
          <a href="tel:+886277550832" class="contact-link">(02)7755-0832</a>
        </div>
        <div class="contact-actions">
          <button class="contact-button email-btn" @click="handleEmailClick">
            <span class="button-icon">📧</span>
            發送郵件
          </button>
          <button class="contact-button phone-btn" @click="handlePhoneClick">
            <span class="button-icon">📞</span>
            撥打電話
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  emailClick: []
  phoneClick: []
}>()

const handleEmailClick = () => {
  window.open('mailto:mak66design@gmail.com', '_blank')
  emit('emailClick')
}

const handlePhoneClick = () => {
  window.open('tel:+886277550832', '_blank')
  emit('phoneClick')
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

.booking-info {
  text-align: center;
}

.contact-info h4 {
  color: #2c5530;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.contact-item {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.contact-label {
  font-weight: bold;
  color: #2c5530;
  min-width: 80px;
}

.contact-link {
  color: #4a7c59;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #2c5530;
  text-decoration: underline;
}

.contact-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.contact-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.email-btn {
  background: linear-gradient(45deg, #4a7c59, #6b9c7a);
  color: white;
}

.email-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 124, 89, 0.4);
}

.phone-btn {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
}

.phone-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.button-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .contact-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-button {
    width: 200px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 1rem;
  }
}
</style>
