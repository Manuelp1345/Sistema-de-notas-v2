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
/* eslint-disable no-undef */
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const material_1 = require("@mui/material");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const SetupYear = ({ idPeriodo }) => {
    const [periodos, setPeriodos] = (0, react_1.useState)({});
    const [periodo, setPeriodo] = (0, react_1.useState)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getPeriodos = (filter) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.getPeriodos(filter);
        const pActive = data[0].find((p) => p.estado === true);
        console.log("pactive", pActive);
        if (pActive)
            setPeriodo(pActive.periodo);
        console.log(data);
        setPeriodos({ data: data[0], itemsCount: data[1] });
        return { data: data[0], itemsCount: data[1] };
    });
    const getAnios = (periodoId) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.getAnios(periodoId);
        if (data && data.length > 0) {
            return { data: data, itemsCount: 0 };
        }
        return { data: [], itemsCount: 0 };
    });
    const insertPeriodo = (periodo) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const data = yield window.API.insertPeriodo(periodo);
        if (data) {
            idPeriodo += 1;
            getData();
            sweetalert2_1.default.fire({
                title: "Periodo creado",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        let periodos;
        try {
            periodos = yield getPeriodos({ pageIndex: 1, pageSize: 3 });
            console.log("periodos", periodos);
            // @ts-ignore
            $("#periodo").jsGrid("loadData", periodos);
            // @ts-ignore
            $("#periodo").jsGrid("refresh");
        }
        catch (error) {
            console.log(error);
        }
        let anios;
        try {
            anios = yield getAnios(periodos.data[0].id);
            console.log("anios", anios);
            // @ts-ignore
            $("#jsGrid").jsGrid("loadData", anios);
            // @ts-ignore
            $("#jsGrid").jsGrid("refresh");
        }
        catch (error) {
            console.log(error);
        }
    });
    const insertAnio = (anio) => __awaiter(void 0, void 0, void 0, function* () {
        anio.periodoId = idPeriodo;
        anio.anio = anio.anio.toUpperCase();
        // @ts-ignore
        const data = yield window.API.createAnio(anio);
        if (data) {
            sweetalert2_1.default.fire({
                title: "Año creado",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    React.useEffect(() => {
        const MyDateField = function (config) {
            // @ts-ignore
            jsGrid.Field.call(this, config);
        };
        // @ts-ignore
        MyDateField.prototype = new jsGrid.Field({
            sorter: function (date1, date2) {
                // @ts-ignore
                return date1;
            },
            itemTemplate: function (value) {
                console.log(value);
                return value;
            },
            insertTemplate: function (value) {
                // @ts-ignore
                return (this._insertPicker = $("<input>"
                // @ts-ignore
                ).daterangepicker({
                    showDropdowns: true,
                    opens: "center",
                    linkedCalendars: false,
                    locale: {
                        format: "YYYY",
                    },
                }, function (start, end, label) {
                    console.log("A new date selection was made: " +
                        start.format("YYYY-MM-DD") +
                        " to " +
                        end.format("YYYY-MM-DD"));
                }));
            },
            editTemplate: function (value) {
                // @ts-ignore
                return (this._editPicker = $('input[name="daterange"]').daterangepicker({
                    showDropdowns: true,
                    opens: "center",
                    linkedCalendars: false,
                    locale: {
                        format: "YYYY",
                    },
                }, function (start, end, label) {
                    console.log("A new date selection was made: " +
                        start.format("YYYY-MM-DD") +
                        " to " +
                        end.format("YYYY-MM-DD"));
                }));
            },
            insertValue: function () {
                return String(this._insertPicker[0].value);
            },
            editValue: function () {
                return String(this._editPicker[0].value);
            },
        });
        // @ts-ignore
        jsGrid.fields.myDateField = MyDateField;
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
                return __awaiter(this, void 0, void 0, function* () {
                    idPeriodo = args.item.id;
                    setPeriodo(args.item.periodo);
                    const anios = yield getAnios(args.item.id);
                    console.log("anios", anios);
                    // @ts-ignore
                    $("#jsGrid").jsGrid("loadData", anios);
                    // @ts-ignore
                });
            },
            controller: {
                loadData: (filter) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        // @ts-ignore
                        $("#jsGrid").jsGrid("loadData", periodos);
                        // @ts-ignore
                        $("#jsGrid").jsGrid("refresh");
                    }
                    catch (error) {
                        console.log(error);
                    }
                    return getPeriodos(filter);
                }),
                insertItem: function (item) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield insertPeriodo(item);
                        // @ts-ignore
                        $("#periodo").jsGrid("refresh");
                    });
                },
            },
            // @ts-ignore
            invalidNotify: ({ item }) => {
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
                    type: "myDateField",
                    validate: "required",
                },
                {
                    name: "id",
                    title: "ids",
                    align: "center",
                    type: "text",
                    visible: false,
                },
                {
                    name: "estado",
                    title: "Actual",
                    align: "center",
                    type: "checkbox",
                    validate: (e) => {
                        if (e.estado === false) {
                            return false;
                        }
                        return true;
                    },
                },
                { type: "control", editButton: false, deleteButton: false },
            ],
        });
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
            confirmDeleting: true,
            deleteConfirm: (item) => {
                return `seguro sea eliminar "${item.anio}"`;
            },
            onItemDeleting: (element) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("item delete", element);
                let deleteAnio;
                try {
                    //@ts-ignore
                    deleteAnio = yield window.API.deleteAnio(element.item.id);
                }
                catch (error) {
                    sweetalert2_1.default.fire({
                        title: `Error al borrar ${element.item.anio}`,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                console.log("delete response", deleteAnio);
                if (deleteAnio === "error") {
                    return sweetalert2_1.default.fire({
                        title: `NO puedes borrar la sección. Sección en uso `,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                sweetalert2_1.default.fire({
                    title: `${element.item.anio} Borrado`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // @ts-ignore
                $("#jsGrid").jsGrid("refresh");
                // @ts-ignore
                $("#jsGrid").jsGrid("reset");
            }),
            controller: {
                loadData: () => {
                    return getAnios(idPeriodo);
                },
                insertItem: (item) => __awaiter(void 0, void 0, void 0, function* () {
                    yield insertAnio(item);
                    // @ts-ignore
                    $("#jsGrid").jsGrid("refresh");
                }),
            },
            rowClick: function (args) {
                navigate("/anio/" + args.item.id);
            },
            fields: [
                {
                    name: "anio",
                    title: "Años",
                    align: "center",
                    type: "text",
                },
                {
                    name: "id",
                    title: "ids",
                    align: "center",
                    type: "text",
                    visible: false,
                },
                { type: "control", width: 10, editButton: false },
            ],
        });
        // @ts-ignore
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: {
            flexGrow: 1,
            p: 4,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
        } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(Box_1.default, { id: "periodo", component: "div" }) }), (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: ["Lista de A\u00F1os (", periodo, ")"] })), (0, jsx_runtime_1.jsx)(Box_1.default, { id: "jsGrid", component: "div" })] })] })));
};
exports.default = SetupYear;
//# sourceMappingURL=SetupYear.js.map