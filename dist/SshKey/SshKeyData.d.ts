import { SshKeysWithViewOptions } from './SshKeys';
import SshKeyFormValues from './SshKeyFormValues';
export declare const useSshKeyData: (archive?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data: SshKeysWithViewOptions;
};
export declare const useAddSshKeyMutation: () => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchiveSelectedSshKeysMutation: (sshKeys: {
    id?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    public?: string;
    private?: string;
}[], isArchive: boolean) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchiveSshKeyMutation: (sshKeyId: string, isArchive: boolean) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useEditSshKeyMutation: (slug: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, SshKeyFormValues>;
