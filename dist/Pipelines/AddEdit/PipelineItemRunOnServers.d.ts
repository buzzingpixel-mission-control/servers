import React from 'react';
import { PipelineItem as PipeLineItemValues } from './AddEditValues';
declare const PipelineItemRunOnServers: ({ item, setPipelineItemInnerItem, }: {
    item: PipeLineItemValues;
    setPipelineItemInnerItem: (id: string, key: 'description' | 'script', value: string) => void;
}) => React.JSX.Element;
export default PipelineItemRunOnServers;
