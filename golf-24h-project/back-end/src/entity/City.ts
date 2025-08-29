// City.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Stadium } from "./Stadium";

@Entity()
export class City {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @OneToMany(() => Stadium, (stadium) => stadium.city)
  stadiums!: Stadium[];
}
