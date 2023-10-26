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
var RecentRunsData_1 = require("./RecentRunsData");
var RecentRunsListItem_1 = __importDefault(require("./RecentRunsListItem"));
var RecentRunsList = function (_a) {
    var pipeline = _a.pipeline;
    var _b = (0, react_1.useState)(true), activeRefetch = _b[0], setActiveRefetch = _b[1];
    var _c = (0, RecentRunsData_1.useRecentRunsData)(pipeline.id, activeRefetch), status = _c.status, data = _c.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    if (data.length < 1) {
        setActiveRefetch(false);
        return (react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(outline_1.RectangleGroupIcon, null), headline: "No recent runs available" }));
    }
    var hasActiveItems = false;
    data.map(function (item) {
        if (item.isRunning) {
            hasActiveItems = true;
        }
    });
    if (hasActiveItems !== activeRefetch) {
        setActiveRefetch(hasActiveItems);
    }
    return (react_1.default.createElement("div", { className: "bg-white rounded-md shadow-sm" },
        react_1.default.createElement("ul", { className: "divide-y divide-gray-100" }, data.map(function (item) { return (react_1.default.createElement(RecentRunsListItem_1.default, { key: item.id, item: item, pipeline: pipeline })); }))));
};
exports.default = RecentRunsList;
