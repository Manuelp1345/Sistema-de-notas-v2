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
//@ts-nocheck
var _a = window.require("electron"), ipcRenderer = _a.ipcRenderer, contextBridge = _a.contextBridge;
var getCredentialsDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("VALIDATE_CREDENTIALS")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var createCredentialsDB = function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("CREATE_CREDENTIALS_DB", credentials)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var createUserDB = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("CREATE_USER_DB", user)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var login = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("LOGIN", user)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getAnios = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("GET_AÑOS", id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var createAnio = function (anio) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("INSERT_AÑOS", anio)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var imgLogin = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var html;
    return __generator(this, function (_a) {
        html = document.querySelector("html");
        html.style.backgroundImage = "url(\"./img/background.jpg\")";
        html.style.backgroundRepeat = "no-repeat";
        html.style.backgroundPosition = "center";
        html.style.backgroundSize = "cover";
        html.style.overflow = "hidden";
        return [2 /*return*/];
    });
}); };
var background = function () { return __awaiter(void 0, void 0, void 0, function () {
    var html;
    return __generator(this, function (_a) {
        html = document.querySelector("html");
        html.style.backgroundImage = "url(none)";
        html.style.color = "white";
        html.style.backgroundRepeat = "no-repeat";
        html.style.backgroundPosition = "center";
        html.style.backgroundSize = "cover";
        return [2 /*return*/];
    });
}); };
var getPeriodos = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("GET_PERIODO", filter)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var insertPeriodo = function (periodo) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipcRenderer.invoke("INSER_PERIODO", periodo)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var API = {
    getCredentialsDB: getCredentialsDB,
    createCredentialsDB: createCredentialsDB,
    createUserDB: createUserDB,
    getPeriodos: getPeriodos,
    createAnio: createAnio,
    getAnios: getAnios,
    insertPeriodo: insertPeriodo,
    login: login,
    imgLogin: imgLogin,
    background: background,
};
contextBridge.exposeInMainWorld("API", API);
//# sourceMappingURL=preload.js.map