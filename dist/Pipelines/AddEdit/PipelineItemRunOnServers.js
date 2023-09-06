"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_select_1 = __importDefault(require("react-select"));
var ServerData_1 = require("../../Servers/ServerData");
var Input = function (_a) {
    var item = _a.item, setPipelineItemInnerItem = _a.setPipelineItemInnerItem;
    var _b = (0, ServerData_1.useAllServerData)(), status = _b.status, data = _b.data;
    if (status === 'loading') {
        return (react_1.default.createElement("div", { className: "inline-block align-middle h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-info motion-reduce:animate-[spin_1.5s_linear_infinite] opacity-100 text-cyan-600", role: "status" },
            react_1.default.createElement("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" }, "Loading...")));
    }
    var options = [];
    data.forEach(function (project) {
        options.push({
            value: project.id,
            label: project.title,
        });
    });
    var value = options.filter(function (option) { return item.run_on_servers.indexOf(option.value) > -1; });
    return (react_1.default.createElement(react_select_1.default, { onChange: function (selected) {
            setPipelineItemInnerItem(item.id, 'run_on_servers', selected.map(function (option) { return option.value; }));
        }, value: value, options: options, className: "react-select-control", isClearable: true, isMulti: true }));
};
var PipelineItemRunOnServers = function (_a) {
    var item = _a.item, setPipelineItemInnerItem = _a.setPipelineItemInnerItem;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("label", { className: "text-sm font-medium text-gray-900" }, "Run On Servers"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Input, { item: item, setPipelineItemInnerItem: setPipelineItemInnerItem }))));
};
exports.default = PipelineItemRunOnServers;
