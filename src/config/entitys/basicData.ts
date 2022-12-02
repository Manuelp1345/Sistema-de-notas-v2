import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Alumno } from "./alumnos";
import { Documents } from "./documents";

@Entity()
export class BasicData extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  secondName!: string;

  @Column({ type: "text" })
  Surname!: string;

  @Column({ type: "text" })
  secondSurname!: string;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "bigint", unique: true })
  dni!: string;

  @Column({ type: "text" })
  sexo!: string;

  @Column({ type: "bigint" })
  Phone!: string;

  @Column({ type: "text" })
  address!: string;

  @Column({ type: "text" })
  municipality!: string;

  @Column({ type: "text" })
  state!: string;

  @Column({ type: "text" })
  city!: string;

  @Column({ type: "date" })
  DateOfBirth!: string;

  @OneToOne(() => Documents)
  @JoinColumn()
  Documents!: Documents;
}
