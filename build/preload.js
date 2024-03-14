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
const deleteAnio = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Eliminar",
        descripcion: `Se elimino el año ${data.name}`,
        usuario: data.usuario,
    });
    return yield ipcRenderer.invoke("DELETE_AÑO", data.id);
});
const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_SECCIONES", id);
});
const getSeccion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_SECCION", id);
});
const insertSeccion = (seccion) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inserto la seccion ${seccion.seccion}`,
        usuario: seccion.usuario,
    });
    return yield ipcRenderer.invoke("INSERT_SECCION", seccion);
});
const getAreas = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_AREAS", id);
});
const insertArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inserto el area ${area.area}`,
        usuario: area.usuario,
    });
    return yield ipcRenderer.invoke("INSERT_AREA", area);
});
const insertAlumno = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inserto el alumno ${data.dni}`,
        usuario: data.usuario,
    });
    return yield ipcRenderer.invoke("INSERT_ALUMNO", data);
});
const createAnio = (anio) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inserto el año ${anio.anio}`,
        usuario: anio.usuario,
    });
    return yield ipcRenderer.invoke("INSERT_AÑOS", anio);
});
const createDataFake = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GENERATE_FAKE_DATA");
});
const createQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("QUERY_SQL", query);
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
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inserto el periodo ${periodo.periodo}`,
        usuario: periodo.usuario,
    });
    return yield ipcRenderer.invoke("INSER_PERIODO", periodo);
});
const setNota = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inserto la nota ${data.nota} (${data.nombre}) al alumno ${data.alumno}`,
        usuario: data.usuario,
    });
    return yield ipcRenderer.invoke("SET_NOTA", data);
});
const getNotas = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_NOTAS", data);
});
const gradeAlumnos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Insertar",
        descripcion: `Se inicio el proceso de graduar a los alumnos`,
        usuario: data.usuario,
    });
    yield generateBackup({
        automatic: true,
    });
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
const generateBackup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GENERATE_RESPALDO", data);
});
const getBackup = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_RESPALDOS");
});
const restoreBackup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("RESTORE_RESPALDO", data);
});
const updateAlumno = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Actualizar",
        descripcion: `Se actualizo al alumno ${data.dni}`,
        usuario: data.usuario,
    });
    return yield ipcRenderer.invoke("UPDATE_ALUMNO", data);
});
const getAniosAndSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_ANIOS_AND_SECCIONS", id);
});
const updateAlumnoSeccionAndAnio = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield addBitacora({
        accion: "Actualizar",
        descripcion: `Se actualizo al alumno ${data.alumno.dni} el año o seccion `,
        usuario: data.usuario,
    });
    return yield ipcRenderer.invoke("UPDATE_ALUMNO_SECCION_AND_ANIO", data);
});
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("UPDATE_USER", data);
});
const getAlumnosGraduados = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_ALUMNOS_GRADUADOS", data);
});
const deleteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("DELETE_USER", data);
});
const addBitacora = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("ADD_BITACORA", data);
});
const getBitacora = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipcRenderer.invoke("GET_BITACORA", data);
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
    updateAlumno,
    getAniosAndSecciones,
    updateAlumnoSeccionAndAnio,
    updateUser,
    getAlumnosGraduados,
    deleteUser,
    createDataFake,
    createQuery,
    getBitacora,
};
contextBridge.exposeInMainWorld("API", API);
//# sourceMappingURL=preload.js.map