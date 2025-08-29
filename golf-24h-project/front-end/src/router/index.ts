import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import BookingSpace from "../components/BookingSpace.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/booking-space", name: "BookingSpace", component: BookingSpace }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
