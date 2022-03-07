import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  correo!: string;

  @Column()
  contraseña!: string;

  @Column()
  role!: string;
}
/* 
module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
      unique: true,
    },
    nombre: {
      type: "varchar",
    },
    apellido: {
      type: "varchar",
    },
    correo: {
      type: "varchar",
      unique: true,
    },
    contraseña: {
      type: "varchar",
    },
    role: {
      type: "varchar",
    },
  },
}); */
