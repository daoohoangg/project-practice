import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Stadium } from "../entity/Stadium";
import { Booking } from "../entity/Booking";
import { Between } from "typeorm";

const router = Router();

const bookingRepo = AppDataSource.getRepository(Booking);
const stadiumRepo = AppDataSource.getRepository(Stadium);

// Get bookings by stadium ID and date (YYYY-MM-DD)
router.get("/stadium/:stadiumId", async (req, res) => {
  try {
    const { stadiumId } = req.params;
    const { date } = req.query as { date?: string };

    if (!date) {
      return res.status(400).json({ error: "Missing required query param: date (YYYY-MM-DD)" });
    }

    // Validate stadium exists
    const stadium = await stadiumRepo.findOne({ where: { id: stadiumId } });
    if (!stadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    // Parse date to start/end of the day in UTC
    const day = new Date(date);
    if (isNaN(day.getTime())) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }
    const startOfDay = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 23, 59, 59, 999));

    // Find bookings for this stadium and date
    const bookings = await bookingRepo.find({
      where: {
        stadium: { id: stadiumId },
        startTime: Between(startOfDay, endOfDay),
      },
      order: { startTime: "ASC" },
    });

    // Return stadiumId, startTime, endTime, and timeDate for each booking
    const times = bookings.map(b => ({
      stadiumId: stadiumId,
      startTime: b.startTime,
      endTime: b.endTime,
      dateTimeBooked: b.timeDate,
    }));

    return res.json(times);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await bookingRepo.find({
      order: { startTime: "ASC" },
      relations: ["stadium"], // include stadium info if needed
    });
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { stadiumId, dateTimeBooked, startTime, endTime } = req.body;

    if (!stadiumId || !dateTimeBooked || !startTime || !endTime) {
      return res.status(400).json({ error: "stadiumId, dateTimeBooked, startTime, and endTime are required" });
    }

    const stadium = await stadiumRepo.findOne({ where: { id: stadiumId } });
    if (!stadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    const booking = new Booking();
    booking.stadium = stadium;
    booking.timeDate = new Date(dateTimeBooked);
    booking.startTime = new Date(startTime);
    booking.endTime = new Date(endTime);
    booking.status = "PENDING"; // or whatever default status you use

    await bookingRepo.save(booking);

    return res.status(201).json(booking);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
