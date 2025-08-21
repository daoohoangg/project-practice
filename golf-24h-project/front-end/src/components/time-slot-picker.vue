<template>
  <div class="time-slot-container">
    <h3>可選時段</h3>
    <div class="time-slot-grid">
      <button
        v-for="slot in slots"
        :key="slot"
        class="time-slot"
        :class="{ selected: selectedSlot === slot }"
        @click="selectSlot(slot)"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeSlotPicker",
  props: ["slots"],
  data() {
    return {
      selectedSlot: null,
    };
  },
  methods: {
    selectSlot(slot) {
      this.selectedSlot = slot;
      this.$emit("slot-selected", slot);
    },
  },
};
</script>

<style scoped>
.time-slot-container {
  margin-top: 20px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}

.time-slot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.time-slot {
  background: #eee;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.time-slot.selected {
  background: #f37021;
  color: white;
  font-weight: bold;
}
</style>
