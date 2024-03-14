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
exports.CreateUser = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const colors_1 = require("@mui/material/colors");
const react_router_dom_1 = require("react-router-dom");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const CssTextField = (0, styles_1.styled)(material_1.TextField)({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "black",
            color: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
        "& input:focus": {
            color: "white",
        },
    },
});
const ColorButton = (0, styles_1.styled)(material_1.Button)(() => ({
    color: "white",
    backgroundColor: colors_1.blue[500],
    marginTop: "2.5rem",
    "&:hover": {
        backgroundColor: colors_1.blue[700],
    },
}));
function CreateUser() {
    const [nombre, setHost] = (0, react_1.useState)("");
    const [correo, setUser] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [apellido, setApellido] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const createUser = () => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        yield window.API.createCredentialsDB();
        //@ts-ignore
        return yield window.API.createUserDB({
            nombre,
            apellido,
            email: correo,
            password,
            role: "OWNER",
        });
    });
    const handledClick = () => __awaiter(this, void 0, void 0, function* () {
        if (!correo.includes("@") && !correo.includes(".")) {
            return sweetalert2_1.default.fire({
                title: "Error",
                text: "Correo invalido",
                icon: "error",
            });
        }
        if (nombre !== "" && correo !== "" && password !== "" && correo !== "") {
            const credentials = yield createUser();
            console.log(credentials);
            if (credentials) {
                navigate("/home");
            }
        }
    });
    const handleHostChange = (event) => {
        setHost(event.target.value);
    };
    const handleUserChange = (event) => {
        setUser(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handlePortChange = (event) => {
        setApellido(event.target.value);
    };
    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        } }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                backgroundColor: "info.main",
                color: "info.contrastText",
                height: "80%",
                width: "50%",
                boxShadow: "-5px 10px 20px rgba(0, 0, 0, 0.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center", marginTop: "1rem" }, variant: "h3" }, { children: "Bienvenido" })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center" }, variant: "h5" }, { children: "sigue todos los pasos para configurar el sistema" })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center", marginTop: "3rem", marginBottom: "1rem" }, variant: "h6" }, { children: "Crea tu usuario" })), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleHostChange, sx: { marginY: "0.3rem" }, id: "setupHost", label: "Nombre", value: nombre }), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePortChange, sx: { marginY: "0.3rem" }, id: "setupHost", label: "Apellido", value: apellido, type: "text" }), (0, jsx_runtime_1.jsx)(CssTextField, { sx: { marginY: "0.3rem" }, id: "setupUser", label: "Correo", value: correo, onChange: handleUserChange, type: "email" }), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePasswordChange, type: "password", sx: { marginY: "0.3rem" }, id: "setupPass", label: "contrase\u00F1a", value: password }), (0, jsx_runtime_1.jsx)(ColorButton, Object.assign({ onClick: handledClick }, { children: "Continuar" }))] })) })));
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateClient.js.map