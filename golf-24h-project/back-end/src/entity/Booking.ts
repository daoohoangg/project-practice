import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { TimeSlot } from "./TimeSlot";

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled"
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  customer_id!: string;

  @Column()
  timeslot_id!: string;

  @Column({
    type: "enum",
    enum: BookingStatus,
    default: BookingStatus.PENDING
  })
  status!: BookingStatus;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Customer, customer => customer.bookings, { onDelete: "CASCADE" })
  customer!: Customer;

  @ManyToOne(() => TimeSlot, timeslot => timeslot.bookings, { onDelete: "CASCADE" })
  timeslot!: TimeSlot;
}
