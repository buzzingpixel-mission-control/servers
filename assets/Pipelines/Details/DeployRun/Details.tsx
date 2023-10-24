import React, { useState } from 'react';
import { PartialPageLoading } from 'buzzingpixel-mission-control-frontend-core';
import { PipelineWithViewOptions } from '../../Pipelines';
import { useDeployRunData } from './DeployRunData';
import DetailsItem from './DetailsItem';
import { RecentRunStatus } from '../RecentRuns';

const Details = (
    {
        jobId,
        pipeline,
    }: {
        jobId: string;
        pipeline: PipelineWithViewOptions;
    },
) => {
    const [continuousRefetch, setContinuousRefetch] = useState(true);

    const { status, data } = useDeployRunData(
        pipeline.id,
        jobId,
        continuousRefetch,
    );

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    if (
        data.status !== RecentRunStatus.running
        && data.status !== RecentRunStatus.inQueue
        && continuousRefetch === true
    ) {
        setContinuousRefetch(false);
    }

    return (
        <div className="bg-white rounded-md shadow-sm">
            <ul className="divide-y divide-gray-200">
                {data.items.map((item) => {
                    const pipelineItem = pipeline.pipelineItems.filter(
                        (pItem) => pItem.id === item.pipelineItemId,
                    )[0];

                    return (
                        <DetailsItem
                            key={item.id}
                            item={item}
                            pipelineItem={pipelineItem}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Details;
