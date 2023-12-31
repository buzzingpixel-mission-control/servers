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
var Page_2 = __importDefault(require("./Servers/Details/Page"));
var Page_3 = __importDefault(require("./Servers/AuthorizedKeys/Page"));
var Page_4 = __importDefault(require("./Pipelines/Page"));
var AddPipelinePage_1 = __importDefault(require("./Pipelines/AddEdit/AddPipelinePage"));
var Page_5 = __importDefault(require("./Pipelines/Details/Page"));
var EditPipelinePage_1 = __importDefault(require("./Pipelines/AddEdit/EditPipelinePage"));
var Page_6 = __importDefault(require("./Pipelines/Details/DeployRun/Page"));
var ServersRoutes = function () { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/ssh-keys", element: react_1.default.createElement(SshKeyListPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/ssh-keys/archived", element: react_1.default.createElement(SshKeyListPage_1.default, { isArchive: true }) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/ssh-keys/:slug", element: react_1.default.createElement(SshKeyDetailsPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/servers", element: react_1.default.createElement(Page_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/servers/archived", element: react_1.default.createElement(Page_1.default, { isArchive: true }) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/servers/:slug", element: react_1.default.createElement(Page_2.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/servers/:slug/authorized-keys", element: react_1.default.createElement(Page_3.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pipelines", element: react_1.default.createElement(Page_4.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pipelines/archived", element: react_1.default.createElement(Page_4.default, { isArchive: true }) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pipelines/add", element: react_1.default.createElement(AddPipelinePage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pipelines/:slug", element: react_1.default.createElement(Page_5.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pipelines/:slug/edit", element: react_1.default.createElement(EditPipelinePage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pipelines/:slug/run/:id", element: react_1.default.createElement(Page_6.default, null) }))); };
exports.default = ServersRoutes;
