import { Anio } from "./anios";
import {} from "./periodo";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

@Entity()
@Index(["seccion", "anio"], { unique: true })
export class Seccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  seccion!: string;

  @ManyToOne(() => Anio, (anio) => anio.secciones, { onDelete: "CASCADE" })
  @JoinColumn()
  anio!: Anio;
}
