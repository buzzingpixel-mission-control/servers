import { RecentRunWithViewOptions } from '../RecentRuns';
export declare const useDeployRunData: (pipelineId: string, jobId: string, continuousRefetch?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunWithViewOptions;
};
