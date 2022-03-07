import { app } from "electron";
import { Connection, createConnection } from "typeorm";
import { User } from "./entitys/user";
import fs from "fs";
import { Anio } from "./entitys/anios";
import { Periodo } from "./entitys/periodo";

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

export const ConnectionDB = async (): Promise<Connection> => {
  const credentialsDB = JSON.parse(await file());
  console.log("credentials", credentialsDB);

  const connection = await createConnection({
    type: "mysql",
    host: credentialsDB.host,
    port: credentialsDB.port,
    username: credentialsDB.user,
    password: credentialsDB.password,
    database: credentialsDB.database,
    entities: [User, Anio, Periodo],
    synchronize: true,
  });

  return connection;
};
