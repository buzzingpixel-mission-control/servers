import { MenuItem } from 'buzzingpixel-mission-control-frontend-core';
import {
    KeyIcon,
    RectangleGroupIcon,
    ServerStackIcon,
} from '@heroicons/react/24/outline';

const ServersMenuItems = (): Array<MenuItem> => [
    {
        name: 'SSH Keys',
        href: '/ssh-keys',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: KeyIcon,
        requiresAdminPrivileges: true,
    },
    {
        name: 'Servers',
        href: '/servers',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: ServerStackIcon,
    },
    {
        name: 'Pipelines',
        href: '/pipelines',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: RectangleGroupIcon,
    },
];

export default ServersMenuItems;
