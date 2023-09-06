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
var react_2 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/24/outline");
var ErrorModal = function (_a) {
    var isOpen = _a.isOpen, setIsOpen = _a.setIsOpen, message = _a.message;
    var cancelButtonRef = (0, react_1.useRef)(null);
    return (react_1.default.createElement(react_2.Transition.Root, { show: isOpen, as: react_1.Fragment },
        react_1.default.createElement(react_2.Dialog, { as: "div", className: "relative", initialFocus: cancelButtonRef, onClose: setIsOpen, style: { zIndex: 999 } },
            react_1.default.createElement(react_2.Transition.Child, { as: react_1.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                react_1.default.createElement("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })),
            react_1.default.createElement("div", { className: "fixed inset-0 z-10 w-screen overflow-y-auto" },
                react_1.default.createElement("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" },
                    react_1.default.createElement(react_2.Transition.Child, { as: react_1.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", enterTo: "opacity-100 translate-y-0 sm:scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 translate-y-0 sm:scale-100", leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" },
                        react_1.default.createElement(react_2.Dialog.Panel, { className: "relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6" },
                            react_1.default.createElement("div", { className: "sm:flex sm:items-start" },
                                react_1.default.createElement("div", { className: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" },
                                    react_1.default.createElement(outline_1.ExclamationTriangleIcon, { className: "h-6 w-6 text-red-600", "aria-hidden": "true" })),
                                react_1.default.createElement("div", { className: "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left" },
                                    react_1.default.createElement(react_2.Dialog.Title, { as: "h3", className: "text-base font-semibold leading-6 text-gray-900" }, "We ran into an issue"),
                                    react_1.default.createElement("div", { className: "mt-2" },
                                        react_1.default.createElement("p", { className: "text-sm text-gray-500" }, message)))),
                            react_1.default.createElement("div", { className: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse" },
                                react_1.default.createElement("button", { type: "button", className: "inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto", onClick: function () { return setIsOpen(false); } }, "Got it")))))))));
};
exports.default = ErrorModal;
