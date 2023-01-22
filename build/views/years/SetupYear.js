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
/* eslint-disable no-undef */
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const material_1 = require("@mui/material");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const TableCustom_1 = require("../table/TableCustom");
const DialogContentText_1 = __importDefault(require("@mui/material/DialogContentText"));
const RemoveCircle_1 = __importDefault(require("@mui/icons-material/RemoveCircle"));
const customModal_1 = require("../modals/customModal");
const DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
const AdapterMoment_1 = require("@mui/x-date-pickers/AdapterMoment");
const x_date_pickers_1 = require("@mui/x-date-pickers");
const Grade_1 = __importDefault(require("@mui/icons-material/Grade"));
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const SetupYear = ({ idPeriodo }) => {
    const [periodos, setPeriodos] = (0, react_1.useState)([]);
    const [periodo, setPeriodo] = (0, react_1.useState)();
    const [anios, setAnios] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [idAnioDelete, setIdAnioDelete] = (0, react_1.useState)({
        id: 0,
        anio: "",
        periodo: { id: 0 },
    });
    const [value, setValue] = React.useState({
        yearOne: "",
        yearTwo: "",
        anio: null,
        numberAnio: null,
    });
    const [openDeleteAnio, setOpenDeleteAnio] = React.useState(false);
    const handleClickOpenDeleteAnio = () => setOpenDeleteAnio(true);
    const handleCloseDeleteAnio = () => setOpenDeleteAnio(false);
    const [openAddPeriodo, setOpenAddPeriodo] = React.useState(false);
    const handleClickOpenAddPeriodo = () => setOpenAddPeriodo(true);
    const handleCloseAddPeriodo = () => {
        setOpenAddPeriodo(false);
        console.log(value);
    };
    const [openAddPeriodoGrade, setOpenAddPeriodoGrade] = React.useState(false);
    const handleClickOpenAddPeriodoGrade = () => setOpenAddPeriodoGrade(true);
    const handleCloseAddPeriodoGrade = () => {
        setOpenAddPeriodoGrade(false);
        console.log(value);
    };
    const [openAddAnio, setOpenAddAnio] = React.useState(false);
    const handleClickOpenAddAnio = () => setOpenAddAnio(true);
    const handleCloseAddAnio = () => {
        setOpenAddAnio(false);
        console.log(value);
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getPeriodos = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.getPeriodos(filter);
        const pActive = data[0].find((p) => p.estado === true);
        console.log("pactive", pActive);
        if (pActive)
            setPeriodo(pActive.periodo);
        console.log(data);
        setPeriodos(data[0]);
        return data[0];
    });
    const getAnios = (periodoId) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.getAnios(periodoId);
        if (data) {
            setAnios(data);
            return data;
        }
        return data;
    });
    const handledDeleteAnio = () => __awaiter(void 0, void 0, void 0, function* () {
        handleCloseDeleteAnio();
        let deleteAnio;
        try {
            //@ts-ignore
            deleteAnio = yield window.API.deleteAnio(idAnioDelete.id);
        }
        catch (error) {
            sweetalert2_1.default.fire({
                title: `Error al borrar ${idAnioDelete.anio}`,
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        console.log("delete response", deleteAnio);
        if (deleteAnio === "error") {
            return sweetalert2_1.default.fire({
                title: `NO puedes borrar el año. Año en uso `,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        }
        yield getAnios(idAnioDelete.periodo.id);
        sweetalert2_1.default.fire({
            title: `${idAnioDelete.anio} Borrado`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
    });
    const insertPeriodo = (periodo) => __awaiter(void 0, void 0, void 0, function* () {
        const dataPeriodo = {
            periodo: periodo,
            estado: true,
        };
        // @ts-ignore
        const data = yield window.API.insertPeriodo(dataPeriodo);
        if (data) {
            idPeriodo += 1;
            getData();
            sweetalert2_1.default.fire({
                title: "Periodo creado",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        yield getPeriodos({ pageIndex: 1, pageSize: 3 });
        console.log("id idPeriodod", idPeriodo);
        yield getAnios(idPeriodo);
        setLoading(false);
    });
    const gradeAlumnos = (periodoId, newPeriodo) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.gradeAlumnos({
            periodo: periodoId,
            newPeriodo,
        });
        console.log(data);
        if (data) {
            sweetalert2_1.default.fire({
                title: "Alumnos Grados",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            idPeriodo += 1;
            navigate("/logout");
        }
    });
    const insertAnio = (anio) => __awaiter(void 0, void 0, void 0, function* () {
        anio.periodoId = idPeriodo;
        anio.anio = anio.anio.toUpperCase();
        // @ts-ignore
        const data = yield window.API.createAnio(anio);
        if (data) {
            sweetalert2_1.default.fire({
                title: "Año creado",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setValue({ yearOne: "", yearTwo: "", anio: null, numberAnio: null });
        // @ts-ignore
        yield getAnios(idPeriodo);
    });
    React.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: {
            flexGrow: 1,
            p: 4,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
        } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: handleClickOpenAddPeriodoGrade }, { children: [(0, jsx_runtime_1.jsx)(Grade_1.default, { sx: { mr: 1 } }), "Graduar Alumnos"] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: "Lista de Periodos" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleClickOpenAddPeriodo, sx: {
                                        fontWeight: "bold",
                                    }, variant: "outlined" }, { children: "Agregar Periodo" })) })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { rows: periodos, loading: loading, toolbar: false, handleClick: function (args) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        console.log(args);
                                        idPeriodo = args.id;
                                        setPeriodo(args.row.periodo);
                                        yield getAnios(args.id);
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
                                        field: "periodo",
                                        headerName: "Periodos",
                                        headerClassName: "backGround",
                                        width: 130,
                                        headerAlign: "center",
                                        flex: 1,
                                        align: "center",
                                        renderCell: (params) => {
                                            return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                                    display: "flex",
                                                    width: "100%",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Periodo ${params.row.estado ? "Activo" : "Inactivo"} `, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [params.formattedValue, " ", (0, jsx_runtime_1.jsx)(material_1.Checkbox, { checked: Boolean(params.row.estado) })] }) })) })));
                                        },
                                    },
                                ] })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            width: "100%",
                        } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: ["Lista de A\u00F1os (", periodo, ")"] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleClickOpenAddAnio, sx: {
                                        fontWeight: "bold",
                                    }, variant: "outlined" }, { children: "Agregar A\u00F1o" })) })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { rows: anios, loading: loading, toolbar: false, handleClick: () => {
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
                                        field: "anio",
                                        headerName: "Años",
                                        headerClassName: "backGround",
                                        headerAlign: "center",
                                        flex: 1,
                                        align: "center",
                                        renderCell: (params) => {
                                            return ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: {
                                                    display: "flex",
                                                    width: "100%",
                                                    justifyContent: "center",
                                                }, onClick: () => {
                                                    navigate("/anio/" + params.id);
                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Click para ver las secciones de ${params.formattedValue}`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: params.formattedValue }) })) })));
                                        },
                                    },
                                    {
                                        field: "estado",
                                        headerName: "Opciones",
                                        width: 150,
                                        headerClassName: "backGround",
                                        headerAlign: "center",
                                        align: "center",
                                        renderCell: (params) => {
                                            return ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: {
                                                    display: "flex",
                                                    width: "100%",
                                                    justifyContent: "center",
                                                }, onClick: () => {
                                                    handleClickOpenDeleteAnio();
                                                    setIdAnioDelete(params.row);
                                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Borrar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(RemoveCircle_1.default, { sx: { color: "red" } }) })) })));
                                        },
                                    },
                                ] })] }))] })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ btnText: "Eliminar", color: "red", tittle: "Alerta", openDialog: openDeleteAnio, handleCloseDialog: handleCloseDeleteAnio, handledConfirm: handledDeleteAnio }, { children: (0, jsx_runtime_1.jsxs)(DialogContentText_1.default, { children: ["Confirma que desea eliminar ", idAnioDelete.anio] }) })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ btnText: "Agregar", color: "green", tittle: "Agregar Periodo", openDialog: openAddPeriodo, handleCloseDialog: handleCloseAddPeriodo, handledConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield insertPeriodo(`${value.yearOne} - ${value.yearTwo}`);
                    handleCloseAddPeriodo();
                }) }, { children: (0, jsx_runtime_1.jsxs)(material_1.FormGroup, Object.assign({ sx: {
                        gap: 2,
                        mt: 2,
                    } }, { children: [(0, jsx_runtime_1.jsx)(x_date_pickers_1.LocalizationProvider, Object.assign({ dateAdapter: AdapterMoment_1.AdapterMoment }, { children: (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { views: ["year"], label: "Desde", value: value === null || value === void 0 ? void 0 : value.yearOne, onChange: (newValue) => {
                                    setValue(Object.assign(Object.assign({}, value), { yearOne: newValue === null || newValue === void 0 ? void 0 : newValue.format("YYYY") }));
                                }, renderInput: (params) => (0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, params)) }) })), (0, jsx_runtime_1.jsx)(x_date_pickers_1.LocalizationProvider, Object.assign({ dateAdapter: AdapterMoment_1.AdapterMoment }, { children: (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { views: ["year"], label: "Hasta", value: value === null || value === void 0 ? void 0 : value.yearTwo, onChange: (newValue) => {
                                    setValue(Object.assign(Object.assign({}, value), { yearTwo: newValue === null || newValue === void 0 ? void 0 : newValue.format("YYYY") }));
                                }, renderInput: (params) => (0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, params)) }) }))] })) })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ btnText: "Agregar", color: "Primary", tittle: "Agregar Año", openDialog: openAddAnio, handleCloseDialog: handleCloseAddAnio, handledConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield insertAnio({ anio: value.anio, numberAnio: value.numberAnio });
                    handleCloseAddAnio();
                }) }, { children: (0, jsx_runtime_1.jsxs)(material_1.FormGroup, Object.assign({ sx: {
                        gap: 2,
                        mt: 2,
                    } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { label: "A\u00F1o (Primer A\u00F1o)", variant: "outlined", value: value.anio, onChange: (e) => {
                                setValue(Object.assign(Object.assign({}, value), { anio: e.target.value }));
                            } }), (0, jsx_runtime_1.jsx)(material_1.Input, { type: "number", placeholder: "Valor Numerico (1)", value: value.numberAnio, onChange: (e) => {
                                setValue(Object.assign(Object.assign({}, value), { numberAnio: Number(e.target.value) }));
                            } })] })) })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ btnText: "Agregar", color: "green", tittle: "Agrega el nuevo periodo", openDialog: openAddPeriodoGrade, handleCloseDialog: handleCloseAddPeriodoGrade, handledConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield gradeAlumnos(idPeriodo, `${value.yearOne} - ${value.yearTwo}`);
                    handleCloseAddPeriodoGrade();
                }) }, { children: (0, jsx_runtime_1.jsxs)(material_1.FormGroup, Object.assign({ sx: {
                        gap: 2,
                        mt: 2,
                    } }, { children: [(0, jsx_runtime_1.jsx)(x_date_pickers_1.LocalizationProvider, Object.assign({ dateAdapter: AdapterMoment_1.AdapterMoment }, { children: (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { views: ["year"], label: "Desde", value: value === null || value === void 0 ? void 0 : value.yearOne, onChange: (newValue) => {
                                    setValue(Object.assign(Object.assign({}, value), { yearOne: newValue === null || newValue === void 0 ? void 0 : newValue.format("YYYY") }));
                                }, renderInput: (params) => (0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, params)) }) })), (0, jsx_runtime_1.jsx)(x_date_pickers_1.LocalizationProvider, Object.assign({ dateAdapter: AdapterMoment_1.AdapterMoment }, { children: (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { views: ["year"], label: "Hasta", value: value === null || value === void 0 ? void 0 : value.yearTwo, onChange: (newValue) => {
                                    setValue(Object.assign(Object.assign({}, value), { yearTwo: newValue === null || newValue === void 0 ? void 0 : newValue.format("YYYY") }));
                                }, renderInput: (params) => (0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, params)) }) }))] })) }))] })));
};
exports.default = SetupYear;
//# sourceMappingURL=SetupYear.js.map