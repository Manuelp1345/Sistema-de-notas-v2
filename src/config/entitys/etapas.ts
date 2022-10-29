import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Alumno } from "./alumnos";
import { Anio } from "./anios";
import { Seccion } from "./secciones";

@Entity()
export class Etapas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Alumno)
  @JoinColumn()
  alumno!: Alumno;

  @ManyToOne(() => Anio)
  @JoinColumn()
  anio!: Anio;

  @ManyToOne(() => Seccion)
  @JoinColumn()
  seccione!: Seccion;
}
