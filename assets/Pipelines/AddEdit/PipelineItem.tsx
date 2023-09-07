import React from 'react';
import { Squares2X2Icon, XCircleIcon } from '@heroicons/react/20/solid';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PipelineItem as PipeLineItemValues } from './AddEditValues';
import PipelineItemTextInput from './PipelineItemTextInput';
import PipelineItemSourceOrCode from './PipelineItemSourceOrCode';
import PipelineItemRunOnServers from './PipelineItemRunOnServers';
import FormInputToggle from './FormInputToggle';

const PipelineItem = (
    {
        item,
        setPipelineItemInnerItem,
        removePipelineItem,
    }: {
        item: PipeLineItemValues;
        setPipelineItemInnerItem: (
            id: string,
            key: 'description' | 'script' | 'run_on_servers' | 'run_after_fail',
            value: string | boolean | Array<string>,
        ) => void;
        removePipelineItem: (id: string) => void;
    },
) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style: {
        position: 'relative';
        transform: string;
        transition: string | undefined;
        zIndex?: number;
    } = {
        position: 'relative',
        transform: CSS.Transform.toString(transform),
        transition,
    };

    let classes = 'bg-white ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 mb-2 p-4';

    if (isDragging) {
        style.zIndex = 999;

        classes += ' shadow-lg';
    } else {
        classes += ' shadow-sm';
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
        >
            <div className={classes}>
                <div className="mb-2 text-gray-600">
                    <a
                        href="#"
                        className="w-6 h-6 float-right cursor-pointer hover:text-cyan-500"
                        onClick={(event) => {
                            event.preventDefault();
                            removePipelineItem(item.id);
                        }}
                    >
                        <XCircleIcon />
                    </a>
                    <div
                        {...attributes}
                        {...listeners}
                        className="w-6 h-6 cursor-grab"
                    >
                        <Squares2X2Icon />
                    </div>
                </div>
                <div className="mb-2">
                    <PipelineItemTextInput
                        label="Description (optional)"
                        name={`pipeline_item_${item.id}_description`}
                        value={item.description}
                        setValue={(value) => {
                            setPipelineItemInnerItem(
                                item.id,
                                'description',
                                value.toString(),
                            );
                        }}
                    />
                </div>
                <div className="mb-2">
                    <PipelineItemSourceOrCode
                        item={item}
                        setPipelineItemInnerItem={setPipelineItemInnerItem}
                    />
                </div>
                <div className="mb-2">
                    <PipelineItemRunOnServers
                        item={item}
                        setPipelineItemInnerItem={setPipelineItemInnerItem}
                    />
                </div>
                <div className="mb-2">
                    <FormInputToggle
                        name={`pipeline_item_${item.id}_run_after_fail`}
                        value={item.run_after_fail}
                        setValue={(val: boolean) => {
                            setPipelineItemInnerItem(
                                item.id,
                                'run_after_fail',
                                val,
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PipelineItem;
