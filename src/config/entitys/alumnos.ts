import { Periodo } from "./periodo";
import { Anio } from "./anios";

import { Seccion } from "./secciones";
import { BasicData } from "./basicData";
import { Representante } from "./representante";
import { Nota } from "./nota";
import { Etapas } from "./etapas";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => Nota, (notas) => notas.id)
  @JoinColumn()
  notas!: Nota[];

  @OneToOne(() => BasicData)
  @JoinColumn()
  DatosPersonales!: BasicData;

  @OneToMany(() => Etapas, (etapas) => etapas.id)
  @JoinColumn()
  Etapas!: Etapas[];
}
