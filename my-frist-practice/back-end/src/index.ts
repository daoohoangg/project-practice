import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import petRoutes from "./routers/pet-router.ts";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/pets", petRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("DB connected!");
    app.listen(8081, () => {
      console.log("Server running on http://localhost:8081");
    });
  })
  .catch((err) => console.error("DB connection error: ", err));
