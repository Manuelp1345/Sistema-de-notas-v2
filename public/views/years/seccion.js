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
const DrawerHeader = (0, styles_1.styled)("div")(({ theme }) => (Object.assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar)));
const Seccion = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [anio, setAnio] = (0, react_1.useState)({});
    const [secciones, setSecciones] = (0, react_1.useState)({ seccion: "loading" });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const findSecciones = yield getSecciones(id);
        console.log(findSecciones);
        // @ts-ignore
        const anio = yield window.API.getAnio(findSecciones.data.anio.id);
        console.log(anio);
        setAnio(anio);
        // @ts-ignore
        $("#Secciones").jsGrid("loadData", findSecciones);
        // @ts-ignore
        $("#Secciones").jsGrid("refresh");
    });
    const getSecciones = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("id anio", id);
        // @ts-ignore
        const findSecciones = yield window.API.getSeccion(id);
        console.log(findSecciones);
        setSecciones(findSecciones);
        // @ts-ignore
        return { data: findSecciones, itemsCount: 0 };
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
    (0, react_1.useEffect)(() => {
        // @ts-ignore
        $("#Alumnos").jsGrid({
            width: "100%",
            paging: true,
            autoload: false,
            pageLoading: true,
            pageSize: 3,
            pageIndex: 1,
            heading: true,
            inserting: false,
            loadIndication: true,
            loadMessage: "Por favor espere",
            loadShading: true,
            noDataContent: "No hay Alumnos",
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
                    console.log("");
                    navigate("/seccion/" + args.item.id);
                });
            },
            controller: {
                loadData: (filter) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield getSecciones(id);
                }),
                insertItem: function (item) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield insertSeccion(item);
                        // @ts-ignore
                        $("#periodo").jsGrid("refresh");
                    });
                },
            },
            // @ts-ignore
            invalidNotify: ({ errors, item }) => {
                console.log(item);
                if (item.periodo === "") {
                    sweetalert2_1.default.fire({
                        title: "Error",
                        text: "Ingrese un Alumno",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    return;
                }
            },
            fields: [
                {
                    name: "cedula",
                    title: "C.I",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "nombre",
                    title: "Nombres",
                    align: "center",
                    type: "text",
                    validate: "required",
                },
                {
                    name: "apellido",
                    title: "Apellidos",
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
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ onClick: () => {
                    setSecciones({ seccion: "loading" });
                    navigate(-1);
                } }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.ArrowBack, { sx: { mr: 1 } }), "Volver"] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                } }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ width: "100%", textAlign: "center", variant: "h4", component: "h1", gutterBottom: true }, { children: 
                    // @ts-ignore
                    `${anio.anio} SECCIÓN "${(secciones && secciones.seccion) || "loading"}"` })) })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginTop: "2rem",
                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ sx: {
                        fontWeight: "bold",
                    }, variant: "outlined" }, { children: "Agregar Alumno" })) })), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { marginTop: "2rem" }, id: "Alumnos", component: "div" })] })));
};
exports.default = Seccion;
//# sourceMappingURL=seccion.js.map