import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bitacora extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  accion!: string;

  @Column()
  descripcion!: string;

  @Column()
  fecha!: string;

  @Column()
  hora!: string;

  @Column()
  usuario!: string;
}
