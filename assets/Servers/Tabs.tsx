import React, { MouseEventHandler } from 'react';
import { PageTabs, Tab } from 'buzzingpixel-mission-control-frontend-core';
import {
    ArchiveBoxIcon,
    FolderIcon,
    PlusIcon,
} from '@heroicons/react/20/solid';

const tabs = [
    {
        name: 'Active Servers',
        href: '/servers',
        icon: FolderIcon,
    },
    {
        name: 'Archived Servers',
        href: '/servers/archived',
        icon: ArchiveBoxIcon,
    },
] as Array<Tab>;

const Tabs = (
    {
        activeHref,
        addOnClick,
    }: {
        activeHref?: string;
        addOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    },
) => {
    activeHref = activeHref || '/servers';

    return (
        <PageTabs
            tabs={tabs.map((tab) => ({
                ...tab,
                current: tab.href === activeHref,
            }))}
            rightHandButtons={[{
                key: 'add-ssh-key',
                text: (
                    <>
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add SSH Key
                    </>
                ),
                onClick: addOnClick,
            }]}
        />
    );
};

Tabs.defaultProps = {
    activeHref: undefined,
    addOnClick: undefined,
};

export default Tabs;
