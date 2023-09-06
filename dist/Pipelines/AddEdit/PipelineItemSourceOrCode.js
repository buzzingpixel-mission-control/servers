"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var PipelineItemTextInput_1 = __importDefault(require("./PipelineItemTextInput"));
var FormInputCodeEditor_1 = __importDefault(require("./FormInputCodeEditor"));
var PipelineItemSourceOrCode = function (_a) {
    var item = _a.item, setPipelineItemInnerItem = _a.setPipelineItemInnerItem;
    if (item.type === 'source') {
        return (react_1.default.createElement(PipelineItemTextInput_1.default, { label: "Yaml Source File", name: "pipeline_item_".concat(item.id, "_script"), value: item.script, setValue: function (value) {
                setPipelineItemInnerItem(item.id, 'script', value.toString());
            } }));
    }
    return (react_1.default.createElement(FormInputCodeEditor_1.default, { name: "run_before_every_item", value: item.script, setValue: function (val) {
            setPipelineItemInnerItem(item.id, 'script', val);
        } }));
};
exports.default = PipelineItemSourceOrCode;
