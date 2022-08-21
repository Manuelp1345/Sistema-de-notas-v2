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

  @Column()
  momento!: string;

  @Column()
  nota!: number;

  @ManyToOne(() => Periodo)
  @JoinTable()
  periodo!: Periodo;

  @ManyToMany(() => Anio)
  @JoinTable()
  anios!: Anio[];

  @ManyToOne(() => Alumno)
  alumno!: Alumno;
}
