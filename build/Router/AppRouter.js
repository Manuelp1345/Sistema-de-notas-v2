"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Loading_1 = require("../views/Loading");
const Setup_1 = require("../views/setup/Setup");
const CreateClient_1 = require("../views/setup/CreateClient");
const Auth_1 = __importDefault(require("../views/auth/Auth"));
const Dashboard_1 = __importDefault(require("../views/home/Dashboard"));
const AppRouter = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Loading_1.Loading, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/setup", element: (0, jsx_runtime_1.jsx)(Setup_1.Setup, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/home", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "home" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/anos", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "anos" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/anio/:id", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "Year" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/seccion/:id", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "seccion" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/perfil", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "perfil" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/alumno", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "alumno" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "admin" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/logout", element: (0, jsx_runtime_1.jsx)(Auth_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/create-user", element: (0, jsx_runtime_1.jsx)(CreateClient_1.CreateUser, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/auth", element: (0, jsx_runtime_1.jsx)(Auth_1.default, {}) })] }) }));
};
exports.default = AppRouter;
//# sourceMappingURL=AppRouter.js.map