"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var RunPipeline_1 = require("../RunPipeline");
var archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var PageHeader = function (_a) {
    var data = _a.data;
    var _b = (0, RunPipeline_1.useRunPipelineMutation)(data), runPipelineMutation = _b.runPipelineMutation, RunPipelineOverlay = _b.RunPipelineOverlay;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        RunPipelineOverlay,
        react_1.default.createElement("div", { className: "mb-8" },
            react_1.default.createElement("div", { className: "border-b border-gray-200 pb-4" },
                react_1.default.createElement("div", { className: "md:flex md:items-center md:justify-between md:space-x-5" },
                    react_1.default.createElement("div", { className: "flex items-start space-x-5 overflow-hidden" },
                        react_1.default.createElement("div", { className: "pt-1.5" },
                            react_1.default.createElement("h1", { className: "text-2xl font-bold text-gray-900" }, data.title),
                            (function () {
                                if (!data.description) {
                                    return null;
                                }
                                return (react_1.default.createElement("p", { className: "text-sm font-medium text-gray-600 mb-2" }, data.description));
                            })(),
                            react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                                react_1.default.createElement("p", { className: classNames(archiveActiveStatuses[data.activeOrArchivedText], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, data.activeOrArchivedText),
                                (function () {
                                    if (!data.project) {
                                        return null;
                                    }
                                    return (react_1.default.createElement(react_router_dom_1.Link, { to: data.project.href, className: classNames('text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800', 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') },
                                        "Project:",
                                        ' ',
                                        data.project.title));
                                })()))),
                    react_1.default.createElement("div", { className: "mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3" },
                        react_1.default.createElement(react_router_dom_1.Link, { to: data.editHref, className: "inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" }, "Edit"),
                        react_1.default.createElement("button", { type: "button", className: "inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600", onClick: function () {
                                runPipelineMutation.mutate({});
                            } }, "Run"))),
                (function () {
                    if (!data.enableWebhook) {
                        return null;
                    }
                    return (react_1.default.createElement("div", { className: "col-span-full mt-3" },
                        react_1.default.createElement("label", { htmlFor: "street-address", className: "block text-sm font-medium leading-6 text-gray-900" }, "Webhook Trigger"),
                        react_1.default.createElement("div", { className: "mt-2" },
                            react_1.default.createElement("input", { type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", value: data.webhookTrigger, readOnly: true }))));
                })()))));
};
exports.default = PageHeader;
