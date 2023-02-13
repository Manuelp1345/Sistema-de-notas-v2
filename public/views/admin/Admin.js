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
const react_2 = require("react");
const TableCustom_1 = require("../table/TableCustom");
const backupListComponenet_1 = __importDefault(require("./backupListComponenet"));
const material_1 = require("@mui/material");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Admin = () => {
    const [users, setUsers] = react_1.default.useState([]);
    const [loading, setLoading] = react_1.default.useState(false);
    const [dataEdit, setDataEdit] = react_1.default.useState("");
    const generateBackup = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const backup = yield window.API.generateBackup();
        console.log(backup);
    });
    const fields = [
        {
            field: "id",
            headerName: "ID",
            disableExport: true,
            hide: true,
        },
        {
            field: "firstName",
            headerName: "Nombre",
            headerClassName: "backGround",
            width: 130,
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
            type: "number",
            align: "center",
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            type: "number",
            align: "center",
            editable: true,
        },
        {
            field: "role",
            headerName: "Rol",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            type: "select",
            align: "center",
            editable: true,
            renderEditCell: (params) => {
                console.log("Params edirt componenet ", params);
                return ((0, jsx_runtime_1.jsx)(material_1.FormControl, Object.assign({ sx: {
                        width: "100%",
                    } }, { children: (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: params.row.role, placeholder: "Rol", label: "Rol" }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ disabled: true, value: "select" }, { children: "Rol" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "user" }, { children: "Usuario" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "Admin" }, { children: "Administrador" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "OWNER" }, { children: "Super Administrador" }))] })) })));
            },
            renderCell: (params) => {
                return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                        display: "flex",
                        width: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.5rem",
                    } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue === "OWNER" && "Super Administrador", params.formattedValue === "user" && "usuario", params.formattedValue === "admin" && " Administrador", "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
            },
        },
    ];
    const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getUsers();
        const mapUsers = response.map((user) => {
            user = Object.assign(Object.assign({}, user), user.datosBasicos);
            return user;
        });
        setUsers(mapUsers);
    });
    (0, react_2.useEffect)(() => {
        setLoading(true);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchUsers();
        }))();
        setLoading(false);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexWrap: "wrap",
                } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", gutterBottom: true, component: "div" }, { children: "Administraci\u00F3n" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h5", gutterBottom: true, component: "div" }, { children: "Lista de usuarios" })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { columns: fields, rows: users, loading: loading, handleClick: (as) => console.log(), handleDobleClick: (as) => console.log(), handleEditCell: (as) => console.log(), toolbar: true })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h5", gutterBottom: true, component: "div" }, { children: "Respaldo de base de datos" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                } }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: "Generar respaldo" }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", color: "primary", onClick: () => __awaiter(void 0, void 0, void 0, function* () { return yield generateBackup(); }) }, { children: "Respaldar base de datos" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: "Lista de respaldos" }), (0, jsx_runtime_1.jsx)(backupListComponenet_1.default, {})] })) }))] })));
};
exports.default = Admin;
//# sourceMappingURL=Admin.js.map