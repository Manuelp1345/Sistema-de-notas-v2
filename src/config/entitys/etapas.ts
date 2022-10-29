import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Alumno } from "./alumnos";
import { Anio } from "./anios";
import { Seccion } from "./secciones";

@Entity()
export class Etapas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(() => Alumno)
  @JoinColumn()
  alumno!: Alumno;

  @OneToOne(() => Anio)
  @JoinColumn()
  anio!: Anio;

  @OneToOne(() => Seccion)
  @JoinColumn()
  seccione!: Seccion;
}
