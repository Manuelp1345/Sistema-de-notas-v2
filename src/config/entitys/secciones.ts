import { Anio } from "./anios";
import { Periodo } from "./periodo";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
  ManyToMany,
} from "typeorm";

@Entity()
export class Seccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  seccion!: string;

  @ManyToOne(() => Periodo)
  @JoinTable()
  periodo!: Periodo;

  @ManyToMany(() => Anio)
  @JoinTable()
  anios!: Anio[];
}
