"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
const CustomModal = ({ openDialog, handleCloseDialog, tittle, handledConfirm, children, color, btnText, }) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Dialog, Object.assign({ open: openDialog, onClose: handleCloseDialog, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, { children: [(0, jsx_runtime_1.jsx)(DialogTitle_1.default, Object.assign({ sx: { textAlign: "center", color: color, fontWeight: "bold" } }, { children: tittle })), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: children }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: handleCloseDialog }, { children: "Cancelar" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: { color: color }, onClick: handledConfirm, autoFocus: true }, { children: btnText }))] })] })));
};
exports.CustomModal = CustomModal;
//# sourceMappingURL=customModal.js.map