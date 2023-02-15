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
const TableCustom_1 = require("../table/TableCustom");
const GlobalContext_1 = require("../../config/context/GlobalContext");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Search = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [anio, setAnio] = (0, react_1.useState)({});
    const [secciones, setSecciones] = (0, react_1.useState)({ seccion: "loading", id: 0 });
    //  @ts-ignore
    const [alumnos, setAlumnos] = (0, react_1.useState)([{ id: 0 }]);
    const { areas, alumno } = (0, react_1.useContext)(GlobalContext_1.GlobalContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
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
    const getAreas = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findAreas = yield window.API.getAreas(id);
        areas.setAreas(findAreas);
        console.log(findAreas);
        // @ts-ignore
        return { findAreas };
    });
    const getAlumno = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id seccion", id);
        // @ts-ignore
        const findSecciones = yield window.API.getAlumnosGraduados();
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
            alumno.periodo = alumno.anio.periodo.periodo;
            return alumno;
        }));
        // @ts-ignore
        return findSecciones;
    });
    const handleClickRow = (param) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log(param);
        yield getAreas((_a = alumnos.find((datos) => datos.id === param.id)) === null || _a === void 0 ? void 0 : _a.anio.id);
        alumno.setAlumnoId(alumnos.find((datos) => datos.id === param.id));
        navigate("/alumno");
    });
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                } }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", component: "h1", gutterBottom: true }, { children: "Alumnos Graduados" })) })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginTop: "2rem",
                } }), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { toolbar: true, columns: [
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
                    {
                        field: "periodo",
                        headerName: "Periodo",
                        width: 130,
                        headerClassName: "backGround",
                        headerAlign: "center",
                        flex: 1,
                        align: "center",
                    },
                ], rows: alumnos, loading: false, handleDobleClick: () => {
                    console.log("first");
                }, handleClick: handleClickRow })] })));
};
exports.default = Search;
//# sourceMappingURL=search.js.map