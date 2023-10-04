import React from 'react';
import { Pipeline } from './Pipelines';
export declare const useRunPipelineMutation: (pipeline: Pipeline) => {
    runPipelineMutation: import("@tanstack/react-query/src/types").UseMutationResult<{
        success: boolean;
        message: 'alreadyRunning' | '';
    }, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
    RunPipelineOverlay: React.ReactPortal;
};
