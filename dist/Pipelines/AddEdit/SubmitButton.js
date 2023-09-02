"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SubmitButton = function (_a) {
    var isSaving = _a.isSaving;
    var buttonBgClass = 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500';
    var spinnerSavingClass = 'opacity-0';
    if (isSaving) {
        buttonBgClass = 'bg-gray-600 focus:ring-gray-500';
        spinnerSavingClass = 'opacity-100';
    }
    return (react_1.default.createElement("button", { type: "submit", className: "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm ".concat(buttonBgClass) },
        react_1.default.createElement("div", { className: "inline-block align-middle h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-info motion-reduce:animate-[spin_1.5s_linear_infinite] ".concat(spinnerSavingClass), style: { marginTop: '0.25rem' }, role: "status" },
            react_1.default.createElement("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" }, "Loading...")),
        react_1.default.createElement("span", { className: "ml-1 inline-block align-middle" }, "Submit"),
        react_1.default.createElement("div", { className: "inline-block align-middle h-3 w-3", style: { marginTop: '0.25rem' }, role: "status" })));
};
exports.default = SubmitButton;
