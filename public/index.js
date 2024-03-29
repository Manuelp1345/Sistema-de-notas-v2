"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const AppRouter_1 = __importDefault(require("./Router/AppRouter"));
const GlobalContext_1 = require("./config/context/GlobalContext");
require("./index.css");
require("./App.css");
const root = document.getElementById("root");
//@ts-ignore
root.style.overflow = "auto!important";
//@ts-ignore
document.querySelector("html").style.overflow = "auto !important";
react_dom_1.default.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(GlobalContext_1.GlobalProvider, { children: (0, jsx_runtime_1.jsx)(AppRouter_1.default, {}) }) }), root);
//# sourceMappingURL=index.js.map