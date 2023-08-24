import React, { useState } from 'react';
import {
    NoResultsAddItem,
    PartialPageLoading,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useFilterText from '../useFilterText';
import { usePipelineData } from './PipelineData';
import Tabs from './Tabs';
import PipelineList from './PipelineList';

const Page = (
    {
        isArchive = false,
    }: {
        isArchive?: boolean;
    },
) => {
    const navigate = useNavigate();

    const [pageNameState, setPageNameState] = useState('');

    const standardName = 'Pipelines';
    const archivedName = `Archived ${standardName}`;

    if (isArchive && pageNameState !== archivedName) {
        setPageNameState(archivedName);
    } else if (!isArchive && pageNameState !== standardName) {
        setPageNameState(standardName);
    }

    usePageTitle(pageNameState);

    const [filterText, setFilterText] = useFilterText();

    const goToAddPipeline = () => {
        navigate('/pipelines/add');
    };

    // eslint-disable-next-line prefer-const
    let { status, data } = usePipelineData(isArchive);

    const LocalTabs = (
        <Tabs
            activeHref={isArchive ? '/pipelines/archived' : '/pipelines'}
            addOnClick={goToAddPipeline}
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

    if (data.length < 1) {
        if (isArchive) {
            return (
                <>
                    {LocalTabs}
                    <NoResultsAddItem
                        icon={<RectangleGroupIcon />}
                        headline="No Archived Pipelines"
                    />
                </>
            );
        }

        return (
            <>
                {LocalTabs}
                <NoResultsAddItem
                    icon={<RectangleGroupIcon />}
                    headline="No Pipelines"
                    content="Would you like to add a Pipeline?"
                    actionText="Add Pipeline"
                    actionUsesPlusIcon
                    actionButtonOnClick={goToAddPipeline}
                />
            </>
        );
    }

    if (filterText !== '') {
        data = data.filter(
            (pipeline) => pipeline.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || pipeline.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || pipeline.description.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || pipeline.secretId.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                || pipeline.webhookCheckForBranch.toString().indexOf(filterText.toLowerCase()) > -1,
        );
    }

    return (
        <>
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
                            onChange={(e) => { setFilterText(e.target.value); }}
                        />
                    </div>
                </div>
            </div>
            <PipelineList isArchive={isArchive} items={data} />
        </>
    );
};

Page.defaultProps = {
    isArchive: false,
};

export default Page;
