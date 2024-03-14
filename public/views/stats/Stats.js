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
const recharts_1 = require("recharts");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const GlobalContext_1 = require("../../config/context/GlobalContext");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
function Stats() {
    const { user, periodo } = React.useContext(GlobalContext_1.GlobalContext);
    const [aniosAndSecciones, setAniosAndSecciones] = React.useState([]);
    const [secciones, setSecciones] = React.useState(-1);
    const [year, setYear] = React.useState(-1);
    const [alumnos, setAlumnos] = React.useState([]);
    const [periodos, setPeriodos] = React.useState([]);
    const [periodoSelected, setPeriodoSelected] = React.useState(-1);
    const [mediaDeNotas, setMediaDeNotas] = React.useState(0);
    const [sizeScreen, setSizeScreen] = React.useState(window.innerWidth);
    const [maxNote, setMaxNote] = React.useState({
        value: 20,
        name: "",
    });
    const [minNote, setMinNote] = React.useState({
        value: 20,
        name: "",
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getAniosAndSecciones = () => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getAniosAndSecciones(periodoSelected);
        const alumnosPeriodo = yield queryToDataBase(`SELECT
      *,
          SUM(nota.nota) AS total_notas,
          AVG(nota.nota) AS promedio_nota
      FROM anio
      INNER JOIN etapas ON anio.id = etapas.anioId
      INNER JOIN alumno on etapas.alumnoId = alumno.id
      INNER JOIN nota on nota.alumnoId = alumno.id
	    INNER JOIN seccion on etapas.seccioneId = seccion.id
      INNER JOIN basic_data on basic_data.id = alumno.datosPersonalesId
      WHERE anio.periodoId=${periodoSelected}
      GROUP BY alumno.id;`);
        const findMAxNote = alumnosPeriodo.map((alumno) => {
            return {
                name: `${alumno.firstName} ${alumno.Surname} | C.I ${alumno.dni} | ${alumno.anio} ${alumno.seccion}`,
                value: alumno.promedio_nota,
            };
        });
        const maxNoteValue = Math.max(...findMAxNote.map((item) => item.value));
        const minNoteValue = Math.min(...findMAxNote.map((item) => item.value));
        setMaxNote(findMAxNote.find((item) => item.value === maxNoteValue));
        setMinNote(findMAxNote.find((item) => item.value === minNoteValue));
        const mediaDeNotasW = alumnosPeriodo.reduce((acc, item) => acc + item.promedio_nota, 0);
        setMediaDeNotas(mediaDeNotasW / alumnosPeriodo.length);
        setAlumnos(alumnosPeriodo);
        setAniosAndSecciones(response);
    });
    const getAlumno = () => __awaiter(this, void 0, void 0, function* () {
        const alumnosPeriodo = yield queryToDataBase(`SELECT
      *,
          SUM(nota.nota) AS total_notas,
          AVG(nota.nota) AS promedio_nota
      FROM anio
      INNER JOIN etapas ON anio.id = etapas.anioId
      INNER JOIN alumno on etapas.alumnoId = alumno.id
	    INNER JOIN seccion on etapas.seccioneId = seccion.id
      INNER JOIN nota on nota.alumnoId = alumno.id
      INNER JOIN basic_data on basic_data.id = alumno.datosPersonalesId
      WHERE anio.periodoId=${periodoSelected} AND etapas.anioId=${year} AND etapas.seccioneId=${secciones}
      GROUP BY alumno.id;`);
        if (alumnosPeriodo.length === 0)
            return;
        console.log("alumnosPeriodo", alumnosPeriodo);
        const findMAxNote = alumnosPeriodo.map((alumno) => {
            return {
                name: `${alumno.firstName} ${alumno.Surname} | C.I ${alumno.dni} | ${alumno.anio} ${alumno.seccion}`,
                value: alumno.promedio_nota,
            };
        });
        const maxNoteValue = Math.max(...findMAxNote.map((item) => item.value));
        const minNoteValue = Math.min(...findMAxNote.map((item) => item.value));
        const mediaDeNotasW = alumnosPeriodo.reduce((acc, item) => acc + item.promedio_nota, 0);
        setMediaDeNotas(mediaDeNotasW / alumnosPeriodo.length);
        setMaxNote(findMAxNote.find((item) => item.value === maxNoteValue));
        setMinNote(findMAxNote.find((item) => item.value === minNoteValue));
        setAlumnos(alumnosPeriodo);
    });
    const queryToDataBase = (query) => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const response = yield window.API.createQuery(query);
        console.log("responseQeury", response);
        return response;
    });
    const getPeriodos = (filter) => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.getPeriodos(filter);
        setPeriodos(data[0]);
        return data[0];
    });
    const getAlumnosAnio = () => __awaiter(this, void 0, void 0, function* () {
        const alumnosPeriodo = yield queryToDataBase(`SELECT
      *,
          SUM(nota.nota) AS total_notas,
          AVG(nota.nota) AS promedio_nota
      FROM anio
      INNER JOIN etapas ON anio.id = etapas.anioId
      INNER JOIN alumno on etapas.alumnoId = alumno.id
      INNER JOIN nota on nota.alumnoId = alumno.id
	    INNER JOIN seccion on etapas.seccioneId = seccion.id
      INNER JOIN basic_data on basic_data.id = alumno.datosPersonalesId
      WHERE anio.periodoId=${periodoSelected} AND etapas.anioId=${year}
      GROUP BY alumno.id;`);
        if (alumnosPeriodo.length === 0) {
            return;
        }
        const findMAxNote = alumnosPeriodo.map((alumno) => {
            return {
                name: `${alumno.firstName} ${alumno.Surname} | C.I ${alumno.dni} | ${alumno.anio} ${alumno.seccion}`,
                value: alumno.promedio_nota,
            };
        });
        const maxNoteValue = Math.max(...findMAxNote.map((item) => item.value));
        const minNoteValue = Math.min(...findMAxNote.map((item) => item.value));
        const mediaDeNotasW = alumnosPeriodo.reduce((acc, item) => acc + item.promedio_nota, 0);
        setMediaDeNotas(mediaDeNotasW / alumnosPeriodo.length);
        setMaxNote(findMAxNote.find((item) => item.value === maxNoteValue));
        setMinNote(findMAxNote.find((item) => item.value === minNoteValue));
        setAlumnos(alumnosPeriodo);
    });
    React.useEffect(() => {
        if (secciones !== -1)
            getAlumno();
    }, [secciones]);
    React.useEffect(() => {
        setSecciones(-1);
        if (year !== -1) {
            getAlumnosAnio();
        }
    }, [year]);
    React.useEffect(() => {
        setSecciones(-1);
        setYear(-1);
        if (periodoSelected !== -1) {
            getAniosAndSecciones();
        }
    }, [periodoSelected]);
    React.useEffect(() => {
        getPeriodos({ pageIndex: 1, pageSize: 3 });
    }, []);
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setSizeScreen(window.innerWidth);
        });
    }, []);
    const yearOldAverage = () => {
        const total = alumnos.map((alumno) => ({
            name: `${alumno.firstName} ${alumno.Surname}`,
            Edad: (0, moment_1.default)().diff((alumno === null || alumno === void 0 ? void 0 : alumno.alumno)
                ? alumno === null || alumno === void 0 ? void 0 : alumno.alumno.DatosPersonales.DateOfBirth
                : alumno.DateOfBirth, "years"),
            año: (alumno === null || alumno === void 0 ? void 0 : alumno.alumno)
                ? alumno.alumno.DatosPersonales.DateOfBirth
                : alumno.DateOfBirth,
        }));
        console.log("total", total);
        return total;
    };
    const genderCount = () => {
        const female = alumnos.filter((alumno) => {
            return alumno.alumno
                ? (alumno === null || alumno === void 0 ? void 0 : alumno.alumno.DatosPersonales.sexo) === "F"
                : alumno.sexo === "F";
        }).length;
        const male = alumnos.filter((alumno) => {
            return alumno.alumno
                ? alumno.alumno.DatosPersonales.sexo === "M"
                : alumno.sexo === "M";
        }).length;
        return [
            {
                name: "Femenino",
                value: female,
            },
            {
                name: "Masculino",
                value: male,
            },
        ];
    };
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return ((0, jsx_runtime_1.jsx)("text", Object.assign({ x: x, y: y, fill: "white", textAnchor: x > cx ? "start" : "end", dominantBaseline: "central" }, { children: value })));
    };
    console.log("alumnos", alumnos);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3, overflow: "auto !important" } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 5,
                        }, variant: "h4", component: "div", gutterBottom: true }, { children: "Estad\u00EDsticas" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 5,
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { m: 1, minWidth: 120, width: "33.3%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { children: "Periodo" }), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ label: "Periodo", value: periodoSelected, onChange: (e) => setPeriodoSelected(e.target.value) }, { children: periodos.map((item) => {
                                            return (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: item.id }, { children: item.periodo }));
                                        }) }))] })), (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { m: 1, minWidth: 120, width: "33.3%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { children: "A\u00F1o" }), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ label: "A\u00F1o", value: year, onChange: (e) => setYear(e.target.value), disabled: periodoSelected === -1 }, { children: aniosAndSecciones.map((item) => {
                                            return (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: item.id }, { children: item.anio }));
                                        }) }))] })), (0, jsx_runtime_1.jsxs)(material_1.FormControl, Object.assign({ sx: { m: 1, minWidth: 120, width: "33.3%" } }, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { children: "Seccion" }), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ label: "Seccion", value: secciones, onChange: (e) => setSecciones(e.target.value), disabled: year === -1 }, { children: aniosAndSecciones
                                            .filter((item) => item.id === year)
                                            .map((item) => {
                                            return item.secciones.map((seccion) => {
                                                return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: seccion.id }, { children: seccion.seccion })));
                                            });
                                        }) }))] }))] })), periodoSelected !== -1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    textAlign: "center",
                                    mt: 2,
                                } }, { children: ["Total de Alumnos: ", alumnos.length] })), (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    textAlign: "center",
                                    mt: 2,
                                } }, { children: ["Promedio de Notas: ", mediaDeNotas.toFixed(2)] })), (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    textAlign: "center",
                                    mt: 2,
                                } }, { children: ["Mayor promedio de Nota: ", maxNote.value.toFixed(2), " ", maxNote.name] })), (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    textAlign: "center",
                                    mt: 2,
                                } }, { children: ["Menor promedio de Nota: ", minNote.value.toFixed(2), " ", minNote.name] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: window.innerWidth < 1024 ? "column" : "row",
                                    gap: 5,
                                } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                            width: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, { children: "Grafico de Genero" }), (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, Object.assign({ width: 600, height: 400 }, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, Object.assign({ data: genderCount(), cx: "51%", cy: "40%", labelLine: false, label: renderCustomizedLabel, outerRadius: 120, fill: "#8884d8", dataKey: "value" }, { children: genderCount().map((entry, index) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) })), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }))] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                            width: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, { children: "Promedio de edad" }), (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, Object.assign({ width: 500, height: 300, data: yearOldAverage(), margin: {
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                } }, { children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "name" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Line, { type: "natural", dataKey: "Edad", stroke: "#8884d8", activeDot: { r: 8 } })] }))] }))] }))] }))] }))] })));
}
exports.default = Stats;
//# sourceMappingURL=Stats.js.map