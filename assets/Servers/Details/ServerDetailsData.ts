import {
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    Server, ServerSchema, ServerWithViewOptions, transformServer,
} from '../Servers';
import { useSshKeyData } from '../../SshKey/SshKeyData';

// eslint-disable-next-line import/prefer-default-export
export const useServerDetailsData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data?: ServerWithViewOptions;
} => {
    const uri = `/servers/${slug}`;

    const response = useApiQueryWithSignInRedirect<Server>(
        [uri],
        { uri },
        {
            zodValidator: ServerSchema,
            staleTime: Infinity,
        },
    );

    const projects = useAllProjectsData();

    const sshKeys = useSshKeyData();

    if (
        response.status === 'loading'
        || projects.status === 'loading'
        || sshKeys.status === 'loading'
    ) {
        return {
            status: 'loading',
        };
    }

    if (
        response.status === 'error'
        || projects.status === 'error'
        || sshKeys.status === 'error'
    ) {
        return {
            status: 'error',
        };
    }

    return {
        status: response.status,
        data: transformServer(response.data, projects.data, sshKeys.data),
    };
};
