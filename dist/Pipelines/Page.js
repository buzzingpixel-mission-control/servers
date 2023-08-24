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
var react_router_dom_1 = require("react-router-dom");
var useFilterText_1 = __importDefault(require("../useFilterText"));
var PipelineData_1 = require("./PipelineData");
var Tabs_1 = __importDefault(require("./Tabs"));
var PipelineList_1 = __importDefault(require("./PipelineList"));
var Page = function (_a) {
    var _b = _a.isArchive, isArchive = _b === void 0 ? false : _b;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _c = (0, react_1.useState)(''), pageNameState = _c[0], setPageNameState = _c[1];
    var standardName = 'Pipelines';
    var archivedName = "Archived ".concat(standardName);
    if (isArchive && pageNameState !== archivedName) {
        setPageNameState(archivedName);
    }
    else if (!isArchive && pageNameState !== standardName) {
        setPageNameState(standardName);
    }
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    var _d = (0, useFilterText_1.default)(), filterText = _d[0], setFilterText = _d[1];
    var goToAddPipeline = function () {
        navigate('/pipelines/add');
    };
    // eslint-disable-next-line prefer-const
    var _e = (0, PipelineData_1.usePipelineData)(isArchive), status = _e.status, data = _e.data;
    var LocalTabs = (react_1.default.createElement(Tabs_1.default, { activeHref: isArchive ? '/pipelines/archived' : '/pipelines', addOnClick: goToAddPipeline }));
    if (status === 'loading') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            LocalTabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null)));
    }
    if (data.length < 1) {
        if (isArchive) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                LocalTabs,
                react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(outline_1.RectangleGroupIcon, null), headline: "No Archived Pipelines" })));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            LocalTabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(outline_1.RectangleGroupIcon, null), headline: "No Pipelines", content: "Would you like to add a Pipeline?", actionText: "Add Pipeline", actionUsesPlusIcon: true, actionButtonOnClick: goToAddPipeline })));
    }
    if (filterText !== '') {
        data = data.filter(function (pipeline) { return pipeline.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || pipeline.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || pipeline.description.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || pipeline.secretId.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || pipeline.webhookCheckForBranch.toString().indexOf(filterText.toLowerCase()) > -1; });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        LocalTabs,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "sm:flex sm:mb-4" },
                react_1.default.createElement("div", { className: "mb-4 sm:mb-0 grow" },
                    react_1.default.createElement("input", { type: "text", name: "filter", id: "filter", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", placeholder: "Filter results", value: filterText, onChange: function (e) { setFilterText(e.target.value); } })))),
        react_1.default.createElement(PipelineList_1.default, { isArchive: isArchive, items: data })));
};
Page.defaultProps = {
    isArchive: false,
};
exports.default = Page;
