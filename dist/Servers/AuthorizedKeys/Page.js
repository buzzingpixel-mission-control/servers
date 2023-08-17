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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var solid_1 = require("@heroicons/react/20/solid");
var AuthorizedKeysData_1 = require("./AuthorizedKeysData");
var PageHeader_1 = __importDefault(require("./PageHeader"));
var KeyDetails_1 = __importDefault(require("./KeyDetails"));
var Page = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var slug = (0, react_router_dom_1.useParams)().slug;
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    var _j = (0, react_1.useState)('Loading Server Details…'), pageNameState = _j[0], setPageNameState = _j[1];
    var _k = (0, react_1.useState)('Loading Server Details…'), serverNameState = _k[0], setServerNameState = _k[1];
    var _l = (0, react_1.useState)(false), isArchive = _l[0], setIsArchive = _l[1];
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    (0, buzzingpixel_mission_control_frontend_core_1.useBreadcrumbs)([
        {
            name: 'Servers',
            href: isArchive ? '/servers/archived' : '/servers',
        },
        {
            name: serverNameState,
            href: "/servers/".concat(slug),
        },
        {
            name: 'Authorized Keys',
            href: "/servers/".concat(slug, "/authorized-keys"),
        },
    ]);
    var _m = (0, AuthorizedKeysData_1.useAuthorizedKeysData)(slug), status = _m.status, data = _m.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    var pageName = "Authorized Keys | ".concat((_b = (_a = data === null || data === void 0 ? void 0 : data.server) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : '');
    var serverName = "Server: ".concat((_d = (_c = data === null || data === void 0 ? void 0 : data.server) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : '');
    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }
    if (serverNameState !== serverName) {
        setServerNameState(serverName);
    }
    if (isArchive !== !((_f = (_e = data === null || data === void 0 ? void 0 : data.server) === null || _e === void 0 ? void 0 : _e.isActive) !== null && _f !== void 0 ? _f : true)) {
        setIsArchive(!((_h = (_g = data === null || data === void 0 ? void 0 : data.server) === null || _g === void 0 ? void 0 : _g.isActive) !== null && _h !== void 0 ? _h : true));
    }
    if (status === 'error') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(PageHeader_1.default, { slug: slug, pageName: pageName }),
            react_1.default.createElement("div", { className: "rounded-md bg-red-50 p-4 shadow-md" },
                react_1.default.createElement("div", { className: "flex" },
                    react_1.default.createElement("div", { className: "flex-shrink-0" },
                        react_1.default.createElement(solid_1.XCircleIcon, { className: "h-5 w-5 text-red-400", "aria-hidden": "true" })),
                    react_1.default.createElement("div", { className: "ml-3" },
                        react_1.default.createElement("h3", { className: "text-sm font-medium text-red-800" }, "We couldn\u2019t connect to the server over SSH"))))));
    }
    if (!data.keys) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(PageHeader_1.default, { slug: slug, pageName: pageName }),
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null)));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(PageHeader_1.default, { slug: slug, pageName: pageName }),
        react_1.default.createElement("div", { className: "max-w-6xl" },
            react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow sm:rounded-lg" },
                react_1.default.createElement("div", { className: "border-t border-gray-100" },
                    react_1.default.createElement("div", { className: "divide-y divide-gray-100" }, data.keys.map(function (key, index) { return (react_1.default.createElement(KeyDetails_1.default, { key: key.key, index: index, keyString: key.key })); })))))));
};
exports.default = Page;
