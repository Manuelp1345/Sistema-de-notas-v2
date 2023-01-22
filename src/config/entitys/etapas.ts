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

  @ManyToOne(() => Alumno, (alumno) => alumno.Etapas, {
    nullable: false,
  })
  alumno!: Alumno;

  @ManyToOne(() => Anio, (anio) => anio.anio)
  @JoinColumn()
  anio!: Anio;

  @ManyToOne(() => Seccion, (seccion) => seccion.seccion)
  @JoinColumn()
  seccione!: Seccion;
}
