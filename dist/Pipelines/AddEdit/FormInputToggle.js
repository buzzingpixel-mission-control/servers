"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@headlessui/react");
var classNames = function () {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
};
var FormInputToggle = function (_a) {
    var name = _a.name, _b = _a.value, value = _b === void 0 ? false : _b, setValue = _a.setValue;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "max-w-md" },
            react_1.default.createElement(react_2.Switch, { checked: value, onChange: setValue, className: classNames(value ? 'bg-cyan-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2') },
                react_1.default.createElement("span", { className: "sr-only" }, name),
                react_1.default.createElement("span", { className: classNames(value ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out') },
                    react_1.default.createElement("span", { className: classNames(value ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'), "aria-hidden": "true" },
                        react_1.default.createElement("svg", { className: "h-3 w-3 text-gray-400", fill: "none", viewBox: "0 0 12 12" },
                            react_1.default.createElement("path", { d: "M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))),
                    react_1.default.createElement("span", { className: classNames(value ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'), "aria-hidden": "true" },
                        react_1.default.createElement("svg", { className: "h-3 w-3 text-cyan-600", fill: "currentColor", viewBox: "0 0 12 12" },
                            react_1.default.createElement("path", { d: "M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" }))))))));
};
FormInputToggle.defaultProps = {
    value: false,
};
exports.default = FormInputToggle;
