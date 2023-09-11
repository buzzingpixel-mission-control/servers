import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { usePipelineDetailsData } from './PipelineDetailsData';
import PageHeader from './PageHeader';

const Page = () => {
    const { slug } = useParams();

    useHidePageTitle(true);

    const [pageNameState, setPageNameState] = useState(
        'Loading Pipeline Details…',
    );

    const [isArchive, setIsArchive] = useState(false);

    usePageTitle(pageNameState);

    useBreadcrumbs([
        {
            name: 'Pipelines',
            href: isArchive ? '/pipelines/archived' : '/pipelines',
        },
        {
            name: pageNameState,
            href: `/pipelines/${slug}`,
        },
    ]);

    const { status, data } = usePipelineDetailsData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pageName = `Pipeline: ${data.title}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }

    return (
        <>
            <PageHeader data={data} />
        </>
    );
};

export default Page;
