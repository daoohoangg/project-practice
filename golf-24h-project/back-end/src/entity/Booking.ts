// Booking.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { City } from "./City";
import { Stadium } from "./Stadium";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;


  @ManyToOne(() => Stadium, (stadium) => stadium.bookings, { eager: true, onDelete: "CASCADE" })
  stadium!: Stadium;

  @Column("timestamp")
  startTime!: Date;

  @Column("timestamp")
  endTime!: Date;

  @Column("timestamp", { nullable: true })
  timeDate!: Date;

  @Column({ type: "varchar", length: 20 })
  status!: BookingStatus;
}
