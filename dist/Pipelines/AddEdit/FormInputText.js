"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var FormInputText = function (_a) {
    var name = _a.name, _b = _a.value, value = _b === void 0 ? '' : _b, setValue = _a.setValue, placeholder = _a.placeholder;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "max-w-md" },
            react_1.default.createElement("input", { type: "text", id: name, placeholder: placeholder || '', className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm", value: value, onChange: function (e) { setValue(e.currentTarget.value); } }))));
};
FormInputText.defaultProps = {
    value: '',
    placeholder: '',
};
exports.default = FormInputText;
