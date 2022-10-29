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

  @Column({ type: "boolean" })
  cedula!: boolean;

  @Column({ type: "boolean" })
  pasaporte!: boolean;

  @Column({ type: "boolean" })
  partida_nacimiento!: boolean;

  @Column({ type: "boolean" })
  fotos_carnet!: boolean;

  @Column({ type: "boolean" })
  notas_escuela!: boolean;
}
