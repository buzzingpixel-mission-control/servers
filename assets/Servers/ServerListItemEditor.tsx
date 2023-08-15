import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellForm,
    EditorShellInline,
    FormInput, FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import { Server } from './Servers';
import ServerFormValues from './ServerFormValues';
import { useEditServerMutation } from './ServerData';
import FormInputSshKeys from '../SshKey/FormInputSshKeys';

const ServerListItemEditor = (
    {
        item,
        setEditorIsOpen,
    }: {
        item: Server;
        setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const {
        getValues,
        register,
        setValue,
    } = useForm<ServerFormValues>({
        defaultValues: {
            title: item.title,
            ssh_user_name: item.sshUserName,
            address: item.address,
            ssh_port: item.sshPort,
            ssh_key_id: item.sshKeyId,
            project_id: item.projectId,
        },
    });

    const [isSaving, setIsSaving] = useState<boolean>(false);

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
            initialValue: item.sshKeyId,
            setValue,
        },
        {
            title: 'Project',
            name: 'project_id',
            renderInput: FormInputProjects,
            initialValue: item.projectId,
            setValue,
        },
    ] as Array<FormInput>;

    const [errorMessage, setErrorMessage] = useState<string>('');

    const mutation = useEditServerMutation(item.slug);

    const saveHandler: SubmitHandler<ServerFormValues> = (
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
                    error.message || 'Unable to edit server',
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

export default ServerListItemEditor;
