import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "../pages/calendar-view.vue";
import BookingForm from "../pages/booking-form.vue";
import BookingLookup from "../pages/booking-lookup.vue";

const routes = [
  { path: "/", component: CalendarView },
  { path: "/booking", component: BookingForm },
  { path: "/lookup", component: BookingLookup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
