/* eslint-disable @typescript-eslint/no-unused-vars */
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
  clave!: string;

  @Column({ type: "text" })
  role!: string;

  @OneToOne(() => BasicData)
  @JoinColumn()
  datosBasicos!: BasicData;
}
