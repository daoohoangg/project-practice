import { Router } from "express";
import { AppDataSource } from "../data-source";
import { TimeSlot } from "../entity/TimeSlot";

const router = Router();
const timeslotRepo = AppDataSource.getRepository(TimeSlot);

// Lấy danh sách timeslot
router.get("/", async (_req, res) => {
  const timeslots = await timeslotRepo.find({ relations: ["bookings"] });
  res.json(timeslots);
});

// Tạo timeslot mới
router.post("/", async (req, res) => {
  try {
    const timeslot = timeslotRepo.create(req.body);
    const saved = await timeslotRepo.save(timeslot);
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
