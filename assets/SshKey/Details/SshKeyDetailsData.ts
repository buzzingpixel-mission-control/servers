import { useApiQueryWithSignInRedirect } from 'buzzingpixel-mission-control-frontend-core';
import {
    SshKey, SshKeySchema, SshKeyWithViewOptions, transformSshKey,
} from '../SshKeys';

// eslint-disable-next-line import/prefer-default-export
export const useSshKeyDetailsData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data?: SshKeyWithViewOptions;
} => {
    const uri = `/ssh-keys/${slug}`;

    const response = useApiQueryWithSignInRedirect<SshKey>(
        [uri],
        { uri },
        {
            zodValidator: SshKeySchema,
            staleTime: Infinity,
        },
    );

    return {
        status: response.status,
        data: transformSshKey(response.data || {}),
    };
};
