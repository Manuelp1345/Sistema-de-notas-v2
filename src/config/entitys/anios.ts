/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Periodo } from "./periodo";
import { Seccion } from "./secciones";
import { Etapas } from "./etapas";

@Entity()
export class Anio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  anio!: string;

  @OneToOne(() => Periodo, { onDelete: "CASCADE" })
  @JoinColumn()
  periodo!: Periodo;

  @OneToMany(() => Seccion, (sec) => sec.id)
  @JoinColumn()
  secciones!: Seccion[];
}
