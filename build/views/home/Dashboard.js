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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var React = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var Box_1 = __importDefault(require("@mui/material/Box"));
var Drawer_1 = __importDefault(require("@mui/material/Drawer"));
var AppBar_1 = __importDefault(require("@mui/material/AppBar"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var List_1 = __importDefault(require("@mui/material/List"));
var CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Divider_1 = __importDefault(require("@mui/material/Divider"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
var ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
var ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
var ListItem_1 = __importDefault(require("@mui/material/ListItem"));
var ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
var AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
var DateRange_1 = __importDefault(require("@mui/icons-material/DateRange"));
var AdminPanelSettings_1 = __importDefault(require("@mui/icons-material/AdminPanelSettings"));
var Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
var Home_1 = __importDefault(require("./Home"));
var icons_material_1 = require("@mui/icons-material");
var react_router_dom_1 = require("react-router-dom");
var SetupYear_1 = __importDefault(require("../years/SetupYear"));
var drawerWidth = 240;
var openedMixin = function (theme) { return ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
}); };
var closedMixin = function (theme) {
    var _a;
    return (_a = {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: "calc(".concat(theme.spacing(7), " + 1px)")
        },
        _a[theme.breakpoints.up("sm")] = {
            width: "calc(".concat(theme.spacing(9), " + 1px)"),
        },
        _a);
};
var DrawerHeader = (0, styles_1.styled)("div")(function (_a) {
    var theme = _a.theme;
    return (__assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar));
});
var AppBar = (0, styles_1.styled)(AppBar_1.default, {
    shouldForwardProp: function (prop) { return prop !== "open"; },
    //@ts-ignore
})(function (_a) {
    var theme = _a.theme, open = _a.open;
    return (__assign({ zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }) }, (open && {
        marginLeft: drawerWidth,
        width: "calc(100% - ".concat(drawerWidth, "px)"),
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })));
});
var Drawer = (0, styles_1.styled)(Drawer_1.default, {
    shouldForwardProp: function (prop) { return prop !== "open"; },
    //@ts-ignore
})(function (_a) {
    var theme = _a.theme, open = _a.open;
    return (__assign(__assign({ width: drawerWidth, flexShrink: 0, whiteSpace: "nowrap", boxSizing: "border-box" }, (open && __assign(__assign({}, openedMixin(theme)), { "& .MuiDrawer-paper": openedMixin(theme) }))), (!open && __assign(__assign({}, closedMixin(theme)), { "& .MuiDrawer-paper": closedMixin(theme) }))));
});
function Dashboard(_a) {
    var _this = this;
    var element = _a.element;
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var _c = React.useState({ periodo: "", id: 0 }), periodo = _c[0], setPeriodo = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var theme = (0, styles_1.useTheme)();
    var handleDrawerOpen = function () {
        setOpen(true);
    };
    var getPeriodos = function (filter) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("getPeriodos");
                    return [4 /*yield*/, window.API.getPeriodos(filter)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    console.log(data[0][0]);
                    setPeriodo(data[0][0]);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDrawerClose = function () {
        setOpen(false);
    };
    var setBgColor = function () {
        //@ts-ignore
        window.API.background();
    };
    React.useEffect(function () {
        setBgColor();
        getPeriodos(1);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(AppBar, __assign({ position: "fixed", open: open }, { children: (0, jsx_runtime_1.jsxs)(Toolbar_1.default, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ color: "inherit", "aria-label": "open drawer", onClick: handleDrawerOpen, edge: "start", sx: __assign({ marginRight: "36px" }, (open && { display: "none" })) }, { children: (0, jsx_runtime_1.jsx)(Menu_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", noWrap: true, component: "div" }, { children: "U.E | Jose Enrique Arias | Sistema de Notas" }), void 0), (0, jsx_runtime_1.jsxs)(Typography_1.default, __assign({ sx: { marginLeft: "10rem" }, variant: "h6", noWrap: true, component: "div" }, { children: ["Periodo Actual: ", periodo.periodo] }), void 0)] }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(Drawer, __assign({ variant: "permanent", open: open }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, { children: (0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ onClick: handleDrawerClose }, { children: theme.direction === "rtl" ? ((0, jsx_runtime_1.jsx)(ChevronRight_1.default, {}, void 0)) : ((0, jsx_runtime_1.jsx)(ChevronLeft_1.default, {}, void 0)) }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(Divider_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(List_1.default, { children: ["Inicio", "Años", "Administracion", "Perfil", "Salir"].map(function (text, index) { return ((0, jsx_runtime_1.jsxs)(ListItem_1.default, __assign({ button: true, selected: (element === "home" && index === 0) ||
                                (element === "anos" && index === 1) ||
                                (element === "perfil" && index === 2) ||
                                (element === "admin" && index === 3), 
                            //@ts-ignore
                            onClick: function () {
                                //@ts-ignore
                                return (index === 0 && navigate("/home")) ||
                                    //@ts-ignore
                                    (index === 1 && navigate("/anos")) ||
                                    //@ts-ignore
                                    (index === 2 && navigate("/perfil")) ||
                                    //@ts-ignore
                                    (index === 3 && navigate("/admin")) ||
                                    //@ts-ignore
                                    (index === 4 && navigate("/logout"));
                            } }, { children: [(0, jsx_runtime_1.jsxs)(ListItemIcon_1.default, { children: [index === 0 && (0, jsx_runtime_1.jsx)(icons_material_1.House, {}, void 0), index === 1 && (0, jsx_runtime_1.jsx)(DateRange_1.default, {}, void 0), index === 2 && (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}, void 0), index === 3 && (0, jsx_runtime_1.jsx)(AdminPanelSettings_1.default, {}, void 0), index === 4 && (0, jsx_runtime_1.jsx)(Logout_1.default, {}, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: text }, void 0)] }), text)); }) }, void 0), (0, jsx_runtime_1.jsx)(Divider_1.default, {}, void 0)] }), void 0), element === "home" && (0, jsx_runtime_1.jsx)(Home_1.default, {}, void 0), element === "anos" && (0, jsx_runtime_1.jsx)(SetupYear_1.default, { idPedioro: periodo.id }, void 0)] }), void 0));
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map