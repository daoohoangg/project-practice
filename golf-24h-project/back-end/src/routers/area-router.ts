import { Router } from "express";
import { AppDataSource } from "../data-source";
import { City } from "../entity/City";

const router = Router();
const cityRepo = AppDataSource.getRepository(City);

// List cities (optionally include stadiums)
router.get("/", async (req, res) => {
  try {
    const includeStadiums = req.query.includeStadiums === "true";
    const cities = await cityRepo.find({
      relations: includeStadiums ? ["stadiums"] : [],
      order: { name: "ASC" },
    });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;


