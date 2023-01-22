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
  return await ipcRenderer.invoke("GRADE_ALUMNOS", data);
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
};

contextBridge.exposeInMainWorld("API", API);
