import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Booking } from "./Booking";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @Column({ nullable: true })
  email!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Booking, booking => booking.customer)
  bookings!: Booking[];
}
