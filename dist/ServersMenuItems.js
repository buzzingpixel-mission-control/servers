"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var outline_1 = require("@heroicons/react/24/outline");
var ServersMenuItems = function () { return [
    {
        name: 'SSH Keys',
        href: '/ssh-keys',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: outline_1.KeyIcon,
        requiresAdminPrivileges: true,
    },
    {
        name: 'Servers',
        href: '/servers',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: outline_1.ServerStackIcon,
    },
    {
        name: 'Pipelines',
        href: '/pipelines',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: outline_1.RectangleGroupIcon,
    },
]; };
exports.default = ServersMenuItems;
