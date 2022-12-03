"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCustom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Box_1 = __importDefault(require("@mui/material/Box"));
const x_data_grid_1 = require("@mui/x-data-grid");
function CustomToolbar() {
    return ((0, jsx_runtime_1.jsxs)(x_data_grid_1.GridToolbarContainer, Object.assign({ sx: {
            gap: "2rem",
            justifyContent: "space-between",
            color: "white",
            marginBottom: "1rem",
            /*         background: "#1976d2", */
        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { gap: "1rem", display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)(x_data_grid_1.GridToolbarColumnsButton, { sx: { color: "black" } }), (0, jsx_runtime_1.jsx)(x_data_grid_1.GridToolbarFilterButton, { sx: { color: "black" } })] })), (0, jsx_runtime_1.jsx)(x_data_grid_1.GridToolbarExport, { sx: { color: "black" } })] })));
}
const TableCustom = ({ rows, columns, loading, handleClick, handleDobleClick, toolbar, }) => {
    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
            flex: 1,
            height: "100%",
            width: "100%",
            "& .backGround": {
                background: "#1976d2",
                color: "white",
                textAlign: "center",
                width: "100%",
            },
        } }, { children: (0, jsx_runtime_1.jsx)(x_data_grid_1.DataGrid, { loading: loading, localeText: {
                toolbarExport: "Exportar",
                toolbarExportCSV: "Descargar CSV",
                toolbarExportPrint: "Imprimir",
                toolbarFilters: "Filtrar",
                filterPanelColumns: "Columna",
                filterPanelOperators: "Filtro",
                filterOperatorContains: "Contiene",
                filterOperatorEquals: "Igual A",
                filterOperatorStartsWith: "Inicia Con",
                filterOperatorEndsWith: "Termina Con",
                filterOperatorIsEmpty: "Es Vacio",
                filterOperatorIsNotEmpty: "No esta vacio",
                filterOperatorIsAnyOf: "Cualquiera de",
                filterPanelInputPlaceholder: "valor",
                filterPanelInputLabel: "Valor",
                toolbarColumns: "Columnas",
                columnsPanelTextFieldLabel: "Buscar Columna",
                columnsPanelTextFieldPlaceholder: "",
                columnsPanelHideAllButton: "Ocultar todas",
                columnsPanelShowAllButton: "Mostrar todas",
            }, rows: rows, columns: columns, onRowClick: handleClick, onRowDoubleClick: handleDobleClick, pageSize: 5, autoHeight: true, rowsPerPageOptions: [5], components: toolbar && { Toolbar: CustomToolbar } }) })));
};
exports.TableCustom = TableCustom;
//# sourceMappingURL=TableCustom.js.map