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
const moment_1 = __importDefault(require("moment"));
const x_data_grid_1 = require("@mui/x-data-grid");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
function Bitacora() {
    const [bitacora, setBitacora] = React.useState([]);
    const getBitacora = (filter = 0) => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.getBitacora(filter);
        console.log(data);
        const mapData = data.map((item) => {
            return Object.assign(Object.assign({}, item), { fecha: (0, moment_1.default)(item.fecha).format("DD/MM/YYYY"), hora: (0, moment_1.default)(item.fecha).format("HH:mm:ss") });
        });
        setBitacora(mapData);
        return data[0];
    });
    React.useEffect(() => {
        getBitacora(0);
    }, []);
    const columns = [
        { field: "id", headerName: "ID", width: 20, hide: true },
        { field: "accion", headerName: "Acción", width: 100 },
        { field: "usuario", headerName: "Usuario", width: 200 },
        { field: "descripcion", headerName: "Descripción", width: 300 },
        { field: "fecha", headerName: "Fecha", width: 150 },
        { field: "hora", headerName: "Hora", width: 150 },
    ];
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
                        }, variant: "h4", component: "div", gutterBottom: true }, { children: "Bitacora" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { height: "80vh", width: "100%" } }, { children: (0, jsx_runtime_1.jsx)(x_data_grid_1.DataGrid, { rows: bitacora, columns: columns, pageSize: 10, rowsPerPageOptions: [5], localeText: {
                                noRowsLabel: "No hay registros",
                                footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
                                rowReorderingHeaderName: "Orden",
                                footerTotalRows: "Total de filas:",
                                footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
                                filterOperatorAfter: "Después",
                                filterOperatorBefore: "Antes",
                                MuiTablePagination: {
                                    labelRowsPerPage: "Filas por página",
                                    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
                                },
                            } }) }))] }))] })));
}
exports.default = Bitacora;
//# sourceMappingURL=Bitacora.js.map