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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var solid_1 = require("@heroicons/react/20/solid");
var tabs = [
    {
        name: 'Active Keys',
        href: '/ssh-keys',
        icon: solid_1.FolderIcon,
    },
    {
        name: 'Archived Keys',
        href: '/ssh-keys/archived',
        icon: solid_1.ArchiveBoxIcon,
    },
];
var SshKeyTabs = function (_a) {
    var activeHref = _a.activeHref, addOnClick = _a.addOnClick;
    activeHref = activeHref || '/ssh-keys';
    return (react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PageTabs, { tabs: tabs.map(function (tab) { return (__assign(__assign({}, tab), { current: tab.href === activeHref })); }), rightHandButtons: [{
                key: 'add-ssh-key',
                text: (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(solid_1.PlusIcon, { className: "-ml-1 mr-2 h-5 w-5", "aria-hidden": "true" }),
                    "Add SSH Key")),
                onClick: addOnClick,
            }] }));
};
SshKeyTabs.defaultProps = {
    activeHref: undefined,
    addOnClick: undefined,
};
exports.default = SshKeyTabs;
