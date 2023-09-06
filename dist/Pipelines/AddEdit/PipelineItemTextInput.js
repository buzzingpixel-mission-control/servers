"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var FormInputText_1 = __importDefault(require("./FormInputText"));
var PipelineItemTextInput = function (_a) {
    var label = _a.label, name = _a.name, _b = _a.value, value = _b === void 0 ? '' : _b, setValue = _a.setValue, placeholder = _a.placeholder;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("label", { htmlFor: name, className: "text-sm font-medium text-gray-900" }, label),
        react_1.default.createElement("div", null,
            react_1.default.createElement(FormInputText_1.default, { useMaxWidth: false, name: name, value: value, setValue: setValue, placeholder: placeholder }))));
};
PipelineItemTextInput.defaultProps = {
    value: '',
    placeholder: '',
};
exports.default = PipelineItemTextInput;
