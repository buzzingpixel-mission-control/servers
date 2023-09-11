import { useAllProjectsData, useApiQueryWithSignInRedirect } from 'buzzingpixel-mission-control-frontend-core';
import {
    Pipeline,
    PipelineSchema,
    PipelineWithViewOptions, transformPipeline,
} from '../Pipelines';

// eslint-disable-next-line import/prefer-default-export
export const usePipelineDetailsData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data?: PipelineWithViewOptions;
} => {
    const uri = `/pipelines/${slug}`;

    const response = useApiQueryWithSignInRedirect<Pipeline>(
        [uri],
        { uri },
        {
            zodValidator: PipelineSchema,
            staleTime: Infinity,
        },
    );

    const projects = useAllProjectsData();

    if (
        response.status === 'loading'
        || projects.status === 'loading'
    ) {
        return { status: 'loading' };
    }

    if (
        response.status === 'error'
        || projects.status === 'error'
    ) {
        return { status: 'error' };
    }

    return {
        status: 'success',
        data: transformPipeline(response.data, projects.data),
    };
};
