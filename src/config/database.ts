import { app } from "electron";
import { DataSource, createConnection } from "typeorm";
import { User } from "./entitys/user";
import fs from "fs";
import { Anio } from "./entitys/anios";
import { Periodo } from "./entitys/periodo";
import { Materia } from "./entitys/materias";
import { Seccion } from "./entitys/secciones";
import { Alumno } from "./entitys/alumnos";
import { CredentialDB } from "./types";
import { Documents } from "./entitys/documents";
import { BasicData } from "./entitys/basicData";
import { Representante } from "./entitys/representante";
import { Nota } from "./entitys/nota";
import { RecuperacionNota } from "./entitys/recuperacion_Nota";
import { Etapas } from "./entitys/etapas";
import { Bitacora } from "./entitys/bitacora";

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

export const ConnectionDB = async (
  credentials?: CredentialDB
): Promise<DataSource> => {
  const credentialsDB = credentials ? credentials : JSON.parse(await file());
  console.log("file:DATABASE credentials ", credentialsDB);

  const connection = await createConnection({
    type: "sqlite",
    database: credentials ? credentials.database : credentialsDB.database,
    entities: [
      User,
      Nota,
      Anio,
      Etapas,
      Alumno,
      Periodo,
      Materia,
      Seccion,
      BasicData,
      Documents,
      Representante,
      RecuperacionNota,
      Bitacora,
    ],
    synchronize: true,
    logging: true,
  });

  console.log("dataBase connection", connection);

  if (!connection.isInitialized) {
    try {
      await connection.initialize();
    } catch (error) {
      console.log("dataBase Error", error);
    }
  }
  return connection;
};
