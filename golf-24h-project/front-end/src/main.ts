import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "./style.css";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
app.use(PrimeVue, { ripple: true });
app.use(VCalendar, {})