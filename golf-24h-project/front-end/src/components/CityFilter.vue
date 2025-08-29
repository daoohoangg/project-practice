<template>
  <div class="city-filter">
    <button
      v-for="city in cities"
      :key="city.id"
      :class="['city-btn', { active: selectedCityId === city.id }]"
      @click="$emit('change', city)"
    >
      {{ city.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  cities: Array,
  selectedCityId: [String, Number]
});
defineEmits(['change']);
</script>

<style scoped>
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
</style>