import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellFloating,
    EditorShellForm,
    FormInput,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import SshKeyFormValues from '../SshKeyFormValues';
import { useEditSshKeyMutation } from '../SshKeyData';
import { SshKey } from '../SshKeys';

const EditOverlay = (
    {
        item,
        setIsOpen,
    }: {
        item: SshKey;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const {
        getValues,
        register,
        setValue,
    } = useForm<SshKeyFormValues>({
        defaultValues: {
            title: item.title,
        },
    });

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

    const saveHandler: SubmitHandler<SshKeyFormValues> = (data) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setIsOpen(false),
            onError: (error) => {
                setErrorMessage(error.message || 'Unable to add SSH Key');

                setIsSaving(false);
            },
        });
    };

    return (
        <EditorShellFloating
            title="Edit SSH Key"
            isSaving={isSaving}
            submitButtonText="Submit"
            errorMessage={errorMessage}
            saveHandler={() => {
                saveHandler(getValues());
            }}
            setEditorIsOpen={setIsOpen}
        >
            <EditorShellForm
                inputs={inputs}
                register={register}
                onSubmit={() => {
                    saveHandler(getValues());
                }}
            />
        </EditorShellFloating>
    );
};

export default EditOverlay;
