import { Anio } from "./anios";
import {} from "./periodo";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Seccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  seccion!: string;

  @ManyToOne(() => Anio, { onDelete: "CASCADE" })
  @JoinColumn()
  anio!: Anio;
}
