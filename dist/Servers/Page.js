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
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var outline_1 = require("@heroicons/react/24/outline");
var useFilterText_1 = __importDefault(require("../SshKey/useFilterText"));
var Tabs_1 = __importDefault(require("./Tabs"));
var ServerData_1 = require("./ServerData");
var AddServerOverlay_1 = __importDefault(require("./AddServerOverlay"));
var ServerList_1 = __importDefault(require("./ServerList"));
var Page = function (_a) {
    var _b = _a.isArchive, isArchive = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(''), pageNameState = _c[0], setPageNameState = _c[1];
    var standardName = 'Servers';
    var archivedName = "Archived ".concat(standardName);
    if (isArchive && pageNameState !== archivedName) {
        setPageNameState(archivedName);
    }
    else if (!isArchive && pageNameState !== standardName) {
        setPageNameState(standardName);
    }
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    var _d = (0, useFilterText_1.default)(), filterText = _d[0], setFilterText = _d[1];
    var _e = (0, react_1.useState)(false), addIsOpen = _e[0], setAddIsOpen = _e[1];
    // eslint-disable-next-line prefer-const
    var _f = (0, ServerData_1.useServerData)(isArchive), status = _f.status, data = _f.data;
    var LocalTabs = (react_1.default.createElement(Tabs_1.default, { activeHref: isArchive ? '/servers/archived' : '/servers', addOnClick: function () { setAddIsOpen(true); } }));
    if (status === 'loading') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            LocalTabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null)));
    }
    var portals = function () {
        if (addIsOpen) {
            return (0, buzzingpixel_mission_control_frontend_core_1.createPortal)(react_1.default.createElement(AddServerOverlay_1.default, { setIsOpen: setAddIsOpen }));
        }
        return null;
    };
    if (data.length < 1) {
        if (isArchive) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                portals(),
                LocalTabs,
                react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(outline_1.ServerStackIcon, null), headline: "No Archived Servers" })));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            portals(),
            LocalTabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(outline_1.ServerStackIcon, null), headline: "No Servers", content: "Would you like to add a Server?", actionText: "Add Server", actionUsesPlusIcon: true, actionButtonOnClick: function () { setAddIsOpen(true); } })));
    }
    if (filterText !== '') {
        data = data.filter(function (server) { return server.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || server.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || server.sshUserName.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || server.address.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || server.sshPort.toString().indexOf(filterText.toLowerCase()) > -1; });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        portals(),
        LocalTabs,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "sm:flex sm:mb-4" },
                react_1.default.createElement("div", { className: "mb-4 sm:mb-0 grow" },
                    react_1.default.createElement("input", { type: "text", name: "filter", id: "filter", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", placeholder: "Filter results", value: filterText, onChange: function (e) {
                            setFilterText(e.target.value);
                        } })))),
        react_1.default.createElement(ServerList_1.default, { isArchive: isArchive, items: data })));
};
Page.defaultProps = {
    isArchive: false,
};
exports.default = Page;
