import { OneK } from "@mui/icons-material";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Anio } from "./anios";

@Entity()
export class Periodo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true })
  periodo!: string;

  @Column()
  estado!: boolean;

  @OneToMany(() => Anio, (anio) => anio.periodo)
  anio!: Anio[];
}
