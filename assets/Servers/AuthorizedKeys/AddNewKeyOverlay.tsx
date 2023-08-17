import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    EditorShellFloating,
    EditorShellForm,
    FormInput,
    FormInputTextarea,
} from 'buzzingpixel-mission-control-frontend-core';
import AddKeyFormValues from './AddKeyFormValues';
import { useAddAuthorizedKeyMutation } from './AuthorizedKeysData';

const AddNewKeyOverlay = (
    {
        slug,
        setIsOpen,
    }: {
        slug: string;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { getValues, register, setValue } = useForm<AddKeyFormValues>();

    const inputs = [
        {
            title: 'Key',
            name: 'key',
            required: true,
            renderInput: FormInputTextarea,
            setValue,
        },
    ] as Array<FormInput>;

    const [errorMessage, setErrorMessage] = useState<string>('');

    const mutation = useAddAuthorizedKeyMutation(slug);

    const saveHandler: SubmitHandler<AddKeyFormValues> = (
        data,
    ) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setIsOpen(false),
            onError: (error) => {
                setErrorMessage(
                    error.message || 'Unable to add Server',
                );

                setIsSaving(false);
            },
        });
    };

    return (
        <EditorShellFloating
            title="Add New Server"
            isSaving={isSaving}
            submitButtonText="Add"
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

export default AddNewKeyOverlay;
