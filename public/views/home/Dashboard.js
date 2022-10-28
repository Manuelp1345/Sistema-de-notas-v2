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
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const List_1 = __importDefault(require("@mui/material/List"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
const DateRange_1 = __importDefault(require("@mui/icons-material/DateRange"));
const AdminPanelSettings_1 = __importDefault(require("@mui/icons-material/AdminPanelSettings"));
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const Home_1 = __importDefault(require("./Home"));
const icons_material_1 = require("@mui/icons-material");
const react_router_dom_1 = require("react-router-dom");
const SetupYear_1 = __importDefault(require("../years/SetupYear"));
const Year_1 = __importDefault(require("../years/Year"));
const seccion_1 = __importDefault(require("../years/seccion"));
const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const AppBar = (0, styles_1.styled)(AppBar_1.default, {
    shouldForwardProp: (prop) => prop !== "open",
    //@ts-ignore
})(({ theme, open }) => (Object.assign({ zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }) }, (open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}))));
const Drawer = (0, styles_1.styled)(Drawer_1.default, {
    shouldForwardProp: (prop) => prop !== "open",
    //@ts-ignore
})(({ theme, open }) => (Object.assign(Object.assign({ width: drawerWidth, flexShrink: 0, whiteSpace: "nowrap", boxSizing: "border-box" }, (open && Object.assign(Object.assign({}, openedMixin(theme)), { "& .MuiDrawer-paper": openedMixin(theme) }))), (!open && Object.assign(Object.assign({}, closedMixin(theme)), { "& .MuiDrawer-paper": closedMixin(theme) })))));
function Dashboard({ element }) {
    //@ts-ignore
    document.querySelector("html").style.removeProperty("overflow");
    const [open, setOpen] = React.useState(false);
    const [periodo, setPeriodo] = React.useState({ periodo: "", id: 0 });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const theme = (0, styles_1.useTheme)();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const getPeriodos = (filter) => __awaiter(this, void 0, void 0, function* () {
        console.log("getPeriodos");
        //@ts-ignore
        const data = yield window.API.getPeriodos(filter);
        console.log(data);
        console.log(data[0][0]);
        data[0].find((item) => {
            console.log(item);
            if (item.estado) {
                setPeriodo({ periodo: item.periodo, id: item.id });
            }
        });
    });
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const setBgColor = () => {
        //@ts-ignore
        window.API.background();
    };
    React.useEffect(() => {
        //@ts-ignore
        setBgColor();
        if (periodo.id === 0) {
            getPeriodos(1);
        }
    }, [navigate]);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
            display: "flex",
        } }, { children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), (0, jsx_runtime_1.jsx)(AppBar, Object.assign({ position: "fixed", open: open }, { children: (0, jsx_runtime_1.jsxs)(Toolbar_1.default, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ color: "inherit", "aria-label": "open drawer", onClick: handleDrawerOpen, edge: "start", sx: Object.assign({ marginRight: "36px" }, (open && { display: "none" })) }, { children: (0, jsx_runtime_1.jsx)(Menu_1.default, {}) })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h6", noWrap: true, component: "div" }, { children: "U.E | Jose Enrique Arias | Sistema de Notas" })), (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ sx: { marginLeft: "10rem" }, variant: "h6", noWrap: true, component: "div" }, { children: ["Periodo Actual: ", periodo.periodo] }))] }) })), (0, jsx_runtime_1.jsxs)(Drawer, Object.assign({ variant: "permanent", open: open }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, { children: (0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ onClick: handleDrawerClose }, { children: theme.direction === "rtl" ? ((0, jsx_runtime_1.jsx)(ChevronRight_1.default, {})) : ((0, jsx_runtime_1.jsx)(ChevronLeft_1.default, {})) })) }), (0, jsx_runtime_1.jsx)(Divider_1.default, {}), (0, jsx_runtime_1.jsx)(List_1.default, { children: ["Inicio", "Años", "Administracion", "Perfil", "Salir"].map((text, index) => ((0, jsx_runtime_1.jsxs)(ListItem_1.default, Object.assign({ button: true, selected: (element === "home" && index === 0) ||
                                (element === "anos" && index === 1) ||
                                (element === "perfil" && index === 2) ||
                                (element === "admin" && index === 3), 
                            //@ts-ignore
                            onClick: () => 
                            //@ts-ignore
                            (index === 0 && navigate("/home")) ||
                                //@ts-ignore
                                (index === 1 && navigate("/anos")) ||
                                //@ts-ignore
                                (index === 2 && navigate("/perfil")) ||
                                //@ts-ignore
                                (index === 3 && navigate("/admin")) ||
                                //@ts-ignore
                                (index === 4 && navigate("/logout")) }, { children: [(0, jsx_runtime_1.jsxs)(ListItemIcon_1.default, { children: [index === 0 && (0, jsx_runtime_1.jsx)(icons_material_1.House, {}), index === 1 && (0, jsx_runtime_1.jsx)(DateRange_1.default, {}), index === 2 && (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}), index === 3 && (0, jsx_runtime_1.jsx)(AdminPanelSettings_1.default, {}), index === 4 && (0, jsx_runtime_1.jsx)(Logout_1.default, {})] }), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: text })] }), text))) }), (0, jsx_runtime_1.jsx)(Divider_1.default, {})] })), element === "home" && (0, jsx_runtime_1.jsx)(Home_1.default, {}), element === "anos" && (0, jsx_runtime_1.jsx)(SetupYear_1.default, { idPeriodo: periodo.id }), element === "Year" && (0, jsx_runtime_1.jsx)(Year_1.default, {}), element === "seccion" && (0, jsx_runtime_1.jsx)(seccion_1.default, {})] })));
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map