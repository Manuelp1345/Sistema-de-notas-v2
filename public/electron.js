"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const typeorm_1 = require("typeorm");
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const database_1 = require("./config/database");
const user_1 = require("./config/entitys/user");
const crypto_1 = __importDefault(require("crypto"));
const periodo_1 = require("./config/entitys/periodo");
const anios_1 = require("./config/entitys/anios");
require("reflect-metadata");
const secciones_1 = require("./config/entitys/secciones");
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
            return true;
        }
    }
    catch (error) {
        return false;
    }
}));
electron_1.ipcMain.handle("CREATE_CREDENTIALS_DB", (event, credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield new typeorm_1.DataSource({
            type: "mysql",
            host: credentials.host,
            port: credentials.port,
            username: credentials.user,
            password: credentials.pass,
            database: "",
        });
        yield connection.initialize();
        if (connection.isInitialized) {
            yield connection.query("CREATE DATABASE IF NOT EXISTS db_notas");
            const credentialsDB = {
                host: credentials.host,
                user: credentials.user,
                password: credentials.pass,
                port: credentials.port,
                database: "db_notas",
            };
            try {
                const ruta = electron_1.app.getPath("userData");
                yield fs_1.default.writeFile(ruta + "/database.json", JSON.stringify(credentialsDB), (err) => {
                    if (err)
                        throw err;
                    console.log("The file has been saved!");
                });
                connection.close();
            }
            catch (error) {
                return false;
            }
        }
        return true;
    }
    catch (error) {
        return false;
    }
}));
electron_1.ipcMain.handle("CREATE_USER_DB", (event, user) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userDB = new user_1.User();
    userDB.nombre = user.nombre;
    userDB.apellido = user.apellido;
    userDB.correo = user.email;
    userDB.contraseña = crypto_1.default
        //@ts-ignore
        .createHash("sha256")
        .update(user.password)
        .digest("hex");
    userDB.role = user.role;
    try {
        yield userDB.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Notificacion",
            body: "Usuario creado correctamente",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return true;
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        new electron_1.Notification({
            title: "Error",
            body: "No se pudo crear el usuario",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
electron_1.ipcMain.handle("LOGIN", (event, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userJson = yield user_1.User.findOne({
        where: {
            correo: user.email,
        },
    });
    if (userJson) {
        if (userJson.contraseña ===
            //@ts-ignore
            crypto_1.default.createHash("sha256").update(user.password).digest("hex")) {
            return true;
        }
    }
    //@ts-ignore
    new electron_1.Notification({
        title: "Error",
        body: "Usuario o contraseña incorrectos",
        icon: path.join(__dirname, "./img/logo.png"),
        //@ts-ignore
    }).show();
    return false;
}));
electron_1.ipcMain.handle("GET_PERIODO", (e, { pageIndex = 1, pageSize = 0 }) => __awaiter(void 0, void 0, void 0, function* () {
    const connect = yield (0, database_1.ConnectionDB)();
    let periodoDB;
    const skip = pageIndex === 1 ? 0 : Math.abs(pageSize * (1 - pageIndex));
    try {
        periodoDB = yield connect.getRepository("periodo");
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
            take: 3,
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
            title: "Notificacion",
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
            title: "Error",
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
electron_1.ipcMain.handle("INSERT_AÑOS", (event, anioFron) => __awaiter(void 0, void 0, void 0, function* () {
    const periodo = yield periodo_1.Periodo.findOne({
        where: {
            estado: true,
        },
    });
    const anio = new anios_1.Anio();
    anio.anio = anioFron.anio;
    anio.periodo = periodo;
    try {
        yield anio.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Notificacion",
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
            title: "Error",
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
    console.log("insert seccion", anio);
    const seccionDB = new secciones_1.Seccion();
    seccionDB.seccion = seccion.seccion;
    seccionDB.anio = anio;
    try {
        yield seccionDB.save();
        //@ts-ignore
        new electron_1.Notification({
            title: "Notificacion",
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
            title: "Error",
            body: "No se pudo crear la seccion",
            icon: path.join(__dirname, "./img/logo.png"),
            //@ts-ignore
        }).show();
        return false;
    }
}));
//# sourceMappingURL=electron.js.map