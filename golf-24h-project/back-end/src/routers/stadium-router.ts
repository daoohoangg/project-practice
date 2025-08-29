import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Stadium } from "../entity/Stadium";
import { City } from "../entity/City";

const router = Router();
const stadiumRepo = AppDataSource.getRepository(Stadium);
const cityRepo = AppDataSource.getRepository(City);


// Get all stadiums with full details
router.get("/", async (req, res) => {
  try {
    const includeCity = req.query.includeCity === "true";
    const stadiums = await stadiumRepo.find({
      relations: includeCity ? ["city"] : [],
      order: { name: "ASC" },
    });
    res.json(stadiums);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
// Get all stadiums name
router.get("/name", async (req, res) => {
  try {
    const stadiums = await stadiumRepo.find({
      select: ["id","name"],   // chỉ lấy id và name
      order: { name: "ASC" },
    });

    res.json(stadiums);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get stadiums by city ID
router.get("/city/:cityId", async (req, res) => {
  try {
    const { cityId } = req.params;
    
    // First check if the city exists
    const city = await cityRepo.findOne({ where: { id: cityId } });
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const stadiums = await stadiumRepo.find({
      select: [],
      where: { city: { id: cityId } },
      relations: ["city"],
      order: { name: "ASC" },
    });
    
    res.json(stadiums);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get stadium by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stadium = await stadiumRepo.findOne({
      where: { id },
      relations: ["city"],
    });
    
    if (!stadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }
    
    res.json(stadium);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
