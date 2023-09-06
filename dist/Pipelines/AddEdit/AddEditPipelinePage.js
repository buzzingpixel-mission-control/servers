"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var LineItem_1 = __importDefault(require("./LineItem"));
var SubmitButton_1 = __importDefault(require("./SubmitButton"));
var FormInputProjects_1 = __importDefault(require("./FormInputProjects"));
var FormInputText_1 = __importDefault(require("./FormInputText"));
var FormInputToggle_1 = __importDefault(require("./FormInputToggle"));
var FormInputCodeEditor_1 = __importDefault(require("./FormInputCodeEditor"));
var PipelineItems_1 = __importDefault(require("./PipelineItems"));
var Page = function () {
    var pageName = 'Add Pipeline';
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageName);
    (0, buzzingpixel_mission_control_frontend_core_1.useBreadcrumbs)([
        {
            name: 'Pipelines',
            href: '/pipelines',
        },
        {
            name: pageName,
            href: '/pipelines/add',
        },
    ]);
    var _a = (0, react_1.useState)(false), isSaving = _a[0], setIsSaving = _a[1];
    var _b = (0, react_1.useState)({
        title: '',
        description: '',
        project_id: '',
        enable_webhook: false,
        webhook_check_for_branch: '',
        run_before_every_item: '',
        pipeline_items: [],
    }), values = _b[0], setValues = _b[1];
    var setStringValue = function (key, val) {
        var newValues = values;
        newValues[key] = val;
        setValues(function () { return (__assign({}, newValues)); });
    };
    var setBooleanValue = function (key, val) {
        var newValues = values;
        newValues[key] = val;
        setValues(function () { return (__assign({}, newValues)); });
    };
    var addPipelineItem = function (type) {
        var newValues = values;
        newValues.pipeline_items.push({
            type: type,
            description: '',
            run_on_servers: [],
            script: '',
        });
        setValues(function () { return (__assign({}, newValues)); });
    };
    var _c = (0, react_1.useState)(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var saveHandler = function () {
        setIsSaving(true);
        if (errorMessage) {
            setErrorMessage('');
        }
        console.log(values);
    };
    console.log(values.pipeline_items);
    return (react_1.default.createElement("form", { onSubmit: function (e) {
            e.preventDefault();
            saveHandler();
        } },
        react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow sm:rounded-lg max-w-6xl" },
            react_1.default.createElement("div", { className: "px-4 py-6 sm:px-6" },
                react_1.default.createElement("div", { className: "sm:grid sm:grid-cols-3 sm:gap-4" },
                    react_1.default.createElement("h3", { className: "text-base font-semibold leading-7 text-gray-900 sm:col-span-2" }, "Add Pipeline"),
                    react_1.default.createElement("div", { className: "text-right" },
                        react_1.default.createElement(SubmitButton_1.default, { isSaving: isSaving })))),
            react_1.default.createElement("div", { className: "border-t border-gray-100" },
                react_1.default.createElement("dl", { className: "divide-y divide-gray-100" },
                    react_1.default.createElement(LineItem_1.default, { label: "Title", labelFor: "title", RenderInput: (react_1.default.createElement(FormInputText_1.default, { name: "title", value: values.description, setValue: function (val) {
                                setStringValue('title', val);
                            } })) }),
                    react_1.default.createElement(LineItem_1.default, { label: "Description", labelFor: "description", RenderInput: (react_1.default.createElement(FormInputText_1.default, { name: "description", value: values.description, setValue: function (val) {
                                setStringValue('description', val);
                            } })) }),
                    react_1.default.createElement(LineItem_1.default, { label: "Project", labelFor: "project_id", RenderInput: (react_1.default.createElement(FormInputProjects_1.default, { value: values.project_id, setValue: function (val) {
                                setStringValue('project_id', val);
                            } })) }),
                    react_1.default.createElement(LineItem_1.default, { label: "Enable Webhook", labelFor: "enable_webhook", RenderInput: (react_1.default.createElement(FormInputToggle_1.default, { name: "description", value: values.enable_webhook, setValue: function (val) {
                                setBooleanValue('enable_webhook', val);
                            } })) }),
                    react_1.default.createElement(LineItem_1.default, { label: "Check for Branch in Payload (Post Request Only)", labelFor: "webhook_check_for_branch", RenderInput: (react_1.default.createElement(FormInputText_1.default, { name: "webhook_check_for_branch", value: values.webhook_check_for_branch, setValue: function (val) {
                                setStringValue('webhook_check_for_branch', val);
                            } })) }),
                    react_1.default.createElement(LineItem_1.default, { label: "Run Before Every Item", labelFor: "run_before_every_item", RenderInput: (react_1.default.createElement(FormInputCodeEditor_1.default, { name: "run_before_every_item", value: values.run_before_every_item, setValue: function (val) {
                                setStringValue('run_before_every_item', val);
                            } })) }),
                    react_1.default.createElement(LineItem_1.default, { label: "Pipeline Items", labelFor: "pipeline_items", RenderInput: (react_1.default.createElement(PipelineItems_1.default, { addPipelineItem: addPipelineItem })) }),
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:px-6" },
                        react_1.default.createElement("div", { className: "text-right" },
                            react_1.default.createElement(SubmitButton_1.default, { isSaving: isSaving }))))))));
};
exports.default = Page;
