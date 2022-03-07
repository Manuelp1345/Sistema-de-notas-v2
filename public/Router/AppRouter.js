"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = require("../views/Loading");
var Setup_1 = require("../views/setup/Setup");
var CreateClient_1 = require("../views/setup/CreateClient");
var Auth_1 = __importDefault(require("../views/auth/Auth"));
var Dashboard_1 = __importDefault(require("../views/home/Dashboard"));
var AppRouter = function () {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Loading_1.Loading, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/setup", element: (0, jsx_runtime_1.jsx)(Setup_1.Setup, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/home", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "home" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/anos", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "anos" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/perfil", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "perfil" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, { element: "admin" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/logout", element: (0, jsx_runtime_1.jsx)(Auth_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/create-user", element: (0, jsx_runtime_1.jsx)(CreateClient_1.CreateUser, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/auth", element: (0, jsx_runtime_1.jsx)(Auth_1.default, {}, void 0) }, void 0)] }, void 0) }, void 0));
};
exports.default = AppRouter;
//# sourceMappingURL=AppRouter.js.map