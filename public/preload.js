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
//@ts-nocheck
const { ipcRenderer, contextBridge } = window.require("electron");
const getCredentialsDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("VALIDATE_CREDENTIALS");
});
const createCredentialsDB = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("CREATE_CREDENTIALS_DB", credentials);
});
const createUserDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("CREATE_USER_DB", user);
});
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("LOGIN", user);
});
const getAnios = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_AÑOS", id);
});
const getAnio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_AÑO", id);
});
const deleteAnio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("DELETE_AÑO", id);
});
const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_SECCIONES", id);
});
const getSeccion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_SECCION", id);
});
const insertSeccion = (seccion) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("INSERT_SECCION", seccion);
});
const getAreas = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_AREAS", id);
});
const insertArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("INSERT_AREA", area);
});
const insertAlumno = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("INSERT_ALUMNO", data);
});
const createAnio = (anio) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("INSERT_AÑOS", anio);
});
const imgLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    const html = document.querySelector("html");
    html.style.backgroundImage = `url("./img/background.jpg")`;
    html.style.backgroundRepeat = "no-repeat";
    html.style.backgroundPosition = "center";
    html.style.backgroundSize = "cover";
    html.style.overflow = "hidden";
});
const background = () => __awaiter(void 0, void 0, void 0, function* () {
    const html = document.querySelector("html");
    html.style.backgroundImage = `url(none)`;
    html.style.color = `white`;
    html.style.backgroundRepeat = "no-repeat";
    html.style.backgroundPosition = "center";
    html.style.backgroundSize = "cover";
});
const getPeriodos = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_PERIODO", filter);
});
const getAlumno = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_ALUMNOS", filter);
});
const insertPeriodo = (periodo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("INSER_PERIODO", periodo);
});
const setNota = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("SET_NOTA", data);
});
const getNotas = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_NOTAS", data);
});
const gradeAlumnos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GRADE_ALUMNOS", data);
});
const getAlumnoByDni = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_ALUMNO_BY_DNI", data);
});
const getRepresentanteByDni = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_REPRESENTANTE_BY_DNI", data);
});
const generarBoletin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GENERAR_BOLETIN", data);
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_USERS");
});
const generateBackup = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GENERATE_RESPALDO");
});
const getBackup = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_RESPALDOS");
});
const restoreBackup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("RESTORE_RESPALDO", data);
});
const API = {
    getCredentialsDB,
    createCredentialsDB,
    createUserDB,
    getPeriodos,
    createAnio,
    getAnios,
    insertPeriodo,
    getAnio,
    deleteAnio,
    getSeccion,
    getSecciones,
    insertSeccion,
    insertAlumno,
    getAlumno,
    getAreas,
    insertArea,
    login,
    imgLogin,
    background,
    setNota,
    getNotas,
    gradeAlumnos,
    getAlumnoByDni,
    getRepresentanteByDni,
    generarBoletin,
    getUsers,
    generateBackup,
    getBackup,
    restoreBackup,
};
contextBridge.exposeInMainWorld("API", API);
//# sourceMappingURL=preload.js.map