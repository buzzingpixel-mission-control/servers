import React, { useEffect, useState } from 'react';
import { NoResultsAddItem, PartialPageLoading } from 'buzzingpixel-mission-control-frontend-core';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import { useRecentRunsData } from './RecentRunsData';
import { PipelineWithViewOptions } from '../Pipelines';
import RecentRunsListItem from './RecentRunsListItem';

const RecentRunsList = (
    {
        pipeline,
    }: {
        pipeline: PipelineWithViewOptions;
    },
) => {
    const [activeRefetch, setActiveRefetch] = useState(true);

    const {
        status,
        data,
    } = useRecentRunsData(pipeline.id, activeRefetch);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    if (data.length < 1) {
        setActiveRefetch(false);

        return (
            <NoResultsAddItem
                icon={<RectangleGroupIcon />}
                headline="No recent runs available"
            />
        );
    }

    let hasActiveItems = false;

    data.map((item) => {
        if (item.isRunning) {
            hasActiveItems = true;
        }
    });

    if (hasActiveItems !== activeRefetch) {
        setActiveRefetch(hasActiveItems);
    }

    return (
        <div className="bg-white rounded-md shadow-sm">
            <ul className="divide-y divide-gray-100">
                {data.map((item) => (
                    <RecentRunsListItem
                        key={item.id}
                        item={item}
                        pipeline={pipeline}
                    />
                ))}
            </ul>
        </div>
    );
};

export default RecentRunsList;
