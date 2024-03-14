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
const customModal_1 = require("../modals/customModal");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Year = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [secciones, setSecciones] = (0, react_2.useState)([]);
    const [value, setValue] = react_1.default.useState({
        seccion: null,
        area: null,
    });
    const [loading, setLoading] = (0, react_2.useState)(true);
    const [anio, setAnio] = (0, react_2.useState)({});
    const [openAddSeccion, setOpenAddSeccion] = react_1.default.useState(false);
    const handleClickOpenAddSeccion = () => setOpenAddSeccion(true);
    const handleCloseAddSeccion = () => {
        setOpenAddSeccion(false);
    };
    const [openAddArea, setOpenAddArea] = react_1.default.useState(false);
    const handleClickOpenAddArea = () => setOpenAddArea(true);
    const handleCloseAddArea = () => {
        setOpenAddArea(false);
    };
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    const [letter, setLetter] = react_1.default.useState("");
    const handleChange = (event) => {
        setLetter(event.target.value);
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { areas } = (0, react_2.useContext)(GlobalContext_1.GlobalContext);
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
        setLoading(false);
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSecciones(id);
        console.log(findSecciones);
        setSecciones(findSecciones);
        // @ts-ignore
        return { findSecciones };
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
    const insertSeccion = (seccion) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.insertSeccion({
            seccion,
            anio: id,
            usuario: user.email,
        });
        if (data) {
            getData();
            sweetalert2_1.default.fire({
                title: "Sección creada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setValue({ seccion: null, area: null });
    });
    const insertArea = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.insertArea({
            area: nombre,
            anio: id,
            usuario: user.email,
        });
        if (data) {
            getData();
            sweetalert2_1.default.fire({
                title: "Área creada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setValue({ seccion: null, area: null });
    });
    (0, react_2.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
            //@ts-ignore
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center", width: "100%" } }, { children: anio.anio })), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    setSecciones([]);
                    areas.setAreas([]);
                    navigate(-1);
                } }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, { sx: { mr: 1 } }), "Volver"] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: "Lista de Secciones" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleClickOpenAddSeccion, sx: {
                                        fontWeight: "bold",
                                    }, variant: "outlined" }, { children: "Agregar Secci\u00F3n" })) })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { rows: secciones, loading: loading, toolbar: false, handleClick: function () {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        console.log("params");
                                    });
                                }, handleDobleClick: () => {
                                    console.log("first");
                                }, columns: [
                                    {
                                        field: "id",
                                        headerName: "ID",
                                        disableExport: true,
                                        hide: true,
                                    },
                                    {
                                        field: "seccion",
                                        headerName: "Secciones",
                                        headerClassName: "backGround",
                                        width: 130,
                                        headerAlign: "center",
                                        flex: 1,
                                        align: "center",
                                        renderCell: (params) => {
                                            console.log("params", params);
                                            return ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: {
                                                    display: "flex",
                                                    width: "100%",
                                                    justifyContent: "center",
                                                }, onClick: () => {
                                                    navigate("/seccion/" + params.id);
                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Click para ver la seccion ${params.formattedValue}`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, { children: params.formattedValue }) })) })));
                                        },
                                    },
                                ] })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: "Lista de Areas" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleClickOpenAddArea, sx: {
                                        fontWeight: "bold",
                                    }, variant: "outlined" }, { children: "Agregar Area" })) })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { rows: areas.areas, loading: loading, toolbar: false, handleClick: () => {
                                    console.log("first");
                                }, handleDobleClick: () => {
                                    console.log("first");
                                }, columns: [
                                    {
                                        field: "id",
                                        headerName: "ID",
                                        disableExport: true,
                                        hide: true,
                                    },
                                    {
                                        field: "nombre",
                                        headerName: "Areas",
                                        headerClassName: "backGround",
                                        headerAlign: "center",
                                        flex: 1,
                                        align: "center",
                                    },
                                ] })] }))] })), (0, jsx_runtime_1.jsxs)(customModal_1.CustomModal, Object.assign({ btnText: "Agregar", color: "Primary", tittle: "Agregar Seccion", openDialog: openAddSeccion, handleCloseDialog: handleCloseAddSeccion, handledConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    yield insertSeccion((_a = value.seccion) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase());
                    handleCloseAddSeccion();
                }) }, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, { children: ["\"\u00A1Atenci\u00F3n! Una vez que agregue una nueva secci\u00F3n, no podr\u00E1 editarla ni borrarla. ", (0, jsx_runtime_1.jsx)("br", {}), " Aseg\u00FArese de verificar cuidadosamente la informaci\u00F3n antes de guardar. ", (0, jsx_runtime_1.jsx)("br", {}), " \u00BFDesea continuar con la acci\u00F3n de agregar una nueva secci\u00F3n?\""] }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, Object.assign({ sx: {
                            gap: 2,
                            mt: 2,
                        } }, { children: (0, jsx_runtime_1.jsxs)(material_1.FormControl, { children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, Object.assign({ sx: { mb: 5 }, id: "letter-select-label" }, { children: "Seccion" })), (0, jsx_runtime_1.jsx)(material_1.Select, Object.assign({ labelId: "letter-select-label", id: "letter-select", value: value.seccion, onChange: (e) => {
                                        setValue(Object.assign(Object.assign({}, value), { seccion: e.target.value }));
                                    } }, { children: [...Array(26)].map((_, i) => ((0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: String.fromCharCode(65 + i) }, { children: String.fromCharCode(65 + i) }), i))) }))] }) }))] })), (0, jsx_runtime_1.jsxs)(customModal_1.CustomModal, Object.assign({ btnText: "Agregar", color: "Primary", tittle: "Agregar Area", openDialog: openAddArea, handleCloseDialog: handleCloseAddArea, handledConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield insertArea(value.area);
                    handleCloseAddArea();
                }) }, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, { children: ["\"\u00A1Atenci\u00F3n! Una vez que agregue un nueva \u00E1rea, no podr\u00E1 editarla ni borrarla. ", (0, jsx_runtime_1.jsx)("br", {}), " Aseg\u00FArese de verificar cuidadosamente la informaci\u00F3n antes de guardar. ", (0, jsx_runtime_1.jsx)("br", {}), " \u00BFDesea continuar con la acci\u00F3n de agregar una nueva \u00E1rea?\""] }), (0, jsx_runtime_1.jsx)(material_1.FormGroup, Object.assign({ sx: {
                            gap: 2,
                            mt: 2,
                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Area", variant: "outlined", value: value.area, onChange: (e) => {
                                setValue(Object.assign(Object.assign({}, value), { area: e.target.value }));
                            } }) }))] }))] })));
};
exports.default = Year;
//# sourceMappingURL=Year.js.map