import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, Index } from "typeorm";
import { Stadium } from "./Stadium";
import { Booking } from "./Booking";

@Entity({ name: "time_slot" })
@Unique(["stadium", "date", "start_time", "end_time"])
export class TimeSlot {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Stadium, (stadium) => stadium.timeslots, { onDelete: "CASCADE" })
  stadium!: Stadium;

  @Column({ type: "date" })
  @Index()
  date!: string;

  @Column({ type: "time" })
  start_time!: string;

  @Column({ type: "time" })
  end_time!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: "available"
  })
  status!: "available" | "booked" | "blocked";

  @OneToMany(() => Booking, (booking) => booking.timeslot)
  bookings!: Booking[];
}
