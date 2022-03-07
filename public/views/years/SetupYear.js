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
/* eslint-disable no-undef */
var React = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var Box_1 = __importDefault(require("@mui/material/Box"));
var material_1 = require("@mui/material");
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var DrawerHeader = (0, styles_1.styled)("div")(function (_a) {
    var theme = _a.theme;
    return (__assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar));
});
var SetupYear = function (_a) {
    var idPedioro = _a.idPedioro;
    var getPeriodos = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, window.API.getPeriodos(filter)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, { data: data[0], itemsCount: data[1] }];
            }
        });
    }); };
    var getAnios = function (periodoId) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, window.API.getAnios(periodoId)];
                case 1:
                    data = _a.sent();
                    if (data && data.length > 0) {
                        return [2 /*return*/, { data: data, itemsCount: 0 }];
                    }
                    return [2 /*return*/, { data: [], itemsCount: 0 }];
            }
        });
    }); };
    var insertPeriodo = function (periodo) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, window.API.insertPeriodo(periodo)];
                case 1:
                    data = _a.sent();
                    if (data) {
                        sweetalert2_1.default.fire({
                            title: "Periodo creado",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var periodos, error_1, anios, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getPeriodos({ pageIndex: 1, pageSize: 3 })];
                case 1:
                    periodos = _a.sent();
                    console.log("periodos", periodos);
                    // @ts-ignore
                    $("#periodo").jsGrid("loadData", periodos);
                    // @ts-ignore
                    $("#periodo").jsGrid("refresh");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, getAnios(periodos.data[0].id)];
                case 4:
                    anios = _a.sent();
                    console.log("anios", anios);
                    // @ts-ignore
                    $("#jsGrid").jsGrid("loadData", anios);
                    // @ts-ignore
                    $("#jsGrid").jsGrid("refresh");
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var insertAnio = function (anio) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    anio.periodoId = idPedioro;
                    return [4 /*yield*/, window.API.createAnio(anio)];
                case 1:
                    data = _a.sent();
                    if (data) {
                        sweetalert2_1.default.fire({
                            title: "Año creado",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        // @ts-ignore
        $("#jsGrid").jsGrid({
            width: "100%",
            paging: true,
            autoload: false,
            pageLoading: true,
            pageSize: 3,
            pageIndex: 1,
            heading: true,
            inserting: true,
            loadIndication: true,
            loadMessage: "Por favor espere",
            loadShading: true,
            noDataContent: "No hay años registrados",
            pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
            pagePrevText: "Anterior",
            pageNextText: "Siguiente",
            pageFirstText: "Primera",
            pageLastText: "Ultima",
            pageNavigatorNextText: "...",
            pageNavigatorPrevText: "...",
            invalidMessage: "Por favor ingreser un valor valido",
            controller: {
                loadData: function (filter) {
                    return getAnios(idPedioro);
                },
                insertItem: function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, insertAnio(item)];
                            case 1:
                                _a.sent();
                                // @ts-ignore
                                $("#jsGrid").jsGrid("refresh");
                                return [2 /*return*/];
                        }
                    });
                }); },
            },
            rowClick: function (args) {
                console.log(args);
            },
            fields: [
                {
                    name: "anio",
                    title: "Años",
                    align: "center",
                    type: "text",
                },
                { type: "control", width: 10 },
            ],
        });
        // @ts-ignore
        $("#periodo").jsGrid({
            width: "100%",
            paging: true,
            autoload: false,
            pageLoading: true,
            pageSize: 3,
            pageIndex: 1,
            heading: true,
            inserting: true,
            loadIndication: true,
            loadMessage: "Por favor espere",
            loadShading: true,
            noDataContent: "No hay periodos registrados",
            pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
            pagePrevText: "Anterior",
            pageNextText: "Siguiente",
            pageFirstText: "Primera",
            pageLastText: "Ultima",
            pageNavigatorNextText: "...",
            pageNavigatorPrevText: "...",
            invalidMessage: "Por favor ingreser un valor valido",
            rowClick: function (args) {
                console.log(args);
            },
            controller: {
                loadData: function (filter) {
                    return getPeriodos(filter);
                },
                insertItem: function (item) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, insertPeriodo(item)];
                                case 1:
                                    _a.sent();
                                    // @ts-ignore
                                    $("#periodo").jsGrid("refresh");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            },
            // @ts-ignore
            invalidNotify: function (_a) {
                var errors = _a.errors, item = _a.item;
                console.log(item);
                if (item.periodo === "") {
                    sweetalert2_1.default.fire({
                        title: "Error",
                        text: "Ingrese un periodo",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    return;
                }
                if (item.estado === false) {
                    sweetalert2_1.default.fire({
                        title: "Error",
                        text: "Ingrese el estado del periodo",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    return;
                }
            },
            fields: [
                {
                    name: "periodo",
                    title: "Periodos",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "estado",
                    title: "Actual",
                    align: "center",
                    type: "checkbox",
                    validate: function (e) {
                        if (e.estado === false) {
                            return false;
                        }
                        return true;
                    },
                },
                { type: "control", editButton: false, deleteButton: false },
            ],
        });
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: {
            flexGrow: 1,
            p: 3,
            alignItems: "center",
            display: "flex",
            height: "100vh",
            flexDirection: "column",
        } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}, void 0), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "0.5rem" }, id: "periodo", component: "div" }, void 0), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "h4", sx: { marginTop: "1rem", textAlign: "center" } }, { children: "Lista de A\u00F1os" }), void 0), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "2.5rem" }, id: "jsGrid", component: "div" }, void 0)] }), void 0));
};
exports.default = SetupYear;
//# sourceMappingURL=SetupYear.js.map