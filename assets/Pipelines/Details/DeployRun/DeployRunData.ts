import { useApiQueryWithSignInRedirect } from 'buzzingpixel-mission-control-frontend-core';
import {
    RecentRun, RecentRunSchema, RecentRunStatus, RecentRunWithViewOptions, transformRecentRun,
} from '../RecentRuns';

// eslint-disable-next-line import/prefer-default-export
export const useDeployRunData = (pipelineId: string, jobId: string): {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunWithViewOptions;
} => {
    const uri = `/pipelines/${pipelineId}/run/${jobId}`;

    const response = useApiQueryWithSignInRedirect<RecentRun>(
        [uri],
        { uri },
        {
            zodValidator: RecentRunSchema,
            staleTime: 5000,
        },
    );

    if (response.status === 'loading') {
        return { status: 'loading' };
    }

    if (response.status === 'error') {
        return { status: 'error' };
    }

    return {
        status: 'success',
        data: transformRecentRun(response.data),
    };
};
