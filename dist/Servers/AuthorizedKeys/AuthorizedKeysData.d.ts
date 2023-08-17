import { AuthorizedKeysWithServer } from './AuthorizedKeys';
export declare const useAuthorizedKeysData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data: AuthorizedKeysWithServer;
};
export declare const useAddAuthorizedKeyMutation: (slug: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
