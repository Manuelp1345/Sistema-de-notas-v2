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
} from "typeorm";
import { Periodo } from "./periodo";
import { Seccion } from "./secciones";

@Entity()
export class Anio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  anio!: string;

  @ManyToOne(() => Periodo, { onDelete: "CASCADE" })
  @JoinColumn()
  periodo!: Periodo;

  @ManyToMany(() => Seccion, (sec) => sec.id)
  @JoinColumn()
  secciones!: Seccion[];
}
