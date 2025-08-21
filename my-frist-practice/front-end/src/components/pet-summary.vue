<template>
  <div v-if="summary" class="summary">
    <div><span>Total Pets:</span> {{ summary.total }}</div>
    <div><span>Average Weight:</span> {{ summary.avgWeight.toFixed(2) }} kg</div>
    <div><span>Dogs:</span> {{ summary.dogs }}</div>
    <div><span>Cats:</span> {{ summary.cats }}</div>
    <div><span>Birds:</span> {{ summary.birds }}</div>
  </div>
</template>

<script setup>
defineProps({ summary: Object });
</script>
