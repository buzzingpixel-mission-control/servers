import { ServersWithViewOptions } from './Servers';
import ServerFormValues from './ServerFormValues';
export declare const useServerData: (archive?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data: ServersWithViewOptions;
};
export declare const useAllServerData: () => {
    status: 'loading' | 'error' | 'success';
    data: ServersWithViewOptions;
};
export declare const useAddServerMutation: () => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchiveSelectedServersMutation: (servers: {
    id?: string;
    isActive?: boolean;
    projectId?: string;
    title?: string;
    slug?: string;
    sshUserName?: string;
    address?: string;
    sshPort?: number;
    sshKeyId?: string;
}[], isArchive: boolean) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchiveServerMutation: (serverId: string, isArchive: boolean, projectId?: string | undefined | null) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useEditServerMutation: (slug: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, ServerFormValues>;
