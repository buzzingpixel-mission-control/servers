"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SshCommand = function (_a) {
    var data = _a.data;
    if (!data.sshUserName || !data.address) {
        return null;
    }
    var cmd = [
        'ssh ',
        data.sshUserName,
        '@',
        data.address,
    ];
    if (data.sshPort !== null && data.sshPort > 0 && data.sshPort !== 22) {
        cmd.push(" -p ".concat(data.sshPort));
    }
    return (react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" },
        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "SSH Command"),
        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0" },
            react_1.default.createElement("input", { type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", value: cmd.join(''), readOnly: true }))));
};
exports.default = SshCommand;
