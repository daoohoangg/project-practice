import "reflect-metadata";
import { DataSource } from "typeorm";
import { Booking } from "./entity/Booking"; 
import { City } from "./entity/City";
import { Stadium } from "./entity/Stadium";
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",   // my DB username
//   password: "123",     // PostgreSQL password
//   database: "golf_booking",
//   synchronize: true,      // auto create table (only developer)
//   logging: false,
//   entities: [Customer,Booking,TimeSlot],
//   migrations: [],
//   subscribers: [],
// });



const isSSL = process.env.DB_SSL === 'true' || (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase'));

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, 
  entities: [Booking, City, Stadium],
  synchronize: process.env.NODE_ENV !== "production",
  logging: true,
  ssl: {
    rejectUnauthorized: false, 
  },
  schema: "public",
});


