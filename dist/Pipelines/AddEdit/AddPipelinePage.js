"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var react_router_dom_1 = require("react-router-dom");
var AddEditPipeline_1 = __importDefault(require("./AddEditPipeline"));
var PipelineData_1 = require("../PipelineData");
var Page = function () {
    var pageName = 'Add Pipeline';
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageName);
    (0, buzzingpixel_mission_control_frontend_core_1.useBreadcrumbs)([
        {
            name: 'Pipelines',
            href: '/pipelines',
        },
        {
            name: pageName,
            href: '/pipelines/add',
        },
    ]);
    return (react_1.default.createElement(AddEditPipeline_1.default, { pageName: pageName, mutation: (0, PipelineData_1.useAddPipelineMutation)(), onSaveSuccess: function () { navigate('/pipelines'); } }));
};
exports.default = Page;
