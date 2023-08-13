import {
    RequestMethod,
    useApiMutation,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    SshKeys,
    SshKeysSchema,
    SshKeysWithViewOptions,
    transformSshKeys,
} from './SshKeys';
import SshKeyFormValues from './SshKeyFormValues';

export const useSshKeyData = (archive = false): {
    status: 'loading' | 'error' | 'success';
    data: SshKeysWithViewOptions;
} => {
    const uri = archive ? '/ssh-keys/list/archived' : '/ssh-keys/list';

    const response = useApiQueryWithSignInRedirect<SshKeys>(
        [uri],
        { uri },
        {
            zodValidator: SshKeysSchema,
            staleTime: Infinity,
        },
    );

    return {
        status: response.status,
        data: transformSshKeys(response.data || []),
    };
};

export const useAddSshKeyMutation = () => useApiMutation({
    invalidateQueryKeysOnSuccess: [
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ],
    prepareApiParams: (data) => ({
        uri: '/ssh-keys/add',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: RequestMethod.POST,
    }),
});

export const useArchiveSelectedSshKeysMutation = (
    sshKeys: SshKeys,
    isArchive: boolean,
) => {
    const sshKeyIds = sshKeys.map((sshKey) => sshKey.id);

    const invalidateQueryKeysOnSuccess = [
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ];

    sshKeys.forEach((sshKey) => {
        invalidateQueryKeysOnSuccess.push(`/ssh-keys/${sshKey.slug}`);
    });

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/ssh-keys/${isArchive ? 'un-archive' : 'archive'}`,
            method: RequestMethod.PATCH,
            payload: { sshKeyIds },
        }),
    });
};

export const useArchiveSshKeyMutation = (
    sshKeyId: string,
    isArchive: boolean,
) => {
    const invalidateQueryKeysOnSuccess = [
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ];

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/ssh-keys/${isArchive ? 'un-archive' : 'archive'}/${sshKeyId}`,
            method: RequestMethod.PATCH,
        }),
    });
};

export const useEditSshKeyMutation = (
    slug: string,
) => useApiMutation<unknown, SshKeyFormValues>({
    invalidateQueryKeysOnSuccess: [
        `/ssh-keys/${slug}`,
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ],
    prepareApiParams: (data) => ({
        uri: `/ssh-keys/edit/${slug}`,
        payload: data,
        method: RequestMethod.PATCH,
    }),
});
