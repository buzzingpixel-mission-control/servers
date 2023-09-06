import React from 'react';
import { PipelineItem as PipeLineItemValues } from './AddEditValues';
declare const PipelineItem: ({ item, setPipelineItemInnerItem, removePipelineItem, }: {
    item: PipeLineItemValues;
    setPipelineItemInnerItem: (id: string, key: 'description' | 'script' | 'run_on_servers', value: string | Array<string>) => void;
    removePipelineItem: (id: string) => void;
}) => React.JSX.Element;
export default PipelineItem;
