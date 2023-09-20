import {
    RequestMethod,
    useAllProjectsData,
    useApiMutation,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    Pipelines, PipelinesSchema, PipelinesWithViewOptions, transformPipelines,
} from './Pipelines';
import { AddEditValues } from './AddEdit/AddEditValues';

export const usePipelineData = (archive = false): {
    status: 'loading' | 'error' | 'success';
    data: PipelinesWithViewOptions;
} => {
    const uri = archive ? '/pipelines/archived' : '/pipelines';

    const response = useApiQueryWithSignInRedirect<Pipelines>(
        [uri],
        { uri },
        {
            zodValidator: PipelinesSchema,
            staleTime: Infinity,
        },
    );

    const projects = useAllProjectsData();

    if (
        response.status === 'loading'
        || projects.status === 'loading'
    ) {
        return {
            status: 'loading',
            data: [],
        };
    }

    if (
        response.status === 'error'
        || projects.status === 'error'
    ) {
        return {
            status: 'error',
            data: [],
        };
    }

    return {
        status: 'success',
        data: transformPipelines(response.data, projects.data),
    };
};

export const useArchiveSelectedPipelinesMutation = (
    pipelines: Pipelines,
    isArchive: boolean,
) => {
    const pipelineIds = pipelines.map((pipeline) => pipeline.id);

    const invalidateQueryKeysOnSuccess = [
        '/pipelines',
        '/pipelines/archived',
    ];

    pipelines.forEach((pipeline) => {
        invalidateQueryKeysOnSuccess.push(`/pipelines/${pipeline.slug}`);
    });

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/servers/${isArchive ? 'un-archive' : 'archive'}`,
            method: RequestMethod.PATCH,
            payload: { serverIds: pipelineIds },
        }),
    });
};

export const useArchiveServerMutation = (
    pipelineId: string,
    isArchive: boolean,
    projectId?: string | undefined | null,
) => {
    const invalidateQueryKeysOnSuccess = [
        '/pipelines',
        '/pipelines/archived',
    ];

    if (projectId) {
        invalidateQueryKeysOnSuccess.push(
            `/pipelines/project/${projectId}`,
        );
    }

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/pipelines/${isArchive ? 'un-archive' : 'archive'}/${pipelineId}`,
            method: RequestMethod.PATCH,
        }),
    });
};

export const useAddPipelineMutation = () => useApiMutation({
    invalidateQueryKeysOnSuccess: [
        '/pipelines',
        '/pipelines/archived',
    ],
    prepareApiParams: (data) => ({
        uri: '/pipelines',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: RequestMethod.POST,
    }),
});

export const useEditPipelineMutation = (
    slug: string,
) => useApiMutation<unknown, AddEditValues>({
    invalidateQueryKeysOnSuccess: [
        `/pipelines/${slug}`,
        '/pipelines',
        '/pipelines/archived',
    ],
    prepareApiParams: (data) => ({
        uri: `/pipelines/${slug}`,
        payload: data,
        method: RequestMethod.PATCH,
    }),
});
