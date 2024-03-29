import { BasicData } from "./basicData";
import { Alumno } from "./alumnos";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
  TreeChildren,
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

  @OneToMany(() => Alumno, (alumno) => alumno.representante)
  alumno!: Alumno[];
}
