import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Pet } from "../entity/Pet";

const router = Router();
const petRepo = AppDataSource.getRepository(Pet);

// GET all pets
router.get("/", async (_req, res) => {
  const pets = await petRepo.find();
  res.json(pets);
});

// POST add pet
router.post("/", async (req, res) => {
  try {
    const pet = petRepo.create(req.body);
    const saved = await petRepo.save(pet);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router;
