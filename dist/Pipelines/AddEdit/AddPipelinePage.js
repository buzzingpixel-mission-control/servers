"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var AddEditPipeline_1 = __importDefault(require("./AddEditPipeline"));
var Page = function () {
    var pageName = 'Add Pipeline';
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageName);
    return react_1.default.createElement(AddEditPipeline_1.default, { pageName: pageName });
};
exports.default = Page;
