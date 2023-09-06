"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ShowLastErrorButton = function () { return (react_1.default.createElement("button", { type: "submit", className: "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 mr-2" },
    react_1.default.createElement("span", { className: "ml-1 inline-block align-middle" }, "Show Last Error"))); };
exports.default = ShowLastErrorButton;
