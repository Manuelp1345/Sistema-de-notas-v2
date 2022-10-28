import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Periodo } from "./periodo";
import { Seccion } from "./secciones";

@Entity()
export class Anio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  anio!: string;

  @OneToOne(() => Periodo, { cascade: true, orphanedRowAction: "delete" })
  @JoinColumn()
  periodo!: Periodo;

  @OneToMany(() => Seccion, (sec) => sec.id)
  @JoinColumn()
  secciones!: Seccion[];
}
