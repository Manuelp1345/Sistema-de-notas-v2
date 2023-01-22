import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Nota } from "./nota";

@Entity()
export class RecuperacionNota extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  Nota!: string;

  @ManyToOne(() => Nota, (nota) => nota.recuperacion)
  nota!: Nota;
}
