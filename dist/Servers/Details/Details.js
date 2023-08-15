"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SshCommand_1 = __importDefault(require("./SshCommand"));
var SshPort_1 = __importDefault(require("./SshPort"));
var Address_1 = __importDefault(require("./Address"));
var SshUserName_1 = __importDefault(require("./SshUserName"));
var SshKey_1 = __importDefault(require("./SshKey"));
var Details = function (_a) {
    var data = _a.data;
    return (react_1.default.createElement("div", { className: "max-w-6xl" },
        react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow sm:rounded-lg" },
            react_1.default.createElement("div", { className: "border-t border-gray-100" },
                react_1.default.createElement("dl", { className: "divide-y divide-gray-100" },
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Title"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0" }, data.title)),
                    react_1.default.createElement(SshUserName_1.default, { data: data }),
                    react_1.default.createElement(Address_1.default, { data: data }),
                    react_1.default.createElement(SshPort_1.default, { data: data }),
                    react_1.default.createElement(SshCommand_1.default, { data: data }),
                    react_1.default.createElement(SshKey_1.default, { data: data }))))));
};
exports.default = Details;
