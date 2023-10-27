import React from 'react';
import phpDateFormat from 'locutus/php/datetime/date';
import { Link } from 'react-router-dom';
import { RecentRunStatus, RecentRunWithViewOptions } from './RecentRuns';
import { PipelineWithViewOptions } from '../Pipelines';
import { StatusPillStyleClasses } from './StatusPillStyleClasses';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

const RecentRunsListItem = (
    {
        item,
        pipeline,
    }: {
        item: RecentRunWithViewOptions;
        pipeline: PipelineWithViewOptions;
    },
) => (
    <li className="px-4">
        <div className="sm:flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {phpDateFormat('Y-m-d g:i:s A', item.addedAtDate)}
                    </p>
                    <p
                        className={classNames(
                            StatusPillStyleClasses[item.status],
                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                        )}
                    >
                        {item.status}
                    </p>
                    {(() => {
                        if (item.status === RecentRunStatus.failed) {
                            return null;
                        }

                        return (
                            <p className="text-sm leading-6 text-gray-900">
                                {item.percentComplete}
                                %
                            </p>
                        );
                    })()}
                </div>
            </div>
            <div className="mt-2 sm:mt-0 flex flex-none items-center gap-x-4">
                <Link
                    to={`${pipeline.href}/run/${item.id}`}
                    className="block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    View Details
                </Link>
            </div>
        </div>
    </li>
);

export default RecentRunsListItem;
