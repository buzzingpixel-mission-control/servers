import React, { useState } from 'react';
import {
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import LineItem from './LineItem';
import SubmitButton from './SubmitButton';
import FormInputProjects from './FormInputProjects';
import FormInputText from './FormInputText';
import FormInputToggle from './FormInputToggle';
import FormInputCodeEditor from './FormInputCodeEditor';

const Page = () => {
    const pageName = 'Add Pipeline';

    useHidePageTitle(true);

    usePageTitle(pageName);

    useBreadcrumbs([
        {
            name: 'Pipelines',
            href: '/pipelines',
        },
        {
            name: pageName,
            href: '/pipelines/add',
        },
    ]);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [values, setValues] = useState({
        title: '',
        description: '',
        project_id: '',
        enable_webhook: false,
        webhook_check_for_branch: '',
        run_before_every_item: '',
    });

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

    const [errorMessage, setErrorMessage] = useState<string>('');

    const saveHandler = () => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        console.log(values);
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            saveHandler();
        }}
        >
            <div className="overflow-hidden bg-white shadow sm:rounded-lg max-w-6xl">
                <div className="px-4 py-6 sm:px-6">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 sm:col-span-2">
                            Add Pipeline
                        </h3>
                        <div className="text-right">
                            <SubmitButton isSaving={isSaving} />
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
                                    value={values.description}
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
                        <div className="px-4 py-6 sm:px-6">
                            <div className="text-right">
                                <SubmitButton isSaving={isSaving} />
                            </div>
                        </div>
                    </dl>
                </div>
            </div>
        </form>
    );
};

export default Page;
