import {
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    RecentRuns, RecentRunsSchema, RecentRunsWithViewOptions, transformRecentRuns,
} from './RecentRuns';

// eslint-disable-next-line import/prefer-default-export
export const useRecentRunsData = (
    pipelineId: string,
    activeRefetch?: boolean,
): {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunsWithViewOptions;
} => {
    const uri = `/pipelines/${pipelineId}/recent-runs`;

    const options = {
        zodValidator: RecentRunsSchema,
        staleTime: 30000,
        refetchInterval: 30000,
    };

    if (activeRefetch) {
        options.staleTime = 3000;
        options.refetchInterval = 3000;
    }

    const response = useApiQueryWithSignInRedirect<RecentRuns>(
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
        data: transformRecentRuns(response.data),
    };
};
