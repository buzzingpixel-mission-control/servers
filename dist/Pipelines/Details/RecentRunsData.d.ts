import { RecentRunsWithViewOptions } from './RecentRuns';
export declare const useRecentRunsData: (pipelineId: string, activeRefetch?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunsWithViewOptions;
};
