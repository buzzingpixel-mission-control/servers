import React, { useState } from 'react';
import {
    createPortal, NoResultsAddItem,
    PartialPageLoading,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { ServerStackIcon } from '@heroicons/react/24/outline';
import useFilterText from '../SshKey/useFilterText';
import Tabs from './Tabs';
import { useServerData } from './ServerData';
import AddServerOverlay from './AddServerOverlay';
import ServerList from './ServerList';

const Page = (
    {
        isArchive = false,
    }: {
        isArchive?: boolean;
    },
) => {
    const [pageNameState, setPageNameState] = useState('');

    const standardName = 'Servers';
    const archivedName = `Archived ${standardName}`;

    if (isArchive && pageNameState !== archivedName) {
        setPageNameState(archivedName);
    } else if (!isArchive && pageNameState !== standardName) {
        setPageNameState(standardName);
    }

    usePageTitle(pageNameState);

    const [filterText, setFilterText] = useFilterText();

    const [addIsOpen, setAddIsOpen] = useState<boolean>(false);

    // eslint-disable-next-line prefer-const
    let { status, data } = useServerData(isArchive);

    const LocalTabs = (
        <Tabs
            activeHref={isArchive ? '/servers/archived' : '/servers'}
            addOnClick={() => { setAddIsOpen(true); }}
        />
    );

    if (status === 'loading') {
        return (
            <>
                {LocalTabs}
                <PartialPageLoading />
            </>
        );
    }

    const portals = () => {
        if (addIsOpen) {
            return createPortal(<AddServerOverlay setIsOpen={setAddIsOpen} />);
        }

        return null;
    };

    if (data.length < 1) {
        if (isArchive) {
            return (
                <>
                    {portals()}
                    {LocalTabs}
                    <NoResultsAddItem
                        icon={<ServerStackIcon />}
                        headline="No Archived Servers"
                    />
                </>
            );
        }

        return (
            <>
                {portals()}
                {LocalTabs}
                <NoResultsAddItem
                    icon={<ServerStackIcon />}
                    headline="No Servers"
                    content="Would you like to add a Server?"
                    actionText="Add Server"
                    actionUsesPlusIcon
                    actionButtonOnClick={() => { setAddIsOpen(true); }}
                />
            </>
        );
    }

    if (filterText !== '') {
        data = data.filter(
            (server) => server.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || server.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || server.sshUserName.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || server.address.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || server.sshPort.toString().indexOf(filterText.toLowerCase()) > -1,
        );
    }

    return (
        <>
            {portals()}
            {LocalTabs}
            <div>
                <div className="sm:flex sm:mb-4">
                    <div className="mb-4 sm:mb-0 grow">
                        <input
                            type="text"
                            name="filter"
                            id="filter"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            placeholder="Filter results"
                            value={filterText}
                            onChange={(e) => {
                                setFilterText(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <ServerList isArchive={isArchive} items={data} />
        </>
    );
};

Page.defaultProps = {
    isArchive: false,
};

export default Page;
