import { app, BrowserWindow, dialog, ipcMain, Notification } from "electron";
import electronIsDev from "electron-is-dev";
import { createConnection, DataSource } from "typeorm";
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
import { Nota } from "./config/entitys/nota";
import { Documents } from "./config/entitys/documents";
import { RecuperacionNota } from "./config/entitys/recuperacion_Nota";
import { Etapas } from "./config/entitys/etapas";
import { Representante } from "./config/entitys/representante";
import Excel, { Worksheet } from "exceljs";
import moment from "moment";
import { Bitacora } from "./config/entitys/bitacora";
// import { faker } from "@faker-js/faker";

let appDataSource: DataSource;
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
      appDataSource = connect;
      return true;
    }
  } catch (error) {
    return false;
  }
});

ipcMain.handle("CREATE_CREDENTIALS_DB", async (event, credentials) => {
  try {
    const connect = await ConnectionDB({
      database: `${app.getPath("userData")}/db_notas.sqlite`,
    });

    console.log(
      "File:electron.ts create credentials connect",
      connect.isInitialized
    );
    if (connect.isInitialized) {
      appDataSource = connect;

      // await connect.query("CREATE DATABASE IF NOT EXISTS db_notas ");
      const credentialsDB: CredentialDB = {
        database: `${app.getPath("userData")}/db_notas.sqlite`,
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

        return true;
      } catch (error) {
        return false;
      }
    }

    // try {
    //   const connectTwo = await createConnection({
    //     type: "sqlite",
    //     database: `${app.getPath("userData")}/db_notas.sqlite`,
    //     entities: [
    //       User,
    //       Nota,
    //       Anio,
    //       Etapas,
    //       Alumno,
    //       Periodo,
    //       Materia,
    //       Seccion,
    //       BasicData,
    //       Documents,
    //       Representante,
    //       RecuperacionNota,
    //     ],
    //     synchronize: true,
    //     logging: false,
    //   });
    //   await connectTwo.initialize();
    //   console.log(connectTwo.isInitialized);
    //   appDataSource = connectTwo;
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }

    return true;
  } catch (error) {
    return false;
  }
});

ipcMain.handle("CREATE_USER_DB", async (event, user) => {
  const existUser = await User.findOne({
    where: {
      datosBasicos: {
        email: user.email,
      },
    },
  });
  if (existUser) {
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "El usuario ya existe",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();

    return false;
  }

  console.log("File:electron.ts CREATE_USER_DB", user);
  //@ts-ignore
  const dataBasic = new BasicData();
  dataBasic.firstName = user.nombre;
  dataBasic.Surname = user.apellido;
  dataBasic.email = user.email;
  //ranmdom dni
  dataBasic.dni = String(Math.floor(Math.random() * 1000000000));
  let dataBasicId;
  try {
    dataBasicId = await dataBasic.save();
  } catch (error) {
    console.log(error);
  }

  const userDB = new User();
  userDB.datosBasicos = dataBasicId;
  userDB.clave = crypto
    //@ts-ignore
    .createHash("sha256")
    .update(user.password)
    .digest("hex");
  userDB.role = user.role;
  let userId;
  try {
    userId = await userDB.save();
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Usuario creado correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();

    return userId;
  } catch (error) {
    console.log(error);
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
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

  if (userJson) {
    if (
      userJson.clave ===
      //@ts-ignore
      crypto.createHash("sha256").update(user.password).digest("hex")
    ) {
      //register login on bitacora
      const bitacora = new Bitacora();
      bitacora.accion = "Inicio de sesion";
      bitacora.fecha = moment().format("YYYY-MM-DD");
      bitacora.hora = moment().format("HH:mm:ss");
      bitacora.descripcion = "Inicio de sesion exitoso";
      bitacora.usuario = user.email;

      return {
        id: userJson.id,
        role: userJson.role,
        email: user.email,
      };
    }
  }

  //@ts-ignore

  new Notification({
    title: "Sistema De Notas",
    body: "Usuario o contraseña incorrectos",
    icon: path.join(__dirname, "./img/logo.png"),
    //@ts-ignore
  }).show();
  return false;
});

ipcMain.handle("GET_PERIODO", async (e, { pageIndex = 1, pageSize = 0 }) => {
  let periodoDB;
  const skip = pageIndex === 1 ? 0 : Math.abs(pageSize * (1 - pageIndex));
  try {
    periodoDB = await appDataSource.getRepository("periodo");
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
      title: "Sistema De Notas",
      body: "Periodo creado correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Sistema De Notas",
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
  anio.numberAnio = anioFron.numberAnio;
  anio.periodo = periodo as Periodo;

  try {
    await anio.save();
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Año creado correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Sistema De Notas",
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

  const existSeccion = await Seccion.findOne({
    where: {
      seccion: seccion.seccion,
      anio: {
        id: seccion.anio,
      },
    },
  });
  if (existSeccion) {
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "La seccion ya existe",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }

  console.log("insert seccion", anio);
  const seccionDB = new Seccion();
  seccionDB.seccion = seccion.seccion;
  seccionDB.anio = anio as Anio;
  try {
    await seccionDB.save();
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Seccion creada correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Sistema De Notas",
      body: "No se pudo crear la seccion",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});

ipcMain.handle("GET_AREAS", async (evet, id) => {
  console.log("get Areas", id);
  let areas;
  try {
    areas = await Materia.find({
      relations: ["anio"],
      where: {
        anio: {
          id: id,
        },
      },
    });
    console.log(areas);
    return areas;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("INSERT_AREA", async (event, area) => {
  console.log(area);
  const anio = await Anio.findOne({
    where: {
      id: area.anio,
    },
  });

  console.log("insert area", anio);
  const materiaDB = new Materia();
  materiaDB.nombre = area.area;
  materiaDB.anio = anio as Anio;
  try {
    await materiaDB.save();
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Área creada correctamente",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore

    new Notification({
      title: "Sistema De Notas",
      body: "No se pudo crear la Área",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});

ipcMain.handle("INSERT_ALUMNO", async (event, data) => {
  try {
    return await appDataSource.transaction(async (manager) => {
      const seccion = await manager.getRepository(Seccion).findOne({
        relations: ["anio"],
        where: {
          id: data.seccion,
        },
      });
      let basicDataId;

      //insert or update representante
      let existRepresentanteDB = await manager
        .getRepository(Representante)
        .findOne({
          where: {
            DatosPersonales: {
              dni: data.representante.dni,
            },
          },
          relations: {
            DatosPersonales: true,
          },
        });

      if (existRepresentanteDB) {
        try {
          await manager.getRepository(BasicData).update(
            { id: existRepresentanteDB.DatosPersonales.id },
            {
              dni: data.representante.dni,
              firstName: data.representante.firstName,
              secondName: data.representante.secondName,
              Surname: data.representante.surname,
              secondSurname: data.representante.secondSurname,
              email: data.representante.email,
              Phone: data.representante.phone,
              address: data.representante.address,
              state: data.representante.state,
              municipality: data.representante.municipality,
            }
          );
        } catch (error) {
          console.log(error);
          throw new Error("No se pudo registrar el alumno");
        }
      } else {
        const basicDataTwoDB = manager.getRepository(BasicData).create();
        basicDataTwoDB.firstName = data.representante.firstName;
        basicDataTwoDB.secondName = data.representante.secondName;
        basicDataTwoDB.Surname = data.representante.surname;
        basicDataTwoDB.secondSurname = data.representante.secondSurname;
        basicDataTwoDB.email = data.representante.email;
        basicDataTwoDB.dni = data.representante.dni;
        basicDataTwoDB.Phone = data.representante.phone;
        basicDataTwoDB.address = data.representante.address;
        basicDataTwoDB.state = data.representante.state;
        basicDataTwoDB.municipality = data.representante.municipality;

        try {
          basicDataId = await manager
            .getRepository(BasicData)
            .save(basicDataTwoDB);
          //@ts-ignore
        } catch (error) {
          console.log(error);
          throw new Error("No se pudo registrar el alumno");
        }

        const representanteDB = manager.getRepository(Representante).create();
        representanteDB.DatosPersonales = basicDataId;
        representanteDB.parentesco = data.representante.filiacion;

        try {
          existRepresentanteDB = await manager
            .getRepository(Representante)
            .save(representanteDB);
        } catch (error) {
          console.log(error);

          throw new Error("No se pudo registrar el alumno");
        }
      }

      console.log("representante", data.representante);

      const documentsDB = manager.getRepository(Documents).create();
      documentsDB.cedula = Boolean(data.alumno.cedula);
      documentsDB.pasaporte = Boolean(data.alumno.pasaporte);
      documentsDB.partida_nacimiento = Boolean(data.alumno.partidaDeNacimiento);
      documentsDB.fotos_carnet = Boolean(data.alumno.fotos);
      documentsDB.notas_escuela = Boolean(data.alumno.notasEscolares);

      let documentsId;
      try {
        documentsId = await manager.getRepository(Documents).save(documentsDB);
        //@ts-ignore
      } catch (error) {
        console.log(error);
        throw new Error("No se pudo registrar el alumno");
      }

      console.log("insert area", seccion);
      const basicDataDB = manager.getRepository(BasicData).create();
      basicDataDB.firstName = data.alumno.firsName;
      basicDataDB.secondName = data.alumno.SecondName;
      basicDataDB.Surname = data.alumno.surname;
      basicDataDB.secondSurname = data.alumno.secondSurname;
      basicDataDB.email = data.alumno.email;
      basicDataDB.sexo = data.alumno.sexo;
      basicDataDB.dni = data.alumno.dni;
      basicDataDB.Phone = data.alumno.phone;
      basicDataDB.address = data.alumno.address;
      basicDataDB.state = data.alumno.state;
      basicDataDB.municipality = data.alumno.municipality;
      basicDataDB.DateOfBirth = data.alumno.fechaNacimiento;
      basicDataDB.Documents = documentsId;

      try {
        basicDataId = await manager.getRepository(BasicData).save(basicDataDB);
        //@ts-ignore
      } catch (error) {
        console.log(error);
        throw new Error("No se pudo registrar el alumno");
      }

      const alumnoDB = manager.getRepository(Alumno).create();
      alumnoDB.observacion = data.alumno.observacion;
      alumnoDB.condicion = data.alumno.condicion;
      alumnoDB.grupoEstable = data.alumno.grupoEstable;
      alumnoDB.DatosPersonales = basicDataId;
      alumnoDB.representante = existRepresentanteDB;

      try {
        await manager.getRepository(Alumno).save(alumnoDB);
        //@ts-ignore
      } catch (error) {
        console.log(error);
        throw new Error("No se pudo registrar el alumno");
      }

      const etapasDB = manager.getRepository(Etapas).create();
      etapasDB.alumno = alumnoDB;
      etapasDB.anio = seccion?.anio as Anio;
      etapasDB.seccione = seccion as Seccion;

      try {
        await manager.getRepository(Etapas).save(etapasDB);
        //@ts-ignore
        new Notification({
          title: "Sistema De Notas",
          body: "Alumno Registrado",
          icon: path.join(__dirname, "./img/logo.png"),
          //@ts-ignore
        }).show();
        return true;
      } catch (error) {
        console.log(error);

        throw new Error("No se pudo registrar el alumno");
      }
    });
  } catch (error) {
    console.log(error);
    new Notification({
      title: "Sistema De Notas",
      body: "No se pudo registrar el alumno",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    throw new Error("No se pudo registrar el alumno");
  }
});

ipcMain.handle("GET_ALUMNOS", async (evet, id) => {
  console.log("get Alumnos", id);

  let Alumnos;
  try {
    Alumnos = await Etapas.find({
      relations: {
        alumno: {
          DatosPersonales: {
            Documents: true,
          },
          representante: {
            DatosPersonales: true,
          },
        },
        anio: {
          periodo: true,
        },
        seccione: true,
      },
      where: {
        seccione: {
          id: id,
        },
      },
    });
    console.log(Alumnos);
    return Alumnos;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("SET_NOTA", async (evet, data) => {
  console.log("set nota", data);
  let notaDB = await Nota.findOne({
    relations: ["recuperacion"],
    where: {
      materia: {
        id: data.id,
      },
      alumno: {
        id: data.alumnoId,
      },
      anio: {
        id: data.anio.id,
      },
      momento: data.momento,
    },
  });

  if (data.rp && notaDB?.recuperacion) {
    let notaRP;
    if (notaDB.recuperacion.length > 0) {
      notaRP = await RecuperacionNota.findOne({
        where: {
          id: notaDB.recuperacion[0].id,
        },
      });
      notaRP.Nota = data.nota;
    } else {
      notaRP = new RecuperacionNota();
      notaRP.nota = notaDB;
      notaRP.Nota = data.nota;
    }
    try {
      await notaRP.save();
      //@ts-ignore
      new Notification({
        title: "Sistema De Notas",
        body: "Nota Registrada",
        icon: path.join(__dirname, "./img/logo.png"),
        //@ts-ignore
      }).show();
      return true;
    } catch (error) {
      console.log(error);
      //@ts-ignore
      new Notification({
        title: "Sistema De Notas",
        body: "No se pudo registrar la nota",
        icon: path.join(__dirname, "./img/logo.png"),
        //@ts-ignore
      }).show();
      return false;
    }
  } else if (notaDB === null) notaDB = new Nota();
  notaDB.nota = data.nota;
  notaDB.momento = data.momento;
  notaDB.materia = data.id;
  notaDB.alumno = data.alumnoId;
  notaDB.anio = data.anio;

  try {
    await notaDB.save();
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Nota Registrada",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return true;
  } catch (error) {
    console.log(error);
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "No se pudo registrar la nota",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    return false;
  }
});

ipcMain.handle("GET_NOTAS", async (evet, data) => {
  console.log("get notas", data);
  let notas;
  try {
    notas = await Nota.find({
      where: {
        alumno: {
          id: data.alumnoId,
        },
        anio: {
          id: data.anio,
        },
      },
      relations: ["materia", "recuperacion"],
    });
    console.log(notas);
    return notas;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("GRADE_ALUMNOS", async (event, data) => {
  try {
    return await appDataSource.transaction(async (transaction) => {
      const oldPeriodo = await transaction.getRepository(Periodo).findOne({
        where: {
          id: data.periodo,
        },
      });

      if (!oldPeriodo) throw new Error("No se encontro el periodo");

      oldPeriodo.estado = false;
      await transaction.getRepository(Periodo).save(oldPeriodo);
      const newPeriodo = await transaction.getRepository(Periodo).create({
        estado: true,
        periodo: data.newPeriodo,
      });
      await transaction.getRepository(Periodo).save(newPeriodo);

      const oldAnios = await transaction.getRepository(Anio).find({
        where: {
          periodo: {
            id: data.periodo,
          },
        },
        relations: {
          secciones: true,
        },
      });

      for (const anio of oldAnios) {
        const newAnio = await transaction.getRepository(Anio).create({
          anio: anio.anio,
          periodo: newPeriodo,
          numberAnio: anio.numberAnio,
        });
        await transaction.getRepository(Anio).save(newAnio);

        for (const seccion of anio.secciones) {
          const newSeccion = await transaction.getRepository(Seccion).create({
            seccion: seccion.seccion,
            anio: newAnio,
          });
          await transaction.getRepository(Seccion).save(newSeccion);
        }
      }

      const newAnios = await transaction.getRepository(Anio).find({
        where: {
          periodo: {
            id: newPeriodo.id,
          },
        },
        relations: {
          secciones: true,
        },
      });

      const materias = await transaction.getRepository(Materia).find({
        where: {
          anio: {
            periodo: {
              id: data.periodo,
            },
          },
        },
      });

      const alumnos = await transaction.getRepository(Alumno).find({
        where: {
          id: "1",
          Etapas: {
            anio: {
              periodo: {
                id: data.periodo,
              },
            },
          },
        },
        relations: {
          notas: {
            materia: true,
            recuperacion: true,
          },
          Etapas: {
            anio: {
              periodo: true,
            },
            seccione: true,
          },
        },
        order: {
          Etapas: {
            anio: {
              numberAnio: "DESC",
            },
          },
        },
      });

      for (const alumno of alumnos) {
        if (alumno.condicion === "Graduado" || alumno.condicion === "Retirado")
          continue;

        let promedio = 0;
        let recuperacionCount = 0;
        let materiaCount = 0;

        const estapaReprobada = await transaction
          .getRepository(Etapas)
          .findOne({
            where: {
              alumno: {
                id: alumno.id,
              },
              estado: "Reprobado",
            },
            relations: {
              anio: true,
            },
          });
        console.log(
          "estapaReprobada",
          estapaReprobada && estapaReprobada.anio.id
        );
        if (estapaReprobada) {
          const notasAlumno = await transaction.getRepository(Nota).find({
            where: {
              alumno: {
                id: alumno.id,
              },
              anio: {
                id: estapaReprobada.anio.id,
              },
            },
            relations: ["materia"],
          });
          for (const notas of notasAlumno) {
            let notaCount = 0;
            let promedioMateria = 0;
            const notaMomentoOne = alumno.notas.find(
              (nota) =>
                nota.materia.id === notas.materia.id && nota.momento === "1"
            );
            if (notaMomentoOne) {
              if (notaMomentoOne.recuperacion.length > 0) {
                promedioMateria += Number(notaMomentoOne.recuperacion[0].Nota);
              } else {
                promedioMateria += Number(notaMomentoOne.nota);
              }
              notaCount++;
            }
            const notaMomentoTwo = alumno.notas.find(
              (nota) =>
                nota.materia.id === notas.materia.id && nota.momento === "2"
            );
            if (notaMomentoTwo) {
              if (notaMomentoTwo.recuperacion.length > 0) {
                promedioMateria += Number(notaMomentoTwo.recuperacion[0].Nota);
              } else {
                promedioMateria += Number(notaMomentoTwo.nota);
              }
              notaCount++;
            }

            const notaMomentoThree = alumno.notas.find(
              (nota) =>
                nota.materia.id === notas.materia.id && nota.momento === "3"
            );
            if (notaMomentoThree) {
              if (notaMomentoThree.recuperacion.length > 0) {
                promedioMateria += Number(
                  notaMomentoThree.recuperacion[0].Nota
                );
              } else {
                promedioMateria += Number(notaMomentoThree.nota);
              }
              notaCount++;
            }
            const promedioFInal = promedioMateria / notaCount;

            if (promedioFInal < 10) recuperacionCount++;
          }
        }

        if (recuperacionCount === 0) {
          await transaction.getRepository(Etapas).update(
            { id: estapaReprobada?.id },
            {
              estado: "Aprobado",
            }
          );
        }

        for (const materia of materias) {
          let notaCount = 0;
          let promedioMateria = 0;

          const curseMateria = alumno.notas.find(
            (nota) => nota.materia.id === materia.id
          );

          if (!curseMateria) continue;
          materiaCount++;
          const notaMomentoOne = alumno.notas.find(
            (nota) => nota.materia.id === materia.id && nota.momento === "1"
          );
          if (notaMomentoOne) {
            if (notaMomentoOne.recuperacion.length > 0) {
              promedioMateria += Number(notaMomentoOne.recuperacion[0].Nota);
            } else {
              promedioMateria += Number(notaMomentoOne.nota);
            }
            notaCount++;
          }
          const notaMomentoTwo = alumno.notas.find(
            (nota) => nota.materia.id === materia.id && nota.momento === "2"
          );
          if (notaMomentoTwo) {
            if (notaMomentoTwo.recuperacion.length > 0) {
              promedioMateria += Number(notaMomentoTwo.recuperacion[0].Nota);
            } else {
              promedioMateria += Number(notaMomentoTwo.nota);
            }
            notaCount++;
          }

          const notaMomentoThree = alumno.notas.find(
            (nota) => nota.materia.id === materia.id && nota.momento === "3"
          );
          if (notaMomentoThree) {
            if (notaMomentoThree.recuperacion.length > 0) {
              promedioMateria += Number(notaMomentoThree.recuperacion[0].Nota);
            } else {
              promedioMateria += Number(notaMomentoThree.nota);
            }
            notaCount++;
          }
          const promedioFInal = promedioMateria / notaCount;

          console.log("promedio Materia", promedioFInal);

          promedio += promedioFInal;

          if (promedioFInal < 10) recuperacionCount++;
        }
        console.log("Promedio general", promedio);
        promedio = promedio / materiaCount;

        const notaFinal = promedio;
        console.log("nota final", notaFinal);
        const oldAnioAlumno = alumno.Etapas.find(
          (etapa) => etapa.anio.periodo.id === data.periodo
        );
        // @ts-ignore
        delete alumno.Etapas;
        if (!oldAnioAlumno)
          throw new Error("No se encontro el anio del alumno");

        let newAnioAlumno;

        if (notaFinal >= 10 && recuperacionCount <= 2) {
          alumno.condicion = "Regular";
          await transaction.getRepository(Alumno).save(alumno);
          const newAnio = oldAnioAlumno.anio.numberAnio + 1;
          newAnioAlumno = newAnios.find((anio) => anio.numberAnio === newAnio);
        } else {
          alumno.condicion = "Repitiente";
          if (oldAnioAlumno) {
            await transaction.getRepository(Etapas).update(
              { id: oldAnioAlumno.id },
              {
                estado: "Reprobado",
              }
            );
          }
          await transaction.getRepository(Alumno).save(alumno);
          newAnioAlumno = newAnios.find(
            (anio) => anio.numberAnio === oldAnioAlumno.anio.numberAnio
          );
        }

        if (!newAnioAlumno) {
          alumno.condicion = "Graduado";
          await transaction.getRepository(Alumno).save(alumno);
          continue;
        }

        let newSeccionAlumno = newAnioAlumno.secciones.find(
          (seccion) => seccion.seccion === oldAnioAlumno.seccione.seccion
        );

        if (!newSeccionAlumno) {
          const newSeccion = await transaction.getRepository(Seccion).create({
            seccion: oldAnioAlumno.seccione.seccion,
            anio: newAnioAlumno,
          });
          await transaction.getRepository(Seccion).save(newSeccion);
          newSeccionAlumno = newSeccion;

          newAnios
            ?.find((anio) => anio.numberAnio === newAnioAlumno.numberAnio)
            ?.secciones.push(newSeccion);
        }

        const newEtapa = transaction.getRepository(Etapas).create({
          anio: newAnioAlumno,
          seccione: newSeccionAlumno,
          alumno: alumno,
        });
        await transaction.getRepository(Etapas).save(newEtapa);
      }

      return true;
    });
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("GET_ALUMNO_BY_DNI", async (event, data) => {
  try {
    const alumno = await Alumno.findOne({
      where: {
        DatosPersonales: {
          dni: data,
        },
      },
    });

    if (!alumno) return false;

    return true;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("GET_REPRESENTANTE_BY_DNI", async (event, data) => {
  try {
    const representante = await Representante.findOne({
      where: {
        DatosPersonales: {
          dni: data,
        },
      },
      relations: {
        DatosPersonales: true,
      },
    });

    if (!representante) return false;

    return representante;
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("GENERAR_BOLETIN", async (event, data) => {
  console.log(data);

  const alumno = await Alumno.findOne({
    where: {
      id: data.alumnoId,
    },
    relations: {
      DatosPersonales: true,
      Etapas: {
        anio: {
          periodo: true,
        },
        seccione: true,
      },
    },
  });

  const currentEtapa = alumno?.Etapas.find(
    (etapa) => etapa.anio.periodo.id === data.periodoId
  );

  console.log("currentEtapa", currentEtapa);

  const notas = await Nota.find({
    where: {
      alumno: {
        id: data.alumnoId,
        Etapas: {
          id: currentEtapa?.id,
        },
      },
      anio: {
        id: data.anioId,
      },
    },
    relations: {
      materia: true,
      recuperacion: true,
    },
  });

  console.log("notas", notas);

  const materias: Materia[] = [];

  notas.forEach((nota) => {
    if (!materias.find((materia) => materia.id === nota.materia.id))
      materias.push(nota.materia);
  });

  //ordernar materias alfabeticamente
  materias.sort((a, b) => {
    if (a.nombre < b.nombre) {
      return -1;
    }
    if (a.nombre > b.nombre) {
      return 1;
    }
    return 0;
  });

  let currentMomento = 1;

  notas.forEach((nota) => {
    if (currentMomento < Number(nota.momento))
      currentMomento = Number(nota.momento);
  });

  console.log(materias);

  const plantilla = path.join(__dirname, "./assets/boletin.xlsx");
  const workbook = new Excel.Workbook();
  const document = await workbook.xlsx.readFile(plantilla);
  const sheet = document.getWorksheet("boletin") as Worksheet;
  sheet.getCell("K1").value = moment().format("DD/MM/YYYY");
  sheet.getCell(
    "A9"
  ).value = `AÑO Y SECCIÓN DE ESTUDIO: ${currentEtapa?.anio.anio}- ${currentEtapa?.seccione.seccion}`;
  sheet.getCell("F9").value = `MOMENTO ESCOLAR: ${currentMomento}`;
  sheet.getCell(
    "K9"
  ).value = `AÑO ESCOLAR: ${currentEtapa?.anio.periodo.periodo}`;

  sheet.getCell(
    "A10"
  ).value = `CEDULA O IDENTIFICACION: ${alumno?.DatosPersonales.dni}`;
  sheet.getCell("F10").value =
    `NOMBRES Y APELLIDOS: ${alumno?.DatosPersonales.firstName} ${alumno?.DatosPersonales.secondName} ${alumno?.DatosPersonales.Surname} ${alumno?.DatosPersonales.secondSurname}`.toLocaleUpperCase();

  sheet.getCell("A11").value =
    `Dirección.: ${alumno?.DatosPersonales.address}, ${alumno?.DatosPersonales.municipality}, ${alumno?.DatosPersonales.state}`.toLocaleUpperCase();

  sheet.getCell("L11").value = `FECHA DE NACIMIENTO: ${moment(
    alumno?.DatosPersonales.DateOfBirth
  ).format("DD/MM/YYYY")}`;

  let currentRow = 14;
  let promedioMomentoOne = 0;
  let promedioMomentoTwo = 0;
  let promedioMomentoThree = 0;
  for (const materia of materias) {
    let notaRecuperacionOne = 0;
    let notaRecuperacionTwo = 0;
    let notaRecuperacionThree = 0;
    let notaOne = 0;
    let notaTwo = 0;
    let notaThree = 0;

    sheet.getCell(`A${currentRow}`).value = `${materia.nombre}`;
    const firsNota = notas.find(
      (nota) => nota.materia.id === materia.id && nota.momento === "1"
    );
    if (
      firsNota?.recuperacion &&
      firsNota?.recuperacion?.length > 0 &&
      firsNota?.recuperacion[0].Nota
    ) {
      notaRecuperacionOne = Number(firsNota?.recuperacion[0].Nota);
    }

    if (firsNota?.nota) {
      notaOne += Number(firsNota?.nota);
    }

    sheet.getCell(`D${currentRow}`).value = Number(notaOne);
    sheet.getCell(`E${currentRow}`).value = Number(notaRecuperacionOne);
    const secondNota = notas.find(
      (nota) => nota.materia.id === materia.id && nota.momento === "2"
    );

    if (
      secondNota?.recuperacion &&
      secondNota?.recuperacion?.length > 0 &&
      secondNota?.recuperacion[0].Nota
    ) {
      notaRecuperacionTwo = Number(secondNota?.recuperacion[0].Nota);
    }

    if (secondNota?.nota) {
      notaTwo += Number(secondNota?.nota);
    }

    sheet.getCell(`F${currentRow}`).value = Number(notaTwo);
    sheet.getCell(`G${currentRow}`).value = Number(notaRecuperacionTwo);
    const thirdNota = notas.find(
      (nota) => nota.materia.id === materia.id && nota.momento === "3"
    );

    if (
      thirdNota?.recuperacion &&
      thirdNota?.recuperacion?.length > 0 &&
      thirdNota?.recuperacion[0].Nota
    ) {
      notaRecuperacionThree = Number(thirdNota?.recuperacion[0].Nota);
    }

    if (thirdNota?.nota) {
      notaThree += Number(thirdNota?.nota);
    }

    sheet.getCell(`H${currentRow}`).value = Number(notaThree);
    sheet.getCell(`I${currentRow}`).value = Number(notaRecuperacionThree);

    const notaPromedioOne =
      //@ts-ignore
      notaRecuperacionOne ? notaRecuperacionOne : notaOne;

    promedioMomentoOne += Number(notaPromedioOne);

    const notaPromedioTwo =
      //@ts-ignore
      notaRecuperacionTwo > 0 ? notaRecuperacionTwo : notaTwo;

    promedioMomentoTwo += Number(notaPromedioTwo);
    const notaPromedioThree =
      //@ts-ignore
      notaRecuperacionThree > 0 ? notaRecuperacionThree : notaThree;

    promedioMomentoThree += Number(notaPromedioThree);

    const promedio = (
      (Number(notaPromedioOne) +
        Number(notaPromedioTwo) +
        Number(notaPromedioThree)) /
      3
    ).toFixed(2);

    sheet.getCell(`J${currentRow}`).value = Number(promedio);

    currentRow++;
  }

  promedioMomentoOne = Number(
    (promedioMomentoOne / materias.length).toFixed(2)
  );
  promedioMomentoTwo = Number(
    (promedioMomentoTwo / materias.length).toFixed(2)
  );
  promedioMomentoThree = Number(
    (promedioMomentoThree / materias.length).toFixed(2)
  );

  sheet.getCell(`L14`).value = promedioMomentoOne;
  sheet.getCell(`L15`).value = promedioMomentoTwo;
  sheet.getCell(`L16`).value = promedioMomentoThree;

  const promedioFinal = Number(
    (
      (promedioMomentoOne + promedioMomentoTwo + promedioMomentoThree) /
      3
    ).toFixed(2)
  );
  console.log(promedioFinal);

  sheet.getCell(`L17`).value = promedioFinal;

  const reponseDialog = await dialog.showSaveDialog({
    title: "Guardar archivo",
    //@ts-ignore
    defaultPath: `${app.getPath("documents")}/${
      alumno?.DatosPersonales.firstName
    }-${alumno?.DatosPersonales.secondName}-${
      alumno?.DatosPersonales.Surname
    }-${alumno?.DatosPersonales.secondSurname}.xlsx`,
    filters: [{ name: "Archivos de Excel", extensions: ["xlsx"] }],
  });
  if (reponseDialog.canceled) return "cancelado";

  const filePath = reponseDialog.filePath;
  const fileName = path.basename(filePath as string);

  await document.xlsx.writeFile(filePath as string);

  return fileName;
});

ipcMain.handle("GET_USERS", async (event, args) => {
  const users = await User.find({ relations: { datosBasicos: true } });

  return users;
});

ipcMain.handle("GENERATE_RESPALDO", async (event, data) => {
  const nameAutomatic = `Auto-Respaldo-${moment().format(
    "YYYY-MM-DD-HH-mm"
  )}.json`;

  try {
    // crear directorio del sistema para guardar los respaldos en la carpeta de documentos
    const pathRespaldo = `${app.getPath("documents")}/SistemaRespaldo`;
    if (!fs.existsSync(pathRespaldo)) {
      await fs.mkdirSync(pathRespaldo);
    }

    const nameFileJsonWithDate = data?.automatic
      ? `${pathRespaldo}/${nameAutomatic}`
      : `${pathRespaldo}/Respaldo-${moment().format("YYYY-MM-DD-HH-mm")}.json`;

    const entities = appDataSource.entityMetadatas;
    const backup = entities.map((entity) => {
      const repository = appDataSource.getRepository(entity.name);
      return repository
        .find({
          relations: entity.relations.map((relation) => relation.propertyName),
        })
        .then((records) => {
          return {
            entity: entity.name,
            records: records,
          };
        });
    });

    await Promise.all(backup).then((results) => {
      const data = results.reduce((acc, result) => {
        acc[result.entity] = result.records;
        return acc;
      }, {});
      fs.writeFileSync(nameFileJsonWithDate, JSON.stringify(data, null, 2));
    });

    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Respaldo generado con exito",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
  } catch (error) {
    console.log(error);
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Error al generar el respaldo",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
  }
});

ipcMain.handle("GET_RESPALDOS", async (event, args) => {
  const pathRespaldo = `${app.getPath("documents")}/SistemaRespaldo`;
  if (!fs.existsSync(pathRespaldo)) {
    await fs.mkdirSync(pathRespaldo);
  }

  const files = fs.readdirSync(pathRespaldo);

  return files;
});

ipcMain.handle("RESTORE_RESPALDO", async (event, args) => {
  try {
    const restoreName = args as string;
    const pathRespaldo = `${app.getPath("documents")}/SistemaRespaldo`;
    const pathRestore = `${pathRespaldo}/${restoreName}`;

    appDataSource.close();

    //esperar a que se cierre la conexion
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // slqite no soporta el drop table asi que se elimina el archivo de la base de datos
    const pathDB = `${app.getPath("userData")}/db_notas.sqlite`;
    await fs.rm(pathDB, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("database eliminada");
    });

    // se crea la base de datos nuevamente
    appDataSource = await ConnectionDB({
      database: `${app.getPath("userData")}/db_notas.sqlite`,
    });

    // se crea la conexion a la base de datos

    console.log("appDataSource", appDataSource.isInitialized);

    const data = JSON.parse(fs.readFileSync(pathRestore, "utf8"));

    const orderedKeys = [
      "Periodo",
      "Anio",
      "Seccion",
      "Materia",
      "Documents",
      "BasicData",
      "User",
      "Representante",
      "Alumno",
      "Etapas",
      "Nota",
      "RecuperacionNota",
    ];

    const orderedObj = {};

    orderedKeys.forEach((key) => {
      orderedObj[key] = data[key];
    });

    for (const entity of orderedKeys) {
      const repository = appDataSource.manager.getRepository(entity);
      await repository.save(data[entity]);
    }

    //@ts-ignore
    return new Notification({
      title: "Sistema De Notas",
      body: "Respaldo restaurado con exito",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
  } catch (error) {
    //@ts-ignore
    new Notification({
      title: "Sistema De Notas",
      body: "Error al restaurar el respaldo",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
  }
});

ipcMain.handle("UPDATE_ALUMNO", async (event, data) => {
  try {
    return await appDataSource.transaction(async (manager) => {
      const alumno = await manager.getRepository(Alumno).findOne({
        where: {
          DatosPersonales: {
            dni: data.alumno.dni,
          },
        },
        relations: {
          DatosPersonales: {
            Documents: true,
          },
          representante: {
            DatosPersonales: true,
          },
          Etapas: true,
        },
      });

      if (alumno) {
        try {
          await manager.getRepository(BasicData).update(
            { id: alumno.representante.DatosPersonales.id },
            {
              dni: data.representante.dni,
              firstName: data.representante.firstName,
              secondName: data.representante.secondName,
              Surname: data.representante.surname,
              secondSurname: data.representante.secondSurname,
              email: data.representante.email,
              Phone: data.representante.phone,
              address: data.representante.address,
              state: data.representante.state,
              municipality: data.representante.municipality,
            }
          );
        } catch (error) {
          console.log(error);
          throw new Error("No se pudo registrar el alumno");
        }
        try {
          await manager.getRepository(Documents).update(
            { id: alumno.DatosPersonales.Documents.id },
            {
              cedula: Boolean(data.alumno.cedula),
              pasaporte: Boolean(data.alumno.pasaporte),
              partida_nacimiento: Boolean(data.alumno.partidaDeNacimiento),
              fotos_carnet: Boolean(data.alumno.fotos),
              notas_escuela: Boolean(data.alumno.notasEscolares),
            }
          );
          //@ts-ignore
        } catch (error) {
          console.log(error);
          throw new Error("No se pudo registrar el alumno");
        }

        try {
          await manager.getRepository(BasicData).update(
            {
              id: alumno.DatosPersonales.id,
            },
            {
              firstName: data.alumno.firsName,
              secondName: data.alumno.SecondName,
              Surname: data.alumno.surname,
              secondSurname: data.alumno.secondSurname,
              email: data.alumno.email,
              sexo: data.alumno.sexo,
              dni: data.alumno.dni,
              Phone: data.alumno.phone,
              address: data.alumno.address,
              state: data.alumno.state,
              municipality: data.alumno.municipality,
              DateOfBirth: data.alumno.fechaNacimiento,
            }
          );
          //@ts-ignore
        } catch (error) {
          console.log(error);
          throw new Error("No se pudo registrar el alumno");
        }

        try {
          await manager.getRepository(Alumno).update(
            {
              id: alumno.id,
            },
            {
              observacion: data.alumno.observacion,
              condicion: data.alumno.condicion,
              grupoEstable: data.alumno.grupoEstable,
            }
          );
          //@ts-ignore
          //@ts-ignore
          new Notification({
            title: "Sistema De Notas",
            body: "Alumno Actualizado con exito",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
          }).show();
          return true;
        } catch (error) {
          console.log(error);
          throw new Error("No se pudo registrar el alumno");
        }
      }

      return true;
    });
  } catch (error) {
    console.log(error);
    new Notification({
      title: "Sistema De Notas",
      body: "No se pudo actualizar el alumno",
      icon: path.join(__dirname, "./img/logo.png"),
      //@ts-ignore
    }).show();
    throw new Error("No se pudo registrar el alumno");
  }
});

ipcMain.handle("GET_ANIOS_AND_SECCIONS", async (event, data) => {
  const anios = await appDataSource.manager.getRepository(Anio).find({
    where: {
      periodo: {
        id: data,
      },
    },
    relations: {
      secciones: true,
    },
  });

  return anios;
});

ipcMain.handle("UPDATE_ALUMNO_SECCION_AND_ANIO", async (event, data) => {
  const alumno = await appDataSource.manager.getRepository(Alumno).findOne({
    where: {
      DatosPersonales: {
        dni: data.alumno.dni,
      },
    },
    relations: {
      DatosPersonales: true,
      Etapas: true,
    },
  });

  if (alumno) {
    return await appDataSource.transaction(async (manager) => {
      try {
        await manager.getRepository(Etapas).update(
          {
            id: data.etapa,
          },
          {
            anio: data.anio,
            seccione: data.seccion,
          }
        );
        //@ts-ignore
        new Notification({
          title: "Sistema De Notas",
          body: "Alumno Actualizado con exito",
          icon: path.join(__dirname, "./img/logo.png"),
          //@ts-ignore
        }).show();
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudo registrar el alumno");
      }
    });
  }
});

ipcMain.handle("UPDATE_USER", async (event, data) => {
  const user = await appDataSource.manager.getRepository(User).findOne({
    where: {
      id: data.id,
    },
  });
  if (user) {
    return await appDataSource.transaction(async (manager) => {
      try {
        await manager.getRepository(User).update(
          {
            id: data.id,
          },
          {
            role: data.role,
          }
        );
        //@ts-ignore
        new Notification({
          title: "Sistema De Notas",
          body: "Usuario Actualizado con exito",
          icon: path.join(__dirname, "./img/logo.png"),
          //@ts-ignore
        }).show();
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudo registrar el alumno");
      }
    });
  }
});

ipcMain.handle("GET_ALUMNOS_GRADUADOS", async (event, data) => {
  const alumnos = await appDataSource.manager.getRepository(Etapas).find({
    where: {
      alumno: {
        condicion: "Graduado",
      },
    },
    relations: {
      alumno: {
        DatosPersonales: {
          Documents: true,
        },
        representante: {
          DatosPersonales: true,
        },
      },
      anio: {
        periodo: true,
      },
      seccione: true,
    },
  });

  return alumnos;
});

ipcMain.handle("DELETE_USER", async (event, data) => {
  const user = await appDataSource.manager.getRepository(User).findOne({
    where: {
      id: data.id,
    },
  });
  if (user) {
    return await appDataSource.transaction(async (manager) => {
      try {
        await manager.getRepository(User).delete({
          id: data.id,
        });
        //@ts-ignore
        new Notification({
          title: "Sistema De Notas",
          body: "Usuario Eliminado con exito",
          icon: path.join(__dirname, "./img/logo.png"),
          //@ts-ignore
        }).show();
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("No se pudo registrar el alumno");
      }
    });
  }
});

// generar datos fake para pruebas
// ipcMain.handle("GENERATE_FAKE_DATA", async (event, data) => {
//   faker.seed(1234567);
//   const getPeriodo: Periodo = (await appDataSource.manager
//     .getRepository(Periodo)
//     .findOne({
//       where: {
//         id: "1",
//       },
//     })) as Periodo;

//   const letraSecciones = ["A", "B", "C", "D", "E"];
//   const anios = [
//     "Primer año",
//     "Segundo año",
//     "Tercer año",
//     "Cuarto año",
//     "Quinto año",
//   ];

//   // create anios and secciones
//   for (let i = 0; i < 5; i++) {
//     const anio = appDataSource.manager.getRepository(Anio).create({
//       anio: anios[i],
//       numberAnio: i + 1,
//       periodo: getPeriodo,
//     });
//     await appDataSource.manager.getRepository(Anio).save(anio);

//     // create materias
//     const materias = ["Matematicas", "Ingles", "Biologia", "Fisica", "Quimica"];
//     const materiasDB: Materia[] = [];
//     for (const materia of materias) {
//       const materiaDB = appDataSource.manager.getRepository(Materia).create({
//         nombre: materia,
//         anio: anio,
//       });
//       await appDataSource.manager.getRepository(Materia).save(materiaDB);
//       materiasDB.push(materiaDB);
//     }
//     for (let j = 0; j < 5; j++) {
//       const seccion = appDataSource.manager.getRepository(Seccion).create({
//         seccion: letraSecciones[j],
//         anio: anio,
//       });
//       await appDataSource.manager.getRepository(Seccion).save(seccion);
//       for (let j = 0; j < 25; j++) {
//         const datosRepresentante = appDataSource.manager
//           .getRepository(BasicData)
//           .create({
//             dni: `${faker.number.int({
//               min: 5000000,
//               max: 9999999,
//             })}`,
//             firstName: faker.name.firstName(),
//             secondName: faker.name.firstName(),
//             Surname: faker.name.lastName(),
//             secondSurname: faker.name.lastName(),
//             email: faker.internet.email(),
//             Phone: "4121234567",
//             address: faker.address.streetAddress(),
//             state: faker.address.state(),
//             municipality: faker.address.city(),
//           });
//         await appDataSource.manager
//           .getRepository(BasicData)
//           .save(datosRepresentante);
//         const representante = appDataSource.manager
//           .getRepository(Representante)
//           .create({
//             parentesco: j % 2 === 0 ? "Madre" : "Padre",
//             DatosPersonales: datosRepresentante,
//           });
//         await appDataSource.manager
//           .getRepository(Representante)
//           .save(representante);

//         const document = appDataSource.manager.getRepository(Documents).create({
//           cedula: true,
//           pasaporte: true,
//           partida_nacimiento: true,
//           fotos_carnet: true,
//           notas_escuela: true,
//         });

//         await appDataSource.manager.getRepository(Documents).save(document);

//         const datosAlumno = appDataSource.manager
//           .getRepository(BasicData)
//           .create({
//             dni: `${faker.number.int({
//               min: 1000000,
//               max: 5000000,
//             })}`,
//             firstName: faker.name.firstName(),
//             secondName: faker.name.firstName(),
//             Surname: faker.name.lastName(),
//             secondSurname: faker.name.lastName(),
//             email: faker.internet.email(),
//             sexo: j % 2 === 0 ? "F" : "M",
//             Phone: "4121234567",
//             address: faker.address.streetAddress(),
//             state: faker.address.state(),
//             municipality: faker.address.city(),
//             DateOfBirth: `${faker.date.birthdate({
//               min: 2007,
//               max: 2015,
//             })}`,
//             city: faker.address.city(),
//             Documents: document,
//           });

//         await appDataSource.manager.getRepository(BasicData).save(datosAlumno);

//         const alumno = appDataSource.manager.getRepository(Alumno).create({
//           observacion: "a",
//           condicion: "Regular",
//           grupoEstable: "a",
//           DatosPersonales: datosAlumno,
//           representante: representante,
//         });

//         await appDataSource.manager.getRepository(Alumno).save(alumno);

//         const etapa = appDataSource.manager.getRepository(Etapas).create({
//           anio: anio,
//           seccione: seccion,
//           alumno: alumno,
//         });
//         await appDataSource.manager.getRepository(Etapas).save(etapa);

//         for (const materia of materiasDB) {
//           const notas = [
//             {
//               nota: faker.number.float({
//                 min: 0,
//                 max: 20,
//                 fractionDigits: 2,
//               }),
//               momento: "1",
//             },
//             {
//               nota: faker.number.float({
//                 min: 0,
//                 max: 20,
//                 fractionDigits: 2,
//               }),
//               momento: "2",
//             },
//             {
//               nota: faker.number.float({
//                 min: 0,
//                 max: 20,
//                 fractionDigits: 2,
//               }),
//               momento: "3",
//             },
//           ];

//           for (const nota of notas) {
//             const notaDB = appDataSource.manager.getRepository(Nota).create({
//               nota: `${nota.nota}`,
//               momento: nota.momento,
//               materia: materia,
//               alumno: alumno,
//               anio: anio,
//             });
//             await appDataSource.manager.getRepository(Nota).save(notaDB);
//           }
//         }
//       }
//     }
//   }
// });

ipcMain.handle("QUERY_SQL", async (event, data) => {
  const response = await appDataSource.manager.query(data);
  return response;
});

ipcMain.handle("ADD_BITACORA", async (event, data) => {
  const bitacora = appDataSource.manager.getRepository(Bitacora).create({
    accion: data.accion,
    usuario: data.usuario,
    descripcion: data.descripcion,
    fecha: moment().format("YYYY-MM-DD"),
    hora: moment().format("HH:mm"),
  });

  await appDataSource.manager.getRepository(Bitacora).save(bitacora);
});

ipcMain.handle("GET_BITACORA", async (event, data) => {
  const bitacoras = await appDataSource.manager.getRepository(Bitacora).find({
    order: {
      id: "DESC",
    },
    take: 100,
    skip: data,
  });

  return bitacoras;
});
