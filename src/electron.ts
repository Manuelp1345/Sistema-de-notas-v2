import { app, BrowserWindow, dialog, ipcMain, Notification } from "electron";
import electronIsDev from "electron-is-dev";
import { DataSource } from "typeorm";
import fs from "fs";
import * as path from "path";
import { ConnectionDB } from "./config/database";
import { User } from "./config/entitys/user";
import crypto from "crypto";
import { Periodo } from "./config/entitys/periodo";
import { Anio } from "./config/entitys/anios";
import "reflect-metadata";
import { Seccion } from "./config/entitys/secciones";
import { Materia } from "./config/entitys/materias";
import { Alumno } from "./config/entitys/alumnos";
import { CredentialDB } from "./config/types";
import { BasicData } from "./config/entitys/basicData";
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 720,
    minWidth: 1024,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  // and load the index.html of the app.
  if (electronIsDev) {
    win.loadURL("http://localhost:3000/");
    win.webContents.openDevTools();
  } else {
    win.loadFile("build/index.html");
  }
  win.on("close", async (e) => {
    e.preventDefault();

    const { response } = await dialog.showMessageBox(win, {
      type: "question",
      title: "  Confirmar  ",
      message: "¿Desea salir de la aplicacion?",
      buttons: ["Yes", "No"],
    });

    response || win.destroy();
  });
  win.menuBarVisible = false;
  win.setTitle("Sistema de notas");
  win.maximize();
  console.log(app.getPath("userData"));

  // Open the DevTools.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle("VALIDATE_CREDENTIALS", async () => {
  try {
    const connect = await ConnectionDB();

    console.log(
      "File:electron.ts VALIDATE_CREDENTIALS connect",
      connect.isInitialized
    );
    if (connect.isInitialized) {
      return true;
    }
  } catch (error) {
    return false;
  }
});

ipcMain.handle("CREATE_CREDENTIALS_DB", async (event, credentials) => {
  try {
    credentials.database = "database";
    const connect = await ConnectionDB(credentials);

    console.log(
      "File:electron.ts create credentials connect",
      connect.isInitialized
    );
    if (connect.isInitialized) {
      await connect.query("CREATE DATABASE IF NOT EXISTS db_notas ");
      const credentialsDB: CredentialDB = {
        host: credentials.host,
        user: credentials.user,
        password: credentials.pass,
        port: credentials.port,
        database: "db_notas",
      };

      try {
        const ruta = app.getPath("userData");
        await fs.writeFile(
          ruta + "/database.json",
          JSON.stringify(credentialsDB),
          (err: any) => {
            if (err) throw err;
            console.log("The file has been saved!");
          }
        );
        const connectDB = connect.createQueryRunner();
        await connectDB.release();
      } catch (error) {
        return false;
      }
    }

    try {
      const connectTwo = new DataSource({
        type: "mysql",
        host: credentials.host,
        port: credentials.port,
        username: credentials.user,
        password: credentials.pass,
        database: "db_notas",
        entities: [User, Anio, Periodo, Materia, Seccion, Alumno],
        synchronize: true,
        logging: false,
      });
      await connectTwo.initialize();
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
});

ipcMain.handle("CREATE_USER_DB", async (event, user) => {
  console.log("File:electron.ts CREATE_USER_DB", user);
  //@ts-ignore
  const dataBasic = new BasicData();
  dataBasic.firstName = user.nombre;
  dataBasic.Surname = user.apellido;
  dataBasic.email = user.email;
  let dataBasicId;
  try {
    dataBasicId = await dataBasic.save();
  } catch (error) {
    console.log(error);
  }

  const userDB = new User();
  userDB.datosBasicos = dataBasicId;
  userDB.contraseña = crypto
    //@ts-ignore
    .createHash("sha256")
    .update(user.password)
    .digest("hex");
  userDB.role = user.role;

  try {
    await userDB.save();
    //@ts-ignore
    new Notification({
      title: "Notificacion",
      body: "Usuario creado correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();

    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore
    new Notification({
      title: "Error",
      body: "No se pudo crear el usuario",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});

ipcMain.handle("LOGIN", async (event, user) => {
  console.log(user);
  const userJson = await User.findOne({
    where: {
      datosBasicos: {
        email: user.email,
      },
    },
  });

  console.log(userJson);
  if (userJson) {
    if (
      userJson.contraseña ===
      //@ts-ignore
      crypto.createHash("sha256").update(user.password).digest("hex")
    ) {
      return true;
    }
  }
  //@ts-ignore

  new Notification({
    title: "Error",
    body: "Usuario o contraseña incorrectos",
    icon: path.join(__dirname, "./img/logo.png"),
    //@ts-ignore
  }).show();
  return false;
});

ipcMain.handle("GET_PERIODO", async (e, { pageIndex = 1, pageSize = 0 }) => {
  const connect = await ConnectionDB();
  let periodoDB;
  const skip = pageIndex === 1 ? 0 : Math.abs(pageSize * (1 - pageIndex));
  try {
    periodoDB = await connect.getRepository("periodo");
  } catch (error) {
    console.log(error);

    //@ts-ignore
    throw new Error(error);
  }

  let periodoJson;
  try {
    periodoJson = await periodoDB.findAndCount({
      order: {
        id: "DESC",
      },
      skip: skip,
      take: 3,
    });
  } catch (error) {
    console.log(error);
  }

  return periodoJson;
});

ipcMain.handle("INSER_PERIODO", async (event, periodo) => {
  const periodoJson = await Periodo.findOne({
    where: {
      estado: true,
    },
  });
  if (periodoJson) {
    console.log(periodoJson);
    periodoJson.estado = false;
    console.log(periodoJson);

    try {
      await Periodo.save(periodoJson);
    } catch (error) {
      console.log(error);
    }
  }
  try {
    console.log("first");
    await Periodo.save(periodo);
    //@ts-ignore
    new Notification({
      title: "Notificacion",
      body: "Periodo creado correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Error",
      body: "No se pudo crear el periodo",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});

ipcMain.handle("GET_AÑOS", async (eve, id) => {
  let años;
  console.log(id);
  try {
    años = await Anio.find({
      relations: ["periodo"],
      where: {
        periodo: {
          id: id,
        },
      },
    });
    console.log(años);
    return años;
  } catch (error) {
    console.log("2", error);
  }
});

ipcMain.handle("GET_AÑO", async (eve, id) => {
  let año;
  console.log("Periodo ID", id);
  try {
    año = await Anio.findOne({
      where: {
        id: id,
      },
    });
    console.log(año);
    return año;
  } catch (error) {
    console.log("2", error);
  }
});
ipcMain.handle("DELETE_AÑO", async (eve, id) => {
  let año;
  try {
    año = await Anio.findOne({
      where: {
        id: id,
      },
    });
    console.log(año);
  } catch (error) {
    console.log("2", error);
    return "error";
  }
  try {
    await Anio.delete(año);
  } catch (error) {
    console.log("2", error);
    return "error";
  }
});

ipcMain.handle("INSERT_AÑOS", async (event, anioFron) => {
  const periodo = await Periodo.findOne({
    where: {
      estado: true,
    },
  });
  const anio = new Anio();
  anio.anio = anioFron.anio;
  anio.periodo = periodo as Periodo;

  try {
    await anio.save();
    //@ts-ignore
    new Notification({
      title: "Notificacion",
      body: "Año creado correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Error",
      body: "No se pudo crear el año",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});

ipcMain.handle("GET_SECCIONES", async (evet, id) => {
  console.log("get Secciones", id);
  let secciones;
  try {
    secciones = await Seccion.find({
      relations: ["anio"],
      where: {
        anio: {
          id: id,
        },
      },
    });
    console.log(secciones);
    return secciones;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("GET_SECCION", async (evet, filter) => {
  let seccion;
  try {
    seccion = await Seccion.findOne({
      relations: ["anio"],
      where: {
        id: filter,
      },
    });
    return seccion;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("INSERT_SECCION", async (event, seccion) => {
  console.log(seccion);
  const anio = await Anio.findOne({
    where: {
      id: seccion.anio,
    },
  });

  console.log("insert seccion", anio);
  const seccionDB = new Seccion();
  seccionDB.seccion = seccion.seccion;
  seccionDB.anio = anio as Anio;
  try {
    await seccionDB.save();
    //@ts-ignore
    new Notification({
      title: "Notificacion",
      body: "Seccion creada correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Error",
      body: "No se pudo crear la seccion",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});
