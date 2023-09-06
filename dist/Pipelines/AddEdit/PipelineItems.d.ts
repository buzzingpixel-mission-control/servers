import React from 'react';
import { PipelineItem as PipelineItemValues } from './AddEditValues';
declare const PipelineItems: ({ pipelineItems, addPipelineItem, setPipelineItems, setPipelineItemInnerItem, removePipelineItem, }: {
    pipelineItems: Array<PipelineItemValues>;
    addPipelineItem: (type: 'source' | 'code') => void;
    setPipelineItems: (pipelineItems: Array<PipelineItemValues>) => void;
    setPipelineItemInnerItem: (id: string, key: 'description' | 'script' | 'run_on_servers', value: string | Array<string>) => void;
    removePipelineItem: (id: string) => void;
}) => React.JSX.Element;
export default PipelineItems;
