import { z } from 'zod';

export enum RecentRunStatus {
    inQueue = 'In Queue',
    running = 'Running',
    finished = 'Finished',
    failed = 'Failed',
}

export const RecentRunItemSchema = z.object({
    id: z.string(),
    pipelineId: z.string(),
    pipelineJobId: z.string(),
    pipelineItemId: z.string(),
    itemOrder: z.number(),
    hasFailed: z.boolean(),
    logContent: z.string(),
    finishedAt: z.string().nullable(),
});

export type RecentRunItem = z.infer<typeof RecentRunItemSchema>;

export const RecentRunItemsSchema = z.array(RecentRunItemSchema);

export type RecentRunItems = z.infer<typeof RecentRunItemsSchema>;

export const RecentRunSchema = z.object({
    id: z.string(),
    pipelineId: z.string(),
    hasStarted: z.boolean(),
    isFinished: z.boolean(),
    hasFailed: z.boolean(),
    percentComplete: z.number(),
    addedAt: z.string(),
    finishedAt: z.string().nullable(),
    items: RecentRunItemsSchema,
});

export type RecentRun = z.infer<typeof RecentRunSchema>;

export const RecentRunsSchema = z.array(RecentRunSchema);

export type RecentRuns = z.infer<typeof RecentRunsSchema>;

export type RecentRunItemWithViewOptions = RecentRunItem & {
    finishedAtDate: Date | null;
    isFinished: boolean;
    status: RecentRunStatus;
};

export type RecentRunItemsWithViewOptions = Array<RecentRunItemWithViewOptions>;

export type RecentRunWithViewOptions = Omit<RecentRun, 'items'> & {
    status: RecentRunStatus;
    addedAtDate: Date;
    finishedAtDate: Date | null;
    items: RecentRunItemsWithViewOptions;
};

export type RecentRunsWithViewOptions = Array<RecentRunWithViewOptions>;

export const transformRecentRun = (
    recentRun: RecentRun,
): RecentRunWithViewOptions => ({
    ...recentRun,
    status: (() => {
        if (recentRun.hasFailed) {
            return RecentRunStatus.failed;
        }

        if (recentRun.isFinished) {
            return RecentRunStatus.finished;
        }

        if (recentRun.hasStarted) {
            return RecentRunStatus.running;
        }

        return RecentRunStatus.inQueue;
    })(),
    addedAtDate: new Date(recentRun.addedAt),
    finishedAtDate: recentRun.finishedAt === null
        ? null
        : new Date(recentRun.finishedAt),
    items: recentRun.items.map((item) => ({
        ...item,
        finishedAtDate: item.finishedAt === null
            ? null
            : new Date(item.finishedAt),
        isFinished: item.finishedAt !== null,
        status: (() => {
            if (item.hasFailed) {
                return RecentRunStatus.failed;
            }

            if (item.finishedAt !== null) {
                return RecentRunStatus.finished;
            }

            return RecentRunStatus.inQueue;
        })(),
    })),
});

export const transformRecentRuns = (
    recentRuns: RecentRuns,
): RecentRunsWithViewOptions => recentRuns.map(
    (recentRun) => transformRecentRun(recentRun),
);
