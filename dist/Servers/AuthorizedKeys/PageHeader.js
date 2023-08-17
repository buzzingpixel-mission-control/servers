"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var AddNewKeyButton_1 = __importDefault(require("./AddNewKeyButton"));
var PageHeader = function (_a) {
    var slug = _a.slug, pageName = _a.pageName;
    return (react_1.default.createElement("div", { className: "mb-8" },
        react_1.default.createElement("div", { className: "border-b border-gray-200 pb-4" },
            react_1.default.createElement("div", { className: "md:flex md:items-center md:justify-between md:space-x-5" },
                react_1.default.createElement("div", { className: "flex items-start space-x-5 overflow-hidden" },
                    react_1.default.createElement("div", { className: "pt-1.5" },
                        react_1.default.createElement("h1", { className: "text-2xl font-bold text-gray-900" }, pageName))),
                react_1.default.createElement("div", { className: "mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3" },
                    react_1.default.createElement(AddNewKeyButton_1.default, { slug: slug }))))));
};
exports.default = PageHeader;
