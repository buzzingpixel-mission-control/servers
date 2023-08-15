"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var DetailsSshKeyDisplay_1 = __importDefault(require("../../SshKey/Details/DetailsSshKeyDisplay"));
var SshKey = function (_a) {
    var data = _a.data;
    if (!data.sshKey) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" },
            react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "SSH Key"),
            react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0" },
                react_1.default.createElement(react_router_dom_1.Link, { to: data.sshKey.href, className: "inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" }, data.sshKey.title))),
        react_1.default.createElement(DetailsSshKeyDisplay_1.default, { data: data.sshKey })));
};
exports.default = SshKey;
