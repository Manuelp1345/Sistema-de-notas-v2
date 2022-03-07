import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Periodo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  periodo!: string;

  @Column()
  estado!: boolean;
}
