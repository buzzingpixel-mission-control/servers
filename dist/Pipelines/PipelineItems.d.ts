import { z } from 'zod';
export declare const PipelineItemSchema: z.ZodObject<{
    id: z.ZodString;
    pipelineId: z.ZodString;
    type: z.ZodEnum<["source", "code"]>;
    description: z.ZodString;
    script: z.ZodString;
    runOnServers: z.ZodArray<z.ZodString, "many">;
    runAfterFail: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id?: string;
    pipelineId?: string;
    type?: "code" | "source";
    description?: string;
    script?: string;
    runOnServers?: string[];
    runAfterFail?: boolean;
}, {
    id?: string;
    pipelineId?: string;
    type?: "code" | "source";
    description?: string;
    script?: string;
    runOnServers?: string[];
    runAfterFail?: boolean;
}>;
export type PipelineItem = z.infer<typeof PipelineItemSchema>;
export declare const PipelineItemsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    pipelineId: z.ZodString;
    type: z.ZodEnum<["source", "code"]>;
    description: z.ZodString;
    script: z.ZodString;
    runOnServers: z.ZodArray<z.ZodString, "many">;
    runAfterFail: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id?: string;
    pipelineId?: string;
    type?: "code" | "source";
    description?: string;
    script?: string;
    runOnServers?: string[];
    runAfterFail?: boolean;
}, {
    id?: string;
    pipelineId?: string;
    type?: "code" | "source";
    description?: string;
    script?: string;
    runOnServers?: string[];
    runAfterFail?: boolean;
}>, "many">;
export type PipelineItems = z.infer<typeof PipelineItemsSchema>;
