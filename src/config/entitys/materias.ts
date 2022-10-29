import { Periodo } from "./periodo";
import { Anio } from "./anios";
import { Alumno } from "./alumnos";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
  ManyToMany,
} from "typeorm";

@Entity()
export class Materia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nombre!: string;

  @ManyToOne(() => Anio)
  @JoinTable()
  anio!: Anio;
}
