import { PipelineWithViewOptions } from '../Pipelines';
export declare const usePipelineDetailsData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data?: PipelineWithViewOptions;
};
