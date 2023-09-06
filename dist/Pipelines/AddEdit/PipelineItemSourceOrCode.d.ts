import React from 'react';
import { PipelineItem as PipeLineItemValues } from './AddEditValues';
declare const PipelineItemSourceOrCode: ({ item, setPipelineItemInnerItem, }: {
    item: PipeLineItemValues;
    setPipelineItemInnerItem: (id: string, key: 'description' | 'script', value: string | Array<string>) => void;
}) => React.JSX.Element;
export default PipelineItemSourceOrCode;
