import { RequestMethod, useApiMutation, useApiQueryWithSignInRedirect } from 'buzzingpixel-mission-control-frontend-core';
import { AuthorizedKeys, AuthorizedKeysSchema, AuthorizedKeysWithServer } from './AuthorizedKeys';
import { useServerDetailsData } from '../Details/ServerDetailsData';

export const useAuthorizedKeysData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data: AuthorizedKeysWithServer;
} => {
    const uri = `/servers/${slug}/authorized-keys`;

    const server = useServerDetailsData(slug);

    const response = useApiQueryWithSignInRedirect<AuthorizedKeys>(
        [uri],
        { uri },
        {
            zodValidator: AuthorizedKeysSchema,
            staleTime: Infinity,
            useErrorBoundary: false,
            refetchOnWindowFocus: false,
        },
    );

    let status: 'loading' | 'error' | 'success' = 'loading';

    if (
        response.status === 'error'
        || server.status === 'error'
    ) {
        status = 'error';
    } else if (response.status === 'loading' && server.status === 'loading') {
        status = 'loading';
    } else if (server.status !== 'loading') {
        status = 'success';
    }

    return {
        status,
        data: {
            keys: response.data,
            server: server.data,
        },
    };
};

export const useAddAuthorizedKeyMutation = (
    slug: string,
) => useApiMutation({
    invalidateQueryKeysOnSuccess: [`/servers/${slug}/authorized-keys`],
    prepareApiParams: (data) => ({
        uri: `/servers/${slug}/authorized-keys`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: RequestMethod.POST,
    }),
});
