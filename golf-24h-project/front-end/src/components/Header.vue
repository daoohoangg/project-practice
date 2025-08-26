<template>
  <header class="header">
    <div class="header-content">
      <h1 class="logo">Golf 24</h1>
      <nav class="nav">
        <a href="#booking-status" class="nav-link">預定狀況</a>
        <a href="#booking-space" class="nav-link">預約空間</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header component logic can be added here
</script>

<style scoped>
.header {
  background: white;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #e87220;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.nav-link:hover {
  color: #e87220;
  background-color: rgba(255,255,255,0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .nav {
    gap: 1rem;
  }
}
</style>
