import { defineStore } from "pinia";
import type { Booking } from "../types/booking-object.ts";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [] as Booking[],
  }),
  getters: {
    byDate: (state) => (date: string) => {
      return state.bookings.filter((b) => b.date === date);
    },
  },
  actions: {
    addBooking(booking: Booking) {
      this.bookings.push(booking);
    },
  },
});
