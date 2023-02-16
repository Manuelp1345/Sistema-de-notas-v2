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

  @Column({ type: "text", default: "" })
  firstName!: string;

  @Column({ type: "text", default: "" })
  secondName!: string;

  @Column({ type: "text", default: "" })
  Surname!: string;

  @Column({ type: "text", default: "" })
  secondSurname!: string;

  @Column({ type: "text", default: "" })
  email!: string;

  @Column({ type: "bigint", unique: true })
  dni!: string;

  @Column({ type: "text", default: "" })
  sexo!: string;

  @Column({ type: "bigint", default: 0 })
  Phone!: string;

  @Column({ type: "text", default: "" })
  address!: string;

  @Column({ type: "text", default: "" })
  municipality!: string;

  @Column({ type: "text", default: "" })
  state!: string;

  @Column({ type: "text", default: "" })
  city!: string;

  @Column({ type: "date", default: "1999/12/12" })
  DateOfBirth!: string;

  @OneToOne(() => Documents)
  @JoinColumn()
  Documents!: Documents;
}
