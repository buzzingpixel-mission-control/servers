import { z } from 'zod';
import {
    ProjectsWithViewOptions,
    ProjectWithViewOptions,
} from 'buzzingpixel-mission-control-frontend-core';
import { PipelineItemsSchema } from './PipelineItems';

export const PipelineSchema = z.object({
    id: z.string().min(1),
    projectId: z.string().nullable(),
    secretId: z.string().min(1),
    isActive: z.boolean(),
    enableWebhook: z.boolean(),
    webhookCheckForBranch: z.string(),
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string(),
    runBeforeEveryItem: z.string(),
    pipelineItems: PipelineItemsSchema,
    webhookTrigger: z.string(),
});

export type Pipeline = z.infer<typeof PipelineSchema>;

export const PipelinesSchema = z.array(PipelineSchema);

export type Pipelines = z.infer<typeof PipelinesSchema>;

export type PipelineWithViewOptions = Pipeline & {
    href: string;
    activeOrArchivedText: string;
    project?: ProjectWithViewOptions;
};

export type PipelinesWithViewOptions = Array<PipelineWithViewOptions>;

export const transformPipeline = (
    pipeline: Pipeline,
    projects?: ProjectsWithViewOptions,
): PipelineWithViewOptions => {
    projects = projects || [];

    let project: ProjectWithViewOptions | null;

    if (projects) {
        const filteredProjects = projects.filter(
            (p) => p.id === pipeline.projectId,
        );

        if (filteredProjects[0]) {
            // eslint-disable-next-line prefer-destructuring
            project = filteredProjects[0];
        }
    }

    return ({
        ...pipeline,
        href: `/pipelines/${pipeline.slug}`,
        activeOrArchivedText: pipeline.isActive ? 'Active' : 'Archive',
        project,
    });
};

export const transformPipelines = (
    pipelines: Pipelines,
    projects?: ProjectsWithViewOptions,
): PipelinesWithViewOptions => pipelines.map((pipeline) => transformPipeline(
    pipeline,
    projects,
));
