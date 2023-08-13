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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var SshKeyData_1 = require("./SshKeyData");
var SshKeyListItemEditor = function (_a) {
    var item = _a.item, setEditorIsOpen = _a.setEditorIsOpen;
    var _b = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: item.title,
        },
    }), getValues = _b.getValues, register = _b.register, setValue = _b.setValue;
    var _c = (0, react_1.useState)(false), isSaving = _c[0], setIsSaving = _c[1];
    var inputs = [
        {
            title: 'Title',
            name: 'title',
            placeholder: 'Example SSH Key',
            required: true,
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputText,
            setValue: setValue,
        },
    ];
    var _d = (0, react_1.useState)(''), errorMessage = _d[0], setErrorMessage = _d[1];
    var mutation = (0, SshKeyData_1.useEditSshKeyMutation)(item.id);
    var saveHandler = function (data) {
        setIsSaving(true);
        if (errorMessage) {
            setErrorMessage('');
        }
        mutation.mutate(data, {
            onSuccess: function () { return setEditorIsOpen(false); },
            onError: function (error) {
                setErrorMessage(error.message || 'Unable to edit SSH key');
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
exports.default = SshKeyListItemEditor;
