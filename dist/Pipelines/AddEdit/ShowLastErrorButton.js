"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ShowLastErrorButton = function (_a) {
    var errorMessage = _a.errorMessage, setErrorMessageIsOpen = _a.setErrorMessageIsOpen;
    if (!errorMessage) {
        return null;
    }
    return (react_1.default.createElement("span", { className: "w-full my-1.5 sm:my-0 sm:w-auto cursor-pointer inline-flex justify-center rounded-md border border-slate-200 px-4 py-2 text-base font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm bg-white hover:bg-slate-100 focus:ring-cyan-500 mr-2", onClick: function () {
            setErrorMessageIsOpen(true);
        } },
        react_1.default.createElement("span", { className: "ml-1 inline-block align-middle" }, "Show Last Error")));
};
exports.default = ShowLastErrorButton;
