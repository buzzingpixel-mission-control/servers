import React from 'react';
import { PartialPageLoading } from 'buzzingpixel-mission-control-frontend-core';
import { PipelineWithViewOptions } from '../../Pipelines';
import { useDeployRunData } from './DeployRunData';
import DetailsItem from './DetailsItem';

const Details = (
    {
        jobId,
        pipeline,
    }: {
        jobId: string;
        pipeline: PipelineWithViewOptions;
    },
) => {
    const { status, data } = useDeployRunData(pipeline.id, jobId);

    if (status === 'loading') {
        return <PartialPageLoading />;
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
