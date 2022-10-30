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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const styles_1 = require("@mui/material/styles");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const GlobalContext_1 = require("../../config/context/GlobalContext");
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Year = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [anio, setAnio] = (0, react_1.useState)([{}]);
    const [secciones, setSecciones] = (0, react_1.useState)({});
    const [areasDB, setAreasDB] = (0, react_1.useState)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { areas } = (0, react_1.useContext)(GlobalContext_1.GlobalContext);
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const anio = yield window.API.getAnio(id);
        console.log(anio);
        setAnio(anio);
        // @ts-ignore
        const findSecciones = yield getSecciones(anio.id);
        console.log(findSecciones);
        const findAreas = yield getAreas(anio.id);
        setAreasDB(findAreas.data);
        console.log(findAreas);
        // @ts-ignore
        $("#Secciones").jsGrid("loadData", findSecciones);
        // @ts-ignore
        $("#Secciones").jsGrid("refresh");
        // @ts-ignore
        $("#Areas").jsGrid("loadData", findAreas);
        // @ts-ignore
        $("#Areas").jsGrid("refresh");
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSecciones(id);
        console.log(findSecciones);
        setSecciones({ data: findSecciones, itemsCount: 0 });
        // @ts-ignore
        return { data: findSecciones, itemsCount: 0 };
    });
    const getAreas = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findAreas = yield window.API.getAreas(id);
        console.log(findAreas);
        // @ts-ignore
        return { data: findAreas, itemsCount: 0 };
    });
    const insertSeccion = ({ seccion }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("seccion", seccion);
        // @ts-ignore
        const data = yield window.API.insertSeccion({ seccion, anio: id });
        if (data) {
            getData();
            sweetalert2_1.default.fire({
                title: "Sección creada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    const insertArea = ({ nombre }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Area", nombre);
        // @ts-ignore
        const data = yield window.API.insertArea({ area: nombre, anio: id });
        if (data) {
            getData();
            sweetalert2_1.default.fire({
                title: "Área creada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    (0, react_1.useEffect)(() => {
        // @ts-ignore
        $("#Areas").jsGrid({
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
                    return getAreas(id);
                },
                insertItem: (item) => __awaiter(void 0, void 0, void 0, function* () {
                    yield insertArea(item);
                    // @ts-ignore
                    $("#jsGrid").jsGrid("refresh");
                }),
            },
            /*
            rowClick: function (args: any) {}, */
            fields: [
                {
                    name: "nombre",
                    title: "Área",
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
        $("#Secciones").jsGrid({
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
            noDataContent: "No hay Secciones",
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
                    console.log(args.item.id);
                    navigate("/seccion/" + args.item.id);
                });
            },
            controller: {
                loadData: () => __awaiter(void 0, void 0, void 0, function* () {
                    return yield getSecciones(id);
                }),
                insertItem: function (item) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield insertSeccion(item);
                        // @ts-ignore
                        $("#Secciones").jsGrid("refresh");
                    });
                },
            },
            // @ts-ignore
            invalidNotify: ({ item }) => {
                console.log(item);
                if (item.periodo === "") {
                    sweetalert2_1.default.fire({
                        title: "Error",
                        text: "Ingrese una seccion",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    return;
                }
            },
            fields: [
                {
                    name: "seccion",
                    title: "Secciones",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "id",
                    title: "ids",
                    align: "center",
                    type: "text",
                    visible: false,
                },
                { type: "control", editButton: false, deleteButton: false },
            ],
        });
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield getData();
            console.log("id", id);
            //@ts-ignore
            areas.setAreas(areasDB);
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    setSecciones({});
                    areas.setAreas([]);
                    navigate(-1);
                } }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, { sx: { mr: 1 } }), "Volver"] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                } }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", component: "h1", gutterBottom: true }, { children: 
                    // @ts-ignore
                    anio.anio })) })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "2.5rem" }, id: "Secciones", component: "div" }), (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", sx: { marginTop: "0.5rem", textAlign: "center" } }, { children: "\u00C1reas" })), (0, jsx_runtime_1.jsx)(Box_1.default, { id: "Areas", component: "div" })] })] })));
};
exports.default = Year;
//# sourceMappingURL=Year.js.map