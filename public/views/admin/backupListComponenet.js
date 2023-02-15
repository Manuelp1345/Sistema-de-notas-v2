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
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const customModal_1 = require("../modals/customModal");
const moment_1 = __importDefault(require("moment"));
const BackupList = ({ refresh }) => {
    const [selectedBackup, setSelectedBackup] = (0, react_2.useState)(null);
    const [page, setPage] = (0, react_2.useState)(1);
    const [backups, setBackups] = (0, react_2.useState)([]);
    const [open, setOpen] = react_1.default.useState(false);
    const getBackups = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const backups = yield window.API.getBackup();
        //delete extension
        backups.forEach((backup, index) => {
            backups[index] = backup.replace(".json", "");
        });
        //sort backups by date using moment
        backups.sort((a, b) => {
            const dateA = (0, moment_1.default)(a, "DD-MM-YYYY");
            const dateB = (0, moment_1.default)(b, "DD-MM-YYYY");
            return dateB.diff(dateA);
        });
        setBackups(backups);
    });
    const restoreBackup = (backup) => __awaiter(void 0, void 0, void 0, function* () {
        //add extension
        backup = backup + ".json";
        //@ts-ignore
        const result = yield window.API.restoreBackup(backup);
        console.log(result);
    });
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const handleListItemClick = (event, backup) => {
        setSelectedBackup(backup);
    };
    const handleApplyBackup = () => {
        restoreBackup(selectedBackup);
        handleClose();
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    react_1.default.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getBackups();
        }))();
    }, [refresh]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.List, Object.assign({ component: "nav" }, { children: backups.slice(startIndex, endIndex).map((backup) => ((0, jsx_runtime_1.jsx)(material_1.ListItem, Object.assign({ button: true, selected: backup === selectedBackup, onClick: (event) => handleListItemClick(event, backup) }, { children: (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: backup }) }), backup))) })), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ disabled: !selectedBackup, onClick: handleOpen, variant: "contained", color: "primary" }, { children: ["Aplicar respaldo: ", selectedBackup] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                    marginTop: "1rem",
                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Pagination, { count: Math.ceil(backups.length / itemsPerPage), page: page, onChange: handlePageChange }) })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ openDialog: open, tittle: "\u00A1Advertencia!", btnText: "si", handleCloseDialog: handleClose, handledConfirm: handleApplyBackup, color: "secondary" }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ id: "transition-modal-description" }, { children: "La restauraci\u00F3n de un respaldo reemplazar\u00E1 todos los datos actuales en la base de datos con los datos del respaldo. Aseg\u00FArese de que desea continuar y que tiene una copia de seguridad actualizada de sus datos antes de continuar." })), (0, jsx_runtime_1.jsx)("p", { children: "\u00BFDesea continuar con la restauraci\u00F3n de respaldo?" })] }) }))] }));
};
exports.default = BackupList;
//# sourceMappingURL=backupListComponenet.js.map