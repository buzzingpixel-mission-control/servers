import React from 'react';
import { RecentRunItemWithViewOptions } from '../RecentRuns';
import { PipelineItem } from '../../PipelineItems';
declare const DetailsItem: ({ item, pipelineItem, }: {
    item: RecentRunItemWithViewOptions;
    pipelineItem: PipelineItem;
}) => React.JSX.Element;
export default DetailsItem;
