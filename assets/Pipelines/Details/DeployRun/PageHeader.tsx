import React from 'react';
import phpDateFormat from 'locutus/php/datetime/date';
import { PipelineWithViewOptions } from '../../Pipelines';
import { StatusPillStyleClasses } from '../StatusPillStyleClasses';
import { useDeployRunData } from './DeployRunData';
import { RecentRunStatus } from '../RecentRuns';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

const PageHeader = (
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
        return null;
    }

    return (
        <div className="mb-8">
            <div className="border-b border-gray-200 pb-4">
                <div className="md:flex md:items-center md:justify-between md:space-x-5">
                    <div className="flex items-start space-x-5 overflow-hidden">
                        <div className="pt-1.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Pipeline “
                                {pipeline.title}
                                ” Job at
                                {' '}
                                {phpDateFormat('Y-m-d g:i:s A', data.addedAtDate)}
                            </h1>
                            {(() => {
                                if (!pipeline.description) {
                                    return null;
                                }

                                return (
                                    <p className="text-sm font-medium text-gray-600 mb-2">
                                        {pipeline.description}
                                    </p>
                                );
                            })()}
                            <div className="flex items-start gap-x-3">
                                <p
                                    className={classNames(
                                        StatusPillStyleClasses[data.status],
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    {data.status}
                                </p>
                                {(() => {
                                    if (!data.isRunning) {
                                        return null;
                                    }

                                    return (
                                        <p className="text-sm font-medium text-gray-600 mb-2">
                                            {data.percentComplete}
                                            %
                                        </p>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
