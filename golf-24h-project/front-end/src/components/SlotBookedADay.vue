<script setup lang="ts">
import { computed } from "vue";

interface Booking {
  stadiumId: string;
  stadiumName: string;
  startTime: string;
  endTime: string;
}

interface StadiumRow { id: string; name: string }

const props = defineProps<{
  bookings?: Booking[] | null;
  stadiums?: StadiumRow[] | null;
}>();

// One row per stadium, with zero or more booking segments
const rows = computed(() => {
  const st = props.stadiums ?? [];
  const bs = props.bookings ?? [];
  return st.map((s) => {
    const segments = bs
      .filter((b) => b.stadiumId === s.id)
      .map((b) => {
        const start = new Date(b.startTime);
        const end = new Date(b.endTime);
        return {
          startHour: start.getHours() + start.getMinutes() / 60,
          endHour: end.getHours() + end.getMinutes() / 60,
        };
      });
    return {
      stadiumId: s.id,
      stadiumName: s.name,
      slots: segments,
    };
  });
});

</script>

<template>
  <div class="timeline">
    <!-- One row per stadium; shows empty bar if no bookings -->
    <div v-if="rows.length > 0">
      <div v-for="row in rows" :key="row.stadiumId" class="stadium">
        <h3>{{ row.stadiumName }}</h3>
        <div class="bar">
          <div v-for="h in 24" :key="h" class="hour">
            {{ h - 1 < 10 ? '0' + (h-1) : h-1 }}
          </div>
          <div
            v-for="(slot, idx) in row.slots"
            :key="idx"
            class="booking"
            :style="{
              left: (slot.startHour / 24 * 100) + '%',
              width: ((slot.endHour - slot.startHour) / 24 * 100) + '%'
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Fallback when no stadiums provided -->
    <div v-else class="stadium">
      <h3>Time</h3>
      <div class="bar">
        <div v-for="h in 24" :key="h" class="hour">
          {{ h - 1 < 10 ? '0' + (h-1) : h-1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stadium {
  width: 100%;
}

.bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  height: 30px;
}

.hour {
  flex: 1;
  font-size: 10px;
  text-align: center;
  line-height: 30px;
  color: #aaa;
}

.booking {
  position: absolute;
  top: 0;
  bottom: 0;
  background: rgba(255, 165, 0, 0.4);
  border-radius: 4px;
}
</style>
