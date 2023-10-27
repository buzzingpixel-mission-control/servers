"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var date_1 = __importDefault(require("locutus/php/datetime/date"));
var react_router_dom_1 = require("react-router-dom");
var StatusPillStyleClasses_1 = require("./StatusPillStyleClasses");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var RecentRunsListItem = function (_a) {
    var item = _a.item, pipeline = _a.pipeline;
    return (react_1.default.createElement("li", { className: "px-4" },
        react_1.default.createElement("div", { className: "sm:flex items-center justify-between gap-x-6 py-5" },
            react_1.default.createElement("div", { className: "min-w-0" },
                react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                    react_1.default.createElement("p", { className: "text-sm font-semibold leading-6 text-gray-900" }, (0, date_1.default)('Y-m-d g:i:s A', item.addedAtDate)),
                    react_1.default.createElement("p", { className: classNames(StatusPillStyleClasses_1.StatusPillStyleClasses[item.status], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, item.status),
                    (function () {
                        if (!item.isRunning) {
                            return null;
                        }
                        return (react_1.default.createElement("p", { className: "text-sm leading-6 text-gray-900" },
                            item.percentComplete,
                            "%"));
                    })())),
            react_1.default.createElement("div", { className: "mt-2 sm:mt-0 flex flex-none items-center gap-x-4" },
                react_1.default.createElement(react_router_dom_1.Link, { to: "".concat(pipeline.href, "/run/").concat(item.id), className: "block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" }, "View Details")))));
};
exports.default = RecentRunsListItem;
