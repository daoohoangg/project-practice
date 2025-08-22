<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-section">
          <h4>Golf 24</h4>
          <p>專業的VR高爾夫體驗中心</p>
        </div>
        <div class="footer-section">
          <h4>營業時間</h4>
          <p>週一至週日: 09:00 - 22:00</p>
        </div>
        <div class="footer-section">
          <h4>聯絡方式</h4>
          <p>mak66design@gmail.com</p>
          <p>(02)7755-0832</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy;2025 Copyright | All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component logic can be added here
</script>

<style scoped>
.footer {
  background: #2c5530;
  color: white;
  padding: 3rem 0 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: #a8e6cf;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section p {
  color: #e9ecef;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.footer-bottom {
  border-top: 1px solid #4a7c59;
  padding-top: 2rem;
  text-align: center;
}

.footer-bottom p {
  color: #a8e6cf;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer {
    padding: 2rem 0 1rem;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 0 1rem;
  }
}
</style>
