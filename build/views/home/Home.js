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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var styles_1 = require("@mui/material/styles");
var Box_1 = __importDefault(require("@mui/material/Box"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var react_1 = __importDefault(require("@fullcalendar/react"));
var daygrid_1 = __importDefault(require("@fullcalendar/daygrid"));
var es_1 = __importDefault(require("@fullcalendar/core/locales/es"));
var DrawerHeader = (0, styles_1.styled)("div")(function (_a) {
    var theme = _a.theme;
    return (__assign({ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: theme.spacing(0, 1) }, theme.mixins.toolbar));
});
function Home() {
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ className: "animate__animated animate__fadeInRight", component: "main", sx: { flexGrow: 1, p: 3 } }, { children: [(0, jsx_runtime_1.jsx)(DrawerHeader, {}, void 0), (0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(react_1.default, { height: "20rem", plugins: [daygrid_1.default], initialView: "dayGridMonth", locale: es_1.default }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ paragraph: true }, { children: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a." }), void 0)] }), void 0));
}
exports.default = Home;
//# sourceMappingURL=Home.js.map