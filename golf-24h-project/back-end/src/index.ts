import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import customerRoutes from "./routers/customer-router";
import timeslotRoutes from "./routers/timeslot-router";
import bookingRoutes from "./routers/booking-router";

const app = express();
app.use(express.json());

// Routes
app.use("/customers", customerRoutes);
app.use("/timeslots", timeslotRoutes);
app.use("/bookings", bookingRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
