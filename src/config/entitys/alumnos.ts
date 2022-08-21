import { Periodo } from "./periodo";
import { Anio } from "./anios";
import { Materia } from "./materias";
import { Seccion } from "./secciones";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity()
export class Alumno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  matricula!: string;

  @OneToOne(() => Periodo)
  @JoinTable()
  periodo!: Periodo;

  @OneToOne(() => Anio)
  @JoinTable()
  anios!: Anio[];

  @OneToMany(() => Materia, (materia) => materia.alumno)
  @JoinTable()
  materias!: Materia[];

  @OneToOne(() => Seccion)
  @JoinTable()
  seccion!: Seccion;
}
