import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column({ type: "text" })
  nombre!: string;

  @Column({ type: "text" })
  apellido!: string;

  @Column({ type: "text" })
  correo!: string;

  @Column({ type: "text" })
  contraseña!: string;

  @Column({ type: "text" })
  role!: string;
}
