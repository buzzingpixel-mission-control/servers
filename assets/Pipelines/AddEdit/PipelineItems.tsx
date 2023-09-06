import React from 'react';
import { CodeBracketIcon, DocumentIcon } from '@heroicons/react/20/solid';
import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
    restrictToParentElement,
} from '@dnd-kit/modifiers';
import { PipelineItem as PipelineItemValues } from './AddEditValues';
import PipelineItem from './PipelineItem';

const PipelineItems = (
    {
        pipelineItems,
        addPipelineItem,
        setPipelineItems,
        setPipelineItemInnerItem,
        removePipelineItem,
    }: {
        pipelineItems: Array<PipelineItemValues>;
        addPipelineItem: (type: 'source' | 'code') => void;
        setPipelineItems: (pipelineItems: Array<PipelineItemValues>) => void;
        setPipelineItemInnerItem: (
            id: string,
            key: 'description' | 'script' | 'run_on_servers',
            value: string | Array<string>,
        ) => void;
        removePipelineItem: (id: string) => void;
    },
) => (
    <>
        <div>
            <DndContext
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                    const { active, over } = event;

                    if (active.id !== over.id) {
                        const activeIndex = pipelineItems.findIndex(
                            (item) => item.id === active.id,
                        );

                        const overIndex = pipelineItems.findIndex(
                            (item) => item.id === over.id,
                        );

                        setPipelineItems(arrayMove(
                            pipelineItems,
                            activeIndex,
                            overIndex,
                        ));
                    }
                }}
            >
                <SortableContext
                    items={pipelineItems.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {pipelineItems.map((item) => (
                        <PipelineItem
                            key={item.id}
                            item={item}
                            setPipelineItemInnerItem={setPipelineItemInnerItem}
                            removePipelineItem={removePipelineItem}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
        <div className="text-gray-500">
            <a
                title="Add Code Item"
                href="#"
                className="w-8 h-8 inline-block bg-white border border-gray-500 rounded shadow p-0.5 hover:bg-cyan-50 mr-1"
                onClick={(e) => {
                    e.preventDefault();
                    addPipelineItem('code');
                }}
            >
                <CodeBracketIcon />
            </a>
            <a
                title="Add Source Yaml File"
                href="#"
                className="w-8 h-8 inline-block bg-white border border-gray-500 rounded shadow p-0.5 hover:bg-cyan-50 mr-1"
                onClick={(e) => {
                    e.preventDefault();
                    addPipelineItem('source');
                }}
            >
                <DocumentIcon />
            </a>
        </div>
    </>
);

export default PipelineItems;
