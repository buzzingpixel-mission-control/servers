"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var outline_1 = require("@heroicons/react/24/outline");
var RecentRunsData_1 = require("./RecentRunsData");
var RecentRunsListItem_1 = __importDefault(require("./RecentRunsListItem"));
var RecentRunsList = function (_a) {
    var pipeline = _a.pipeline;
    var _b = (0, RecentRunsData_1.useRecentRunsData)(pipeline.id), status = _b.status, data = _b.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    if (data.length < 1) {
        return (react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(outline_1.RectangleGroupIcon, null), headline: "No recent runs available" }));
    }
    return (react_1.default.createElement("div", { className: "bg-white rounded-md shadow-sm" },
        react_1.default.createElement("ul", { className: "divide-y divide-gray-100" }, data.map(function (item) { return (react_1.default.createElement(RecentRunsListItem_1.default, { key: item.id, item: item, pipeline: pipeline })); }))));
};
exports.default = RecentRunsList;
