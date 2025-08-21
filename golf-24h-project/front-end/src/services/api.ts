import type { Booking } from "../types/booking-object.ts";

let bookings: Booking[] = [];

export async function fetchBookings(): Promise<Booking[]> {
  return Promise.resolve(bookings);
}

export async function addBooking(b: Booking): Promise<void> {
  bookings.push(b);
}
