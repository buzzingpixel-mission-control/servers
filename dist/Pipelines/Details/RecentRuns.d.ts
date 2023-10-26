import { z } from 'zod';
export declare enum RecentRunStatus {
    inQueue = "In Queue",
    running = "Running",
    finished = "Finished",
    failed = "Failed"
}
export declare const RecentRunItemSchema: z.ZodObject<{
    id: z.ZodString;
    pipelineId: z.ZodString;
    pipelineJobId: z.ZodString;
    pipelineItemId: z.ZodString;
    itemOrder: z.ZodNumber;
    hasFailed: z.ZodBoolean;
    logContent: z.ZodString;
    finishedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    pipelineId?: string;
    pipelineJobId?: string;
    pipelineItemId?: string;
    itemOrder?: number;
    hasFailed?: boolean;
    logContent?: string;
    finishedAt?: string;
}, {
    id?: string;
    pipelineId?: string;
    pipelineJobId?: string;
    pipelineItemId?: string;
    itemOrder?: number;
    hasFailed?: boolean;
    logContent?: string;
    finishedAt?: string;
}>;
export type RecentRunItem = z.infer<typeof RecentRunItemSchema>;
export declare const RecentRunItemsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    pipelineId: z.ZodString;
    pipelineJobId: z.ZodString;
    pipelineItemId: z.ZodString;
    itemOrder: z.ZodNumber;
    hasFailed: z.ZodBoolean;
    logContent: z.ZodString;
    finishedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    pipelineId?: string;
    pipelineJobId?: string;
    pipelineItemId?: string;
    itemOrder?: number;
    hasFailed?: boolean;
    logContent?: string;
    finishedAt?: string;
}, {
    id?: string;
    pipelineId?: string;
    pipelineJobId?: string;
    pipelineItemId?: string;
    itemOrder?: number;
    hasFailed?: boolean;
    logContent?: string;
    finishedAt?: string;
}>, "many">;
export type RecentRunItems = z.infer<typeof RecentRunItemsSchema>;
export declare const RecentRunSchema: z.ZodObject<{
    id: z.ZodString;
    pipelineId: z.ZodString;
    hasStarted: z.ZodBoolean;
    isFinished: z.ZodBoolean;
    hasFailed: z.ZodBoolean;
    percentComplete: z.ZodNumber;
    addedAt: z.ZodString;
    finishedAt: z.ZodNullable<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        pipelineId: z.ZodString;
        pipelineJobId: z.ZodString;
        pipelineItemId: z.ZodString;
        itemOrder: z.ZodNumber;
        hasFailed: z.ZodBoolean;
        logContent: z.ZodString;
        finishedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }, {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id?: string;
    pipelineId?: string;
    hasStarted?: boolean;
    isFinished?: boolean;
    hasFailed?: boolean;
    percentComplete?: number;
    addedAt?: string;
    finishedAt?: string;
    items?: {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }[];
}, {
    id?: string;
    pipelineId?: string;
    hasStarted?: boolean;
    isFinished?: boolean;
    hasFailed?: boolean;
    percentComplete?: number;
    addedAt?: string;
    finishedAt?: string;
    items?: {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }[];
}>;
export type RecentRun = z.infer<typeof RecentRunSchema>;
export declare const RecentRunsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    pipelineId: z.ZodString;
    hasStarted: z.ZodBoolean;
    isFinished: z.ZodBoolean;
    hasFailed: z.ZodBoolean;
    percentComplete: z.ZodNumber;
    addedAt: z.ZodString;
    finishedAt: z.ZodNullable<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        pipelineId: z.ZodString;
        pipelineJobId: z.ZodString;
        pipelineItemId: z.ZodString;
        itemOrder: z.ZodNumber;
        hasFailed: z.ZodBoolean;
        logContent: z.ZodString;
        finishedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }, {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id?: string;
    pipelineId?: string;
    hasStarted?: boolean;
    isFinished?: boolean;
    hasFailed?: boolean;
    percentComplete?: number;
    addedAt?: string;
    finishedAt?: string;
    items?: {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }[];
}, {
    id?: string;
    pipelineId?: string;
    hasStarted?: boolean;
    isFinished?: boolean;
    hasFailed?: boolean;
    percentComplete?: number;
    addedAt?: string;
    finishedAt?: string;
    items?: {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }[];
}>, "many">;
export type RecentRuns = z.infer<typeof RecentRunsSchema>;
export type RecentRunItemWithViewOptions = RecentRunItem & {
    finishedAtDate: Date | null;
    isFinished: boolean;
    status: RecentRunStatus;
};
export type RecentRunItemsWithViewOptions = Array<RecentRunItemWithViewOptions>;
export type RecentRunWithViewOptions = Omit<RecentRun, 'items'> & {
    status: RecentRunStatus;
    isRunning: boolean;
    addedAtDate: Date;
    finishedAtDate: Date | null;
    items: RecentRunItemsWithViewOptions;
};
export type RecentRunsWithViewOptions = Array<RecentRunWithViewOptions>;
export declare const transformRecentRun: (recentRun: RecentRun) => RecentRunWithViewOptions;
export declare const transformRecentRuns: (recentRuns: {
    id?: string;
    pipelineId?: string;
    hasStarted?: boolean;
    isFinished?: boolean;
    hasFailed?: boolean;
    percentComplete?: number;
    addedAt?: string;
    finishedAt?: string;
    items?: {
        id?: string;
        pipelineId?: string;
        pipelineJobId?: string;
        pipelineItemId?: string;
        itemOrder?: number;
        hasFailed?: boolean;
        logContent?: string;
        finishedAt?: string;
    }[];
}[]) => RecentRunsWithViewOptions;
