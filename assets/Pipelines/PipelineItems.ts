import { z } from 'zod';

export const PipelineItemSchema = z.object({
    id: z.string().min(1),
    pipelineId: z.string().min(1),
    type: z.enum(['source', 'code']),
    description: z.string(),
    script: z.string(),
    runOnServers: z.array(z.string()),
    runAfterFail: z.boolean(),
});

export type PipelineItem = z.infer<typeof PipelineItemSchema>;

export const PipelineItemsSchema = z.array(PipelineItemSchema);

export type PipelineItems = z.infer<typeof PipelineItemsSchema>;
