"use strict";
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
exports.ConnectionDB = void 0;
const electron_1 = require("electron");
const typeorm_1 = require("typeorm");
const user_1 = require("./entitys/user");
const fs_1 = __importDefault(require("fs"));
const anios_1 = require("./entitys/anios");
const periodo_1 = require("./entitys/periodo");
const materias_1 = require("./entitys/materias");
const secciones_1 = require("./entitys/secciones");
const alumnos_1 = require("./entitys/alumnos");
const ruta = electron_1.app.getPath("userData") + "/database.json";
const file = () => __awaiter(void 0, void 0, void 0, function* () {
    let file;
    try {
        file = yield fs_1.default.readFileSync(ruta, "utf8");
    }
    catch (error) {
        yield fs_1.default.writeFileSync(ruta, JSON.stringify({}));
        file = yield fs_1.default.readFileSync(ruta, "utf8");
    }
    console.log(file);
    return file;
});
const ConnectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsDB = JSON.parse(yield file());
    console.log("file:DATABASE credentials ", credentialsDB);
    const connection = new typeorm_1.DataSource({
        type: "mysql",
        host: credentialsDB.host,
        port: credentialsDB.port,
        username: credentialsDB.user,
        password: credentialsDB.password,
        database: credentialsDB.database,
        entities: [user_1.User, anios_1.Anio, periodo_1.Periodo, materias_1.Materia, secciones_1.Seccion, alumnos_1.Alumno],
        synchronize: true,
        logging: false,
    });
    if (!connection.isInitialized) {
        try {
            yield connection.initialize();
        }
        catch (error) {
            console.log("dataBase Error", error);
        }
    }
    return connection;
});
exports.ConnectionDB = ConnectionDB;
//# sourceMappingURL=database.js.map