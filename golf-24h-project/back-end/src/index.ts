import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import timeslotRoutes from "./routers/timeslot-router";
import areaRoutes from "./routers/area-router";

const app = express();
app.use(express.json());

// Routes
app.use("/timeslots", timeslotRoutes);
app.use("/areas", areaRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
console.log("DB URL:", process.env.DATABASE_URL);