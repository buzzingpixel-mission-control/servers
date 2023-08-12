import { MenuItem } from 'buzzingpixel-mission-control-frontend-core';
import { KeyIcon, ServerStackIcon } from '@heroicons/react/24/outline';

const ServersMenuItems = (): Array<MenuItem> => [
    {
        name: 'SSH Keys',
        href: '/ssh-keys',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: KeyIcon,
    },
    {
        name: 'Servers',
        href: '/servers',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        icon: ServerStackIcon,
    },
];

export default ServersMenuItems;
