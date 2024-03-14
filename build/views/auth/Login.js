"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("react");
const GlobalContext_1 = require("../../config/context/GlobalContext");
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
            border: "0.13rem solid black",
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
const Login = () => {
    const [correo, setCorreo] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const { user } = (0, react_2.useContext)(GlobalContext_1.GlobalContext);
    const [open, setOpen] = react_1.default.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const loginUser = () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        return yield window.API.login({
            email: correo,
            password,
        });
    });
    const handledClick = () => __awaiter(void 0, void 0, void 0, function* () {
        if (correo !== "" && password !== "") {
            const credentials = yield loginUser();
            console.log(credentials);
            if (credentials) {
                user.setUser(credentials);
                localStorage.setItem("token", JSON.stringify(credentials));
                navigate("/Home");
            }
            else {
                handleClick();
            }
        }
    });
    const handleEmailChange = (event) => {
        setCorreo(event.target.value);
    };
    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { width: "28.5rem", display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleEmailChange, type: "email", sx: { marginY: "0.3rem" }, label: "Correo", value: correo }), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePassChange, type: "password", sx: { marginY: "0.3rem" }, label: "Contrase\u00F1a", value: password }), (0, jsx_runtime_1.jsx)(ColorButton, Object.assign({ onClick: handledClick }, { children: "Ingresar" })), (0, jsx_runtime_1.jsx)(material_1.Stack, Object.assign({ spacing: 2, sx: { width: "100%" } }, { children: (0, jsx_runtime_1.jsx)(material_1.Snackbar, Object.assign({ anchorOrigin: { vertical: "bottom", horizontal: "right" }, open: open, autoHideDuration: 6000, onClose: handleClose }, { children: (0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ onClose: handleClose, severity: "error", sx: { width: "100%" } }, { children: "Contrase\u00F1a o correo incorrecto" })) })) }))] })));
};
exports.default = Login;
//# sourceMappingURL=Login.js.map