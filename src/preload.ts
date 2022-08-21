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

const createAnio = async (anio) => {
  return await ipcRenderer.invoke("INSERT_AÑOS", anio);
};

const imgLogin = async (user) => {
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

const insertPeriodo = async (periodo) => {
  return await ipcRenderer.invoke("INSER_PERIODO", periodo);
};

const API = {
  getCredentialsDB,
  createCredentialsDB,
  createUserDB,
  getPeriodos,
  createAnio,
  getAnios,
  insertPeriodo,
  login,
  imgLogin,
  background,
};

contextBridge.exposeInMainWorld("API", API);
