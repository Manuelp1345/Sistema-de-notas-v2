import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Seccion } from "./secciones";
import { Nota } from "./nota";
import { Alumno } from "./alumnos";

@Entity()
export class RecuperacionNota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  recuperacionNota!: string;

  @ManyToOne(() => Nota)
  @JoinColumn()
  nota!: Nota;
}
