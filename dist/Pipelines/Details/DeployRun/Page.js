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
var PipelineDetailsData_1 = require("../PipelineDetailsData");
var PageHeader_1 = __importDefault(require("./PageHeader"));
var Details_1 = __importDefault(require("./Details"));
var Page = function () {
    var _a = (0, react_router_dom_1.useParams)(), slug = _a.slug, id = _a.id;
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    var _b = (0, react_1.useState)('Loading Pipeline Details…'), pageNameState = _b[0], setPageNameState = _b[1];
    var _c = (0, react_1.useState)(false), isArchive = _c[0], setIsArchive = _c[1];
    (0, buzzingpixel_mission_control_frontend_core_1.useBreadcrumbs)([
        {
            name: 'Pipelines',
            href: isArchive ? '/pipelines/archived' : '/pipelines',
        },
        {
            name: pageNameState,
            href: "/pipelines/".concat(slug),
        },
        {
            name: 'Job Details',
            href: "/pipelines/".concat(slug, "/run/").concat(id),
        },
    ]);
    var _d = (0, PipelineDetailsData_1.usePipelineDetailsData)(slug), status = _d.status, data = _d.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    var pageName = "Pipeline: ".concat(data.title);
    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }
    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(PageHeader_1.default, { jobId: id, pipeline: data }),
        react_1.default.createElement(Details_1.default, { jobId: id, pipeline: data })));
};
exports.default = Page;
