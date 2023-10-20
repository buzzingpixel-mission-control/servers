import { RecentRunsWithViewOptions } from './RecentRuns';
export declare const useRecentRunsData: (pipelineId: string) => {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunsWithViewOptions;
};
