import React from 'react';
import { RecentRunWithViewOptions } from './RecentRuns';
import { PipelineWithViewOptions } from '../Pipelines';
declare const RecentRunsListItem: ({ item, pipeline, }: {
    item: RecentRunWithViewOptions;
    pipeline: PipelineWithViewOptions;
}) => React.JSX.Element;
export default RecentRunsListItem;
