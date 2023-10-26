"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var date_1 = __importDefault(require("locutus/php/datetime/date"));
var StatusPillStyleClasses_1 = require("../StatusPillStyleClasses");
var DeployRunData_1 = require("./DeployRunData");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var PageHeader = function (_a) {
    var jobId = _a.jobId, pipeline = _a.pipeline;
    var _b = (0, DeployRunData_1.useDeployRunData)(pipeline.id, jobId), status = _b.status, data = _b.data;
    if (status === 'loading') {
        return null;
    }
    return (react_1.default.createElement("div", { className: "mb-8" },
        react_1.default.createElement("div", { className: "border-b border-gray-200 pb-4" },
            react_1.default.createElement("div", { className: "md:flex md:items-center md:justify-between md:space-x-5" },
                react_1.default.createElement("div", { className: "flex items-start space-x-5 overflow-hidden" },
                    react_1.default.createElement("div", { className: "pt-1.5" },
                        react_1.default.createElement("h1", { className: "text-2xl font-bold text-gray-900" },
                            "Pipeline \u201C",
                            pipeline.title,
                            "\u201D Job at",
                            ' ',
                            (0, date_1.default)('Y-m-d g:i:s A', data.addedAtDate)),
                        (function () {
                            if (!pipeline.description) {
                                return null;
                            }
                            return (react_1.default.createElement("p", { className: "text-sm font-medium text-gray-600 mb-2" }, pipeline.description));
                        })(),
                        react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                            react_1.default.createElement("p", { className: classNames(StatusPillStyleClasses_1.StatusPillStyleClasses[data.status], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, data.status),
                            react_1.default.createElement("p", { className: "text-sm font-medium text-gray-600 mb-2" },
                                data.percentComplete,
                                "%"))))))));
};
exports.default = PageHeader;
