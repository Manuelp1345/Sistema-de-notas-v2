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
const material_2 = require("@mui/material");
const moment_1 = __importDefault(require("moment"));
const TableCustom_1 = require("../table/TableCustom");
const GlobalContext_1 = require("../../config/context/GlobalContext");
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
    const [skipped, setSkipped] = (0, react_2.useState)(new Set());
    const [alumnos, setAlumnos] = (0, react_2.useState)([{ id: 0 }]);
    const { areas, alumno } = (0, react_2.useContext)(GlobalContext_1.GlobalContext);
    const [datosAlumno, setDatosAlumno] = (0, react_2.useState)({
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
        fechaNacimiento: new Date(),
        phone: 0,
        sexo: "",
        email: "",
    });
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
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const insertAlumno = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            seccion: secciones.id,
            alumno: datosAlumno,
            representante: datosRepresetante,
        };
        //@ts-ignore
        const response = yield window.API.insertAlumno(data);
        setloading(false);
        const findAlumnos = yield getAlumno(secciones.id);
        console.log(findAlumnos);
        return response;
    });
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
                console.log("misma dirrecion");
                setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { address: datosAlumno.address, municipality: datosAlumno.municipality, state: datosAlumno.state }));
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
        const alumnos = findSecciones.map((data) => {
            data.alumno.DatosPersonales.firstName =
                `${data.alumno.DatosPersonales.firstName}`.toUpperCase();
            data.alumno.DatosPersonales.secondName =
                `${data.alumno.DatosPersonales.secondName}`.toUpperCase();
            data.alumno.DatosPersonales.Surname =
                `${data.alumno.DatosPersonales.Surname}`.toUpperCase();
            data.alumno.DatosPersonales.secondSurname =
                `${data.alumno.DatosPersonales.secondSurname}`.toUpperCase();
            data.alumno.idDatos = data.alumno.DatosPersonales.id;
            delete data.alumno.DatosPersonales.id;
            data.alumno = Object.assign(Object.assign({}, data.alumno), data.alumno.DatosPersonales);
            delete data.alumno.DatosPersonales;
            return data.alumno;
        });
        setAlumnos(alumnos);
        // @ts-ignore
        return alumnos;
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
                    }, variant: "outlined" }, { children: "Agregar Alumno" })) })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { columns: [
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
                ], rows: alumnos, loading: false, handleClick: handleClickRow }), (0, jsx_runtime_1.jsx)(material_1.Modal, Object.assign({ open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: style }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { width: "100%", height: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Stepper, Object.assign({ activeStep: activeStep }, { children: steps.map((label, index) => {
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
                                        labelProps.optional = ((0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "caption" }, { children: "Paso Tre" })));
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
                                    } }, { children: (0, jsx_runtime_1.jsx)(material_2.CircularProgress, { sx: { my: "5rem" } }) }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: "All steps completed - you're finished" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "row", pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flex: "1 1 auto" } }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleReset }, { children: "Ingresar Otro Alumno" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
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
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.firsName, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { firsName: e.target.value })), label: "Primer Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.SecondName, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { SecondName: e.target.value })), label: "Segundo Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.surname, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { surname: e.target.value })), label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.secondSurname, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { secondSurname: e.target.value })), label: "Segundo Apellido", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.dni, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { dni: e.target.value })), label: "Cedula /Pasaporte /Cedula Escolar", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.address, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { address: e.target.value })), label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.municipality, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { municipality: e.target.value })), label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.state, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { state: e.target.value })), label: "Estado", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.email, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { email: e.target.value })), label: "Correo", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosAlumno.phone, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { phone: parseInt(e.target.value) })), label: "Telefono", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.Input, { type: "Date", onBlur: (e) => {
                                                                            //@ts-ignore
                                                                            console.log(e.target.value);
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                fechaNacimiento: 
                                                                                //@ts-ignore
                                                                                e.target.value }));
                                                                            console.log(datosAlumno);
                                                                        }, onChangeCapture: (e) => {
                                                                            //@ts-ignore
                                                                            console.log(e.target.value);
                                                                            setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                                //@ts-ignore
                                                                                fechaNacimiento: 
                                                                                //@ts-ignore
                                                                                e.target.value }));
                                                                            console.log(datosAlumno);
                                                                        } }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Sexo" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: "M", label: "Condicion" }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "F" }, { children: "Femenino" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "M" }, { children: "Masculino" }))] }))] })] }))] }))] })), activeStep === 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Datos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "1rem",
                                                            flexWrap: "wrap",
                                                            rowGap: "3rem",
                                                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.firstName, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            firstName: e.target.value })), label: "Primer Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.secondName, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            secondName: e.target.value })), label: "Segundo Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.surname, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            surname: e.target.value })), label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.secondSurname, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            secondSurname: e.target.value })), label: "Segundo Apellido", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "100%",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.filiacion, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            filiacion: e.target.value })), label: "Filiaci\u00F3n", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.dni, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                            //@ts-ignore
                                                                            dni: e.target.value })), label: "Cedula / Pasaporte", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
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
                                                                                alumnoAddress: e.target.checked })) }) })), !datosRepresetante.alumnoAddress && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.address, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                    //@ts-ignore
                                                                                    address: e.target.value })), label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.municipality, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                    //@ts-ignore
                                                                                    municipality: e.target.value })), label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: datosRepresetante.state, onChange: (e) => setDatosRepresetante(Object.assign(Object.assign({}, datosRepresetante), { 
                                                                                    //@ts-ignore
                                                                                    state: e.target.value })), label: "Estado", variant: "standard" })] }))] }))] }))] })), activeStep === 2 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Informaci\u00F3n acad\u00E9mica" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
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
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { sx: { width: "100%" }, label: "Grupo Estable", variant: "standard", value: datosAlumno.grupoEstable, onChange: (e) => setDatosAlumno(Object.assign(Object.assign({}, datosAlumno), { 
                                                                            //@ts-ignore
                                                                            grupoEstable: e.target.value })) }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Condicion" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: datosAlumno.condicion, label: "Condicion", onChange: handleChange }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Nuevo Ingreso" }, { children: "Nuevo Ingreso" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Regular" }, { children: "Regular" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Repitiente" }, { children: "Repitiente" }))] }))] }))] })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Documentos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
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
                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ color: "inherit", onClick: handleClose, sx: { mr: 1 } }, { children: "Cerrar" })) })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleNext }, { children: activeStep === steps.length - 1
                                                    ? "Registrar Datos"
                                                    : "Siguiente" }))] }))] }))] })) })) }))] })));
};
exports.default = Seccion;
//# sourceMappingURL=seccion.js.map