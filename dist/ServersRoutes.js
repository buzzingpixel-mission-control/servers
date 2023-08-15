"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var SshKeyListPage_1 = __importDefault(require("./SshKey/SshKeyListPage"));
var SshKeyDetailsPage_1 = __importDefault(require("./SshKey/Details/SshKeyDetailsPage"));
var Page_1 = __importDefault(require("./Servers/Page"));
var ServersRoutes = function () { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/ssh-keys", element: react_1.default.createElement(SshKeyListPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/ssh-keys/archived", element: react_1.default.createElement(SshKeyListPage_1.default, { isArchive: true }) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/ssh-keys/:slug", element: react_1.default.createElement(SshKeyDetailsPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/servers", element: react_1.default.createElement(Page_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/servers/archived", element: react_1.default.createElement(Page_1.default, { isArchive: true }) }))); };
exports.default = ServersRoutes;
