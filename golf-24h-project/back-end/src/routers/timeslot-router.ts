import { Router } from "express";
import { AppDataSource } from "../data-source";
import { TimeSlot } from "../entity/TimeSlot";
import { City } from "../entity/City";

const router = Router();
const cityRepo = AppDataSource.getRepository(City);
const timeslotRepo = AppDataSource.getRepository(TimeSlot);


router.get("/", async (_req, res) => {
  const timeslots = await timeslotRepo.find({ relations: ["bookings"] });
  res.json(timeslots);
});

router.post("/", async (req, res) => {
  try {
    const timeslot = timeslotRepo.create(req.body);
    const saved = await timeslotRepo.save(timeslot);
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { cityId, date } = req.query;

    if (!cityId || !date) {
      return res.status(400).json({ error: "cityId and date are required" });
    }

    // Lấy danh sách stadium trong city + timeslot theo ngày
    const city = await cityRepo.findOne({
      where: { id: cityId as string },
      relations: ["stadiums", "stadiums.timeslots", "stadiums.timeslots.bookings"],
    });

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const result = city.stadiums.map((stadium) => {
      const slots = stadium.timeslots.filter((ts) => ts.date === date);

      return {
        stadiumId: stadium.id,
        stadiumName: stadium.name,
        bookedSlots: slots
          .filter((ts) => ts.status === "booked" || ts.bookings.length > 0)
          .map((ts) => ({
            start: ts.start_time,
            end: ts.end_time,
          })),
      };
    });

    res.json({ city: city.name, date, stadiums: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;
