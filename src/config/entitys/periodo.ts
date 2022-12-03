import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Periodo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true })
  periodo!: string;

  @Column()
  estado!: boolean;
}
