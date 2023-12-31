"use strict";
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
var react_hook_form_1 = require("react-hook-form");
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var ServerData_1 = require("./ServerData");
var FormInputSshKeys_1 = __importDefault(require("../SshKey/FormInputSshKeys"));
var ServerListItemEditor = function (_a) {
    var item = _a.item, setEditorIsOpen = _a.setEditorIsOpen;
    var _b = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: item.title,
            ssh_user_name: item.sshUserName,
            address: item.address,
            ssh_port: item.sshPort,
            ssh_key_id: item.sshKeyId,
            project_id: item.projectId,
        },
    }), getValues = _b.getValues, register = _b.register, setValue = _b.setValue;
    var _c = (0, react_1.useState)(false), isSaving = _c[0], setIsSaving = _c[1];
    var inputs = [
        {
            title: 'Title',
            name: 'title',
            placeholder: 'e.g. Example Server',
            required: true,
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputText,
            setValue: setValue,
        },
        {
            title: 'SSH Username',
            name: 'ssh_user_name',
            placeholder: 'e.g. root',
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputText,
            setValue: setValue,
        },
        {
            title: 'Address',
            name: 'address',
            placeholder: 'e.g. 127.0.0.1',
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputText,
            setValue: setValue,
        },
        {
            title: 'SSH Port',
            name: 'ssh_port',
            type: 'number',
            placeholder: 'e.g. 22',
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputText,
            setValue: setValue,
        },
        {
            title: 'SSH Key',
            name: 'ssh_key_id',
            renderInput: FormInputSshKeys_1.default,
            initialValue: item.sshKeyId,
            setValue: setValue,
        },
        {
            title: 'Project',
            name: 'project_id',
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputProjects,
            initialValue: item.projectId,
            setValue: setValue,
        },
    ];
    var _d = (0, react_1.useState)(''), errorMessage = _d[0], setErrorMessage = _d[1];
    var mutation = (0, ServerData_1.useEditServerMutation)(item.slug);
    var saveHandler = function (data) {
        setIsSaving(true);
        if (errorMessage) {
            setErrorMessage('');
        }
        mutation.mutate(data, {
            onSuccess: function () { return setEditorIsOpen(false); },
            onError: function (error) {
                setErrorMessage(error.message || 'Unable to edit server');
                setIsSaving(false);
            },
        });
    };
    return (react_1.default.createElement("div", { style: { paddingBottom: '1.5rem' } },
        react_1.default.createElement("div", { className: "border border-gray-300 rounded-md shadow-md mx-auto p-4", style: { maxWidth: '600px' } },
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.EditorShellInline, { isSaving: isSaving, setEditorIsOpen: setEditorIsOpen, errorMessage: errorMessage, saveHandler: function () {
                    saveHandler(getValues());
                } },
                react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.EditorShellForm, { inputs: inputs, register: register, onSubmit: function () {
                        saveHandler(getValues());
                    } })))));
};
exports.default = ServerListItemEditor;
