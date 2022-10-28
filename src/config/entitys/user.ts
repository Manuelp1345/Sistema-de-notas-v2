import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { BasicData } from "./basicData";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column({ type: "text" })
  contraseña!: string;

  @Column({ type: "text" })
  role!: string;

  @OneToOne(() => BasicData)
  @JoinColumn()
  datosBasicos!: BasicData;
}
