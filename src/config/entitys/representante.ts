import { Periodo } from "./periodo";
import { Anio } from "./anios";

import { Seccion } from "./secciones";
import { BasicData } from "./basicData";
import { Alumno } from "./alumnos";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Representante extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  parentesco!: string;

  @OneToOne(() => BasicData)
  @JoinColumn()
  DatosPersonales!: BasicData;

  @OneToOne(() => Alumno)
  @JoinColumn()
  Alumno!: Alumno;
}
