import React, { useState } from 'react';
import { createPortal } from 'buzzingpixel-mission-control-frontend-core';
import { UseMutationResult } from '@tanstack/react-query/src/types';
import { v4 as uuid } from 'uuid';
import LineItem from './LineItem';
import SubmitButton from './SubmitButton';
import FormInputProjects from './FormInputProjects';
import FormInputText from './FormInputText';
import FormInputToggle from './FormInputToggle';
import FormInputCodeEditor from './FormInputCodeEditor';
import { AddEditValues, PipelineItem } from './AddEditValues';
import PipelineItems from './PipelineItems';
import ErrorModal from './ErrorModal';
import ShowLastErrorButton from './ShowLastErrorButton';

const AddEditPipeline = (
    {
        pageName,
        incomingValues,
        mutation,
        onSaveSuccess,
    }: {
        pageName: string;
        incomingValues?: AddEditValues | undefined;
        mutation: UseMutationResult;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSaveSuccess: (jsonResponse: any) => void;
    },
) => {
    incomingValues = incomingValues ?? {
        title: '',
        description: '',
        project_id: '',
        enable_webhook: false,
        webhook_check_for_branch: '',
        run_before_every_item: '',
        pipeline_items: [],
    };

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [values, setValues] = useState<AddEditValues>(incomingValues);

    const setStringValue = (
        key: 'title' |
        'description' |
        'project_id' |
        'webhook_check_for_branch' |
        'run_before_every_item',
        val: string,
    ) => {
        const newValues = values;

        newValues[key] = val;

        setValues(() => ({ ...newValues }));
    };

    const setBooleanValue = (
        key: 'enable_webhook',
        val: boolean,
    ) => {
        const newValues = values;

        newValues[key] = val;

        setValues(() => ({ ...newValues }));
    };

    const addPipelineItem = (type: 'source' | 'code') => {
        const newValues = values;

        newValues.pipeline_items.push({
            id: uuid(),
            type,
            description: '',
            run_on_servers: [],
            run_after_fail: false,
            script: '',
        });

        setValues(() => ({ ...newValues }));
    };

    const setPipelineItems = (pipelineItems: Array<PipelineItem>) => {
        const newValues = values;

        newValues.pipeline_items = pipelineItems;

        setValues(() => ({ ...newValues }));
    };

    const setPipelineItemInnerItem = (
        id: string,
        key: 'description' | 'script' | 'run_on_servers' | 'run_after_fail',
        value: string | boolean | Array<string>,
    ) => {
        const newPipelineItems = values.pipeline_items;

        const index = newPipelineItems.findIndex((i) => i.id === id);

        if (key === 'run_on_servers') {
            if (!Array.isArray(value)) {
                throw new Error('Value must be array');
            }

            newPipelineItems[index][key] = value;
        } else if (key === 'run_after_fail') {
            if (typeof value !== 'boolean') {
                throw new Error('Value must be boolean');
            }

            newPipelineItems[index][key] = value;
        } else {
            if (typeof value !== 'string') {
                throw new Error('Value must be string');
            }

            newPipelineItems[index][key] = value;
        }

        setPipelineItems(newPipelineItems);
    };

    const removePipelineItem = (id: string) => {
        const newPipelineItems = values.pipeline_items;

        const index = newPipelineItems.findIndex((i) => i.id === id);

        newPipelineItems.splice(index, 1);

        setPipelineItems(newPipelineItems);
    };

    const [errorMessage, setErrorMessage] = useState<string>('');

    const [errorMessageIsOpen, setErrorMessageIsOpen] = useState(false);

    const saveHandler = () => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(values, {
            onSuccess: onSaveSuccess,
            onError: (error) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setErrorMessage(error.message || 'Unable to add Pipeline');
                setErrorMessageIsOpen(true);

                setIsSaving(false);
            },
        });
    };

    return (
        <>
            {createPortal(
                <ErrorModal
                    isOpen={errorMessageIsOpen}
                    setIsOpen={setErrorMessageIsOpen}
                    message={errorMessage}
                />,
            )}
            <form onSubmit={(e) => {
                e.preventDefault();

                saveHandler();
            }}
            >
                <div className="overflow-hidden bg-white shadow sm:rounded-lg max-w-6xl">
                    <div className="px-4 py-6 sm:px-6">
                        <div className="sm:grid sm:grid-cols-4 sm:gap-4">
                            <h3 className="text-base font-semibold leading-7 text-gray-900 sm:col-span-2">
                                {pageName}
                            </h3>
                            <div className="text-right align-middle sm:col-span-2">
                                <ShowLastErrorButton
                                    errorMessage={errorMessage}
                                    setErrorMessageIsOpen={setErrorMessageIsOpen}
                                />
                                <SubmitButton
                                    isSaving={isSaving}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <LineItem
                                label="Title"
                                labelFor="title"
                                RenderInput={(
                                    <FormInputText
                                        name="title"
                                        value={values.title}
                                        setValue={(val: string) => {
                                            setStringValue('title', val);
                                        }}
                                    />
                                )}
                            />
                            <LineItem
                                label="Description"
                                labelFor="description"
                                RenderInput={(
                                    <FormInputText
                                        name="description"
                                        value={values.description}
                                        setValue={(val: string) => {
                                            setStringValue('description', val);
                                        }}
                                    />
                                )}
                            />
                            <LineItem
                                label="Project"
                                labelFor="project_id"
                                RenderInput={(
                                    <FormInputProjects
                                        value={values.project_id}
                                        setValue={(val: string) => {
                                            setStringValue('project_id', val);
                                        }}
                                    />
                                )}
                            />
                            <LineItem
                                label="Enable Webhook"
                                labelFor="enable_webhook"
                                RenderInput={(
                                    <FormInputToggle
                                        name="description"
                                        value={values.enable_webhook}
                                        setValue={(val: boolean) => {
                                            setBooleanValue('enable_webhook', val);
                                        }}
                                    />
                                )}
                            />
                            <LineItem
                                label="Check for Branch in Payload (Post Request Only)"
                                labelFor="webhook_check_for_branch"
                                RenderInput={(
                                    <FormInputText
                                        name="webhook_check_for_branch"
                                        value={values.webhook_check_for_branch}
                                        setValue={(val: string) => {
                                            setStringValue('webhook_check_for_branch', val);
                                        }}
                                    />
                                )}
                            />
                            <LineItem
                                label="Run Before Every Item"
                                labelFor="run_before_every_item"
                                RenderInput={(
                                    <FormInputCodeEditor
                                        name="run_before_every_item"
                                        value={values.run_before_every_item}
                                        setValue={(val: string) => {
                                            setStringValue('run_before_every_item', val);
                                        }}
                                    />
                                )}
                            />
                            <LineItem
                                label="Pipeline Items"
                                labelFor="pipeline_items"
                                RenderInput={(
                                    <PipelineItems
                                        pipelineItems={values.pipeline_items}
                                        addPipelineItem={addPipelineItem}
                                        setPipelineItems={setPipelineItems}
                                        setPipelineItemInnerItem={setPipelineItemInnerItem}
                                        removePipelineItem={removePipelineItem}
                                    />
                                )}
                            />
                            <div className="px-4 py-6 sm:px-6">
                                <div className="text-right align-middle">
                                    <ShowLastErrorButton
                                        errorMessage={errorMessage}
                                        setErrorMessageIsOpen={setErrorMessageIsOpen}
                                    />
                                    <SubmitButton
                                        isSaving={isSaving}
                                    />
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </form>
        </>
    );
};

AddEditPipeline.defaultProps = {
    incomingValues: undefined,
};

export default AddEditPipeline;
