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
var AuthorizedKeysData_1 = require("./AuthorizedKeysData");
var AddNewKeyOverlay = function (_a) {
    var slug = _a.slug, setIsOpen = _a.setIsOpen;
    var _b = (0, react_1.useState)(false), isSaving = _b[0], setIsSaving = _b[1];
    var _c = (0, react_hook_form_1.useForm)(), getValues = _c.getValues, register = _c.register, setValue = _c.setValue;
    var inputs = [
        {
            title: 'Key',
            name: 'key',
            required: true,
            renderInput: buzzingpixel_mission_control_frontend_core_1.FormInputTextarea,
            setValue: setValue,
        },
    ];
    var _d = (0, react_1.useState)(''), errorMessage = _d[0], setErrorMessage = _d[1];
    var mutation = (0, AuthorizedKeysData_1.useAddAuthorizedKeyMutation)(slug);
    var saveHandler = function (data) {
        setIsSaving(true);
        if (errorMessage) {
            setErrorMessage('');
        }
        mutation.mutate(data, {
            onSuccess: function () { return setIsOpen(false); },
            onError: function (error) {
                setErrorMessage(error.message || 'Unable to add Server');
                setIsSaving(false);
            },
        });
    };
    return (react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.EditorShellFloating, { title: "Add New Server", isSaving: isSaving, submitButtonText: "Add", errorMessage: errorMessage, saveHandler: function () {
            saveHandler(getValues());
        }, setEditorIsOpen: setIsOpen },
        react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.EditorShellForm, { inputs: inputs, register: register, onSubmit: function () {
                saveHandler(getValues());
            } })));
};
exports.default = AddNewKeyOverlay;
