import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Periodo } from "./periodo";

@Entity()
export class Anio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  anio!: string;

  @ManyToOne(() => Periodo, { cascade: true, orphanedRowAction: "delete" })
  @JoinTable()
  periodo!: Periodo;
}
