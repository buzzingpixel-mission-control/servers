import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { useAuthorizedKeysData } from './AuthorizedKeysData';
import PageHeader from './PageHeader';
import KeyDetails from './KeyDetails';

const Page = () => {
    const { slug } = useParams();

    useHidePageTitle(true);

    const [pageNameState, setPageNameState] = useState(
        'Loading Server Details…',
    );

    const [serverNameState, setServerNameState] = useState(
        'Loading Server Details…',
    );

    const [isArchive, setIsArchive] = useState(false);

    usePageTitle(pageNameState);

    useBreadcrumbs([
        {
            name: 'Servers',
            href: isArchive ? '/servers/archived' : '/servers',
        },
        {
            name: serverNameState,
            href: `/servers/${slug}`,
        },
        {
            name: 'Authorized Keys',
            href: `/servers/${slug}/authorized-keys`,
        },
    ]);

    const { status, data } = useAuthorizedKeysData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pageName = `Authorized Keys | ${data?.server?.title ?? ''}`;

    const serverName = `Server: ${data?.server?.title ?? ''}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (serverNameState !== serverName) {
        setServerNameState(serverName);
    }

    if (isArchive !== !(data?.server?.isActive ?? true)) {
        setIsArchive(!(data?.server?.isActive ?? true));
    }

    if (status === 'error') {
        return (
            <>
                <PageHeader slug={slug} pageName={pageName} />
                <div className="rounded-md bg-red-50 p-4 shadow-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                We couldn&rsquo;t connect to the server over SSH
                            </h3>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!data.keys) {
        return (
            <>
                <PageHeader slug={slug} pageName={pageName} />
                <PartialPageLoading />
            </>
        );
    }

    return (
        <>
            <PageHeader slug={slug} pageName={pageName} />
            <div className="max-w-6xl">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="border-t border-gray-100">
                        <div className="divide-y divide-gray-100">
                            {data.keys.map((key, index) => (
                                <KeyDetails
                                    key={key.key}
                                    index={index}
                                    keyString={key.key}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
