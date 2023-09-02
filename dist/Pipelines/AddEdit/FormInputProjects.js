"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_select_1 = __importDefault(require("react-select"));
var react_1 = __importDefault(require("react"));
var ProjectsData_1 = require("buzzingpixel-mission-control-frontend-core/dist/Projects/ProjectsData");
var FormInputProjects = function (_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, setValue = _a.setValue;
    var _c = (0, ProjectsData_1.useProjectsData)(), status = _c.status, data = _c.data;
    var options = [];
    if (status === 'success') {
        data.forEach(function (project) {
            options.push({
                value: project.id,
                label: project.title,
            });
        });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "max-w-md" }, (function () {
            if (status === 'loading') {
                return (react_1.default.createElement("div", { className: "inline-block align-middle h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-info motion-reduce:animate-[spin_1.5s_linear_infinite] opacity-100 text-cyan-600", role: "status" },
                    react_1.default.createElement("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" }, "Loading...")));
            }
            return (react_1.default.createElement(react_select_1.default, { id: "project_id", onChange: function (selected) {
                    setValue((selected === null || selected === void 0 ? void 0 : selected.value) || null);
                }, value: options.filter(function (option) { return option.value === value; }), options: options, className: "react-select-control", isClearable: true }));
        })())));
};
FormInputProjects.defaultProps = {
    value: '',
};
exports.default = FormInputProjects;
