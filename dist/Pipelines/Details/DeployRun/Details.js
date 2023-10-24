"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var DeployRunData_1 = require("./DeployRunData");
var DetailsItem_1 = __importDefault(require("./DetailsItem"));
var Details = function (_a) {
    var jobId = _a.jobId, pipeline = _a.pipeline;
    var _b = (0, DeployRunData_1.useDeployRunData)(pipeline.id, jobId), status = _b.status, data = _b.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    return (react_1.default.createElement("div", { className: "bg-white rounded-md shadow-sm" },
        react_1.default.createElement("ul", { className: "divide-y divide-gray-200" }, data.items.map(function (item) {
            var pipelineItem = pipeline.pipelineItems.filter(function (pItem) { return pItem.id === item.pipelineItemId; })[0];
            return (react_1.default.createElement(DetailsItem_1.default, { key: item.id, item: item, pipelineItem: pipelineItem }));
        }))));
};
exports.default = Details;
