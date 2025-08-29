// Stadium.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { Booking } from "./Booking";

@Entity()
export class Stadium {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column({ nullable: true })
  img?: string;

  @Column("text", { nullable: true })
  rules?: string;
  @Column("text", { nullable: true })
  location?: string;
  @Column("text", { nullable: true })
  parking?: string;
  @Column("text", { nullable: true })
  availability?: string;
  @Column("text", { nullable: true })
  price?: string;
  @ManyToOne(() => City, (city) => city.stadiums, { onDelete: "CASCADE" })
  city!: City;

  @OneToMany(() => Booking, (booking) => booking.stadium)
  bookings!: Booking[];
}
