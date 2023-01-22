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

  @ManyToOne(() => Anio, (anio) => anio.anio)
  @JoinColumn()
  anio!: Anio;

  @ManyToOne(() => Materia, (materia) => materia.nota)
  @JoinColumn()
  materia!: Materia;

  @ManyToOne(() => Alumno, (alumno) => alumno.notas)
  alumno!: Alumno;

  @OneToMany(() => RecuperacionNota, (rp) => rp.nota)
  recuperacion!: RecuperacionNota[];
}
