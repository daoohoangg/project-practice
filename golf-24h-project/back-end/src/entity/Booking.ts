import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TimeSlot } from "./TimeSlot";

@Entity({ name: "booking" })
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => TimeSlot, (timeslot) => timeslot.bookings, { onDelete: "CASCADE" })
  timeslot!: TimeSlot;
}
