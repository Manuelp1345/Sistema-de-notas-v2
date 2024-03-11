//@ts-nocheck
const { ipcRenderer, contextBridge } = window.require("electron");

const getCredentialsDB = async () => {
  return await ipcRenderer.invoke("VALIDATE_CREDENTIALS");
};
const createCredentialsDB = async (credentials) => {
  return await ipcRenderer.invoke("CREATE_CREDENTIALS_DB", credentials);
};
const createUserDB = async (user) => {
  return await ipcRenderer.invoke("CREATE_USER_DB", user);
};

const login = async (user) => {
  return await ipcRenderer.invoke("LOGIN", user);
};

const getAnios = async (id) => {
  return await ipcRenderer.invoke("GET_AÑOS", id);
};

const getAnio = async (id) => {
  return await ipcRenderer.invoke("GET_AÑO", id);
};
const deleteAnio = async (id) => {
  return await ipcRenderer.invoke("DELETE_AÑO", id);
};

const getSecciones = async (id) => {
  return await ipcRenderer.invoke("GET_SECCIONES", id);
};
const getSeccion = async (id) => {
  return await ipcRenderer.invoke("GET_SECCION", id);
};

const insertSeccion = async (seccion) => {
  return await ipcRenderer.invoke("INSERT_SECCION", seccion);
};

const getAreas = async (id) => {
  return await ipcRenderer.invoke("GET_AREAS", id);
};
const insertArea = async (area) => {
  return await ipcRenderer.invoke("INSERT_AREA", area);
};
const insertAlumno = async (data) => {
  return await ipcRenderer.invoke("INSERT_ALUMNO", data);
};

const createAnio = async (anio) => {
  return await ipcRenderer.invoke("INSERT_AÑOS", anio);
};

const createDataFake = async () => {
  return await ipcRenderer.invoke("GENERATE_FAKE_DATA");
};

const imgLogin = async () => {
  const html = document.querySelector("html");

  html.style.backgroundImage = `url("./img/background.jpg")`;
  html.style.backgroundRepeat = "no-repeat";
  html.style.backgroundPosition = "center";
  html.style.backgroundSize = "cover";
  html.style.overflow = "hidden";
};

const background = async () => {
  const html = document.querySelector("html");

  html.style.backgroundImage = `url(none)`;
  html.style.color = `white`;
  html.style.backgroundRepeat = "no-repeat";
  html.style.backgroundPosition = "center";
  html.style.backgroundSize = "cover";
};

const getPeriodos = async (filter) => {
  return await ipcRenderer.invoke("GET_PERIODO", filter);
};
const getAlumno = async (filter) => {
  return await ipcRenderer.invoke("GET_ALUMNOS", filter);
};

const insertPeriodo = async (periodo) => {
  return await ipcRenderer.invoke("INSER_PERIODO", periodo);
};

const setNota = async (data) => {
  return await ipcRenderer.invoke("SET_NOTA", data);
};

const getNotas = async (data) => {
  return await ipcRenderer.invoke("GET_NOTAS", data);
};

const gradeAlumnos = async (data) => {
  await generateBackup({
    automatic: true,
  });
  return await ipcRenderer.invoke("GRADE_ALUMNOS", data);
};

const getAlumnoByDni = async (data) => {
  return await ipcRenderer.invoke("GET_ALUMNO_BY_DNI", data);
};

const getRepresentanteByDni = async (data) => {
  return await ipcRenderer.invoke("GET_REPRESENTANTE_BY_DNI", data);
};

const generarBoletin = async (data) => {
  return await ipcRenderer.invoke("GENERAR_BOLETIN", data);
};

const getUsers = async () => {
  return await ipcRenderer.invoke("GET_USERS");
};

const generateBackup = async (data) => {
  return await ipcRenderer.invoke("GENERATE_RESPALDO", data);
};

const getBackup = async () => {
  return await ipcRenderer.invoke("GET_RESPALDOS");
};

const restoreBackup = async (data) => {
  return await ipcRenderer.invoke("RESTORE_RESPALDO", data);
};

const updateAlumno = async (data) => {
  return await ipcRenderer.invoke("UPDATE_ALUMNO", data);
};

const getAniosAndSecciones = async (id) => {
  return await ipcRenderer.invoke("GET_ANIOS_AND_SECCIONS", id);
};

const updateAlumnoSeccionAndAnio = async (data) => {
  return await ipcRenderer.invoke("UPDATE_ALUMNO_SECCION_AND_ANIO", data);
};

const updateUser = async (data) => {
  return await ipcRenderer.invoke("UPDATE_USER", data);
};

const getAlumnosGraduados = async (data) => {
  return await ipcRenderer.invoke("GET_ALUMNOS_GRADUADOS", data);
};

const deleteUser = async (data) => {
  return await ipcRenderer.invoke("DELETE_USER", data);
};

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
};

contextBridge.exposeInMainWorld("API", API);
