import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellFloating,
    EditorShellForm,
    FormInput, FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import { Server } from '../Servers';
import ServerFormValues from '../ServerFormValues';
import FormInputSshKeys from '../../SshKey/FormInputSshKeys';
import { useEditServerMutation } from '../ServerData';

const EditOverlay = (
    {
        item,
        setIsOpen,
    }: {
        item: Server;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);

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

    const saveHandler: SubmitHandler<ServerFormValues> = (data) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setIsOpen(false),
            onError: (error) => {
                setErrorMessage(error.message || 'Unable to add Server');

                setIsSaving(false);
            },
        });
    };

    return (
        <EditorShellFloating
            title="Edit Server"
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
