"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var DetailsSshKeyDisplay_1 = __importDefault(require("./DetailsSshKeyDisplay"));
var Details = function (_a) {
    var data = _a.data;
    return (react_1.default.createElement("div", { className: "max-w-6xl" },
        react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow sm:rounded-lg" },
            react_1.default.createElement("div", { className: "border-t border-gray-100" },
                react_1.default.createElement("dl", { className: "divide-y divide-gray-100" },
                    react_1.default.createElement(DetailsSshKeyDisplay_1.default, { data: data }))))));
};
exports.default = Details;
