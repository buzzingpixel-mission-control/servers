import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { useSshKeyDetailsData } from './SshKeyDetailsData';
import PageHeader from './PageHeader';
import Details from './Details';

const SshKeyDetailsPage = () => {
    const { slug } = useParams();

    useHidePageTitle(true);

    const [pageNameState, setPageNameState] = useState(
        'Loading SSH Key Details…',
    );

    const [isArchive, setIsArchive] = useState(false);

    usePageTitle(pageNameState);

    useBreadcrumbs([
        {
            name: 'SSH Keys',
            href: isArchive ? '/ssh-keys/archived' : '/ssh-keys',
        },
        {
            name: pageNameState,
            href: `/ssh-keys/${slug}`,
        },
    ]);

    const { status, data } = useSshKeyDetailsData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pageName = `SSH Key: ${data.title}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }

    return (
        <>
            <PageHeader data={data} />
            <Details data={data} />
        </>
    );
};

export default SshKeyDetailsPage;
