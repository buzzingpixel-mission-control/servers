import React from 'react';
import phpDateFormat from 'locutus/php/datetime/date';
import { StatusPillStyleClasses } from '../StatusPillStyleClasses';
import { RecentRunItemWithViewOptions } from '../RecentRuns';
import { PipelineItem } from '../../PipelineItems';

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

const DetailsItem = (
    {
        item,
        pipelineItem,
    }: {
        item: RecentRunItemWithViewOptions;
        pipelineItem: PipelineItem;
    },
) => (
    <li className="px-4 pb-6">
        <div className="sm:flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {pipelineItem.description}
                    </p>
                </div>
                <div className="flex items-start gap-x-3">
                    <p
                        className={classNames(
                            StatusPillStyleClasses[item.status],
                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                        )}
                    >
                        {item.status}
                    </p>
                    {(() => {
                        if (!item.isFinished) {
                            return null;
                        }

                        return (
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                Finished At:
                                {' '}
                                {phpDateFormat('Y-m-d g:i:s A', item.finishedAtDate)}
                            </p>
                        );
                    })()}
                </div>
            </div>
        </div>
        <div className="bg-slate-700 p-10 text-slate-100 sm:rounded-lg overflow-auto">
            <pre>
                <code>
                    {item.logContent}
                </code>
            </pre>
        </div>
    </li>
);

export default DetailsItem;
