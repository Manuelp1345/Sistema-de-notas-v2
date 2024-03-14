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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const styles_1 = require("@mui/material/styles");
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("react");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const GlobalContext_1 = require("../../config/context/GlobalContext");
const TableCustom_1 = require("../table/TableCustom");
const material_2 = require("@mui/material");
const customModal_1 = require("../modals/customModal");
const ErrorOutline_1 = __importDefault(require("@mui/icons-material/ErrorOutline"));
const moment_1 = __importDefault(require("moment"));
const CheckCircleOutline_1 = __importDefault(require("@mui/icons-material/CheckCircleOutline"));
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    zIndex: 1,
};
const steps = [
    "Datos del Alumno",
    "Datos de Representantes",
    "Datos Academicos",
];
const Alumno = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClickOpen = () => setOpenSeccionAnio(true);
    const handleClickClose = () => setOpenSeccionAnio(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openSeccionAnio, setOpenSeccionAnio] = react_1.default.useState(false);
    const [open, setOpen] = react_1.default.useState(false);
    const [skipped, setSkipped] = (0, react_2.useState)(new Set());
    const [loading, setloading] = react_1.default.useState(true);
    const [activeStep, setActiveStep] = react_1.default.useState(0);
    const [existAlumno, setExistAlumno] = (0, react_2.useState)();
    const [currentYear, setCurrentYear] = react_1.default.useState(0);
    const [aniosAndSecciones, setAniosAndSecciones] = (0, react_2.useState)([]);
    const { areas, alumno } = (0, react_2.useContext)(GlobalContext_1.GlobalContext);
    const { alumno: alumnoDb } = alumno.alumnoId;
    const { representante } = alumnoDb;
    const [updateAlumno, setUpdateAlumno] = (0, react_2.useState)(false);
    const [newAnio, setNewAnio] = (0, react_2.useState)(0);
    const [newSeccion, setNewSeccion] = (0, react_2.useState)("");
    console.log("ALUMNO ID", alumno);
    const [errorDataAlumno, setErrorDataAlumno] = (0, react_2.useState)({
        dni: false,
        firstName: false,
        SecondName: false,
        surname: false,
        secondSurname: false,
        address: false,
        municipality: false,
        state: false,
        phone: false,
        email: false,
        sexo: false,
        fechaNacimiento: false,
        grupoEstable: false,
        condicion: false,
    });
    const [errorDataRepresentante, setErrorDataRepresentante] = (0, react_2.useState)({
        dni: false,
        firstName: false,
        SecondName: false,
        surname: false,
        secondSurname: false,
        address: false,
        municipality: false,
        state: false,
        phone: false,
        email: false,
        filiacion: false,
    });
    const [datosAlumno, setDatosAlumno] = (0, react_2.useState)({
        firsName: alumno.alumnoId.alumno.DatosPersonales.firstName,
        SecondName: alumno.alumnoId.alumno.DatosPersonales.secondName,
        surname: alumno.alumnoId.alumno.DatosPersonales.Surname,
        secondSurname: alumno.alumnoId.alumno.DatosPersonales.secondSurname,
        dni: alumno.alumnoId.alumno.DatosPersonales.dni,
        address: alumno.alumnoId.alumno.DatosPersonales.address,
        municipality: alumno.alumnoId.alumno.DatosPersonales.municipality,
        state: alumno.alumnoId.alumno.DatosPersonales.state,
        cedula: Boolean(((_b = (_a = alumno.alumnoId.alumno.DatosPersonales) === null || _a === void 0 ? void 0 : _a.Documents) === null || _b === void 0 ? void 0 : _b.cedula) || false),
        pasaporte: Boolean(((_d = (_c = alumno.alumnoId.alumno.DatosPersonales) === null || _c === void 0 ? void 0 : _c.Documents) === null || _d === void 0 ? void 0 : _d.pasaporte) || false),
        partidaDeNacimiento: Boolean(((_f = (_e = alumno.alumnoId.alumno.DatosPersonales) === null || _e === void 0 ? void 0 : _e.Documents) === null || _f === void 0 ? void 0 : _f.partida_nacimiento) ||
            false),
        fotos: Boolean(((_h = (_g = alumno.alumnoId.alumno.DatosPersonales) === null || _g === void 0 ? void 0 : _g.Documents) === null || _h === void 0 ? void 0 : _h.fotos_carnet) || false),
        notasEscolares: Boolean(((_k = (_j = alumno.alumnoId.alumno.DatosPersonales) === null || _j === void 0 ? void 0 : _j.Documents) === null || _k === void 0 ? void 0 : _k.notas_escuela) || false),
        observacion: alumno.alumnoId.alumno.observacion,
        condicion: alumno.alumnoId.alumno.condicion,
        grupoEstable: alumno.alumnoId.alumno.grupoEstable,
        fechaNacimiento: (0, moment_1.default)(alumno.alumnoId.alumno.DatosPersonales.DateOfBirth).toDate(),
        phone: Number(alumno.alumnoId.alumno.DatosPersonales.Phone),
        sexo: alumno.alumnoId.alumno.DatosPersonales.sexo,
        email: alumno.alumnoId.alumno.DatosPersonales.email,
    });
    const [datosRepresetante, setDatosRepresetante] = (0, react_2.useState)({
        firstName: representante.DatosPersonales.firstName,
        secondName: representante.DatosPersonales.secondName,
        surname: representante.DatosPersonales.Surname,
        secondSurname: representante.DatosPersonales.secondSurname,
        dni: representante.DatosPersonales.dni,
        address: representante.DatosPersonales.address,
        municipality: representante.DatosPersonales.municipality,
        state: representante.DatosPersonales.state,
        filiacion: representante.parentesco,
        phone: Number(representante.DatosPersonales.Phone),
        alumnoAddress: false,
        email: representante.DatosPersonales.email,
    });
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const validateFirstStep = () => {
        if (activeStep === 0) {
            console.log(errorDataAlumno);
            if (datosAlumno.firsName === "") {
                console.log(errorDataAlumno);
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { firstName: true }));
                return false;
            }
            if (datosAlumno.SecondName === "") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { SecondName: true }));
                return false;
            }
            if (datosAlumno.surname === "") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { surname: true }));
                return false;
            }
            console.log(existAlumno, "existAlumno");
            if (datosAlumno.dni === "" ||
                // @ts-ignore
                (existAlumno && existAlumno.id !== alumno.alumnoId.alumno.id)) {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { dni: true }));
                return false;
            }
            if (datosAlumno.address === "") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { address: true }));
                return false;
            }
            if (datosAlumno.municipality === "") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { municipality: true }));
                return false;
            }
            if (datosAlumno.state === "") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { state: true }));
                return false;
            }
            if (datosAlumno.phone === 0 || datosAlumno.phone.toString().length < 10) {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { phone: true }));
                return false;
            }
            if (datosAlumno.sexo === "select") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { sexo: true }));
                return false;
            }
            if (datosAlumno.email === "" ||
                !datosAlumno.email.includes("@") ||
                !datosAlumno.email.includes(".com")) {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { email: true }));
                return false;
            }
            if (datosAlumno.fechaNacimiento === null ||
                (0, moment_1.default)(datosAlumno.fechaNacimiento).toDate() === (0, moment_1.default)().toDate()) {
                console.log(datosAlumno.fechaNacimiento);
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { fechaNacimiento: true }));
                return false;
            }
            return true;
        }
        if (activeStep === 1) {
            console.log(errorDataRepresentante);
            if (datosRepresetante.dni === "") {
                setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { dni: true }));
                return false;
            }
            if (datosRepresetante.firstName === "") {
                console.log(errorDataAlumno);
                setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { firstName: true }));
                return false;
            }
            if (datosRepresetante.secondName === "") {
                setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { SecondName: true }));
                return false;
            }
            if (datosRepresetante.surname === "") {
                setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { surname: true }));
                return false;
            }
            if (datosRepresetante.filiacion === "") {
                setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { filiacion: true }));
                return false;
            }
            if (datosRepresetante.phone > 0 &&
                datosRepresetante.phone.toString().length < 10) {
                setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { phone: true }));
                return false;
            }
            if (datosRepresetante.email !== "")
                if (!datosRepresetante.email.includes("@") ||
                    !datosRepresetante.email.includes(".com")) {
                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { email: true }));
                    return false;
                }
            if (!datosRepresetante.alumnoAddress) {
                if (datosRepresetante.address === "") {
                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { address: true }));
                    return false;
                }
                if (datosRepresetante.municipality === "") {
                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { municipality: true }));
                    return false;
                }
                if (datosRepresetante.state === "") {
                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { state: true }));
                    return false;
                }
            }
            return true;
        }
        if (activeStep === 2) {
            console.log(errorDataAlumno);
            if (datosAlumno.grupoEstable === "") {
                console.log(errorDataAlumno);
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { grupoEstable: true }));
                return false;
            }
            if (datosAlumno.condicion === "") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { condicion: true }));
                return false;
            }
            return true;
        }
    };
    const handleNext = () => __awaiter(void 0, void 0, void 0, function* () {
        let newSkipped = skipped;
        const newActive = activeStep;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        if (newActive === 2) {
            if (datosRepresetante.alumnoAddress === true) {
                setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { fechaNacimiento: (0, moment_1.default)(datosAlumno.fechaNacimiento).toDate() }));
            }
            console.log("completado");
            yield update();
        }
    });
    const update = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            seccion: alumno.alumnoId.seccione.id,
            alumno: datosAlumno,
            representante: datosRepresetante,
            usuario: user.email,
            dni: alumno.alumnoId.alumno.DatosPersonales.dni,
        };
        console.log(data);
        //@ts-ignore
        const response = yield window.API.updateAlumno(data);
        setloading(false);
        if (response === true) {
            setUpdateAlumno(response);
        }
        else {
            setUpdateAlumno(false);
        }
        return response;
    });
    const getAniosAndSecciones = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getAniosAndSecciones(alumno.alumnoId.anio.periodo.id);
        setAniosAndSecciones(response);
    });
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setloading(true);
        setActiveStep(0);
    };
    const validateDniAlumno = (dni) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getAlumnoByDni(dni);
        console.log(response);
        setExistAlumno(response);
        return response;
    });
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    const getNotas = (data) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const resnotas = yield window.API.getNotas(data);
        console.log(resnotas);
        const notasMap = {};
        resnotas.forEach((nota) => {
            notasMap[`${nota.materia.id}-${nota.momento}`] = nota;
            if (nota.recuperacion.length > 0) {
                notasMap[`${nota.materia.id}-${nota.momento}rp`] = Object.assign(Object.assign({}, nota), { nota: nota.recuperacion[0].Nota });
            }
        });
        console.log(notasMap);
        return notasMap;
    });
    const handledSetNota = (newCell) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(newCell);
        const data = newCell;
        if (newCell["1"]) {
            data.nota = newCell["1"];
            data.momento = "1";
            data.rp = false;
        }
        if (newCell["2"]) {
            data.nota = newCell["2"];
            data.momento = "2";
            data.rp = false;
        }
        if (newCell["3"]) {
            data.nota = newCell["3"];
            data.momento = "3";
            data.rp = false;
        }
        if (newCell["1rp"]) {
            data.nota = newCell["1rp"];
            data.momento = "1";
            data.rp = true;
        }
        if (newCell["2rp"]) {
            data.nota = newCell["2rp"];
            data.momento = "2";
            data.rp = true;
        }
        if (newCell["3rp"]) {
            data.nota = newCell["3rp"];
            data.momento = "3";
            data.rp = true;
        }
        console.log("data", data);
        // @ts-ignore
        data.alumnoId = alumno.alumnoId.alumno.id;
        data.alumno = `${datosAlumno.firsName.toUpperCase()} ${datosAlumno.firsName.toUpperCase()} ${datosAlumno.dni}`;
        data.usuario = user.email;
        delete data.firstName;
        console.log("data", data);
        // @ts-ignore
        const res = yield window.API.setNota(data);
        console.log(res);
        yield getData();
        return newCell;
    });
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const anio = yield window.API.getAnio(id);
        console.log(anio);
        setCurrentYear(anio.id);
        // @ts-ignore
        const findSecciones = yield getSecciones(anio.id);
        console.log(findSecciones);
        const findAreas = yield getAreas(anio.id);
        console.log(findAreas);
        const resNotas = yield getNotas({
            alumnoId: alumno.alumnoId.alumno.id,
            añoId: anio.id,
        });
        console.log(resNotas);
        if (areas.areas)
            areas.setAreas(areas.areas.map((area) => {
                let momentoOne = 0;
                let momentoTwo = 0;
                let momentoThree = 0;
                if (resNotas[`${area.id}-1`]) {
                    area["1"] = resNotas[`${area.id}-1`].nota;
                    momentoOne = Number(resNotas[`${area.id}-1`].nota);
                    if (resNotas[`${area.id}-1rp`]) {
                        area["1rp"] = resNotas[`${area.id}-1rp`].nota;
                        momentoOne = Number(resNotas[`${area.id}-1rp`].nota);
                    }
                }
                if (resNotas[`${area.id}-2`]) {
                    area["2"] = resNotas[`${area.id}-2`].nota;
                    momentoTwo = Number(resNotas[`${area.id}-2`].nota);
                    if (resNotas[`${area.id}-2rp`]) {
                        area["2rp"] = resNotas[`${area.id}-2rp`].nota;
                        momentoTwo = Number(resNotas[`${area.id}-2rp`].nota);
                    }
                }
                if (resNotas[`${area.id}-3`]) {
                    area["3"] = resNotas[`${area.id}-3`].nota;
                    momentoThree = Number(resNotas[`${area.id}-3`].nota);
                    if (resNotas[`${area.id}-3rp`]) {
                        area["3rp"] = resNotas[`${area.id}-3rp`].nota;
                        momentoThree = Number(resNotas[`${area.id}-3rp`].nota);
                    }
                }
                let total = "0";
                if (area["1"] && area["2"] && area["3"])
                    total = ((Number(momentoOne) + Number(momentoTwo) + Number(momentoThree)) /
                        3).toFixed(2);
                // @ts-ignore
                area["total"] = isNaN(Number(total)) ? 0 : total;
                return area;
            }));
        yield getAniosAndSecciones();
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSecciones(id);
        console.log(findSecciones);
        // @ts-ignore
        return { data: findSecciones, itemsCount: 0 };
    });
    const getAreas = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findAreas = yield window.API.getAreas(id);
        console.log(findAreas);
        // @ts-ignore
        return { data: findAreas, itemsCount: 0 };
    });
    const generarBoletin = () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const res = yield window.API.generarBoletin({
            alumnoId: alumno.alumnoId.alumno.id,
            anioId: alumno.alumnoId.anio.id,
            periodoId: alumno.alumnoId.anio.periodo.id,
        });
        console.log(res);
        if (res && res !== "cancelado") {
            sweetalert2_1.default.fire({
                title: "Boletin generado",
                text: "El boletin se ha generado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
        }
    });
    const handleChange = (event) => {
        setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
            //@ts-ignore
            condicion: event.target.value }));
    };
    const handleChangeSexo = (event) => {
        setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
            //@ts-ignore
            sexo: event.target.value }));
        setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { sexo: false }));
    };
    const validateRepresentanteDNI = (dni) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getRepresentanteByDni(dni);
        if (response) {
            sweetalert2_1.default.fire({
                title: "El Rrepresentante ya existe",
                text: "Desea cargar los datos del representante?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
            }).then((result) => {
                if (result.isConfirmed) {
                    setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { address: response.DatosPersonales.address, email: response.DatosPersonales.email, firstName: response.DatosPersonales.firstName, municipality: response.DatosPersonales.municipality, phone: response.DatosPersonales.Phone, surname: response.DatosPersonales.Surname, secondName: response.DatosPersonales.secondName, secondSurname: response.DatosPersonales.secondSurname, state: response.DatosPersonales.state, filiacion: response.parentesco }));
                }
            });
        }
        console.log(response);
    });
    const updateAnioAndSeccion = () => __awaiter(void 0, void 0, void 0, function* () {
        var _m;
        console.log("new anio", newAnio);
        console.log("new seccion", newSeccion);
        const seccionId = (_m = aniosAndSecciones
            .find((anio) => anio.numberAnio === newAnio)) === null || _m === void 0 ? void 0 : _m.secciones.find((seccion) => seccion.seccion === newSeccion);
        const anioId = aniosAndSecciones.find((anio) => anio.numberAnio === newAnio);
        console.log(seccionId, "seccionId");
        const data = {
            alumno: {
                dni: alumno.alumnoId.alumno.DatosPersonales.dni,
            },
            etapa: alumno.alumnoId.id,
            seccion: seccionId === null || seccionId === void 0 ? void 0 : seccionId.id,
            anio: anioId,
            usuario: user.email,
        };
        console.log(data);
        // @ts-ignore
        const res = yield window.API.updateAlumnoSeccionAndAnio(data);
        console.log(res);
        if (res) {
            sweetalert2_1.default.fire({
                title: "Sección y año actualizados",
                text: "Se ha actualizado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            navigate("/anos");
        }
        else {
            sweetalert2_1.default.fire({
                title: "Error",
                text: "Ha ocurrido un error",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    });
    (0, react_2.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
            setNewAnio(alumno.alumnoId.anio.numberAnio);
            setNewSeccion(alumno.alumnoId.seccione.seccion);
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    navigate(-1);
                    if (areas.areas)
                        areas.setAreas(areas.areas.map((area) => {
                            delete area["1"];
                            delete area["2"];
                            delete area["3"];
                            delete area["1rp"];
                            delete area["2rp"];
                            delete area["3rp"];
                            return area;
                        }));
                } }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, { sx: { mr: 1 } }), "Volver"] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                } }, { children: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", component: "h1", gutterBottom: true }, { children: ["Informacion del Alumno ", (0, jsx_runtime_1.jsx)("br", {})] })) })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    gap: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                } }, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h5", component: "h2", gutterBottom: true }, { children: [datosAlumno.firsName.toUpperCase(), " ", datosAlumno.SecondName.toUpperCase(), " ", datosAlumno.surname.toUpperCase(), " ", datosAlumno.secondSurname.toUpperCase(), " |", " ", alumno.alumnoId.anio.anio, " \"", alumno.alumnoId.seccione.seccion, "\"", (0, jsx_runtime_1.jsx)("br", {})] })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", onClick: handleOpen }, { children: "Informacion del Alumno" })), alumno.alumnoId.alumno.condicion !== "Graduado" && ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", onClick: handleClickOpen }, { children: "Cambiar Seccion / A\u00F1o" }))), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", onClick: generarBoletin }, { children: "Generar Boletin" }))] })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "2.5rem" }, id: "Secciones", component: "div" }), (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: "\u00C1reas" })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { columns: [
                            {
                                field: "id",
                                headerName: "ID",
                                disableExport: true,
                                hide: true,
                            },
                            {
                                field: "nombre",
                                headerName: "Area",
                                headerClassName: "backGround",
                                width: 130,
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                            },
                            {
                                field: "1",
                                headerName: "Primer Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                type: "number",
                                align: "center",
                                editable: true,
                                renderCell: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            width: "1rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                        } }, { children: (0, jsx_runtime_1.jsx)(material_2.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue, "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
                                },
                            },
                            {
                                field: "1rp",
                                headerName: "Ajuste Primer Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                type: "number",
                                align: "center",
                                editable: true,
                                renderCell: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            width: "1rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                        } }, { children: (0, jsx_runtime_1.jsx)(material_2.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue, "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
                                },
                            },
                            {
                                field: "2",
                                headerName: "Segundo Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                type: "number",
                                align: "center",
                                editable: true,
                                renderCell: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            width: "1rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                        } }, { children: (0, jsx_runtime_1.jsx)(material_2.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue, "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
                                },
                            },
                            {
                                field: "2rp",
                                headerName: "Ajuste Segundo Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                type: "number",
                                align: "center",
                                editable: true,
                                renderCell: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            width: "1rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                        } }, { children: (0, jsx_runtime_1.jsx)(material_2.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue, "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
                                },
                            },
                            {
                                field: "3",
                                headerName: "Tercer Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                                type: "number",
                                editable: true,
                                renderCell: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            width: "1rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                        } }, { children: (0, jsx_runtime_1.jsx)(material_2.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue, "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
                                },
                            },
                            {
                                field: "3rp",
                                headerName: "Ajuste Tercer Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                                type: "number",
                                editable: true,
                                renderCell: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            width: "1rem",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                        } }, { children: (0, jsx_runtime_1.jsx)(material_2.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue, "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
                                },
                            },
                            {
                                field: "total",
                                headerName: "Nota Final",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                                type: "number",
                            },
                        ], rows: areas.areas, loading: false, handleClick: () => {
                            console.log("first");
                        }, handleDobleClick: () => {
                            console.log("first");
                        }, toolbar: true, handleEditCell: handledSetNota })] }), (0, jsx_runtime_1.jsx)(material_1.Modal, Object.assign({ sx: { zIndex: 20 }, open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: style }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { width: "100%", height: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Stepper, Object.assign({ activeStep: activeStep }, { children: steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (index === 0) {
                                        //@ts-ignore
                                        labelProps.optional = ((0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "caption" }, { children: "Paso Uno" })));
                                    }
                                    if (index === 1) {
                                        //@ts-ignore
                                        labelProps.optional = ((0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "caption" }, { children: "Paso Dos" })));
                                    }
                                    if (index === 2) {
                                        //@ts-ignore
                                        labelProps.optional = ((0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "caption" }, { children: "Paso Tres" })));
                                    }
                                    if (isStepSkipped(index)) {
                                        //@ts-ignore
                                        stepProps.completed = false;
                                    }
                                    return ((0, jsx_runtime_1.jsx)(material_1.Step, Object.assign({}, stepProps, { children: (0, jsx_runtime_1.jsx)(material_1.StepLabel, Object.assign({}, labelProps, { children: label })) }), label));
                                }) })), activeStep === steps.length ? ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                    } }, { children: (0, jsx_runtime_1.jsx)(material_2.CircularProgress, { sx: { my: "5rem" } }) }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            } }, { children: updateAlumno ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CheckCircleOutline_1.default, { sx: {
                                                            fontSize: "5rem",
                                                            color: "#4caf50",
                                                            my: "5rem",
                                                        } }), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: "Alumno Ingresado Correctamente" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorOutline_1.default, { sx: {
                                                            fontSize: "5rem",
                                                            color: "#f44336",
                                                            my: "5rem",
                                                        } }), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: "Error al Ingresar Alumno" }))] })) })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "row", pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flex: "1 1 auto" } }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
                                                        handleClose();
                                                        handleReset();
                                                    } }, { children: "Cerrar" }))] }))] })) })) : ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: [activeStep === 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Datos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "1rem",
                                                            flexWrap: "wrap",
                                                            rowGap: "3rem",
                                                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.firsName, onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { firsName: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { firstName: false }));
                                                                        }, label: "Primer Nombre", variant: "standard", error: errorDataAlumno.firstName, helperText: errorDataAlumno.firstName &&
                                                                            'El campo "Primer Nombre" es obligatorio' }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.SecondName, error: errorDataAlumno.SecondName, helperText: errorDataAlumno.SecondName &&
                                                                            'El campo "Segundo Nombre" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { SecondName: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { SecondName: false }));
                                                                        }, label: "Segundo Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.surname, error: errorDataAlumno.surname, helperText: errorDataAlumno.surname &&
                                                                            'El campo "Primer Apellido" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { surname: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { surname: false }));
                                                                        }, label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.secondSurname, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { secondSurname: e.target.value })), label: "Segundo Apellido", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.dni, error: errorDataAlumno.dni, helperText: errorDataAlumno.dni &&
                                                                            "El Numero ya existe / no es valido", onChange: (e) => __awaiter(void 0, void 0, void 0, function* () {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { dni: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { dni: false }));
                                                                        }), onKeyUp: () => __awaiter(void 0, void 0, void 0, function* () {
                                                                            const response = yield validateDniAlumno(datosAlumno.dni);
                                                                            if (response.id !== alumno.alumnoId.alumno.id)
                                                                                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { dni: response }));
                                                                        }), label: "Cedula /Pasaporte /Cedula Escolar", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.address, error: errorDataAlumno.address, helperText: errorDataAlumno.address &&
                                                                            'El campo "Direccion" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { address: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { address: false }));
                                                                        }, label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.municipality, error: errorDataAlumno.municipality, helperText: errorDataAlumno.municipality &&
                                                                            'El campo "Municipio" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { municipality: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { municipality: false }));
                                                                        }, label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.state, error: errorDataAlumno.state, helperText: errorDataAlumno.state &&
                                                                            'El campo "Estado" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { state: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { state: false }));
                                                                        }, label: "Estado", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.email, error: errorDataAlumno.email, helperText: errorDataAlumno.email &&
                                                                            'El campo "Correo" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { email: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { email: false }));
                                                                        }, label: "Correo", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: Number(datosAlumno.phone), error: errorDataAlumno.phone, helperText: errorDataAlumno.phone &&
                                                                            'El campo "Telefono" es obligatorio', onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { phone: Number(e.target.value) }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { phone: false }));
                                                                        }, label: "Telefono", variant: "standard" }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { color: "gray" } }, { children: "Fechan de nacimiento" })), (0, jsx_runtime_1.jsx)(material_1.Input, { type: "Date", value: alumno.alumnoId.alumno.DatosPersonales
                                                                                    .DateOfBirth, error: errorDataAlumno.fechaNacimiento, onBlur: (e) => {
                                                                                    //@ts-ignore
                                                                                    setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                        //@ts-ignore
                                                                                        fechaNacimiento: 
                                                                                        //@ts-ignore
                                                                                        e.target.value }));
                                                                                    setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { fechaNacimiento: false }));
                                                                                    console.log(datosAlumno);
                                                                                }, onChangeCapture: (e) => {
                                                                                    //@ts-ignore
                                                                                    console.log(e.target.value);
                                                                                    setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                        //@ts-ignore
                                                                                        fechaNacimiento: 
                                                                                        //@ts-ignore
                                                                                        e.target.value }));
                                                                                    setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { fechaNacimiento: false }));
                                                                                    console.log(datosAlumno);
                                                                                } }), errorDataAlumno.fechaNacimiento && ((0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: { color: "red", fontSize: ".9rem" } }, { children: ['El campo "Fechan de nacimiento"', " ", (0, jsx_runtime_1.jsx)("br", {}), " ", " es obligatorio"] })))] }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Sexo" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: datosAlumno.sexo, label: "Condicion", onChange: handleChangeSexo }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ disabled: true, value: "select" }, { children: "Sexo" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "F" }, { children: "Femenino" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "M" }, { children: "Masculino" }))] })), errorDataAlumno.sexo && ((0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: { color: "red", fontSize: ".9rem" } }, { children: ['El campo "Sexo"', " ", (0, jsx_runtime_1.jsx)("br", {}), " ", " es obligatorio"] })))] })] }))] }))] })), activeStep === 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Datos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "1rem",
                                                            flexWrap: "wrap",
                                                            rowGap: "3rem",
                                                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.dni, error: errorDataRepresentante.dni, helperText: errorDataRepresentante.dni &&
                                                                            'El campo "Cedula / Pasaporte" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                dni: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { dni: false }));
                                                                        }, onKeyUp: () => validateRepresentanteDNI(datosRepresetante.dni), label: "Cedula / Pasaporte", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.firstName, error: errorDataRepresentante.firstName, helperText: errorDataRepresentante.firstName &&
                                                                            'El campo "Primer Nombre" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                firstName: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { firstName: false }));
                                                                        }, label: "Primer Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.secondName, error: errorDataRepresentante.SecondName, helperText: errorDataRepresentante.SecondName &&
                                                                            'El campo "Segundo Nombre" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                secondName: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { SecondName: false }));
                                                                        }, label: "Segundo Nombre", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "100%",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.surname, error: errorDataRepresentante.surname, helperText: errorDataRepresentante.surname &&
                                                                            'El campo "Primer Apellido" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                surname: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { surname: false }));
                                                                        }, label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.secondSurname, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            secondSurname: e.target.value })), label: "Segundo Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.filiacion, error: errorDataRepresentante.filiacion, helperText: errorDataRepresentante.filiacion &&
                                                                            'El campo "Filiación" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                filiacion: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { filiacion: false }));
                                                                        }, label: "Filiaci\u00F3n", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "100%",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.phone, error: errorDataRepresentante.phone, helperText: errorDataRepresentante.phone &&
                                                                            'El campo "Telefono" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                phone: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { phone: false }));
                                                                        }, label: "Telefono", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.email, error: errorDataRepresentante.email, helperText: errorDataRepresentante.email &&
                                                                            'El campo "Email" es obligatorio', onChange: (e) => {
                                                                            setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                email: e.target.value }));
                                                                            setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { email: false }));
                                                                        }, label: "Email", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    flexWrap: "wrap",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_2.FormGroup, Object.assign({ sx: {
                                                                            width: "100%",
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { sx: {
                                                                                display: "flex",
                                                                                justifyContent: "center",
                                                                            }, control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "\u00BFEl estudiante vive con el represetante?", value: datosRepresetante.alumnoAddress, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                //@ts-ignore
                                                                                alumnoAddress: e.target.checked, address: datosAlumno.address, municipality: datosAlumno.municipality, state: datosAlumno.state })) }) })), !datosRepresetante.alumnoAddress && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.address, error: errorDataRepresentante.address, helperText: errorDataRepresentante.address &&
                                                                                    'El campo "Direccion" es obligatorio', onChange: (e) => {
                                                                                    setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                        //@ts-ignore
                                                                                        address: e.target.value }));
                                                                                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { address: false }));
                                                                                }, label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.municipality, error: errorDataRepresentante.municipality, helperText: errorDataRepresentante.municipality &&
                                                                                    'El campo "Municipio" es obligatorio', onChange: (e) => {
                                                                                    setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                        //@ts-ignore
                                                                                        municipality: e.target.value }));
                                                                                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { municipality: false }));
                                                                                }, label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.state, error: errorDataRepresentante.state, helperText: errorDataRepresentante.state &&
                                                                                    'El campo "Estado" es obligatorio', onChange: (e) => {
                                                                                    setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                        //@ts-ignore
                                                                                        state: e.target.value }));
                                                                                    setErrorDataRepresentante(Object.assign(Object.assign({}, errorDataRepresentante), { state: false }));
                                                                                }, label: "Estado", variant: "standard" })] }))] }))] }))] })), activeStep === 2 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Informaci\u00F3n acad\u00E9mica" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "1rem",
                                                            flexWrap: "wrap",
                                                            rowGap: "3rem",
                                                            mt: 5,
                                                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "80%",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { sx: { width: "100%" }, label: "Grupo Estable", variant: "standard", error: errorDataAlumno.grupoEstable, helperText: errorDataAlumno.grupoEstable &&
                                                                            'El campo "Grupo Estable" es obligatorio', value: datosAlumno.grupoEstable, onChange: (e) => {
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                grupoEstable: e.target.value }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { grupoEstable: false }));
                                                                        } }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Condicion" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ error: errorDataAlumno.condicion, labelId: "demo-simple-select-label", id: "demo-simple-select", value: datosAlumno.condicion, label: "Condicion", onChange: handleChange }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Nuevo Ingreso" }, { children: "Nuevo Ingreso" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Regular" }, { children: "Regular" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Repitiente" }, { children: "Repitiente" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Retirado" }, { children: "Retirado" }))] }))] }))] })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Documentos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_2.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), value: datosAlumno.cedula, checked: datosAlumno.cedula, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                cedula: e.target.checked })), label: "Cedula" }) }), (0, jsx_runtime_1.jsx)(material_2.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Pasaporte", value: datosAlumno.pasaporte, checked: datosAlumno.pasaporte, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                pasaporte: e.target.checked })) }) }), (0, jsx_runtime_1.jsx)(material_2.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Partida de nacimiento", value: datosAlumno.partidaDeNacimiento, checked: datosAlumno.partidaDeNacimiento, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                partidaDeNacimiento: e.target.checked })) }) }), (0, jsx_runtime_1.jsx)(material_2.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Fotos tipo carnet", checked: datosAlumno.fotos, value: datosAlumno.fotos, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                fotos: e.target.checked })) }) }), (0, jsx_runtime_1.jsx)(material_2.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Notas Escolares", checked: datosAlumno.notasEscolares, value: datosAlumno.notasEscolares, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                notasEscolares: e.target.checked })) }) })] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "100%",
                                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Nota ( Opcional )", variant: "standard", sx: {
                                                                        width: "100%",
                                                                    }, value: datosAlumno.observacion, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                        //@ts-ignore
                                                                        observacion: e.target.value })) }) }))] }))] }))] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "row", pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ color: "inherit", disabled: activeStep === 0, onClick: handleBack, sx: { mr: 1 } }, { children: "Atras" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                                    display: "flex",
                                                    flex: "1 1 auto",
                                                    justifyContent: "center",
                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ color: "inherit", onClick: handleClose, sx: { mr: 1 } }, { children: "Cerrar" })) })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
                                                    const FirstStep = validateFirstStep();
                                                    console.log("FirstStep", FirstStep);
                                                    if (FirstStep)
                                                        handleNext();
                                                } }, { children: activeStep === steps.length - 1
                                                    ? "Actualizar Datos"
                                                    : "Siguiente" }))] }))] }))] })) })) })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ btnText: "Actualizar", handleCloseDialog: handleClickClose, openDialog: openSeccionAnio, handledConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield updateAnioAndSeccion();
                    handleClickClose();
                }), tittle: "Actualizar Datos", color: "primary" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                        rowGap: "3rem",
                        width: "500px",
                        mt: 5,
                    } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "1rem",
                                flexWrap: "wrap",
                                rowGap: "3rem",
                                mt: 5,
                            } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold", fontSize: "1.5rem" }, { children: "A\u00F1o" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "1rem",
                                    } }, { children: (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "A\u00F1o" })), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", label: "A\u00F1o", value: newAnio, onChange: (e) => {
                                                    setNewAnio(e.target.value);
                                                } }, { children: aniosAndSecciones.map((anio) => {
                                                    return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: anio.numberAnio }, { children: anio.anio })));
                                                }) }))] })) }))] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "1rem",
                                flexWrap: "wrap",
                                rowGap: "3rem",
                                mt: 5,
                            } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold", fontSize: "1.5rem" }, { children: "Seccion" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "1rem",
                                    } }, { children: (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Seccion" })), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", label: "Seccion", value: newSeccion, onChange: (e) => {
                                                    setNewSeccion(e.target.value);
                                                } }, { children: 
                                                //@ts-ignore
                                                (_l = aniosAndSecciones
                                                    .find((anio) => anio.numberAnio === newAnio)) === null || _l === void 0 ? void 0 : _l.secciones.map((seccion) => {
                                                    return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: seccion.seccion }, { children: seccion.seccion })));
                                                }) }))] })) }))] }))] })) }))] })));
};
exports.default = Alumno;
//# sourceMappingURL=alumno.js.map