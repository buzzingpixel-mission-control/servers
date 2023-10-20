import {
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    RecentRuns, RecentRunsSchema, RecentRunsWithViewOptions, transformRecentRuns,
} from './RecentRuns';

// eslint-disable-next-line import/prefer-default-export
export const useRecentRunsData = (pipelineId: string): {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunsWithViewOptions;
} => {
    const uri = `/pipelines/${pipelineId}/recent-runs`;

    const response = useApiQueryWithSignInRedirect<RecentRuns>(
        [uri],
        { uri },
        {
            zodValidator: RecentRunsSchema,
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
        data: transformRecentRuns(response.data),
    };
};
