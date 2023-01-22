import { Periodo } from "./periodo";
import { Anio } from "./anios";
import { Alumno } from "./alumnos";
import { Nota } from "./nota";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => Nota, (nota) => nota.materia)
  nota!: Nota[];
}
