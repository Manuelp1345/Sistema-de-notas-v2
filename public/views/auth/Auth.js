"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/ban-ts-comment */
const react_1 = require("react");
const Box_1 = __importDefault(require("@mui/material/Box"));
const prop_types_1 = __importDefault(require("prop-types"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const material_1 = require("@mui/material");
const styled_1 = __importDefault(require("@emotion/styled"));
const Register_1 = __importDefault(require("./Register"));
const Login_1 = __importDefault(require("./Login"));
const AntTabs = (0, styled_1.default)(material_1.Tabs)({
    borderBottom: "1px solid gray",
    "& .MuiTabs-indicator": {
        backgroundColor: "white",
    },
});
const AntTab = (0, styled_1.default)((props) => (0, jsx_runtime_1.jsx)(material_1.Tab, Object.assign({ disableRipple: true }, props), void 0))(({ theme }) => ({
    color: "white",
    "&.Mui-selected": {
        color: "white",
    },
}));
function TabPanel(props) {
    const { children, value, index } = props, other = __rest(props, ["children", "value", "index"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}`, style: { display: "flex", flexDirection: "column" } }, other, { children: value === index && ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                width: "100%",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            } }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, { children: children }, void 0) }), void 0)) }), void 0));
}
TabPanel.propTypes = {
    children: prop_types_1.default.node,
    index: prop_types_1.default.number.isRequired,
    value: prop_types_1.default.number.isRequired,
};
const Auth = () => {
    const [value, setValue] = (0, react_1.useState)(0);
    const setBgImg = () => {
        //@ts-ignore
        window.API.imgLogin();
    };
    (0, react_1.useEffect)(setBgImg, []);
    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };
    return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        } }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                backgroundColor: "rgba(0,155,221,0.95)",
                color: "info.contrastText",
                height: "76%",
                width: "60%",
                boxShadow: "-5px 10px 20px rgba(0, 0, 0, 0.8)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "-10rem",
                    } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: { height: "5rem", padding: "1rem" } }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { height: "8rem" }, component: "img", src: "/img/logo.png" }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center", marginTop: "1rem" }, variant: "h3" }, { children: "Bienvenido" }), void 0), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { textAlign: "center" }, variant: "h5" }, { children: "\u00BFDesea ingresar al sistema?" }), void 0)] }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(AntTabs, Object.assign({ value: value, onChange: handleChange }, { children: [(0, jsx_runtime_1.jsx)(AntTab, { href: "", value: 0, label: "Ingresar" }, void 0), (0, jsx_runtime_1.jsx)(AntTab, { href: "", value: 1, label: "Registrarse" }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(TabPanel, Object.assign({ value: value, index: 0 }, { children: (0, jsx_runtime_1.jsx)(Login_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(TabPanel, Object.assign({ value: value, index: 1 }, { children: (0, jsx_runtime_1.jsx)(Register_1.default, {}, void 0) }), void 0)] }), void 0) }), void 0));
};
exports.default = Auth;
//# sourceMappingURL=Auth.js.map