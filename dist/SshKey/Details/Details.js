"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Details = function (_a) {
    var data = _a.data;
    return (react_1.default.createElement("div", { className: "max-w-6xl" },
        react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow sm:rounded-lg" },
            react_1.default.createElement("div", { className: "border-t border-gray-100" },
                react_1.default.createElement("dl", { className: "divide-y divide-gray-100" },
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Public Key"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0" },
                            react_1.default.createElement("textarea", { rows: 8, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", readOnly: true }, data.public))),
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Private Key"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0" },
                            react_1.default.createElement("textarea", { rows: 28, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", readOnly: true }, data.private))))))));
};
exports.default = Details;
