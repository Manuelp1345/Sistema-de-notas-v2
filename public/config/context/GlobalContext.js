"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalProvider = exports.GlobalContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.GlobalContext = (0, react_1.createContext)({});
const GlobalProvider = ({ children }) => {
    const [areas, setAreas] = (0, react_1.useState)([
        { id: 0, nombre: "", añoId: 0 },
    ]);
    const [alumnoId, setAlumnoId] = (0, react_1.useState)({});
    const [user, setUser] = (0, react_1.useState)({});
    const [periodo, setPeriodo] = (0, react_1.useState)({});
    return ((0, jsx_runtime_1.jsx)(exports.GlobalContext.Provider, Object.assign({ value: {
            areas: {
                areas,
                setAreas,
            },
            alumno: {
                alumnoId,
                setAlumnoId,
            },
            user: {
                user,
                setUser,
            },
            periodo: {
                periodo,
                setPeriodo,
            },
        } }, { children: children })));
};
exports.GlobalProvider = GlobalProvider;
//# sourceMappingURL=GlobalContext.js.map