<template>
    <!-- Header -->
    <h2 class="brand-title">Golf24</h2>
    <p class="stadium-name">{{ stadium.name }}</p>

    <!-- Image -->
    <img v-if="stadium.img" :src="stadium.img" :alt="stadium.name" class="stadium-img" />
    <div v-else class="stadium-noimg">
        <span>No Image</span>
    </div>

    <!-- Info -->
    <div class="stadium-info">
        <p v-if="stadium.location">📍 {{ stadium.location }}</p>
        <p v-if="stadium.rules">🕒 {{ stadium.rules }}</p>
        <p v-if="stadium.parking">🚗 {{ stadium.parking }}</p>
    </div>

    <!-- Button -->
    <button class="booking-btn" @click="bookNow(stadium)">
        立即預約
    </button>
</template>

<script setup>
const props = defineProps({ stadium: Object });
import { useRouter } from "vue-router";
import { useStadiumStore } from "../stores/stadiums";

const router = useRouter();
const stadiumStore = useStadiumStore();

function bookNow(stadium) {
  stadiumStore.setStadium(stadium);
  router.push('/booking-space');
}

</script>

<style scoped>
/* Grid layout */
.stadiums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

/* Card */
.stadium-card {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stadium-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

/* Titles */
.brand-title {
    color: #ea580c;
    /* orange-600 */
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
}

.stadium-name {
    color: #374151;
    /* gray-700 */
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.75rem;
}

/* Image */
.stadium-img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
}

.stadium-noimg {
    width: 100%;
    height: 12rem;
    background: #f3f4f6;
    /* gray-100 */
    color: #9ca3af;
    /* gray-400 */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
}

/* Info */
.stadium-info {
    flex: 1;
    font-size: 0.875rem;
    color: #4b5563;
    /* gray-600 */
    line-height: 1.4;
}

/* Availability */
.stadium-availability {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #6b7280;
    /* gray-500 */
}

.stadium-availability .time-text {
    color: #ea580c;
    font-weight: bold;
    margin-top: 0.25rem;
}

/* Button */
.booking-btn {
    margin-top: 1rem;
    background: #ea580c;
    color: white;
    padding: 0.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    transition: background 0.2s ease;
    cursor: pointer;
    border: none;
}

.booking-btn:hover {
    background: #c2410c;
}
</style>
