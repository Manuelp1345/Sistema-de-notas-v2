import { Anio } from "./anios";
import {} from "./periodo";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  BaseEntity,
  ManyToOne,
} from "typeorm";

@Entity()
export class Seccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  seccion!: string;

  @ManyToOne(() => Anio, { cascade: true, orphanedRowAction: "delete" })
  @JoinTable()
  anio!: Anio;
}
