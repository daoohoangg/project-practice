import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Booking } from "../entity/Booking";
import { Customer } from "../entity/Customer";
import { TimeSlot } from "../entity/TimeSlot";

const router = Router();
const bookingRepo = AppDataSource.getRepository(Booking);
const customerRepo = AppDataSource.getRepository(Customer);
const timeslotRepo = AppDataSource.getRepository(TimeSlot);

// Lấy danh sách booking
router.get("/", async (_req, res) => {
  const bookings = await bookingRepo.find({
    relations: ["customer", "timeslot"],
  });
  res.json(bookings);
});

// Tạo booking mới
router.post("/", async (req, res) => {
  try {
    const { customerId, timeslotId } = req.body;

    const customer = await customerRepo.findOneBy({ id: customerId });
    const timeslot = await timeslotRepo.findOneBy({ id: timeslotId });

    if (!customer || !timeslot) {
      return res.status(404).json({ error: "Customer or Timeslot not found" });
    }

    const booking = bookingRepo.create({ customer, timeslot });
    const saved = await bookingRepo.save(booking);
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
