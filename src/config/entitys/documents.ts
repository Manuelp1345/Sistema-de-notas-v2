import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { Alumno } from "./alumnos";

@Entity()
export class Documents extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column({ type: "text" })
  cedula!: string;

  @Column({ type: "text" })
  pasaporte!: string;

  @Column({ type: "text" })
  partida_nacimiento!: string;

  @Column({ type: "text" })
  fotos_carnet!: string;

  @Column({ type: "text" })
  notas_escuela!: string;
}
