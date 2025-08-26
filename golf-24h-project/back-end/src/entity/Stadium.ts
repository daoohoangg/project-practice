import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { TimeSlot } from "./TimeSlot";

@Entity({ name: "stadium" })
export class Stadium {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 200 })
  img!: string;

  @Column({ length: 200 })
  description!: string;

  @Column({ length: 500 })
  rules!: string;

  @ManyToOne(() => City, (city) => city.stadiums, { onDelete: "CASCADE" })
  city!: City;

  @OneToMany(() => TimeSlot, (timeslot) => timeslot.stadium)
  timeslots!: TimeSlot[];
}
