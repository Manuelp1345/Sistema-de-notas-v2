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
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const styles_1 = require("@mui/material/styles");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const GlobalContext_1 = require("../../config/context/GlobalContext");
const TableCustom_1 = require("../table/TableCustom");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Alumno = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [anio, setAnio] = (0, react_1.useState)([{}]);
    const [secciones, setSecciones] = (0, react_1.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { areas, alumno } = (0, react_1.useContext)(GlobalContext_1.GlobalContext);
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const anio = yield window.API.getAnio(id);
        console.log(anio);
        setAnio(anio);
        // @ts-ignore
        const findSecciones = yield getSecciones(anio.id);
        console.log(findSecciones);
        const findAreas = yield getAreas(anio.id);
        console.log(findAreas);
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSecciones(id);
        console.log(findSecciones);
        setSecciones({ data: findSecciones, itemsCount: 0 });
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
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    navigate(-1);
                } }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, { sx: { mr: 1 } }), "Volver"] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                } }, { children: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", component: "h1", gutterBottom: true }, { children: ["Datos del Alumno ", (0, jsx_runtime_1.jsx)("br", {})] })) })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    mt: 2.5,
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    justifyContent: "center",
                } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            flexWrap: "wrap",
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.firstName, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Primer Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.secondName, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Segundo Nombre", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.Surname, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Primer Apellido", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.secondSurname, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Segundo Apellido", variant: "standard" }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Condicion" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: alumno.alumnoId.condicion, label: "Condicion", disabled: true }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Nuevo Ingreso" }, { children: "Nuevo Ingreso" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Regular" }, { children: "Regular" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Repitiente" }, { children: "Repitiente" }))] }))] })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            flexWrap: "wrap",
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.dni, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Cedula /Pasaporte /Cedula Escolar", variant: "standard" }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Sexo" })), (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: "M", label: "Condicion", disabled: true }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "F" }, { children: "Femenino" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "M" }, { children: "Masculino" }))] }))] }), (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-label" }, { children: "Fecha de nacimiento" })), (0, jsx_runtime_1.jsx)(material_1.Input, { value: alumno.alumnoId.DateOfBirth, type: "Date" })] }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.email, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Correo", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.grupoEstable, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Grupo estable", variant: "standard" })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            flexWrap: "wrap",
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.Phone, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Telefono", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.address, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Direccion", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.municipality, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Municipio", variant: "standard" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { value: alumno.alumnoId.state, 
                                /*           onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  firsName: e.target.value,
                                })
                              } */
                                label: "Estado", variant: "standard" })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(material_1.TextField, { sx: { flex: 1 }, value: alumno.alumnoId.observacion, 
                        /*           onChange={(e) =>
                          setDatosAlumno({
                            ...datosAlumno,
                            firsName: e.target.value,
                          })
                        } */
                        label: "Nota", variant: "standard" })] })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "2.5rem" }, id: "Secciones", component: "div" }), (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: "\u00C1reas" })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { columns: [
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
                                field: "firstName",
                                headerName: "Primer Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                            },
                            {
                                field: "firstNamea",
                                headerName: "Segundo Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                            },
                            {
                                field: "firstNames",
                                headerName: "Tercer Momento",
                                width: 130,
                                headerClassName: "backGround",
                                headerAlign: "center",
                                flex: 1,
                                align: "center",
                            },
                        ], rows: areas.areas, loading: false, handleClick: () => {
                            console.log("first");
                        } })] })] })));
};
exports.default = Alumno;
//# sourceMappingURL=alumno.js.map