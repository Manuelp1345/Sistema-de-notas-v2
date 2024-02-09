"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const GlobalContext_1 = require("../../config/context/GlobalContext");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const recharts_1 = require("recharts");
const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 278, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 189, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 239, pv: 2400, amt: 2400 },
    { name: "Page G", uv: 349, pv: 2400, amt: 2400 },
    { name: "Page H", uv: 349, pv: 2400, amt: 2400 },
    { name: "Page I", uv: 349, pv: 2400, amt: 2400 },
    { name: "Page J", uv: 349, pv: 2400, amt: 2400 },
];
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
function Stats() {
    const { user, periodo } = React.useContext(GlobalContext_1.GlobalContext);
    const [aniosAndSecciones, setAniosAndSecciones] = React.useState([]);
    const [secciones, setSecciones] = React.useState(-1);
    const [year, setYear] = React.useState(-1);
    const [alumnos, setAlumnos] = React.useState([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getAniosAndSecciones = () => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getAniosAndSecciones(periodo.periodo.id);
        setAniosAndSecciones(response);
    });
    const getAlumno = () => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const findSecciones = yield window.API.getAlumno(secciones);
        console.log("findSecciones", findSecciones);
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
    React.useEffect(() => {
        if (secciones !== -1)
            getAlumno();
    }, [secciones]);
    React.useEffect(() => {
        getAniosAndSecciones();
    }, []);
    console.log("alumnos", alumnos);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3, overflow: "auto !important" } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                }, variant: "h4", component: "div", gutterBottom: true }, { children: "Estadisticas" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { m: 1, minWidth: 120, width: "50%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-helper-label" }, { children: "A\u00F1o" })), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ labelId: "demo-simple-select-helper-label", id: "demo-simple-select-helper", label: "A\u00F1o", value: year, onChange: (e) => setYear(e.target.value) }, { children: aniosAndSecciones.map((item) => {
                                    return (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: item.id }, { children: item.anio }));
                                }) }))] })), (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { m: 1, minWidth: 120, width: "50%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ id: "demo-simple-select-helper-label" }, { children: "Seccion" })), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ labelId: "demo-simple-select-helper-label", id: "demo-simple-select-helper", label: "Seccion", value: secciones, onChange: (e) => setSecciones(e.target.value), disabled: year === -1 }, { children: aniosAndSecciones
                                    .filter((item) => item.id === year)
                                    .map((item) => {
                                    return item.secciones.map((seccion) => {
                                        return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: seccion.id }, { children: seccion.seccion })));
                                    });
                                }) }))] }))] })), (0, jsx_runtime_1.jsx)(recharts_1.LineChart, Object.assign({ width: 400, height: 400, data: data }, { children: (0, jsx_runtime_1.jsx)(recharts_1.Line, { type: "monotone", dataKey: "uv", stroke: "#8884d8" }) })), user.user.role === "USER" && ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    mt: 2,
                    gap: 5,
                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained" }, { children: "Generar Consulta" })), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => navigate("/logout"), variant: "contained" }, { children: [(0, jsx_runtime_1.jsx)(Logout_1.default, {}), " Salir del sistema"] }))] })))] })));
}
exports.default = Stats;
//# sourceMappingURL=Stats.js.map