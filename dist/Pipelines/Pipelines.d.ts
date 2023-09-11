import { z } from 'zod';
import { ProjectsWithViewOptions, ProjectWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';
export declare const PipelineSchema: z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodNullable<z.ZodString>;
    secretId: z.ZodString;
    isActive: z.ZodBoolean;
    enableWebhook: z.ZodBoolean;
    webhookCheckForBranch: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodString;
    runBeforeEveryItem: z.ZodString;
    pipelineItems: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        pipelineId: z.ZodString;
        type: z.ZodString;
        description: z.ZodString;
        script: z.ZodString;
        runOnServers: z.ZodArray<z.ZodString, "many">;
        runAfterFail: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }, {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }>, "many">;
    webhookTrigger: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    projectId?: string;
    secretId?: string;
    isActive?: boolean;
    enableWebhook?: boolean;
    webhookCheckForBranch?: string;
    title?: string;
    slug?: string;
    description?: string;
    runBeforeEveryItem?: string;
    pipelineItems?: {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }[];
    webhookTrigger?: string;
}, {
    id?: string;
    projectId?: string;
    secretId?: string;
    isActive?: boolean;
    enableWebhook?: boolean;
    webhookCheckForBranch?: string;
    title?: string;
    slug?: string;
    description?: string;
    runBeforeEveryItem?: string;
    pipelineItems?: {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }[];
    webhookTrigger?: string;
}>;
export type Pipeline = z.infer<typeof PipelineSchema>;
export declare const PipelinesSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodNullable<z.ZodString>;
    secretId: z.ZodString;
    isActive: z.ZodBoolean;
    enableWebhook: z.ZodBoolean;
    webhookCheckForBranch: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodString;
    runBeforeEveryItem: z.ZodString;
    pipelineItems: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        pipelineId: z.ZodString;
        type: z.ZodString;
        description: z.ZodString;
        script: z.ZodString;
        runOnServers: z.ZodArray<z.ZodString, "many">;
        runAfterFail: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }, {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }>, "many">;
    webhookTrigger: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    projectId?: string;
    secretId?: string;
    isActive?: boolean;
    enableWebhook?: boolean;
    webhookCheckForBranch?: string;
    title?: string;
    slug?: string;
    description?: string;
    runBeforeEveryItem?: string;
    pipelineItems?: {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }[];
    webhookTrigger?: string;
}, {
    id?: string;
    projectId?: string;
    secretId?: string;
    isActive?: boolean;
    enableWebhook?: boolean;
    webhookCheckForBranch?: string;
    title?: string;
    slug?: string;
    description?: string;
    runBeforeEveryItem?: string;
    pipelineItems?: {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }[];
    webhookTrigger?: string;
}>, "many">;
export type Pipelines = z.infer<typeof PipelinesSchema>;
export type PipelineWithViewOptions = Pipeline & {
    href: string;
    activeOrArchivedText: string;
    project?: ProjectWithViewOptions;
};
export type PipelinesWithViewOptions = Array<PipelineWithViewOptions>;
export declare const transformPipeline: (pipeline: Pipeline, projects?: ProjectsWithViewOptions) => PipelineWithViewOptions;
export declare const transformPipelines: (pipelines: {
    id?: string;
    projectId?: string;
    secretId?: string;
    isActive?: boolean;
    enableWebhook?: boolean;
    webhookCheckForBranch?: string;
    title?: string;
    slug?: string;
    description?: string;
    runBeforeEveryItem?: string;
    pipelineItems?: {
        id?: string;
        pipelineId?: string;
        type?: string;
        description?: string;
        script?: string;
        runOnServers?: string[];
        runAfterFail?: boolean;
    }[];
    webhookTrigger?: string;
}[], projects?: ProjectsWithViewOptions) => PipelinesWithViewOptions;
