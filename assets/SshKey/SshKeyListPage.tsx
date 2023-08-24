import React, { useState } from 'react';
import {
    createPortal, NoResultsAddItem,
    PartialPageLoading,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { KeyIcon } from '@heroicons/react/20/solid';
import { useSshKeyData } from './SshKeyData';
import SshKeyTabs from './SshKeyTabs';
import AddSshKeyOverlay from './AddSshKeyOverlay';
import SshKeyList from './SshKeyList';
import useFilterText from '../useFilterText';

const SshKeyListPage = (
    {
        isArchive = false,
    }: {
        isArchive?: boolean;
    },
) => {
    const [pageNameState, setPageNameState] = useState('');

    const standardName = 'SSH Keys';
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
    let { status, data } = useSshKeyData(isArchive);

    const Tabs = (
        <SshKeyTabs
            activeHref={isArchive ? '/ssh-keys/archived' : '/ssh-keys'}
            addOnClick={() => { setAddIsOpen(true); }}
        />
    );

    if (status === 'loading') {
        return (
            <>
                {Tabs}
                <PartialPageLoading />
            </>
        );
    }

    const portals = () => {
        if (addIsOpen) {
            return createPortal(<AddSshKeyOverlay setIsOpen={setAddIsOpen} />);
        }

        return null;
    };

    if (data.length < 1) {
        if (isArchive) {
            return (
                <>
                    {portals()}
                    {Tabs}
                    <NoResultsAddItem
                        icon={<KeyIcon />}
                        headline="No Archived SSH Keys"
                    />
                </>
            );
        }

        return (
            <>
                {portals()}
                {Tabs}
                <NoResultsAddItem
                    icon={<KeyIcon />}
                    headline="No SSH keys"
                    content="Would you like to create an SSH Key?"
                    actionText="Add SSH Key"
                    actionUsesPlusIcon
                    actionButtonOnClick={() => { setAddIsOpen(true); }}
                />
            </>
        );
    }

    if (filterText !== '') {
        data = data.filter((sshKey) => sshKey.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || sshKey.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    }

    return (
        <>
            {portals()}
            {Tabs}
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
            <SshKeyList isArchive={isArchive} items={data} />
        </>
    );
};

SshKeyListPage.defaultProps = {
    isArchive: false,
};

export default SshKeyListPage;
