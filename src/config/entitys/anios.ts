/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Periodo } from "./periodo";
import { Seccion } from "./secciones";

@Entity()
export class Anio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  anio!: string;

  @Column()
  numberAnio!: number;

  @ManyToOne(() => Periodo, (periodo) => periodo.anio, { onDelete: "RESTRICT" })
  @JoinColumn()
  periodo!: Periodo;

  @OneToMany(() => Seccion, (sec) => sec.anio)
  secciones!: Seccion[];
}
