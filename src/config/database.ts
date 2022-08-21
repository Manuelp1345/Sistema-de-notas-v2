import { app } from "electron";
import { DataSource } from "typeorm";
import { User } from "./entitys/user";
import fs from "fs";
import { Anio } from "./entitys/anios";
import { Periodo } from "./entitys/periodo";
import { Materia } from "./entitys/materias";
import { Seccion } from "./entitys/secciones";
import { Alumno } from "./entitys/alumnos";

const ruta = app.getPath("userData") + "/database.json";

const file = async () => {
  let file;

  try {
    file = await fs.readFileSync(ruta, "utf8");
  } catch (error) {
    await fs.writeFileSync(ruta, JSON.stringify({}));
    file = await fs.readFileSync(ruta, "utf8");
  }
  console.log(file);
  return file;
};

export const ConnectionDB = async (): Promise<DataSource> => {
  const credentialsDB = JSON.parse(await file());
  console.log("file:DATABASE credentials ", credentialsDB);

  const connection = new DataSource({
    type: "mysql",
    host: credentialsDB.host,
    port: credentialsDB.port,
    username: credentialsDB.user,
    password: credentialsDB.password,
    database: credentialsDB.database,
    entities: [User, Anio, Periodo, Materia, Seccion, Alumno],
    synchronize: true,
    logging: false,
  });

  if (!connection.isInitialized) {
    try {
      await connection.initialize();
    } catch (error) {
      console.log("dataBase Error", error);
    }
  }
  return connection;
};
