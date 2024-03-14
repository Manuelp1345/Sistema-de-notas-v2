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
const material_2 = require("@mui/material");
const moment_1 = __importDefault(require("moment"));
const TableCustom_1 = require("../table/TableCustom");
const GlobalContext_1 = require("../../config/context/GlobalContext");
const CheckCircleOutline_1 = __importDefault(require("@mui/icons-material/CheckCircleOutline"));
const ErrorOutline_1 = __importDefault(require("@mui/icons-material/ErrorOutline"));
const initialStateAlumno = {
    firsName: "",
    SecondName: "",
    surname: "",
    secondSurname: "",
    dni: "",
    address: "",
    municipality: "",
    state: "",
    cedula: false,
    pasaporte: false,
    partidaDeNacimiento: false,
    fotos: false,
    notasEscolares: false,
    observacion: "",
    condicion: "",
    grupoEstable: "",
    fechaNacimiento: null,
    phone: Number(0),
    sexo: "select",
    email: "",
};
const initialStateRepresentante = {
    firstName: "",
    secondName: "",
    surname: "",
    secondSurname: "",
    dni: "",
    address: "",
    municipality: "",
    state: "",
    filiacion: "",
    phone: 0,
    alumnoAddress: false,
    email: "",
};
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
const Seccion = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [anio, setAnio] = (0, react_2.useState)({});
    const [secciones, setSecciones] = (0, react_2.useState)({ seccion: "loading", id: 0 });
    const [activeStep, setActiveStep] = react_1.default.useState(0);
    const [existAlumno, setExistAlumno] = (0, react_2.useState)(false);
    const [inserAlumno, setInserAlumno] = (0, react_2.useState)(false);
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
    const [skipped, setSkipped] = (0, react_2.useState)(new Set());
    //  @ts-ignore
    const [alumnos, setAlumnos] = (0, react_2.useState)([{ id: 0 }]);
    const { areas, alumno } = (0, react_2.useContext)(GlobalContext_1.GlobalContext);
    const [datosAlumno, setDatosAlumno] = (0, react_2.useState)(initialStateAlumno);
    const [datosRepresetante, setDatosRepresetante] = (0, react_2.useState)({
        firstName: "",
        secondName: "",
        surname: "",
        secondSurname: "",
        dni: "",
        address: "",
        municipality: "",
        state: "",
        filiacion: "",
        phone: 0,
        alumnoAddress: false,
        email: "",
    });
    const [open, setOpen] = react_1.default.useState(false);
    const [loading, setloading] = react_1.default.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
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
    const validateDniAlumno = (dni) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getAlumnoByDni(dni);
        setExistAlumno(response);
        return response;
    });
    const validateRepresentanteDNI = (dni) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getRepresentanteByDni(dni);
        if (response) {
            sweetalert2_1.default.fire({
                title: "Atención",
                text: "El representante que está tratando de agregar ya existe en el sistema. ¿Desea cargar la información del representante en el formulario. ",
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
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    const insertAlumno = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            seccion: secciones.id,
            alumno: datosAlumno,
            representante: datosRepresetante,
            usuario: user.email,
            dni: datosAlumno.dni,
        };
        //@ts-ignore
        const response = yield window.API.insertAlumno(data);
        setloading(false);
        const findAlumnos = yield getAlumno(secciones.id);
        console.log(findAlumnos);
        console.log("response inser alumno", response);
        if (response === true) {
            setInserAlumno(response);
            setDatosAlumno(initialStateAlumno);
            setDatosRepresetante(initialStateRepresentante);
        }
        else {
            setInserAlumno(false);
        }
        return response;
    });
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
            if (datosAlumno.dni === "" || existAlumno) {
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
            if (datosAlumno.sexo === "select") {
                setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { sexo: true }));
                return false;
            }
            if (datosAlumno.email !== "")
                if (!datosAlumno.email.includes("@") ||
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
            yield insertAlumno();
            console.log("completado");
        }
    });
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setloading(true);
        setActiveStep(0);
    };
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ID SECCION", id);
        // @ts-ignore
        const findSecciones = yield getSecciones(id);
        console.log(findSecciones);
        // @ts-ignore
        const anio = yield window.API.getAnio(findSecciones.anio.id);
        console.log(anio);
        setAnio(anio);
        const findAlumnos = yield getAlumno(findSecciones.id);
        console.log(findAlumnos);
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSeccion(id);
        console.log(findSecciones);
        setSecciones(findSecciones);
        // @ts-ignore
        return findSecciones;
    });
    const getAlumno = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id seccion", id);
        // @ts-ignore
        const findSecciones = yield window.API.getAlumno(id);
        setAlumnos(findSecciones.map((alumno) => {
            alumno.firstName =
                `${alumno.alumno.DatosPersonales.firstName}`.toLocaleUpperCase();
            alumno.secondName =
                `${alumno.alumno.DatosPersonales.secondName}`.toLocaleUpperCase();
            alumno.Surname =
                `${alumno.alumno.DatosPersonales.Surname}`.toLocaleUpperCase();
            alumno.secondSurname =
                `${alumno.alumno.DatosPersonales.secondSurname}`.toLocaleUpperCase();
            alumno.dni = alumno.alumno.DatosPersonales.dni;
            return alumno;
        }));
        // @ts-ignore
        return findSecciones;
    });
    const handleClickRow = (param) => {
        console.log(param);
        alumno.setAlumnoId(alumnos.find((datos) => datos.id === param.id));
        navigate("/alumno");
    };
    (0, react_2.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
        }))();
        console.log(alumnos);
        console.log(areas.areas);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    setSecciones({ seccion: "loading", id: 0 });
                    // @ts-ignore
                    setAlumnos([{ id: 0 }]);
                    navigate(-1);
                } }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, { sx: { mr: 1 } }), "Volver"] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                } }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", component: "h1", gutterBottom: true }, { children: 
                    // @ts-ignore
                    `${anio.anio} SECCIÓN "${(secciones && secciones.seccion) || "loading"}"` })) })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginTop: "2rem",
                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleOpen, sx: {
                        fontWeight: "bold",
                    }, variant: "outlined" }, { children: "Agregar Alumno" })) })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { toolbar: true, columns: [
                    {
                        field: "id",
                        headerName: "ID",
                        disableExport: true,
                        hide: true,
                    },
                    {
                        field: "dni",
                        headerName: "C.I",
                        headerClassName: "backGround",
                        width: 130,
                        headerAlign: "center",
                        flex: 1,
                        align: "center",
                    },
                    {
                        field: "firstName",
                        headerName: "Nombre",
                        width: 130,
                        headerClassName: "backGround",
                        headerAlign: "center",
                        flex: 1,
                        align: "center",
                    },
                    {
                        field: "secondName",
                        headerName: "Segundo Nombre",
                        width: 130,
                        headerClassName: "backGround",
                        headerAlign: "center",
                        flex: 1,
                        align: "center",
                    },
                    {
                        field: "Surname",
                        headerName: "Apellido",
                        width: 130,
                        headerClassName: "backGround",
                        headerAlign: "center",
                        flex: 1,
                        align: "center",
                    },
                    {
                        field: "secondSurname",
                        headerName: "Segundo Apellido",
                        width: 130,
                        headerClassName: "backGround",
                        headerAlign: "center",
                        flex: 1,
                        align: "center",
                    },
                ], rows: alumnos, loading: false, handleDobleClick: () => {
                    console.log("first");
                }, handleClick: handleClickRow }), (0, jsx_runtime_1.jsx)(material_1.Modal, Object.assign({ sx: { zIndex: 20 }, open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: style }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { width: "100%", height: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Stepper, Object.assign({ activeStep: activeStep }, { children: steps.map((label, index) => {
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
                                            } }, { children: inserAlumno ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CheckCircleOutline_1.default, { sx: {
                                                            fontSize: "5rem",
                                                            color: "#4caf50",
                                                            my: "5rem",
                                                        } }), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: "Alumno Ingresado Correctamente" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorOutline_1.default, { sx: {
                                                            fontSize: "5rem",
                                                            color: "#f44336",
                                                            my: "5rem",
                                                        } }), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: "Error al Ingresar Alumno" }))] })) })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "row", pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flex: "1 1 auto" } }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleReset }, { children: "Ingresar Otro Alumno" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
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
                                                                            if (e.target.value.length > 11)
                                                                                return;
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { phone: Number(e.target.value) }));
                                                                            setErrorDataAlumno(Object.assign(Object.assign({}, errorDataAlumno), { phone: false }));
                                                                        }, label: "Telefono", variant: "standard" }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { color: "gray" } }, { children: "Fechan de nacimiento" })), (0, jsx_runtime_1.jsx)(material_1.Input, { type: "Date", error: errorDataAlumno.fechaNacimiento, onBlur: (e) => {
                                                                                    //@ts-ignore
                                                                                    console.log(e.target.value);
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
                                                                            if (e.target.value.length > 11)
                                                                                return;
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
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.FormGroup, Object.assign({ sx: {
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
                                                                        } }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Condicion" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ error: errorDataAlumno.condicion, labelId: "demo-simple-select-label", id: "demo-simple-select", value: datosAlumno.condicion, label: "Condicion", onChange: handleChange }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Nuevo Ingreso" }, { children: "Nuevo Ingreso" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Regular" }, { children: "Regular" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Repitiente" }, { children: "Repitiente" }))] }))] }))] })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Documentos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), value: datosAlumno.cedula, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                cedula: e.target.checked })), label: "Cedula" }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Pasaporte", value: datosAlumno.pasaporte, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                pasaporte: e.target.checked })) }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Partida de nacimiento", value: datosAlumno.partidaDeNacimiento, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                partidaDeNacimiento: e.target.checked })) }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Fotos tipo carnet", value: datosAlumno.fotos, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                fotos: e.target.checked })) }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Notas Escolares", value: datosAlumno.notasEscolares, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
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
                                                    ? "Registrar Datos"
                                                    : "Siguiente" }))] }))] }))] })) })) }))] })));
};
exports.default = Seccion;
//# sourceMappingURL=seccion.js.map