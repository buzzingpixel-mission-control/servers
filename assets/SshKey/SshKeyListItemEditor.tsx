import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellForm,
    EditorShellInline,
    FormInput,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import { SshKey } from './SshKeys';
import SshKeyFormValues from './SshKeyFormValues';
import { useEditSshKeyMutation } from './SshKeyData';

const SshKeyListItemEditor = (
    {
        item,
        setEditorIsOpen,
    }: {
        item: SshKey;
        setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const {
        getValues,
        register,
        setValue,
    } = useForm<SshKeyFormValues>({
        defaultValues: {
            title: item.title,
        },
    });

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const inputs = [
        {
            title: 'Title',
            name: 'title',
            placeholder: 'Example SSH Key',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
    ] as Array<FormInput>;

    const [errorMessage, setErrorMessage] = useState<string>('');

    const mutation = useEditSshKeyMutation(item.slug);

    const saveHandler: SubmitHandler<SshKeyFormValues> = (
        data,
    ) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setEditorIsOpen(false),
            onError: (error) => {
                setErrorMessage(
                    error.message || 'Unable to edit SSH key',
                );

                setIsSaving(false);
            },
        });
    };

    return (
        <div style={{ paddingBottom: '1.5rem' }}>
            <div
                className="border border-gray-300 rounded-md shadow-md mx-auto p-4"
                style={{ maxWidth: '600px' }}
            >
                <EditorShellInline
                    isSaving={isSaving}
                    setEditorIsOpen={setEditorIsOpen}
                    errorMessage={errorMessage}
                    saveHandler={() => {
                        saveHandler(getValues());
                    }}
                >
                    <EditorShellForm
                        inputs={inputs}
                        register={register}
                        onSubmit={() => {
                            saveHandler(getValues());
                        }}
                    />
                </EditorShellInline>
            </div>
        </div>
    );
};

export default SshKeyListItemEditor;
