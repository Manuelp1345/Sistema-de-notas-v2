"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_1 = __importDefault(require("@emotion/styled"));
var material_1 = require("@mui/material");
var colors_1 = require("@mui/material/colors");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var CssTextField = (0, styled_1.default)(material_1.TextField)({
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
var ColorButton = (0, styled_1.default)(material_1.Button)(function () { return ({
    color: "white",
    backgroundColor: colors_1.blue[800],
    marginTop: "2.5rem",
    "&:hover": {
        backgroundColor: colors_1.blue[900],
    },
}); });
var Register = function () {
    var _a = (0, react_1.useState)(""), nombre = _a[0], setHost = _a[1];
    var _b = (0, react_1.useState)(""), apellido = _b[0], setApellido = _b[1];
    var _c = (0, react_1.useState)(""), correo = _c[0], setUser = _c[1];
    var _d = (0, react_1.useState)(""), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(""), password2 = _e[0], setPassword2 = _e[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var createCredentials = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, window.API.createUserDB({
                        nombre: nombre,
                        apellido: apellido,
                        email: correo,
                        password: password,
                        role: "USER",
                    })];
                case 1: 
                //@ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var handledClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var credentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(nombre !== "" && correo !== "" && password !== "" && password2 !== "")) return [3 /*break*/, 2];
                    if (!(password === password2)) return [3 /*break*/, 2];
                    return [4 /*yield*/, createCredentials()];
                case 1:
                    credentials = _a.sent();
                    console.log(credentials);
                    if (credentials) {
                        navigate("/home");
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleHostChange = function (event) {
        setHost(event.target.value);
    };
    var handleUserChange = function (event) {
        setUser(event.target.value);
    };
    var handleApellidoChange = function (event) {
        setApellido(event.target.value);
    };
    var handlePasswordChange = function (event) {
        setPassword(event.target.value);
    };
    var handlePassword2Change = function (event) {
        setPassword2(event.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, __assign({ sx: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleHostChange, sx: { marginY: "0.3rem", marginRight: "0.3rem" }, id: "setupHost", label: "Nombre", value: nombre }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handleApellidoChange, sx: { marginY: "0.3rem", marginLeft: "0.3rem" }, id: "setupHost", label: "Apellido", value: apellido }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { sx: { marginY: "0.3rem" }, id: "setupUser", label: "Correo", value: correo, onChange: handleUserChange }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePasswordChange, type: "password", sx: { marginY: "0.3rem" }, id: "setupPass", label: "Contrase\u00F1a", value: password }, void 0), (0, jsx_runtime_1.jsx)(CssTextField, { onChange: handlePassword2Change, type: "password", sx: { marginY: "0.3rem" }, id: "setupPass", label: "Confirmar contrase\u00F1a", value: password2 }, void 0), (0, jsx_runtime_1.jsx)(ColorButton, __assign({ onClick: handledClick }, { children: "Registrarse" }), void 0)] }), void 0));
};
exports.default = Register;
//# sourceMappingURL=Register.js.map