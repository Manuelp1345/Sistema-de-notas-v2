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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var typeorm_1 = require("typeorm");
var fs_1 = __importDefault(require("fs"));
var path = __importStar(require("path"));
var database_1 = require("./config/database");
var user_1 = require("./config/entitys/user");
var crypto_1 = __importDefault(require("crypto"));
var periodo_1 = require("./config/entitys/periodo");
var anios_1 = require("./config/entitys/anios");
function createWindow() {
    var _this = this;
    // Create the browser window.
    var win = new electron_1.BrowserWindow({
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
    win.on("close", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, electron_1.dialog.showMessageBox(win, {
                            type: "question",
                            title: "  Confirmar  ",
                            message: "¿Desea salir de la aplicacion?",
                            buttons: ["Yes", "No"],
                        })];
                case 1:
                    response = (_a.sent()).response;
                    response || win.destroy();
                    return [2 /*return*/];
            }
        });
    }); });
    win.menuBarVisible = false;
    win.setTitle("Sistema de notas");
    win.maximize();
    console.log(electron_1.app.getPath("userData"));
    // Open the DevTools.
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", function () {
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
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
electron_1.ipcMain.handle("VALIDATE_CREDENTIALS", function () { return __awaiter(void 0, void 0, void 0, function () {
    var connect, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, database_1.ConnectionDB)()];
            case 1:
                connect = _a.sent();
                if (connect.isConnected) {
                    connect.close();
                    return [2 /*return*/, true];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.handle("CREATE_CREDENTIALS_DB", function (event, credentials) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, credentialsDB, ruta, error_2, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, (0, typeorm_1.createConnection)({
                        type: "mysql",
                        host: credentials.host,
                        port: credentials.port,
                        username: credentials.user,
                        password: credentials.pass,
                        database: "",
                    })];
            case 1:
                connection = _a.sent();
                if (!connection.isConnected) return [3 /*break*/, 6];
                return [4 /*yield*/, connection.query("CREATE DATABASE IF NOT EXISTS db_notas")];
            case 2:
                _a.sent();
                credentialsDB = {
                    host: credentials.host,
                    user: credentials.user,
                    password: credentials.pass,
                    port: credentials.port,
                    database: "db_notas",
                };
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                ruta = electron_1.app.getPath("userData");
                return [4 /*yield*/, fs_1.default.writeFile(ruta + "/database.json", JSON.stringify(credentialsDB), function (err) {
                        if (err)
                            throw err;
                        console.log("The file has been saved!");
                    })];
            case 4:
                _a.sent();
                connection.close();
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                return [2 /*return*/, false];
            case 6: return [2 /*return*/, true];
            case 7:
                error_3 = _a.sent();
                return [2 /*return*/, false];
            case 8: return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.handle("CREATE_USER_DB", function (event, user) { return __awaiter(void 0, void 0, void 0, function () {
    var connect, userDB, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.ConnectionDB)()];
            case 1:
                connect = _a.sent();
                userDB = new user_1.User();
                userDB.nombre = user.nombre;
                userDB.apellido = user.apellido;
                userDB.correo = user.email;
                userDB.contraseña = crypto_1.default
                    //@ts-ignore
                    .createHash("sha256")
                    .update(user.password)
                    .digest("hex");
                userDB.role = user.role;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, userDB.save()];
            case 3:
                _a.sent();
                //@ts-ignore
                new electron_1.Notification({
                    title: "Notificacion",
                    body: "Usuario creado correctamente",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, true];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                //@ts-ignore
                new electron_1.Notification({
                    title: "Error",
                    body: "No se pudo crear el usuario",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, false];
            case 5: return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.handle("LOGIN", function (event, user) { return __awaiter(void 0, void 0, void 0, function () {
    var connect, userDB, error_5, userJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.ConnectionDB)()];
            case 1:
                connect = _a.sent();
                console.log(connect.isConnected);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connect.getRepository("User")];
            case 3:
                userDB = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 5];
            case 5: return [4 /*yield*/, userDB.findOne({
                    where: {
                        correo: user.email,
                    },
                })];
            case 6:
                userJson = _a.sent();
                connect.close();
                if (userJson) {
                    if (userJson.contraseña ===
                        //@ts-ignore
                        crypto_1.default.createHash("sha256").update(user.password).digest("hex")) {
                        return [2 /*return*/, true];
                    }
                }
                //@ts-ignore
                new electron_1.Notification({
                    title: "Error",
                    body: "Usuario o contraseña incorrectos",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, false];
        }
    });
}); });
electron_1.ipcMain.handle("GET_PERIODO", function (e, _a) {
    var _b = _a.pageIndex, pageIndex = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 0 : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var connect, periodoDB, skip, error_6, periodoJson;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, database_1.ConnectionDB)()];
                case 1:
                    connect = _d.sent();
                    skip = pageIndex === 1 ? 0 : Math.abs(pageSize * (1 - pageIndex));
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connect.getRepository("periodo")];
                case 3:
                    periodoDB = _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _d.sent();
                    console.log(error_6);
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, periodoDB.findAndCount({
                        order: {
                            id: "DESC",
                        },
                        skip: skip,
                        take: 3,
                    })];
                case 6:
                    periodoJson = _d.sent();
                    connect.close();
                    return [2 /*return*/, periodoJson];
            }
        });
    });
});
electron_1.ipcMain.handle("INSER_PERIODO", function (event, periodo) { return __awaiter(void 0, void 0, void 0, function () {
    var connect, periodoDB, error_7, periodoJson, error_8, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.ConnectionDB)()];
            case 1:
                connect = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, connect.getRepository("periodo")];
            case 3:
                periodoDB = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 5];
            case 5: return [4 /*yield*/, periodoDB.findOne({
                    where: {
                        estado: 1,
                    },
                })];
            case 6:
                periodoJson = _a.sent();
                if (!periodoJson) return [3 /*break*/, 10];
                console.log(periodoJson);
                periodoJson.estado = false;
                console.log(periodoJson);
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, periodoDB.save(periodoJson)];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_8 = _a.sent();
                console.log(error_8);
                return [3 /*break*/, 10];
            case 10:
                _a.trys.push([10, 12, , 13]);
                console.log("first");
                return [4 /*yield*/, periodoDB.save(periodo)];
            case 11:
                _a.sent();
                //@ts-ignore
                new electron_1.Notification({
                    title: "Notificacion",
                    body: "Periodo creado correctamente",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, true];
            case 12:
                error_9 = _a.sent();
                console.log(error_9);
                //@ts-ignore
                new electron_1.Notification({
                    title: "Error",
                    body: "No se pudo crear el periodo",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, false];
            case 13: return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.handle("GET_AÑOS", function (eve, id) { return __awaiter(void 0, void 0, void 0, function () {
    var connect, años, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.ConnectionDB)()];
            case 1:
                connect = _a.sent();
                console.log(id);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, anios_1.Anio.find({
                        relations: ["periodo"],
                        where: {
                            periodo: id,
                        },
                    })];
            case 3:
                años = _a.sent();
                console.log(años);
                connect.close();
                return [2 /*return*/, años];
            case 4:
                error_10 = _a.sent();
                console.log("2", error_10);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
electron_1.ipcMain.handle("INSERT_AÑOS", function (event, anioFron) { return __awaiter(void 0, void 0, void 0, function () {
    var connect, periodo, anio, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.ConnectionDB)()];
            case 1:
                connect = _a.sent();
                return [4 /*yield*/, periodo_1.Periodo.findOne({
                        where: {
                            estado: 1,
                        },
                    })];
            case 2:
                periodo = _a.sent();
                anio = new anios_1.Anio();
                anio.anio = anioFron.anio;
                anio.periodo = periodo;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, anio.save()];
            case 4:
                _a.sent();
                //@ts-ignore
                new electron_1.Notification({
                    title: "Notificacion",
                    body: "Año creado correctamente",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, true];
            case 5:
                error_11 = _a.sent();
                console.log(error_11);
                //@ts-ignore
                new electron_1.Notification({
                    title: "Error",
                    body: "No se pudo crear el año",
                    icon: path.join(__dirname, "./img/logo.png"),
                    //@ts-ignore
                }).show();
                connect.close();
                return [2 /*return*/, false];
            case 6: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=electron.js.map