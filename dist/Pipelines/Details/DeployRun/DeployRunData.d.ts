import { RecentRunWithViewOptions } from '../RecentRuns';
export declare const useDeployRunData: (pipelineId: string, jobId: string) => {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunWithViewOptions;
};
