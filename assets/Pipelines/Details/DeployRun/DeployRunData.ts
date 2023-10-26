import { useApiQueryWithSignInRedirect } from 'buzzingpixel-mission-control-frontend-core';
import {
    RecentRun,
    RecentRunSchema,
    RecentRunWithViewOptions,
    transformRecentRun,
} from '../RecentRuns';

// eslint-disable-next-line import/prefer-default-export
export const useDeployRunData = (
    pipelineId: string,
    jobId: string,
    continuousRefetch?: boolean,
): {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunWithViewOptions;
} => {
    const uri = `/pipelines/${pipelineId}/run/${jobId}`;

    const options = {
        zodValidator: RecentRunSchema,
        staleTime: Infinity,
        refetchInterval: Infinity,
    };

    if (continuousRefetch) {
        options.staleTime = 3000;
        options.refetchInterval = 3000;
    }

    const response = useApiQueryWithSignInRedirect<RecentRun>(
        [uri],
        { uri },
        options,
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
