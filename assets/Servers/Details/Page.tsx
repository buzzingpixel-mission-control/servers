import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { useServerDetailsData } from './ServerDetailsData';
import PageHeader from './PageHeader';
import Details from './Details';

const Page = () => {
    const { slug } = useParams();

    useHidePageTitle(true);

    const [pageNameState, setPageNameState] = useState(
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
            name: pageNameState,
            href: `/servers/${slug}`,
        },
    ]);

    const { status, data } = useServerDetailsData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pageName = `Server: ${data.title}`;

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

export default Page;
