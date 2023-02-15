"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCustom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Box_1 = __importDefault(require("@mui/material/Box"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TableCustom = ({ rows, columns, loading, handleClick, handleDobleClick, toolbar, handleEditCell = (params, oldCell) => {
    console.log("edit", params);
}, }) => {
    const handleCellEdit = (newCell, oldCell) => {
        console.log("new", newCell);
        console.log("old", oldCell);
        const alert = () => {
            return sweetalert2_1.default.fire({
                title: "Nota Invalida ( 1 - 20 )",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        };
        if (newCell["role"]) {
            handleEditCell(newCell, oldCell);
        }
        if (newCell["1"]) {
            if (Number(newCell["1"]) > 20 || Number(newCell["1"]) <= 0)
                return alert();
            if (newCell["1"] !== oldCell["1"]) {
                delete newCell["2"];
                delete newCell["3"];
                delete newCell["1rp"];
                delete newCell["2rp"];
                delete newCell["3rp"];
                handleEditCell(newCell, oldCell);
            }
        }
        if (newCell["2"]) {
            if (Number(newCell["2"]) > 20 || Number(newCell["2"]) < 1)
                return alert();
            if (newCell["2"] !== oldCell["2"]) {
                delete newCell["3"];
                delete newCell["3rp"];
                delete newCell["1rp"];
                delete newCell["2rp"];
                delete newCell["1"];
                handleEditCell(newCell, oldCell);
            }
        }
        if (newCell["3"]) {
            if (Number(newCell["3"]) > 20 || Number(newCell["3"]) < 1)
                return alert();
            if (newCell["3"] !== oldCell["3"]) {
                delete newCell["1"];
                delete newCell["1rp"];
                delete newCell["2"];
                delete newCell["2rp"];
                delete newCell["3rp"];
                handleEditCell(newCell, oldCell);
            }
        }
        if (newCell["1rp"]) {
            if (Number(newCell["1rp"]) > 20 || Number(newCell["1rp"]) < 1)
                return alert();
            if (newCell["1rp"] !== oldCell["1rp"]) {
                delete newCell["2"];
                delete newCell["3"];
                delete newCell["1"];
                delete newCell["3rp"];
                delete newCell["2rp"];
                handleEditCell(newCell, oldCell);
            }
        }
        if (newCell["2rp"]) {
            if (Number(newCell["2rp"]) > 20 || Number(newCell["2rp"]) < 1)
                return alert();
            if (newCell["2rp"] !== oldCell["2rp"]) {
                delete newCell["2"];
                delete newCell["3"];
                delete newCell["3rp"];
                delete newCell["1"];
                delete newCell["1rp"];
                handleEditCell(newCell, oldCell);
            }
        }
        if (newCell["3rp"]) {
            if (Number(newCell["3rp"]) > 20 || Number(newCell["3rp"]) < 1)
                return alert();
            if (newCell["3rp"] !== oldCell["3rp"]) {
                delete newCell["2"];
                delete newCell["2rp"];
                delete newCell["3"];
                delete newCell["1"];
                delete newCell["1rp"];
                handleEditCell(newCell, oldCell);
            }
        }
        return newCell;
    };
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
        } }, { children: (0, jsx_runtime_1.jsx)(x_data_grid_1.DataGrid, { loading: loading, experimentalFeatures: {
                newEditingApi: true,
            }, processRowUpdate: handleCellEdit, localeText: {
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
                noRowsLabel: "No hay datos",
            }, rows: rows, columns: columns, onRowClick: handleClick, onRowDoubleClick: handleDobleClick, pageSize: 6, autoHeight: true, rowsPerPageOptions: [6], components: toolbar && { Toolbar: CustomToolbar } }) })));
};
exports.TableCustom = TableCustom;
//# sourceMappingURL=TableCustom.js.map