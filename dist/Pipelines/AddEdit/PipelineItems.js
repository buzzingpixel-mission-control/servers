"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var solid_1 = require("@heroicons/react/20/solid");
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var modifiers_1 = require("@dnd-kit/modifiers");
var PipelineItem_1 = __importDefault(require("./PipelineItem"));
var PipelineItems = function (_a) {
    var pipelineItems = _a.pipelineItems, addPipelineItem = _a.addPipelineItem, setPipelineItems = _a.setPipelineItems, setPipelineItemInnerItem = _a.setPipelineItemInnerItem, removePipelineItem = _a.removePipelineItem;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.DndContext, { modifiers: [modifiers_1.restrictToVerticalAxis, modifiers_1.restrictToParentElement], collisionDetection: core_1.closestCenter, onDragEnd: function (event) {
                    var active = event.active, over = event.over;
                    if (active.id !== over.id) {
                        var activeIndex = pipelineItems.findIndex(function (item) { return item.id === active.id; });
                        var overIndex = pipelineItems.findIndex(function (item) { return item.id === over.id; });
                        setPipelineItems((0, sortable_1.arrayMove)(pipelineItems, activeIndex, overIndex));
                    }
                } },
                react_1.default.createElement(sortable_1.SortableContext, { items: pipelineItems.map(function (item) { return item.id; }), strategy: sortable_1.verticalListSortingStrategy }, pipelineItems.map(function (item) { return (react_1.default.createElement(PipelineItem_1.default, { key: item.id, item: item, setPipelineItemInnerItem: setPipelineItemInnerItem, removePipelineItem: removePipelineItem })); })))),
        react_1.default.createElement("div", { className: "text-gray-500" },
            react_1.default.createElement("a", { title: "Add Code Item", href: "#", className: "w-8 h-8 inline-block bg-white border border-gray-500 rounded shadow p-0.5 hover:bg-cyan-50 mr-1", onClick: function (e) {
                    e.preventDefault();
                    addPipelineItem('code');
                } },
                react_1.default.createElement(solid_1.CodeBracketIcon, null)),
            react_1.default.createElement("a", { title: "Add Source Yaml File", href: "#", className: "w-8 h-8 inline-block bg-white border border-gray-500 rounded shadow p-0.5 hover:bg-cyan-50 mr-1", onClick: function (e) {
                    e.preventDefault();
                    addPipelineItem('source');
                } },
                react_1.default.createElement(solid_1.DocumentIcon, null)))));
};
exports.default = PipelineItems;
