import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
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

  @OneToOne(() => Nota)
  @JoinColumn()
  nota!: Nota;
}
