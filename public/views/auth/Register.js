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
const styled_1 = __importDefault(require("@emotion/styled"));
const material_1 = require("@mui/material");
const colors_1 = require("@mui/material/colors");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const GlobalContext_1 = require("../../config/context/GlobalContext");
const react_2 = require("react");
const CssTextField = (0, styled_1.default)(material_1.TextField)({
    "& label.Mui-focused": {
        color: "black",
        marginBottom: "4rem",
        borderRadius: "0.1rem",
        top: "0.4rem",
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
            borderColor: "black",
        },
        "& input:focus": {
            color: "black",
        },
        "& input": {
            backgroundColor: "white",
            borderRadius: "0.3rem",
            padding: "1rem",
        },
    },
});
const ColorButton = (0, styled_1.default)(material_1.Button)(() => ({
    color: "white",
    backgroundColor: colors_1.blue[800],
    marginTop: "2.5rem",
    "&:hover": {
        backgroundColor: colors_1.blue[900],
    },
}));
const Register = () => {
    const [nombre, setHost] = (0, react_1.useState)("");
    const [apellido, setApellido] = (0, react_1.useState)("");
    const [correo, setUser] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [password2, setPassword2] = (0, react_1.useState)("");
    const { user } = (0, react_2.useContext)(GlobalContext_1.GlobalContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [error, setError] = (0, react_1.useState)({
        correo: false,
        password: false,
        password2: false,
        nombre: false,
        apellido: false,
    });
    const validateData = () => {
        if (nombre === "") {
            setError(Object.assign(Object.assign({}, error), { nombre: true }));
            return true;
        }
        if (apellido === "") {
            setError(Object.assign(Object.assign({}, error), { apellido: true }));
            return true;
        }
        if (correo === "") {
            setError(Object.assign(Object.assign({}, error), { correo: true }));
            if (correo.includes("@")) {
                setError(Object.assign(Object.assign({}, error), { correo: true }));
            }
            if (correo.includes(".")) {
                setError(Object.assign(Object.assign({}, error), { correo: true }));
            }
            return true;
        }
        if (password === "") {
            setError(Object.assign(Object.assign({}, error), { password: true }));
            return true;
        }
        if (password2 === "") {
            setError(Object.assign(Object.assign({}, error), { password2: true }));
            return true;
        }
        setError({
            correo: false,
            password: false,
            password2: false,
            nombre: false,
            apellido: false,
        });
        return false;
    };
    const createCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        return yield window.API.createUserDB({
            nombre: nombre,
            apellido: apellido,
            email: correo,
            password: password,
            role: "USER",
        });
    });
    const handledClick = () => __awaiter(void 0, void 0, void 0, function* () {
        if (error.correo === false &&
            error.password === false &&
            error.password2 === false &&
            error.nombre === false &&
            error.apellido === false) {
            if (password === password2) {
                const credentials = yield createCredentials();
                console.log(credentials);
                if (credentials) {
                    user.setUser(credentials);
                    navigate("/home");
                }
            }
        }
    });
    const handleHostChange = (event) => {
        setHost(event.target.value);
    };
    const handleUserChange = (event) => {
        setUser(event.target.value);
    };
    const handleApellidoChange = (event) => {
        setApellido(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleHostChange, sx: { marginY: "0.3rem", marginRight: "0.3rem" }, id: "setupHost", label: "Nombre", value: nombre, error: error.nombre, onKeyUp: validateData, onBlur: validateData, helperText: error.nombre ? "Campo requerido" : "" }), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleApellidoChange, sx: { marginY: "0.3rem", marginLeft: "0.3rem" }, id: "setupHost", label: "Apellido", value: apellido, onBlur: validateData, onKeyUp: validateData, error: error.apellido, helperText: error.apellido ? "Campo requerido" : "" })] }), (0, jsx_runtime_1.jsx)(CssTextField, { sx: { marginY: "0.3rem" }, id: "setupUser", label: "Correo", value: correo, onKeyUp: validateData, onChange: handleUserChange, error: error.correo, onBlur: validateData, helperText: error.correo ? "Campo requerido" : "" }), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePasswordChange, type: "password", sx: { marginY: "0.3rem" }, id: "setupPass", label: "Contrase\u00F1a", value: password, onKeyUp: validateData, error: error.password, onBlur: validateData, helperText: error.password ? "Campo requerido" : "" }), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePassword2Change, type: "password", sx: { marginY: "0.3rem" }, id: "setupPass", onKeyUp: validateData, onBlur: validateData, label: "Confirmar contrase\u00F1a", value: password2, error: error.password2, helperText: error.password2 ? "Campo requerido" : "" }), (0, jsx_runtime_1.jsx)(ColorButton, Object.assign({ onClick: () => {
                    const valid = validateData();
                    if (!valid)
                        handledClick();
                } }, { children: "Registrarse" }))] })));
};
exports.default = Register;
//# sourceMappingURL=Register.js.map