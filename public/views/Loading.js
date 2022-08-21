"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const system_1 = require("@mui/system");
const react_router_dom_1 = require("react-router-dom");
const Loading = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getCredentials = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const credentials = yield window.API.getCredentialsDB();
        console.log(credentials);
        if (!credentials) {
            navigate("/setup");
        }
        else {
            navigate("/auth");
        }
    }), [navigate]);
    (0, react_1.useEffect)(() => {
        getCredentials();
    }, [getCredentials]);
    return ((0, jsx_runtime_1.jsx)(system_1.Box, Object.assign({ sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
        } }, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}, void 0) }), void 0));
};
exports.Loading = Loading;
//# sourceMappingURL=Loading.js.map