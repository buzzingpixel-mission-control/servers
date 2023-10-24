"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var date_1 = __importDefault(require("locutus/php/datetime/date"));
var StatusPillStyleClasses_1 = require("../StatusPillStyleClasses");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var DetailsItem = function (_a) {
    var item = _a.item, pipelineItem = _a.pipelineItem;
    return (react_1.default.createElement("li", { className: "px-4 pb-6" },
        react_1.default.createElement("div", { className: "sm:flex items-center justify-between gap-x-6 py-5" },
            react_1.default.createElement("div", { className: "min-w-0" },
                react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                    react_1.default.createElement("p", { className: "text-sm font-semibold leading-6 text-gray-900" }, pipelineItem.description)),
                react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                    react_1.default.createElement("p", { className: classNames(StatusPillStyleClasses_1.StatusPillStyleClasses[item.status], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, item.status),
                    (function () {
                        if (!item.isFinished) {
                            return null;
                        }
                        return (react_1.default.createElement("p", { className: "text-sm font-semibold leading-6 text-gray-900" },
                            "Finished At:",
                            ' ',
                            (0, date_1.default)('Y-m-d g:i:s A', item.finishedAtDate)));
                    })()))),
        react_1.default.createElement("div", { className: "bg-slate-700 p-10 text-slate-100 sm:rounded-lg overflow-auto" },
            react_1.default.createElement("pre", null,
                react_1.default.createElement("code", null, item.logContent)))));
};
exports.default = DetailsItem;
