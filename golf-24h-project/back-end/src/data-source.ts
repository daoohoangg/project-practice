import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";
import { Booking } from "./entity/Booking"; 
import { TimeSlot } from "./entity/TimeSlot";

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
  entities: [Customer, Booking, TimeSlot],
  synchronize: process.env.NODE_ENV !== "production",  // auto create table (only developer)
  logging: true,
  ...(isSSL ? { ssl: { rejectUnauthorized: false } } : {}),
  schema: "public",
});


