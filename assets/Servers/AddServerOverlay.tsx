import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    EditorShellFloating,
    EditorShellForm,
    FormInput, FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import ServerFormValues from './ServerFormValues';
import { useAddServerMutation } from './ServerData';
import FormInputSshKeys from '../SshKey/FormInputSshKeys';

const AddServerOverlay = (
    {
        setIsOpen,
    }: {
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { getValues, register, setValue } = useForm<ServerFormValues>();

    const inputs = [
        {
            title: 'Title',
            name: 'title',
            placeholder: 'e.g. Example Server',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'SSH Username',
            name: 'ssh_user_name',
            placeholder: 'e.g. root',
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'Address',
            name: 'address',
            placeholder: 'e.g. 127.0.0.1',
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'SSH Port',
            name: 'ssh_port',
            type: 'number',
            placeholder: 'e.g. 22',
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'SSH Key',
            name: 'ssh_key_id',
            renderInput: FormInputSshKeys,
            setValue,
        },
        {
            title: 'Project',
            name: 'project_id',
            renderInput: FormInputProjects,
            setValue,
        },
    ] as Array<FormInput>;

    const [errorMessage, setErrorMessage] = useState<string>('');

    const mutation = useAddServerMutation();

    const saveHandler: SubmitHandler<ServerFormValues> = (
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

export default AddServerOverlay;
