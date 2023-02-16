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
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const GlobalContext_1 = require("../../config/context/GlobalContext");
const RemoveCircle_1 = __importDefault(require("@mui/icons-material/RemoveCircle"));
const customModal_1 = require("../modals/customModal");
const DialogContentText_1 = __importDefault(require("@mui/material/DialogContentText"));
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Admin = () => {
    const [users, setUsers] = react_1.default.useState([]);
    const [loading, setLoading] = react_1.default.useState(false);
    const [dataEdit, setDataEdit] = react_1.default.useState("");
    const [user, setUser] = react_1.default.useState(0);
    const [counter, setCounter] = react_1.default.useState(0);
    const { user: userContext } = react_1.default.useContext(GlobalContext_1.GlobalContext);
    const [idUserDelete, setIdUserDelete] = react_1.default.useState({
        id: 0,
    });
    const [openDeleteUser, setOpenUser] = react_1.default.useState(false);
    const handleClickOpenDeleteUser = () => setOpenUser(true);
    const handleCloseDeleteUser = () => setOpenUser(false);
    const generateBackup = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const backup = yield window.API.generateBackup();
        console.log(backup);
    });
    const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const response = yield window.API.getUsers();
        const mapUsers = response.map((user) => {
            delete user.datosBasicos.id;
            user = Object.assign(Object.assign({}, user.datosBasicos), user);
            return user;
        });
        //filter user not OWNER
        const filterUsers = mapUsers.filter((user) => {
            return user.role !== "OWNER";
        });
        setUsers(filterUsers);
    });
    const handledDeleteAnio = () => __awaiter(void 0, void 0, void 0, function* () {
        handleCloseDeleteUser();
        let deleteUser;
        try {
            //@ts-ignore
            deleteUser = yield window.API.deleteUser(idUserDelete);
        }
        catch (error) {
            sweetalert2_1.default.fire({
                title: `Error al borrar el usuario`,
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        console.log("delete response", deleteUser);
        if (deleteUser === "error") {
            return sweetalert2_1.default.fire({
                title: `NO puedes borrar el usuario `,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        }
        yield fetchUsers();
        sweetalert2_1.default.fire({
            title: `Usuario Borrado`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
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
            renderEditCell: () => {
                return ((0, jsx_runtime_1.jsx)(material_1.FormControl, Object.assign({ sx: {
                        width: "100%",
                    } }, { children: (0, jsx_runtime_1.jsxs)(material_1.Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: dataEdit, placeholder: "Rol", label: "Rol", onChange: (e) => {
                            console.log("e.target.value ", e.target.value);
                            setDataEdit(e.target.value);
                        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ disabled: true, value: "select" }, { children: "Rol" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "USER" }, { children: "Usuario" })), (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ value: "ADMIN" }, { children: "Administrador" }))] })) })));
            },
            renderCell: (params) => {
                return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                        display: "flex",
                        width: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.5rem",
                    } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Doble click para editar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["\u00A0\u00A0\u00A0\u00A0", params.formattedValue === "OWNER" && "Super Administrador", params.formattedValue === "USER" && "Usuario", params.formattedValue === "ADMIN" && " Administrador", "\u00A0\u00A0\u00A0\u00A0"] }) })) })));
            },
        },
        userContext.user.role !== "ADMIN" && {
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
                        handleClickOpenDeleteUser();
                        setIdUserDelete(params.row);
                    } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: "Borrar", arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(RemoveCircle_1.default, { sx: { color: "red" } }) })) })));
            },
        },
    ];
    const editUser = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("dataEdit ", dataEdit);
        console.log("user ", user);
        //@ts-ignore
        const response = yield window.API.updateUser({
            id: user,
            role: dataEdit,
        });
        console.log("response ", response);
        if (response) {
            sweetalert2_1.default.fire({
                title: "Usuario Actualizado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            yield fetchUsers();
        }
        else {
            sweetalert2_1.default.fire({
                title: "Error al actualizar el usuario",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
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
                } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", gutterBottom: true, component: "div" }, { children: "Administraci\u00F3n" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h5", gutterBottom: true, component: "div" }, { children: "Lista de usuarios" })), (0, jsx_runtime_1.jsx)(TableCustom_1.TableCustom, { columns: fields, rows: users, loading: loading, handleClick: (as) => {
                            setDataEdit(as.row.role);
                            setUser(as.row.id);
                        }, handleDobleClick: (as) => {
                            console.log(as, "EDIT");
                        }, toolbar: false, handleEditCell: () => __awaiter(void 0, void 0, void 0, function* () { return yield editUser(); }) })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h5", gutterBottom: true, component: "div" }, { children: "Respaldo de base de datos" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
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
                    } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: "Generar respaldo" }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", color: "primary", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                                yield generateBackup();
                                setCounter(counter + 1);
                            }) }, { children: "Respaldar base de datos" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: "Lista de respaldos" }), (0, jsx_runtime_1.jsx)(backupListComponenet_1.default, { refresh: counter })] })) })), (0, jsx_runtime_1.jsx)(customModal_1.CustomModal, Object.assign({ btnText: "Eliminar", color: "red", tittle: "Alerta", openDialog: openDeleteUser, handleCloseDialog: handleCloseDeleteUser, handledConfirm: handledDeleteAnio }, { children: (0, jsx_runtime_1.jsx)(DialogContentText_1.default, { children: "Confirma que desea eliminar el usuario seleccionado" }) }))] })));
};
exports.default = Admin;
//# sourceMappingURL=Admin.js.map