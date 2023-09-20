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
var react_router_dom_1 = require("react-router-dom");
var AddEditPipeline_1 = __importDefault(require("./AddEditPipeline"));
var PipelineData_1 = require("../PipelineData");
var PipelineDetailsData_1 = require("../Details/PipelineDetailsData");
var Page = function () {
    var slug = (0, react_router_dom_1.useParams)().slug;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var mutation = (0, PipelineData_1.useEditPipelineMutation)(slug);
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    var _a = (0, react_1.useState)('Loading Pipeline Details…'), pipelineName = _a[0], setPipelineName = _a[1];
    var _b = (0, react_1.useState)('…'), pageNameState = _b[0], setPageNameState = _b[1];
    var _c = (0, react_1.useState)(false), isArchive = _c[0], setIsArchive = _c[1];
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    (0, buzzingpixel_mission_control_frontend_core_1.useBreadcrumbs)([
        {
            name: 'Pipelines',
            href: isArchive ? '/pipelines/archived' : '/pipelines',
        },
        {
            name: pipelineName,
            href: "/pipelines/".concat(slug),
        },
        {
            name: pageNameState,
            href: "/pipelines/".concat(slug, "/edit"),
        },
    ]);
    var _d = (0, PipelineDetailsData_1.usePipelineDetailsData)(slug), status = _d.status, data = _d.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    var pipelineNameFromData = "Pipeline: ".concat(data.title);
    if (pipelineNameFromData !== pipelineName) {
        setPipelineName(pipelineNameFromData);
    }
    var pageName = "Edit Pipeline: ".concat(data.title);
    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }
    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }
    return (react_1.default.createElement(AddEditPipeline_1.default, { pageName: pageName, mutation: mutation, incomingValues: {
            title: data.title,
            description: data.description,
            project_id: data.projectId,
            enable_webhook: data.enableWebhook,
            webhook_check_for_branch: data.webhookCheckForBranch,
            run_before_every_item: data.runBeforeEveryItem,
            pipeline_items: data.pipelineItems.map(function (item) { return ({
                id: item.id,
                type: item.type,
                description: item.description,
                run_on_servers: item.runOnServers,
                run_after_fail: item.runAfterFail,
                script: item.script,
            }); }),
        }, onSaveSuccess: function (jsonResponse) {
            navigate("/pipelines/".concat(jsonResponse.slug));
        } }));
};
exports.default = Page;
