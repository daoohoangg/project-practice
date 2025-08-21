import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pet } from "./entity/Pet";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",   // my DB username
  password: "123",     // PostgreSQL password
  database: "petstore",
  synchronize: true,      // auto create table (only developer)
  logging: false,
  entities: [Pet],
  migrations: [],
  subscribers: [],
});
