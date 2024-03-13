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
const deleteAnio = async (data) => {
  await addBitacora({
    accion: "Eliminar",
    descripcion: `Se elimino el año ${data.name}`,
    usuario: data.usuario,
  });
  return await ipcRenderer.invoke("DELETE_AÑO", data.id);
};

const getSecciones = async (id) => {
  return await ipcRenderer.invoke("GET_SECCIONES", id);
};
const getSeccion = async (id) => {
  return await ipcRenderer.invoke("GET_SECCION", id);
};

const insertSeccion = async (seccion) => {
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inserto la seccion ${seccion.nombre}`,
    usuario: seccion.usuario,
  });
  return await ipcRenderer.invoke("INSERT_SECCION", seccion);
};

const getAreas = async (id) => {
  return await ipcRenderer.invoke("GET_AREAS", id);
};
const insertArea = async (area) => {
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inserto el area ${area.nombre}`,
    usuario: area.usuario,
  });
  return await ipcRenderer.invoke("INSERT_AREA", area);
};
const insertAlumno = async (data) => {
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inserto el alumno ${data.dni}`,
    usuario: data.usuario,
  });
  return await ipcRenderer.invoke("INSERT_ALUMNO", data);
};

const createAnio = async (anio) => {
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inserto el año ${anio.anio}`,
    usuario: anio.usuario,
  });
  return await ipcRenderer.invoke("INSERT_AÑOS", anio);
};

const createDataFake = async () => {
  return await ipcRenderer.invoke("GENERATE_FAKE_DATA");
};

const createQuery = async (query) => {
  return await ipcRenderer.invoke("QUERY_SQL", query);
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
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inserto el periodo ${periodo.periodo}`,
    usuario: periodo.usuario,
  });
  return await ipcRenderer.invoke("INSER_PERIODO", periodo);
};

const setNota = async (data) => {
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inserto la nota ${data.nota} al alumno ${data.alumno}`,
    usuario: data.usuario,
  });
  return await ipcRenderer.invoke("SET_NOTA", data);
};

const getNotas = async (data) => {
  return await ipcRenderer.invoke("GET_NOTAS", data);
};

const gradeAlumnos = async (data) => {
  await addBitacora({
    accion: "Insertar",
    descripcion: `Se inicio el proceso de graduar a los alumnos`,
    usuario: data.usuario,
  });
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
  await addBitacora({
    accion: "Actualizar",
    descripcion: `Se actualizo al alumno ${data.dni}`,
    usuario: data.usuario,
  });
  return await ipcRenderer.invoke("UPDATE_ALUMNO", data);
};

const getAniosAndSecciones = async (id) => {
  return await ipcRenderer.invoke("GET_ANIOS_AND_SECCIONS", id);
};

const updateAlumnoSeccionAndAnio = async (data) => {
  await addBitacora({
    accion: "Actualizar",
    descripcion: `Se actualizo al alumno ${data.dni} el año o seccion `,
    usuario: data.usuario,
  });
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

const addBitacora = async (data) => {
  return await ipcRenderer.invoke("ADD_BITACORA", data);
};
const getBitacora = async (data) => {
  return await ipcRenderer.invoke("GET_BITACORA", data);
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
  createQuery,
  getBitacora,
};

contextBridge.exposeInMainWorld("API", API);
