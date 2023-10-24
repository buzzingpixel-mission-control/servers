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
var DeployRunData_1 = require("./DeployRunData");
var DetailsItem_1 = __importDefault(require("./DetailsItem"));
var RecentRuns_1 = require("../RecentRuns");
var Details = function (_a) {
    var jobId = _a.jobId, pipeline = _a.pipeline;
    var _b = (0, react_1.useState)(true), continuousRefetch = _b[0], setContinuousRefetch = _b[1];
    var _c = (0, DeployRunData_1.useDeployRunData)(pipeline.id, jobId, continuousRefetch), status = _c.status, data = _c.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    if (data.status !== RecentRuns_1.RecentRunStatus.running
        && data.status !== RecentRuns_1.RecentRunStatus.inQueue
        && continuousRefetch === true) {
        setContinuousRefetch(false);
    }
    return (react_1.default.createElement("div", { className: "bg-white rounded-md shadow-sm" },
        react_1.default.createElement("ul", { className: "divide-y divide-gray-200" }, data.items.map(function (item) {
            var pipelineItem = pipeline.pipelineItems.filter(function (pItem) { return pItem.id === item.pipelineItemId; })[0];
            return (react_1.default.createElement(DetailsItem_1.default, { key: item.id, item: item, pipelineItem: pipelineItem }));
        }))));
};
exports.default = Details;
