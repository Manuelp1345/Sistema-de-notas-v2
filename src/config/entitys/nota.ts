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
import { Alumno } from "./alumnos";
import { Anio } from "./anios";
import { RecuperacionNota } from "./recuperacion_Nota";
import { Materia } from "./materias";

@Entity()
export class Nota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nota!: string;

  @Column()
  momento!: string;

  @ManyToOne(() => Anio)
  @JoinColumn()
  anio!: Anio;

  @ManyToOne(() => Materia)
  @JoinColumn()
  materia!: Materia;

  @ManyToOne(() => Alumno)
  @JoinColumn()
  alumno!: Alumno;

  @OneToMany(() => RecuperacionNota, (rp) => rp.id)
  @JoinColumn()
  recuperacion!: RecuperacionNota[];
}
