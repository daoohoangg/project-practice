import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";

const router = Router();
const customerRepo = AppDataSource.getRepository(Customer);

// Lấy danh sách customer
router.get("/", async (_req, res) => {
  const customers = await customerRepo.find({ relations: ["bookings"] });
  res.json(customers);
});

// Tạo customer mới
router.post("/", async (req, res) => {
  try {
    const customer = customerRepo.create(req.body);
    const saved = await customerRepo.save(customer);
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
