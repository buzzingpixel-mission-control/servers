import React from 'react';
import { PipelineItem as PipeLineItemValues } from './AddEditValues';
import PipelineItemTextInput from './PipelineItemTextInput';
import FormInputCodeEditor from './FormInputCodeEditor';

const PipelineItemSourceOrCode = (
    {
        item,
        setPipelineItemInnerItem,
    }: {
        item: PipeLineItemValues;
        setPipelineItemInnerItem: (
            id: string,
            key: 'description' | 'script',
            value: string | Array<string>,
        ) => void;
    },
) => {
    if (item.type === 'source') {
        return (
            <PipelineItemTextInput
                label="Yaml Source File"
                name={`pipeline_item_${item.id}_script`}
                value={item.script}
                setValue={(value) => {
                    setPipelineItemInnerItem(
                        item.id,
                        'script',
                        value.toString(),
                    );
                }}
            />
        );
    }

    return (
        <FormInputCodeEditor
            name="run_before_every_item"
            value={item.script}
            setValue={(val: string) => {
                setPipelineItemInnerItem(
                    item.id,
                    'script',
                    val,
                );
            }}
        />
    );
};

export default PipelineItemSourceOrCode;
