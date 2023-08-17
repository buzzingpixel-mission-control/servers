"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var KeyDetails = function (_a) {
    var index = _a.index, keyString = _a.keyString;
    console.log('here');
    return (react_1.default.createElement("div", { className: "px-4 py-6" },
        react_1.default.createElement("div", { className: "mt-1 text-sm leading-6 text-gray-700 sm:mt-0" },
            react_1.default.createElement("textarea", { rows: 8, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", readOnly: true, defaultValue: keyString }),
            react_1.default.createElement("div", { className: "mt-2 text-right" },
                react_1.default.createElement("button", { type: "button", className: "inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" }, "Remove")))));
};
exports.default = KeyDetails;
