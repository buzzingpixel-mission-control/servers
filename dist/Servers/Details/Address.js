"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Address = function (_a) {
    var data = _a.data;
    if (!data.address) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" },
        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Address"),
        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0" }, data.address)));
};
exports.default = Address;
