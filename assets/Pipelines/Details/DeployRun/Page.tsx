import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PartialPageLoading, useBreadcrumbs, useHidePageTitle } from 'buzzingpixel-mission-control-frontend-core';
import { usePipelineDetailsData } from '../PipelineDetailsData';
import PageHeader from './PageHeader';
import Details from './Details';

const Page = () => {
    const { slug, id } = useParams();

    useHidePageTitle(true);

    const [pageNameState, setPageNameState] = useState(
        'Loading Pipeline Details…',
    );

    const [isArchive, setIsArchive] = useState(false);

    useBreadcrumbs([
        {
            name: 'Pipelines',
            href: isArchive ? '/pipelines/archived' : '/pipelines',
        },
        {
            name: pageNameState,
            href: `/pipelines/${slug}`,
        },
        {
            name: 'Job Details',
            href: `/pipelines/${slug}/run/${id}`,
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
            <PageHeader jobId={id} pipeline={data} />
            <Details jobId={id} pipeline={data} />
        </>
    );
};

export default Page;
