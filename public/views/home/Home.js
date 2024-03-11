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
const School_1 = __importDefault(require("@mui/icons-material/School"));
const DateRange_1 = __importDefault(require("@mui/icons-material/DateRange"));
const AdminPanelSettings_1 = __importDefault(require("@mui/icons-material/AdminPanelSettings"));
const QueryStats_1 = __importDefault(require("@mui/icons-material/QueryStats"));
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const react_1 = __importDefault(require("@fullcalendar/react"));
const daygrid_1 = __importDefault(require("@fullcalendar/daygrid"));
const es_1 = __importDefault(require("@fullcalendar/core/locales/es"));
const GlobalContext_1 = require("../../config/context/GlobalContext");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
function Home() {
    const { user } = React.useContext(GlobalContext_1.GlobalContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const buttons = [
        "Años",
        "Graduados",
        "Administración",
        "Estadisticas",
        "Salir",
    ];
    const update = () => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        yield window.API.createDataFake();
    });
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: {
            flexGrow: 1,
            p: 3,
            overflow: "auto !important",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ paragraph: true }, { children: "\u00A1Bienvenido al sistema de notas automatizado para el \u00E1rea administrativa de la U.E Jose Enrique Arias! Este sistema en l\u00EDnea ha sido dise\u00F1ado para mejorar y simplificar el proceso de seguimiento y evaluaci\u00F3n del progreso acad\u00E9mico de los estudiantes. Como miembro del equipo administrativo, podr\u00E1s acceder a las notas de los estudiantes en tiempo real, recibir actualizaciones y estar al tanto del desempe\u00F1o escolar de manera m\u00E1s eficiente. Esperamos que este sistema sea una herramienta \u00FAtil para mejorar la comunicaci\u00F3n y el \u00E9xito educativo de todos los estudiantes en la U.E Jose Enrique Arias. \u00A1Gracias por utilizar nuestro sistema de notas automatizado!" })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 5,
                    mt: 5,
                } }, { children: buttons.map((button, index) => ((0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ sx: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "10rem",
                        height: "10rem",
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "primary.dark",
                        },
                    }, 
                    //@ts-ignore
                    onClick: () => 
                    //@ts-ignore
                    (index === 0 && user.user.role !== "USER" && navigate("/anos")) ||
                        //@ts-ignore
                        (index === 1 &&
                            user.user.role !== "USER" &&
                            navigate("/search")) ||
                        //@ts-ignore
                        (index === 2 &&
                            user.user.role !== "USER" &&
                            navigate("/admin")) ||
                        //@ts-ignore
                        (index === 3 && navigate("/stats")) ||
                        //@ts-ignore
                        (index === 4 && navigate("/logout")) }, { children: [index === 0 && user.user.role !== "USER" && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Años`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(DateRange_1.default, {}) }))), index === 1 && user.user.role !== "USER" && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Graduados`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(School_1.default, {}) }))), index === 2 && user.user.role !== "USER" && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Administración`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(AdminPanelSettings_1.default, {}) }))), index === 3 && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `stats`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(QueryStats_1.default, {}) }))), index === 4 && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ title: `Salir`, arrow: true, placement: "right" }, { children: (0, jsx_runtime_1.jsx)(Logout_1.default, {}) }))), button] })))) })), user.user.role === "USER" && ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    mt: 2,
                    gap: 5,
                } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(react_1.default, { height: "27rem", plugins: [daygrid_1.default], initialView: "dayGridMonth", locale: es_1.default }) }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained" }, { children: "Generar Consulta" })), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => navigate("/logout"), variant: "contained" }, { children: [(0, jsx_runtime_1.jsx)(Logout_1.default, {}), " Salir del sistema"] }))] })))] })));
}
exports.default = Home;
//# sourceMappingURL=Home.js.map