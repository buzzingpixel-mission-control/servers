import {
    RequestMethod,
    useAllProjectsData,
    useApiMutation,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    Servers,
    ServersSchema,
    ServersWithViewOptions, transformServers,
} from './Servers';
import ServerFormValues from './ServerFormValues';
import { useSshKeyData } from '../SshKey/SshKeyData';

export const useServerData = (archive = false): {
    status: 'loading' | 'error' | 'success';
    data: ServersWithViewOptions;
} => {
    const uri = archive ? '/servers/archived' : '/servers';

    const response = useApiQueryWithSignInRedirect<Servers>(
        [uri],
        { uri },
        {
            zodValidator: ServersSchema,
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
            data: [],
        };
    }

    if (
        response.status === 'error'
        || projects.status === 'error'
        || sshKeys.status === 'error'
    ) {
        return {
            status: 'error',
            data: [],
        };
    }

    return {
        status: 'success',
        data: transformServers(response.data, projects.data, sshKeys.data),
    };
};

export const useAllServerData = (): {
    status: 'loading' | 'error' | 'success';
    data: ServersWithViewOptions;
} => {
    const {
        status: unarchivedStatus,
        data: unarchivedData,
    } = useServerData();

    const {
        status: archivedStatus,
        data: archivedData,
    } = useServerData(true);

    if (unarchivedStatus === 'error' || archivedStatus === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }

    if (unarchivedStatus === 'loading' || archivedStatus === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }

    const archivedDataUpdated = archivedData.map((item) => {
        const newItem = item;

        newItem.title += ' (archived)';

        return { ...newItem };
    });

    return {
        status: 'success',
        data: unarchivedData.concat(archivedDataUpdated),
    };
};

export const useAddServerMutation = () => useApiMutation({
    invalidateQueryKeysOnSuccess: [
        '/servers',
        '/servers/archived',
    ],
    prepareApiParams: (data) => ({
        uri: '/servers/add',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: RequestMethod.POST,
    }),
});

export const useArchiveSelectedServersMutation = (
    servers: Servers,
    isArchive: boolean,
) => {
    const serverIds = servers.map((server) => server.id);

    const invalidateQueryKeysOnSuccess = [
        '/servers',
        '/servers/archived',
    ];

    servers.forEach((server) => {
        invalidateQueryKeysOnSuccess.push(`/servers/${server.slug}`);
    });

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/servers/${isArchive ? 'un-archive' : 'archive'}`,
            method: RequestMethod.PATCH,
            payload: { serverIds },
        }),
    });
};

export const useArchiveServerMutation = (
    serverId: string,
    isArchive: boolean,
    projectId?: string | undefined | null,
) => {
    const invalidateQueryKeysOnSuccess = [
        '/servers',
        '/servers/archived',
    ];

    if (projectId) {
        invalidateQueryKeysOnSuccess.push(
            `/servers/project/${projectId}`,
        );
    }

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/servers/${isArchive ? 'un-archive' : 'archive'}/${serverId}`,
            method: RequestMethod.PATCH,
        }),
    });
};

export const useEditServerMutation = (
    slug: string,
) => useApiMutation<unknown, ServerFormValues>({
    invalidateQueryKeysOnSuccess: [
        `/servers/${slug}`,
        '/servers',
        '/servers/archived',
    ],
    prepareApiParams: (data) => ({
        uri: `/servers/${slug}`,
        payload: data,
        method: RequestMethod.PATCH,
    }),
});
