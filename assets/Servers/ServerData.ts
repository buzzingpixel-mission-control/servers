import {
    RequestMethod,
    useAllProjectsData, useApiMutation,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    Servers,
    ServersSchema,
    ServersWithViewOptions, transformServers,
} from './Servers';
import ServerFormValues from './ServerFormValues';

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

    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }

    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }

    return {
        status: 'success',
        data: transformServers(response.data, projects.data),
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
) => {
    const invalidateQueryKeysOnSuccess = [
        '/servers',
        '/servers/archived',
    ];

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
