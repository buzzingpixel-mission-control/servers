import { PipelinesWithViewOptions } from './Pipelines';
import { AddEditValues } from './AddEdit/AddEditValues';
export declare const usePipelineData: (archive?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data: PipelinesWithViewOptions;
};
export declare const useArchiveSelectedPipelinesMutation: (pipelines: {
    id?: string;
    projectId?: string;
    secretId?: string;
    isActive?: boolean;
    enableWebhook?: boolean;
    webhookCheckForBranch?: string;
    title?: string;
    slug?: string;
    description?: string;
    runBeforeEveryItem?: string;
    pipelineItems?: {
        id?: string;
        pipelineId?: string;
        type?: "code" | "source";
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }[];
    webhookTrigger?: string;
}[], isArchive: boolean) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchiveServerMutation: (pipelineId: string, isArchive: boolean, projectId?: string | undefined | null) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useAddPipelineMutation: () => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useEditPipelineMutation: (slug: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, AddEditValues>;
