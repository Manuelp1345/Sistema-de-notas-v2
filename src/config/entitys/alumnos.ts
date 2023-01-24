import { Periodo } from "./periodo";
import { Anio } from "./anios";

import { Seccion } from "./secciones";
import { BasicData } from "./basicData";
import { Nota } from "./nota";
import { Etapas } from "./etapas";
import { Representante } from "./representante";
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

@Entity()
export class Alumno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  observacion!: string;

  @Column()
  condicion!: string;

  @Column()
  grupoEstable!: string;

  @OneToMany(() => Nota, (notas) => notas.alumno)
  notas!: Nota[];

  @OneToOne(() => BasicData)
  @JoinColumn()
  DatosPersonales!: BasicData;

  @OneToMany(() => Etapas, (etapas) => etapas.alumno)
  Etapas!: Etapas[];

  @ManyToOne(() => Representante, (representante) => representante.alumno)
  representante!: Representante;
}
