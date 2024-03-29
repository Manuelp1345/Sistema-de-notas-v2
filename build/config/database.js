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
const documents_1 = require("./entitys/documents");
const basicData_1 = require("./entitys/basicData");
const representante_1 = require("./entitys/representante");
const nota_1 = require("./entitys/nota");
const recuperacion_Nota_1 = require("./entitys/recuperacion_Nota");
const etapas_1 = require("./entitys/etapas");
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
const ConnectionDB = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialsDB = credentials ? credentials : JSON.parse(yield file());
    console.log("file:DATABASE credentials ", credentialsDB);
    const connection = yield (0, typeorm_1.createConnection)({
        type: "sqlite",
        database: credentials ? credentials.database : credentialsDB.database,
        entities: [
            user_1.User,
            nota_1.Nota,
            anios_1.Anio,
            etapas_1.Etapas,
            alumnos_1.Alumno,
            periodo_1.Periodo,
            materias_1.Materia,
            secciones_1.Seccion,
            basicData_1.BasicData,
            documents_1.Documents,
            representante_1.Representante,
            recuperacion_Nota_1.RecuperacionNota,
        ],
        synchronize: true,
        logging: true,
    });
    console.log("dataBase connection", connection);
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