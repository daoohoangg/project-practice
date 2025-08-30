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
      return res.status(400).json({ error: "Date parameter is required (YYYY-MM-DD)" });
    }

    // Validate stadium exists
    const stadium = await stadiumRepo.findOne({ where: { id: stadiumId } });
    if (!stadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    const day = new Date(date);
    if (isNaN(day.getTime())) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }
    const startOfDay = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 23, 59, 59, 999));

    const bookings = await bookingRepo.find({
      where: {
        stadium: { id: stadiumId },
        timeDate: Between(startOfDay, endOfDay),
      },
      order: { startTime: "ASC" },
      relations: ["stadium"],
    });

    // Simplified response with only required fields
    return res.json(
      bookings.map(booking => ({
        stadiumId: booking.stadium.id,
        startTime: booking.startTime,
        endTime: booking.endTime
      }))
    );

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

    // Convert times to Date objects
    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);

    // Check for overlapping bookings
    const overlappingBookings = await bookingRepo.find({
      where: {
        stadium: { id: stadiumId },
        startTime: Between(newStartTime, newEndTime),
      },
      relations: ["stadium"],
    });

    // Also check for bookings that started before but end during our new booking
    const additionalOverlaps = await bookingRepo.find({
      where: {
        stadium: { id: stadiumId },
        endTime: Between(newStartTime, newEndTime),
      },
      relations: ["stadium"],
    });

    const allOverlaps = [...overlappingBookings, ...additionalOverlaps];

    if (allOverlaps.length > 0) {
      return res.status(409).json({ 
        error: "This time slot is already booked",
        conflictingBookings: allOverlaps.map(booking => ({
          startTime: booking.startTime,
          endTime: booking.endTime
        }))
      });
    }

    // If no overlaps, create the booking
    const booking = new Booking();
    booking.stadium = stadium;
    booking.timeDate = new Date(dateTimeBooked);
    booking.startTime = newStartTime;
    booking.endTime = newEndTime;
    booking.status = "PENDING";

    await bookingRepo.save(booking);

    return res.status(201).json(booking);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

// Get all bookings by stadium ID
router.get("/stadium-all/:stadiumId", async (req, res) => {
  try {
    const { stadiumId } = req.params;

    // Validate stadium exists
    const stadium = await stadiumRepo.findOne({ where: { id: stadiumId } });
    if (!stadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    // Find all bookings for this stadium
    const bookings = await bookingRepo.find({
      where: {
        stadium: { id: stadiumId },
      },
      order: { startTime: "ASC" },
      relations: ["stadium"],
    });

    return res.json({
      stadiumId,
      bookings: bookings.map(booking => ({
        id: booking.id,
        stadiumId: booking.stadium.id,
        startTime: booking.startTime,
        endTime: booking.endTime,
        dateTimeBooked: booking.timeDate,
        status: booking.status
      }))
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
