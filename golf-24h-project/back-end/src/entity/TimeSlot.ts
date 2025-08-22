import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "./Booking";

export enum SlotStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  BLOCKED = "blocked"
}

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  date!: string;

  @Column({ type: "time" })
  start_time!: string;

  @Column({ type: "time" })
  end_time!: string;

  @Column({
    type: "enum",
    enum: SlotStatus,
    default: SlotStatus.AVAILABLE
  })
  status!: SlotStatus;

  @OneToMany(() => Booking, booking => booking.timeslot)
  bookings!: Booking[];
}
