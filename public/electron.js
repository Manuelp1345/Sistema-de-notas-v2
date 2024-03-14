"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const database_1 = require("./config/database");
const user_1 = require("./config/entitys/user");
const crypto_1 = __importDefault(require("crypto"));
const periodo_1 = require("./config/entitys/periodo");
const anios_1 = require("./config/entitys/anios");
require("reflect-metadata");
const secciones_1 = require("./config/entitys/secciones");
const materias_1 = require("./config/entitys/materias");
const alumnos_1 = require("./config/entitys/alumnos");
const basicData_1 = require("./config/entitys/basicData");
const nota_1 = require("./config/entitys/nota");
const documents_1 = require("./config/entitys/documents");
const recuperacion_Nota_1 = require("./config/entitys/recuperacion_Nota");
const etapas_1 = require("./config/entitys/etapas");
const representante_1 = require("./config/entitys/representante");
const exceljs_1 = __importDefault(require("exceljs"));
const moment_1 = __importDefault(require("moment"));
const bitacora_1 = require("./config/entitys/bitacora");
// import { faker } from "@faker-js/faker";
let appDataSource;
function createWindow() {
    // Create the browser window.
    const win = new electron_1.BrowserWindow({
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
    if (electron_is_dev_1.default) {
        win.loadURL("http://localhost:3000/");
        win.webContents.openDevTools();
    }
    else {
        win.loadFile("build/index.html");
    }
    win.on("close", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const { response } = yield electron_1.dialog.showMessageBox(win, {
            type: "question",
            title: "  Confirmar  ",
            message: "¿Desea salir de la aplicacion?",
            buttons: ["Yes", "No"],
        });
        response || win.destroy();
    }));
    win.menuBarVisible = false;
    win.setTitle("Sistema de notas");
    win.maximize();
    console.log(electron_1.app.getPath("userData"));
    // Open the DevTools.
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", () => {
    createWindow();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
electron_1.ipcMain.handle("VALIDATE_CREDENTIALS", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connect = yield (0, database_1.ConnectionDB)();
        console.log("File:electron.ts VALIDATE_CREDENTIALS connect", connect.isInitialized);
        if (connect.isInitialized) {
            appDataSource = connect;
            return true;
        }
    }
    catch (error) {
        return false;
    }
}));
electron_1.ipcMain.handle("CREATE_CREDENTIALS_DB", (event, credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connect = yield (0, database_1.ConnectionDB)({
            database: `${electron_1.app.getPath("userData")}/db_notas.sqlite`,
        });
        console.log("File:electron.ts create credentials connect", connect.isInitialized);
        if (connect.isInitialized) {
            appDataSource = connect;
            // await connect.query("CREATE DATABASE IF NOT EXISTS db_notas ");
            const credentialsDB = {
                database: `${electron_1.app.getPath("userData")}/db_notas.sqlite`,
            };
            try {
                const ruta = electron_1.app.getPath("userData");
                yield fs_1.default.writeFile(ruta + "/database.json", JSON.stringify(credentialsDB), (err) => {
                    if (err)
                        throw err;
                    console.log("The file has been saved!");
                });
                const connectDB = connect.createQueryRunner();
                yield connectDB.release();
                return true;
            }
            catch (error) {
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
    }
    catch (error) {
        return false;
    }
}));
electron_1.ipcMain.handle("CREATE_USER_DB", (event, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_1.User.findOne({
        where: {
            datosBasicos: {
                email: user.email,
            },
        },
    });
    if (existUser) {
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "El usuario ya existe",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
    console.log("File:electron.ts CREATE_USER_DB", user);
    //@ts-ignore
    const dataBasic = new basicData_1.BasicData();
    dataBasic.firstName = user.nombre;
    dataBasic.Surname = user.apellido;
    dataBasic.email = user.email;
    //ranmdom dni
    dataBasic.dni = String(Math.floor(Math.random() * 1000000000));
    let dataBasicId;
    try {
        dataBasicId = yield dataBasic.save();
    }
    catch (error) {
        console.log(error);
    }
    const userDB = new user_1.User();
    userDB.datosBasicos = dataBasicId;
    userDB.clave = crypto_1.default
        //@ts-ignore
        .createHash("sha256")
        .update(user.password)
        .digest("hex");
    userDB.role = user.role;
    let userId;
    try {
        userId = yield userDB.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Usuario creado correctamente",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return userId;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo crear el usuario",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("LOGIN", (event, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const userJson = yield user_1.User.findOne({
        where: {
            datosBasicos: {
                email: user.email,
            },
        },
    });
    if (userJson) {
        if (userJson.clave ===
            //@ts-ignore
            crypto_1.default.createHash("sha256").update(user.password).digest("hex")) {
            //register login on bitacora
            const bitacora = new bitacora_1.Bitacora();
            bitacora.accion = "Inicio de sesion";
            bitacora.fecha = (0, moment_1.default)().format("YYYY-MM-DD");
            bitacora.hora = (0, moment_1.default)().format("HH:mm:ss");
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
    new electron_1.Notification({
        title: "Sistema De Notas",
        body: "Usuario o contraseña incorrectos",
        icon: path.join(__dirname, "./img/logo.png"),
        //@ts-ignore
    }).show();
    return false;
}));
electron_1.ipcMain.handle("GET_PERIODO", (e, { pageIndex = 1, pageSize = 0 }) => __awaiter(void 0, void 0, void 0, function* () {
    let periodoDB;
    const skip = pageIndex === 1 ? 0 : Math.abs(pageSize * (1 - pageIndex));
    try {
        periodoDB = yield appDataSource.getRepository("periodo");
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        throw new Error(error);
    }
    let periodoJson;
    try {
        periodoJson = yield periodoDB.findAndCount({
            order: {
                id: "DESC",
            },
            skip: skip,
        });
    }
    catch (error) {
        console.log(error);
    }
    return periodoJson;
}));
electron_1.ipcMain.handle("INSER_PERIODO", (event, periodo) => __awaiter(void 0, void 0, void 0, function* () {
    const periodoJson = yield periodo_1.Periodo.findOne({
        where: {
            estado: true,
        },
    });
    if (periodoJson) {
        console.log(periodoJson);
        periodoJson.estado = false;
        console.log(periodoJson);
        try {
            yield periodo_1.Periodo.save(periodoJson);
        }
        catch (error) {
            console.log(error);
        }
    }
    try {
        console.log("first");
        yield periodo_1.Periodo.save(periodo);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Periodo creado correctamente",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return true;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo crear el periodo",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("GET_AÑOS", (eve, id) => __awaiter(void 0, void 0, void 0, function* () {
    let años;
    console.log(id);
    try {
        años = yield anios_1.Anio.find({
            relations: ["periodo"],
            where: {
                periodo: {
                    id: id,
                },
            },
        });
        console.log(años);
        return años;
    }
    catch (error) {
        console.log("2", error);
    }
}));
electron_1.ipcMain.handle("GET_AÑO", (eve, id) => __awaiter(void 0, void 0, void 0, function* () {
    let año;
    console.log("Periodo ID", id);
    try {
        año = yield anios_1.Anio.findOne({
            where: {
                id: id,
            },
        });
        console.log(año);
        return año;
    }
    catch (error) {
        console.log("2", error);
    }
}));
electron_1.ipcMain.handle("DELETE_AÑO", (eve, id) => __awaiter(void 0, void 0, void 0, function* () {
    let año;
    try {
        año = yield anios_1.Anio.findOne({
            where: {
                id: id,
            },
        });
        console.log(año);
    }
    catch (error) {
        console.log("2", error);
        return "error";
    }
    try {
        yield anios_1.Anio.delete(año);
    }
    catch (error) {
        console.log("2", error);
        return "error";
    }
}));
electron_1.ipcMain.handle("INSERT_AÑOS", (event, anioFron) => __awaiter(void 0, void 0, void 0, function* () {
    const periodo = yield periodo_1.Periodo.findOne({
        where: {
            estado: true,
        },
    });
    const anio = new anios_1.Anio();
    anio.anio = anioFron.anio;
    anio.numberAnio = anioFron.numberAnio;
    anio.periodo = periodo;
    try {
        yield anio.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Año creado correctamente",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return true;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo crear el año",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("GET_SECCIONES", (evet, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get Secciones", id);
    let secciones;
    try {
        secciones = yield secciones_1.Seccion.find({
            relations: ["anio"],
            where: {
                anio: {
                    id: id,
                },
            },
        });
        console.log(secciones);
        return secciones;
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("GET_SECCION", (evet, filter) => __awaiter(void 0, void 0, void 0, function* () {
    let seccion;
    try {
        seccion = yield secciones_1.Seccion.findOne({
            relations: ["anio"],
            where: {
                id: filter,
            },
        });
        return seccion;
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("INSERT_SECCION", (event, seccion) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(seccion);
    const anio = yield anios_1.Anio.findOne({
        where: {
            id: seccion.anio,
        },
    });
    const existSeccion = yield secciones_1.Seccion.findOne({
        where: {
            seccion: seccion.seccion,
            anio: {
                id: seccion.anio,
            },
        },
    });
    if (existSeccion) {
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "La seccion ya existe",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
    console.log("insert seccion", anio);
    const seccionDB = new secciones_1.Seccion();
    seccionDB.seccion = seccion.seccion;
    seccionDB.anio = anio;
    try {
        yield seccionDB.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Seccion creada correctamente",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return true;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo crear la seccion",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("GET_AREAS", (evet, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get Areas", id);
    let areas;
    try {
        areas = yield materias_1.Materia.find({
            relations: ["anio"],
            where: {
                anio: {
                    id: id,
                },
            },
        });
        console.log(areas);
        return areas;
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("INSERT_AREA", (event, area) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(area);
    const anio = yield anios_1.Anio.findOne({
        where: {
            id: area.anio,
        },
    });
    console.log("insert area", anio);
    const materiaDB = new materias_1.Materia();
    materiaDB.nombre = area.area;
    materiaDB.anio = anio;
    try {
        yield materiaDB.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Área creada correctamente",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return true;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo crear la Área",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("INSERT_ALUMNO", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield appDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
            const seccion = yield manager.getRepository(secciones_1.Seccion).findOne({
                relations: ["anio"],
                where: {
                    id: data.seccion,
                },
            });
            let basicDataId;
            //insert or update representante
            let existRepresentanteDB = yield manager
                .getRepository(representante_1.Representante)
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
                    yield manager.getRepository(basicData_1.BasicData).update({ id: existRepresentanteDB.DatosPersonales.id }, {
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
                    });
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
            }
            else {
                const basicDataTwoDB = manager.getRepository(basicData_1.BasicData).create();
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
                    basicDataId = yield manager
                        .getRepository(basicData_1.BasicData)
                        .save(basicDataTwoDB);
                    //@ts-ignore
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
                const representanteDB = manager.getRepository(representante_1.Representante).create();
                representanteDB.DatosPersonales = basicDataId;
                representanteDB.parentesco = data.representante.filiacion;
                try {
                    existRepresentanteDB = yield manager
                        .getRepository(representante_1.Representante)
                        .save(representanteDB);
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
            }
            console.log("representante", data.representante);
            const documentsDB = manager.getRepository(documents_1.Documents).create();
            documentsDB.cedula = Boolean(data.alumno.cedula);
            documentsDB.pasaporte = Boolean(data.alumno.pasaporte);
            documentsDB.partida_nacimiento = Boolean(data.alumno.partidaDeNacimiento);
            documentsDB.fotos_carnet = Boolean(data.alumno.fotos);
            documentsDB.notas_escuela = Boolean(data.alumno.notasEscolares);
            let documentsId;
            try {
                documentsId = yield manager.getRepository(documents_1.Documents).save(documentsDB);
                //@ts-ignore
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
            console.log("insert area", seccion);
            const basicDataDB = manager.getRepository(basicData_1.BasicData).create();
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
                basicDataId = yield manager.getRepository(basicData_1.BasicData).save(basicDataDB);
                //@ts-ignore
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
            const alumnoDB = manager.getRepository(alumnos_1.Alumno).create();
            alumnoDB.observacion = data.alumno.observacion;
            alumnoDB.condicion = data.alumno.condicion;
            alumnoDB.grupoEstable = data.alumno.grupoEstable;
            alumnoDB.DatosPersonales = basicDataId;
            alumnoDB.representante = existRepresentanteDB;
            try {
                yield manager.getRepository(alumnos_1.Alumno).save(alumnoDB);
                //@ts-ignore
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
            const etapasDB = manager.getRepository(etapas_1.Etapas).create();
            etapasDB.alumno = alumnoDB;
            etapasDB.anio = seccion === null || seccion === void 0 ? void 0 : seccion.anio;
            etapasDB.seccione = seccion;
            try {
                yield manager.getRepository(etapas_1.Etapas).save(etapasDB);
                //@ts-ignore
                new electron_1.Notification({
                    title: "Sistema De Notas",
                    body: "Alumno Registrado",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                return true;
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
        }));
    }
    catch (error) {
        console.log(error);
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo registrar el alumno",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        throw new Error("No se pudo registrar el alumno");
    }
}));
electron_1.ipcMain.handle("GET_ALUMNOS", (evet, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get Alumnos", id);
    let Alumnos;
    try {
        Alumnos = yield etapas_1.Etapas.find({
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
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("SET_NOTA", (evet, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("set nota", data);
    let notaDB = yield nota_1.Nota.findOne({
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
    if (data.rp && (notaDB === null || notaDB === void 0 ? void 0 : notaDB.recuperacion)) {
        let notaRP;
        if (notaDB.recuperacion.length > 0) {
            notaRP = yield recuperacion_Nota_1.RecuperacionNota.findOne({
                where: {
                    id: notaDB.recuperacion[0].id,
                },
            });
            notaRP.Nota = data.nota;
        }
        else {
            notaRP = new recuperacion_Nota_1.RecuperacionNota();
            notaRP.nota = notaDB;
            notaRP.Nota = data.nota;
        }
        try {
            yield notaRP.save();
            //@ts-ignore
            new electron_1.Notification({
                title: "Sistema De Notas",
                body: "Nota Registrada",
                icon: path.join(__dirname, "./img/logo.png"),
                //@ts-ignore
            }).show();
            return true;
        }
        catch (error) {
            console.log(error);
            //@ts-ignore
            new electron_1.Notification({
                title: "Sistema De Notas",
                body: "No se pudo registrar la nota",
                icon: path.join(__dirname, "./img/logo.png"),
                //@ts-ignore
            }).show();
            return false;
        }
    }
    else if (notaDB === null)
        notaDB = new nota_1.Nota();
    notaDB.nota = data.nota;
    notaDB.momento = data.momento;
    notaDB.materia = data.id;
    notaDB.alumno = data.alumnoId;
    notaDB.anio = data.anio;
    try {
        yield notaDB.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Nota Registrada",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return true;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo registrar la nota",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("GET_NOTAS", (evet, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get notas", data);
    let notas;
    try {
        notas = yield nota_1.Nota.find({
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
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("GRADE_ALUMNOS", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield appDataSource.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const oldPeriodo = yield transaction.getRepository(periodo_1.Periodo).findOne({
                where: {
                    id: data.periodo,
                },
            });
            if (!oldPeriodo)
                throw new Error("No se encontro el periodo");
            oldPeriodo.estado = false;
            yield transaction.getRepository(periodo_1.Periodo).save(oldPeriodo);
            const newPeriodo = yield transaction.getRepository(periodo_1.Periodo).create({
                estado: true,
                periodo: data.newPeriodo,
            });
            yield transaction.getRepository(periodo_1.Periodo).save(newPeriodo);
            const oldAnios = yield transaction.getRepository(anios_1.Anio).find({
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
                const newAnio = yield transaction.getRepository(anios_1.Anio).create({
                    anio: anio.anio,
                    periodo: newPeriodo,
                    numberAnio: anio.numberAnio,
                });
                yield transaction.getRepository(anios_1.Anio).save(newAnio);
                for (const seccion of anio.secciones) {
                    const newSeccion = yield transaction.getRepository(secciones_1.Seccion).create({
                        seccion: seccion.seccion,
                        anio: newAnio,
                    });
                    yield transaction.getRepository(secciones_1.Seccion).save(newSeccion);
                }
            }
            const newAnios = yield transaction.getRepository(anios_1.Anio).find({
                where: {
                    periodo: {
                        id: newPeriodo.id,
                    },
                },
                relations: {
                    secciones: true,
                },
            });
            const materias = yield transaction.getRepository(materias_1.Materia).find({
                where: {
                    anio: {
                        periodo: {
                            id: data.periodo,
                        },
                    },
                },
            });
            const alumnos = yield transaction.getRepository(alumnos_1.Alumno).find({
                where: {
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
            console.log("ALUMNOS", alumnos);
            for (const alumno of alumnos) {
                if (alumno.condicion === "Graduado" || alumno.condicion === "Retirado")
                    continue;
                let promedio = 0;
                let recuperacionCount = 0;
                let materiaCount = 0;
                for (const materia of materias) {
                    let notaCount = 0;
                    let promedioMateria = 0;
                    const curseMateria = alumno.notas.find((nota) => nota.materia.id === materia.id);
                    if (!curseMateria)
                        continue;
                    materiaCount++;
                    const notaMomentoOne = alumno.notas.find((nota) => nota.materia.id === materia.id && nota.momento === "1");
                    if (notaMomentoOne) {
                        if (notaMomentoOne.recuperacion.length > 0) {
                            promedioMateria += Number(notaMomentoOne.recuperacion[0].Nota);
                        }
                        else {
                            promedioMateria += Number(notaMomentoOne.nota);
                        }
                        notaCount++;
                    }
                    const notaMomentoTwo = alumno.notas.find((nota) => nota.materia.id === materia.id && nota.momento === "2");
                    if (notaMomentoTwo) {
                        if (notaMomentoTwo.recuperacion.length > 0) {
                            promedioMateria += Number(notaMomentoTwo.recuperacion[0].Nota);
                        }
                        else {
                            promedioMateria += Number(notaMomentoTwo.nota);
                        }
                        notaCount++;
                    }
                    const notaMomentoThree = alumno.notas.find((nota) => nota.materia.id === materia.id && nota.momento === "3");
                    if (notaMomentoThree) {
                        if (notaMomentoThree.recuperacion.length > 0) {
                            promedioMateria += Number(notaMomentoThree.recuperacion[0].Nota);
                        }
                        else {
                            promedioMateria += Number(notaMomentoThree.nota);
                        }
                        notaCount++;
                    }
                    const promedioFInal = promedioMateria / notaCount;
                    console.log("promedio Materia", promedioFInal);
                    promedio += promedioFInal;
                    if (promedioFInal < 10)
                        recuperacionCount++;
                }
                console.log("Promedio general", promedio);
                promedio = promedio / materiaCount;
                const notaFinal = promedio;
                console.log("nota final", notaFinal);
                const oldAnioAlumno = alumno.Etapas.find((etapa) => etapa.anio.periodo.id === data.periodo);
                if (!oldAnioAlumno)
                    throw new Error("No se encontro el anio del alumno");
                // @ts-ignore
                delete alumno.Etapas;
                let newAnioAlumno;
                if (notaFinal > 9 && recuperacionCount < 2) {
                    alumno.condicion = "Regular";
                    yield transaction.getRepository(alumnos_1.Alumno).save(alumno);
                    const newAnio = oldAnioAlumno.anio.numberAnio + 1;
                    newAnioAlumno = newAnios.find((anio) => anio.numberAnio === newAnio);
                }
                else {
                    alumno.condicion = "Repitiente";
                    yield transaction.getRepository(alumnos_1.Alumno).save(alumno);
                    newAnioAlumno = newAnios.find((anio) => anio.numberAnio === oldAnioAlumno.anio.numberAnio);
                }
                if (!newAnioAlumno) {
                    alumno.condicion = "Graduado";
                    yield transaction.getRepository(alumnos_1.Alumno).save(alumno);
                    continue;
                }
                let newSeccionAlumno = newAnioAlumno.secciones.find((seccion) => seccion.seccion === oldAnioAlumno.seccione.seccion);
                if (!newSeccionAlumno) {
                    const newSeccion = yield transaction.getRepository(secciones_1.Seccion).create({
                        seccion: oldAnioAlumno.seccione.seccion,
                        anio: newAnioAlumno,
                    });
                    yield transaction.getRepository(secciones_1.Seccion).save(newSeccion);
                    newSeccionAlumno = newSeccion;
                    (_a = newAnios === null || newAnios === void 0 ? void 0 : newAnios.find((anio) => anio.numberAnio === newAnioAlumno.numberAnio)) === null || _a === void 0 ? void 0 : _a.secciones.push(newSeccion);
                }
                const newEtapa = transaction.getRepository(etapas_1.Etapas).create({
                    anio: newAnioAlumno,
                    seccione: newSeccionAlumno,
                    alumno: alumno,
                });
                yield transaction.getRepository(etapas_1.Etapas).save(newEtapa);
            }
            return true;
        }));
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("GET_ALUMNO_BY_DNI", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alumno = yield alumnos_1.Alumno.findOne({
            where: {
                DatosPersonales: {
                    dni: data,
                },
            },
        });
        if (!alumno)
            return false;
        return true;
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("GET_REPRESENTANTE_BY_DNI", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const representante = yield representante_1.Representante.findOne({
            where: {
                DatosPersonales: {
                    dni: data,
                },
            },
            relations: {
                DatosPersonales: true,
            },
        });
        if (!representante)
            return false;
        return representante;
    }
    catch (error) {
        console.log(error);
    }
}));
electron_1.ipcMain.handle("GENERAR_BOLETIN", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    console.log(data);
    const alumno = yield alumnos_1.Alumno.findOne({
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
    const currentEtapa = alumno === null || alumno === void 0 ? void 0 : alumno.Etapas.find((etapa) => etapa.anio.periodo.id === data.periodoId);
    console.log("currentEtapa", currentEtapa);
    const notas = yield nota_1.Nota.find({
        where: {
            alumno: {
                id: data.alumnoId,
                Etapas: {
                    id: currentEtapa === null || currentEtapa === void 0 ? void 0 : currentEtapa.id,
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
    const materias = [];
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
    const workbook = new exceljs_1.default.Workbook();
    const document = yield workbook.xlsx.readFile(plantilla);
    const sheet = document.getWorksheet("boletin");
    sheet.getCell("K1").value = (0, moment_1.default)().format("DD/MM/YYYY");
    sheet.getCell("A9").value = `AÑO Y SECCIÓN DE ESTUDIO: ${currentEtapa === null || currentEtapa === void 0 ? void 0 : currentEtapa.anio.anio}- ${currentEtapa === null || currentEtapa === void 0 ? void 0 : currentEtapa.seccione.seccion}`;
    sheet.getCell("F9").value = `MOMENTO ESCOLAR: ${currentMomento}`;
    sheet.getCell("K9").value = `AÑO ESCOLAR: ${currentEtapa === null || currentEtapa === void 0 ? void 0 : currentEtapa.anio.periodo.periodo}`;
    sheet.getCell("A10").value = `CEDULA O IDENTIFICACION: ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.dni}`;
    sheet.getCell("F10").value =
        `NOMBRES Y APELLIDOS: ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.firstName} ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.secondName} ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.Surname} ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.secondSurname}`.toLocaleUpperCase();
    sheet.getCell("A11").value =
        `Dirección.: ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.address}, ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.municipality}, ${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.state}`.toLocaleUpperCase();
    sheet.getCell("L11").value = `FECHA DE NACIMIENTO: ${(0, moment_1.default)(alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.DateOfBirth).format("DD/MM/YYYY")}`;
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
        const firsNota = notas.find((nota) => nota.materia.id === materia.id && nota.momento === "1");
        if ((firsNota === null || firsNota === void 0 ? void 0 : firsNota.recuperacion) &&
            ((_b = firsNota === null || firsNota === void 0 ? void 0 : firsNota.recuperacion) === null || _b === void 0 ? void 0 : _b.length) > 0 &&
            (firsNota === null || firsNota === void 0 ? void 0 : firsNota.recuperacion[0].Nota)) {
            notaRecuperacionOne = Number(firsNota === null || firsNota === void 0 ? void 0 : firsNota.recuperacion[0].Nota);
        }
        if (firsNota === null || firsNota === void 0 ? void 0 : firsNota.nota) {
            notaOne += Number(firsNota === null || firsNota === void 0 ? void 0 : firsNota.nota);
        }
        sheet.getCell(`D${currentRow}`).value = Number(notaOne);
        sheet.getCell(`E${currentRow}`).value = Number(notaRecuperacionOne);
        const secondNota = notas.find((nota) => nota.materia.id === materia.id && nota.momento === "2");
        if ((secondNota === null || secondNota === void 0 ? void 0 : secondNota.recuperacion) &&
            ((_c = secondNota === null || secondNota === void 0 ? void 0 : secondNota.recuperacion) === null || _c === void 0 ? void 0 : _c.length) > 0 &&
            (secondNota === null || secondNota === void 0 ? void 0 : secondNota.recuperacion[0].Nota)) {
            notaRecuperacionTwo = Number(secondNota === null || secondNota === void 0 ? void 0 : secondNota.recuperacion[0].Nota);
        }
        if (secondNota === null || secondNota === void 0 ? void 0 : secondNota.nota) {
            notaTwo += Number(secondNota === null || secondNota === void 0 ? void 0 : secondNota.nota);
        }
        sheet.getCell(`F${currentRow}`).value = Number(notaTwo);
        sheet.getCell(`G${currentRow}`).value = Number(notaRecuperacionTwo);
        const thirdNota = notas.find((nota) => nota.materia.id === materia.id && nota.momento === "3");
        if ((thirdNota === null || thirdNota === void 0 ? void 0 : thirdNota.recuperacion) &&
            ((_d = thirdNota === null || thirdNota === void 0 ? void 0 : thirdNota.recuperacion) === null || _d === void 0 ? void 0 : _d.length) > 0 &&
            (thirdNota === null || thirdNota === void 0 ? void 0 : thirdNota.recuperacion[0].Nota)) {
            notaRecuperacionThree = Number(thirdNota === null || thirdNota === void 0 ? void 0 : thirdNota.recuperacion[0].Nota);
        }
        if (thirdNota === null || thirdNota === void 0 ? void 0 : thirdNota.nota) {
            notaThree += Number(thirdNota === null || thirdNota === void 0 ? void 0 : thirdNota.nota);
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
        const promedio = ((Number(notaPromedioOne) +
            Number(notaPromedioTwo) +
            Number(notaPromedioThree)) /
            3).toFixed(2);
        sheet.getCell(`J${currentRow}`).value = Number(promedio);
        currentRow++;
    }
    promedioMomentoOne = Number((promedioMomentoOne / materias.length).toFixed(2));
    promedioMomentoTwo = Number((promedioMomentoTwo / materias.length).toFixed(2));
    promedioMomentoThree = Number((promedioMomentoThree / materias.length).toFixed(2));
    sheet.getCell(`L14`).value = promedioMomentoOne;
    sheet.getCell(`L15`).value = promedioMomentoTwo;
    sheet.getCell(`L16`).value = promedioMomentoThree;
    const promedioFinal = Number(((promedioMomentoOne + promedioMomentoTwo + promedioMomentoThree) /
        3).toFixed(2));
    console.log(promedioFinal);
    sheet.getCell(`L17`).value = promedioFinal;
    const reponseDialog = yield electron_1.dialog.showSaveDialog({
        title: "Guardar archivo",
        //@ts-ignore
        defaultPath: `${electron_1.app.getPath("documents")}/boletin-${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.firstName}-${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.secondName}-${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.Surname}-${alumno === null || alumno === void 0 ? void 0 : alumno.DatosPersonales.secondSurname}.xlsx`,
        filters: [{ name: "Archivos de Excel", extensions: ["xlsx"] }],
    });
    if (reponseDialog.canceled)
        return "cancelado";
    const filePath = reponseDialog.filePath;
    const fileName = path.basename(filePath);
    yield document.xlsx.writeFile(filePath);
    return fileName;
}));
electron_1.ipcMain.handle("GET_USERS", (event, args) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find({ relations: { datosBasicos: true } });
    return users;
}));
electron_1.ipcMain.handle("GENERATE_RESPALDO", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const nameAutomatic = `Auto-Respaldo-${(0, moment_1.default)().format("YYYY-MM-DD-HH-mm")}.json`;
    try {
        // crear directorio del sistema para guardar los respaldos en la carpeta de documentos
        const pathRespaldo = `${electron_1.app.getPath("documents")}/SistemaRespaldo`;
        if (!fs_1.default.existsSync(pathRespaldo)) {
            yield fs_1.default.mkdirSync(pathRespaldo);
        }
        const nameFileJsonWithDate = (data === null || data === void 0 ? void 0 : data.automatic)
            ? `${pathRespaldo}/${nameAutomatic}`
            : `${pathRespaldo}/Respaldo-${(0, moment_1.default)().format("YYYY-MM-DD-HH-mm")}.json`;
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
        yield Promise.all(backup).then((results) => {
            const data = results.reduce((acc, result) => {
                acc[result.entity] = result.records;
                return acc;
            }, {});
            fs_1.default.writeFileSync(nameFileJsonWithDate, JSON.stringify(data, null, 2));
        });
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Respaldo generado con exito",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Error al generar el respaldo",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
    }
}));
electron_1.ipcMain.handle("GET_RESPALDOS", (event, args) => __awaiter(void 0, void 0, void 0, function* () {
    const pathRespaldo = `${electron_1.app.getPath("documents")}/SistemaRespaldo`;
    if (!fs_1.default.existsSync(pathRespaldo)) {
        yield fs_1.default.mkdirSync(pathRespaldo);
    }
    const files = fs_1.default.readdirSync(pathRespaldo);
    return files;
}));
electron_1.ipcMain.handle("RESTORE_RESPALDO", (event, args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restoreName = args;
        const pathRespaldo = `${electron_1.app.getPath("documents")}/SistemaRespaldo`;
        const pathRestore = `${pathRespaldo}/${restoreName}`;
        appDataSource.close();
        //esperar a que se cierre la conexion
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        // slqite no soporta el drop table asi que se elimina el archivo de la base de datos
        const pathDB = `${electron_1.app.getPath("userData")}/db_notas.sqlite`;
        yield fs_1.default.rm(pathDB, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("database eliminada");
        });
        // se crea la base de datos nuevamente
        appDataSource = yield (0, database_1.ConnectionDB)({
            database: `${electron_1.app.getPath("userData")}/db_notas.sqlite`,
        });
        // se crea la conexion a la base de datos
        console.log("appDataSource", appDataSource.isInitialized);
        const data = JSON.parse(fs_1.default.readFileSync(pathRestore, "utf8"));
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
            yield repository.save(data[entity]);
        }
        //@ts-ignore
        return new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Respaldo restaurado con exito",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
    }
    catch (error) {
        //@ts-ignore
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "Error al restaurar el respaldo",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
    }
}));
electron_1.ipcMain.handle("UPDATE_ALUMNO", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield appDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
            const alumno = yield manager.getRepository(alumnos_1.Alumno).findOne({
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
                    yield manager.getRepository(basicData_1.BasicData).update({ id: alumno.representante.DatosPersonales.id }, {
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
                    });
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
                try {
                    yield manager.getRepository(documents_1.Documents).update({ id: alumno.DatosPersonales.Documents.id }, {
                        cedula: Boolean(data.alumno.cedula),
                        pasaporte: Boolean(data.alumno.pasaporte),
                        partida_nacimiento: Boolean(data.alumno.partidaDeNacimiento),
                        fotos_carnet: Boolean(data.alumno.fotos),
                        notas_escuela: Boolean(data.alumno.notasEscolares),
                    });
                    //@ts-ignore
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
                try {
                    yield manager.getRepository(basicData_1.BasicData).update({
                        id: alumno.DatosPersonales.id,
                    }, {
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
                    });
                    //@ts-ignore
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
                try {
                    yield manager.getRepository(alumnos_1.Alumno).update({
                        id: alumno.id,
                    }, {
                        observacion: data.alumno.observacion,
                        condicion: data.alumno.condicion,
                        grupoEstable: data.alumno.grupoEstable,
                    });
                    //@ts-ignore
                    //@ts-ignore
                    new electron_1.Notification({
                        title: "Sistema De Notas",
                        body: "Alumno Actualizado con exito",
                        icon: path.join(__dirname, "./img/logo.png"),
                        //@ts-ignore
                    }).show();
                    return true;
                }
                catch (error) {
                    console.log(error);
                    throw new Error("No se pudo registrar el alumno");
                }
            }
            return true;
        }));
    }
    catch (error) {
        console.log(error);
        new electron_1.Notification({
            title: "Sistema De Notas",
            body: "No se pudo actualizar el alumno",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        throw new Error("No se pudo registrar el alumno");
    }
}));
electron_1.ipcMain.handle("GET_ANIOS_AND_SECCIONS", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const anios = yield appDataSource.manager.getRepository(anios_1.Anio).find({
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
}));
electron_1.ipcMain.handle("UPDATE_ALUMNO_SECCION_AND_ANIO", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const alumno = yield appDataSource.manager.getRepository(alumnos_1.Alumno).findOne({
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
        return yield appDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield manager.getRepository(etapas_1.Etapas).update({
                    id: data.etapa,
                }, {
                    anio: data.anio,
                    seccione: data.seccion,
                });
                //@ts-ignore
                new electron_1.Notification({
                    title: "Sistema De Notas",
                    body: "Alumno Actualizado con exito",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                return true;
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
        }));
    }
}));
electron_1.ipcMain.handle("UPDATE_USER", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield appDataSource.manager.getRepository(user_1.User).findOne({
        where: {
            id: data.id,
        },
    });
    if (user) {
        return yield appDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield manager.getRepository(user_1.User).update({
                    id: data.id,
                }, {
                    role: data.role,
                });
                //@ts-ignore
                new electron_1.Notification({
                    title: "Sistema De Notas",
                    body: "Usuario Actualizado con exito",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                return true;
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
        }));
    }
}));
electron_1.ipcMain.handle("GET_ALUMNOS_GRADUADOS", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const alumnos = yield appDataSource.manager.getRepository(etapas_1.Etapas).find({
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
}));
electron_1.ipcMain.handle("DELETE_USER", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield appDataSource.manager.getRepository(user_1.User).findOne({
        where: {
            id: data.id,
        },
    });
    if (user) {
        return yield appDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield manager.getRepository(user_1.User).delete({
                    id: data.id,
                });
                //@ts-ignore
                new electron_1.Notification({
                    title: "Sistema De Notas",
                    body: "Usuario Eliminado con exito",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                return true;
            }
            catch (error) {
                console.log(error);
                throw new Error("No se pudo registrar el alumno");
            }
        }));
    }
}));
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
electron_1.ipcMain.handle("QUERY_SQL", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield appDataSource.manager.query(data);
    return response;
}));
electron_1.ipcMain.handle("ADD_BITACORA", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const bitacora = appDataSource.manager.getRepository(bitacora_1.Bitacora).create({
        accion: data.accion,
        usuario: data.usuario,
        descripcion: data.descripcion,
        fecha: (0, moment_1.default)().format("YYYY-MM-DD"),
        hora: (0, moment_1.default)().format("HH:mm"),
    });
    yield appDataSource.manager.getRepository(bitacora_1.Bitacora).save(bitacora);
}));
electron_1.ipcMain.handle("GET_BITACORA", (event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const bitacoras = yield appDataSource.manager.getRepository(bitacora_1.Bitacora).find({
        order: {
            id: "DESC",
        },
        take: 100,
        skip: data,
    });
    return bitacoras;
}));
//# sourceMappingURL=electron.js.map