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
const steps = ["Datos del Alumno", "Datos de representantes", "Finalizar"];
const Seccion = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [anio, setAnio] = (0, react_2.useState)({});
    const [secciones, setSecciones] = (0, react_2.useState)({ seccion: "loading" });
    const [activeStep, setActiveStep] = react_1.default.useState(0);
    const [skipped, setSkipped] = react_1.default.useState(new Set());
    const [open, setOpen] = react_1.default.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const isStepOptional = (step) => {
        return step === 1;
    };
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const findSecciones = yield getSecciones(id);
        console.log(findSecciones);
        // @ts-ignore
        const anio = yield window.API.getAnio(findSecciones.data.anio.id);
        console.log(anio);
        setAnio(anio);
        // @ts-ignore
        $("#Secciones").jsGrid("loadData", findSecciones);
        // @ts-ignore
        $("#Secciones").jsGrid("refresh");
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSeccion(id);
        console.log(findSecciones);
        setSecciones(findSecciones);
        // @ts-ignore
        return { data: findSecciones, itemsCount: 0 };
    });
    const insertSeccion = ({ seccion }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("seccion", seccion);
        // @ts-ignore
        const data = yield window.API.insertSeccion({ seccion, anio: id });
        if (data) {
            getData();
            sweetalert2_1.default.fire({
                title: "Sección creada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    (0, react_2.useEffect)(() => {
        // @ts-ignore
        $("#Alumnos").jsGrid({
            width: "100%",
            paging: true,
            autoload: false,
            pageLoading: true,
            pageSize: 3,
            pageIndex: 1,
            heading: true,
            inserting: false,
            loadIndication: true,
            loadMessage: "Por favor espere",
            loadShading: true,
            noDataContent: "No hay Alumnos",
            pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
            pagePrevText: "Anterior",
            pageNextText: "Siguiente",
            pageFirstText: "Primera",
            pageLastText: "Ultima",
            pageNavigatorNextText: "...",
            pageNavigatorPrevText: "...",
            invalidMessage: "Por favor ingreser un valor valido",
            rowClick: function (args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("");
                    navigate("/seccion/" + args.item.id);
                });
            },
            controller: {
                loadData: (filter) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield getSecciones(id);
                }),
                insertItem: function (item) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield insertSeccion(item);
                        // @ts-ignore
                        $("#periodo").jsGrid("refresh");
                    });
                },
            },
            // @ts-ignore
            invalidNotify: ({ errors, item }) => {
                console.log(item);
                if (item.periodo === "") {
                    sweetalert2_1.default.fire({
                        title: "Error",
                        text: "Ingrese un Alumno",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    return;
                }
            },
            fields: [
                {
                    name: "cedula",
                    title: "C.I",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "nombre",
                    title: "Nombres",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "apellido",
                    title: "Apellidos",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "id",
                    title: "ids",
                    align: "center",
                    type: "text",
                    visible: false,
                },
                { type: "control", editButton: false, deleteButton: false },
            ],
        });
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    setSecciones({ seccion: "loading" });
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
                    }, variant: "outlined" }, { children: "Agregar Alumno" })) })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "2rem" }, id: "Alumnos", component: "div" }), (0, jsx_runtime_1.jsx)(material_1.Modal, Object.assign({ open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: style }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { width: "100%", height: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Stepper, Object.assign({ activeStep: activeStep }, { children: steps.map((label, index) => {
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
                                    if (isStepSkipped(index)) {
                                        //@ts-ignore
                                        stepProps.completed = false;
                                    }
                                    return ((0, jsx_runtime_1.jsx)(material_1.Step, Object.assign({}, stepProps, { children: (0, jsx_runtime_1.jsx)(material_1.StepLabel, Object.assign({}, labelProps, { children: label })) }), label));
                                }) })), activeStep === steps.length ? ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: "All steps completed - you're finished" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "row", pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flex: "1 1 auto" } }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleReset }, { children: "Reset" }))] }))] })) : ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: { mt: 2, mb: 1 } }, { children: [activeStep === 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Datos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "1rem",
                                                            flexWrap: "wrap",
                                                            rowGap: "3rem",
                                                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Primer Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Segundo Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Segundo Apellido", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Cedula / Pasaporte", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "estado", variant: "standard" })] })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Documentos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Cedula" }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Pasaporte" }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Partida de nacimiento" }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Fotos tipo carnet" }) }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, { children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, {}), label: "Notas Escolares" }) })] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "100%",
                                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Nota ( Opcional )", variant: "standard", sx: {
                                                                        width: "100%",
                                                                    } }) }))] }))] })), activeStep === 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ textAlign: "center", width: "100%", fontWeight: "bold" }, { children: "Datos" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            gap: "1rem",
                                                            flexWrap: "wrap",
                                                            rowGap: "3rem",
                                                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Primer Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Segundo Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Segundo Apellido", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                    width: "100%",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Parentesco", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Cedula / Pasaporte", variant: "standard" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    gap: "1rem",
                                                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: "nameAlumno", label: "estado", variant: "standard" })] }))] }))] }))] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "row", pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ color: "inherit", disabled: activeStep === 0, onClick: handleBack, sx: { mr: 1 } }, { children: "Back" })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flex: "1 1 auto" } }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleNext }, { children: activeStep === steps.length - 1 ? "Finish" : "Next" }))] }))] }))] })) })) }))] })));
};
exports.default = Seccion;
//# sourceMappingURL=seccion.js.map