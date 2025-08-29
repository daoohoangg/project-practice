import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import cityRoutes from "./routers/city-router";
import bookingRoutes from "./routers/booking-router";
import stadiumRoutes from "./routers/stadium-router";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/cities", cityRoutes);
app.use("/bookings", bookingRoutes);
app.use("/stadiums", stadiumRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
console.log("DB URL:", process.env.DATABASE_URL);