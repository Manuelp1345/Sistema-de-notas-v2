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
exports.Setup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const colors_1 = require("@mui/material/colors");
const react_router_dom_1 = require("react-router-dom");
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
function Setup() {
    const [host, setHost] = (0, react_1.useState)("");
    const [user, setUser] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [port, setPort] = (0, react_1.useState)("3306");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const createCredentials = () => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        return yield window.API.createCredentialsDB({
            host,
            user,
            pass: password,
            port: Number(port),
        });
    });
    const handledClick = () => __awaiter(this, void 0, void 0, function* () {
        if (host !== "" && user !== "" && password !== "" && port !== "") {
            const credentials = yield createCredentials();
            console.log(credentials);
            if (credentials) {
                navigate("/create-user");
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
        setPort(event.target.value);
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
            } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center", marginTop: "1rem" }, variant: "h3" }, { children: "Bienvenido" }), void 0), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center" }, variant: "h5" }, { children: "sigue todos los pasos para configurar el sistema" }), void 0), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center", marginTop: "3rem", marginBottom: "1rem" }, variant: "h6" }, { children: "Datos de ingresos de la base de datos" }), void 0), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleHostChange, sx: { marginY: "0.3rem" }, id: "setupHost", label: "Host", value: host }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePortChange, sx: { marginY: "0.3rem" }, id: "setupHost", label: "Puerto", value: port, type: "number" }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { sx: { marginY: "0.3rem" }, id: "setupUser", label: "Usuario", value: user, onChange: handleUserChange }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePasswordChange, type: "password", sx: { marginY: "0.3rem" }, id: "setupPass", label: "contrase\u00F1a", value: password }, void 0), (0, jsx_runtime_1.jsx)(ColorButton, Object.assign({ onClick: handledClick }, { children: "Continuar" }), void 0)] }), void 0) }), void 0));
}
exports.Setup = Setup;
//# sourceMappingURL=Setup.js.map