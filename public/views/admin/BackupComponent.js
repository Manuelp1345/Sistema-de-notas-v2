"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
function GenerateBackup() {
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: "Generar respaldo" }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", color: "primary", onClick: handleClickOpen }, { children: "Respaldar base de datos" })), (0, jsx_runtime_1.jsxs)(material_1.Dialog, Object.assign({ open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, { children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, Object.assign({ id: "alert-dialog-title" }, { children: "\u00A1Advertencia!" })), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(material_1.DialogContentText, Object.assign({ id: "alert-dialog-description" }, { children: "La restauraci\u00F3n de un respaldo reemplazar\u00E1 todos los datos actuales en la base de datos con los datos del respaldo. Aseg\u00FArese de que desea continuar y que tiene una copia de seguridad actualizada de sus datos antes de continuar. \u00BFDesea continuar con la restauraci\u00F3n de respaldo?" })) }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleClose, color: "primary" }, { children: "No" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleClose, color: "primary", autoFocus: true }, { children: "S\u00ED" }))] })] }))] }));
}
exports.default = GenerateBackup;
//# sourceMappingURL=BackupComponent.js.map