"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_ace_1 = __importDefault(require("react-ace"));
require("ace-builds/src-noconflict/mode-nix");
require("ace-builds/src-noconflict/theme-github");
var FormInputText = function (_a) {
    var name = _a.name, _b = _a.value, value = _b === void 0 ? '' : _b, setValue = _a.setValue;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "w-full rounded-md border border-gray-300 shadow-sm overflow-hidden" },
            react_1.default.createElement(react_ace_1.default, { width: "100%", minLines: 4, maxLines: Infinity, highlightActiveLine: false, wrapEnabled: true, mode: "nix", theme: "github", name: name, value: value, onChange: function (val) { setValue(val); } }))));
};
FormInputText.defaultProps = {
    value: '',
};
exports.default = FormInputText;
