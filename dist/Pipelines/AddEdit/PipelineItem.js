"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var solid_1 = require("@heroicons/react/20/solid");
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var PipelineItemTextInput_1 = __importDefault(require("./PipelineItemTextInput"));
var PipelineItemSourceOrCode_1 = __importDefault(require("./PipelineItemSourceOrCode"));
var PipelineItemRunOnServers_1 = __importDefault(require("./PipelineItemRunOnServers"));
var FormInputToggle_1 = __importDefault(require("./FormInputToggle"));
var PipelineItem = function (_a) {
    var item = _a.item, setPipelineItemInnerItem = _a.setPipelineItemInnerItem, removePipelineItem = _a.removePipelineItem;
    var _b = (0, sortable_1.useSortable)({ id: item.id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition, isDragging = _b.isDragging;
    var style = {
        position: 'relative',
        transform: utilities_1.CSS.Transform.toString(transform),
        transition: transition,
    };
    var classes = 'bg-white ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 mb-2 p-4';
    if (isDragging) {
        style.zIndex = 999;
        classes += ' shadow-lg';
    }
    else {
        classes += ' shadow-sm';
    }
    return (react_1.default.createElement("div", { ref: setNodeRef, style: style },
        react_1.default.createElement("div", { className: classes },
            react_1.default.createElement("div", { className: "mb-2 text-gray-600" },
                react_1.default.createElement("a", { href: "#", className: "w-6 h-6 float-right cursor-pointer hover:text-cyan-500", onClick: function (event) {
                        event.preventDefault();
                        removePipelineItem(item.id);
                    } },
                    react_1.default.createElement(solid_1.XCircleIcon, null)),
                react_1.default.createElement("div", __assign({}, attributes, listeners, { className: "w-6 h-6 cursor-grab" }),
                    react_1.default.createElement(solid_1.Squares2X2Icon, null))),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement(PipelineItemTextInput_1.default, { label: "Description (optional)", name: "pipeline_item_".concat(item.id, "_description"), value: item.description, setValue: function (value) {
                        setPipelineItemInnerItem(item.id, 'description', value.toString());
                    } })),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement(PipelineItemSourceOrCode_1.default, { item: item, setPipelineItemInnerItem: setPipelineItemInnerItem })),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement(PipelineItemRunOnServers_1.default, { item: item, setPipelineItemInnerItem: setPipelineItemInnerItem })),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement(FormInputToggle_1.default, { name: "pipeline_item_".concat(item.id, "_run_after_fail"), value: item.run_after_fail, setValue: function (val) {
                        setPipelineItemInnerItem(item.id, 'run_after_fail', val);
                    } })))));
};
exports.default = PipelineItem;
