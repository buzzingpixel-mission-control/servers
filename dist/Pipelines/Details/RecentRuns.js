"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRecentRuns = exports.transformRecentRun = exports.RecentRunsSchema = exports.RecentRunSchema = exports.RecentRunItemsSchema = exports.RecentRunItemSchema = exports.RecentRunStatus = void 0;
var zod_1 = require("zod");
var RecentRunStatus;
(function (RecentRunStatus) {
    RecentRunStatus["inQueue"] = "In Queue";
    RecentRunStatus["running"] = "Running";
    RecentRunStatus["finished"] = "Finished";
    RecentRunStatus["failed"] = "Failed";
})(RecentRunStatus || (exports.RecentRunStatus = RecentRunStatus = {}));
exports.RecentRunItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    pipelineId: zod_1.z.string(),
    pipelineJobId: zod_1.z.string(),
    pipelineItemId: zod_1.z.string(),
    itemOrder: zod_1.z.number(),
    hasFailed: zod_1.z.boolean(),
    logContent: zod_1.z.string(),
    finishedAt: zod_1.z.string().nullable(),
});
exports.RecentRunItemsSchema = zod_1.z.array(exports.RecentRunItemSchema);
exports.RecentRunSchema = zod_1.z.object({
    id: zod_1.z.string(),
    pipelineId: zod_1.z.string(),
    hasStarted: zod_1.z.boolean(),
    isFinished: zod_1.z.boolean(),
    hasFailed: zod_1.z.boolean(),
    percentComplete: zod_1.z.number(),
    addedAt: zod_1.z.string(),
    finishedAt: zod_1.z.string().nullable(),
    items: exports.RecentRunItemsSchema,
});
exports.RecentRunsSchema = zod_1.z.array(exports.RecentRunSchema);
var transformRecentRun = function (recentRun) {
    var status = (function () {
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
    })();
    return (__assign(__assign({}, recentRun), { status: status, isRunning: (function () { return status === RecentRunStatus.running
            || status === RecentRunStatus.inQueue; })(), addedAtDate: new Date(recentRun.addedAt), finishedAtDate: recentRun.finishedAt === null
            ? null
            : new Date(recentRun.finishedAt), items: recentRun.items.map(function (item) { return (__assign(__assign({}, item), { finishedAtDate: item.finishedAt === null
                ? null
                : new Date(item.finishedAt), isFinished: item.finishedAt !== null, status: (function () {
                if (item.hasFailed) {
                    return RecentRunStatus.failed;
                }
                if (item.finishedAt !== null) {
                    return RecentRunStatus.finished;
                }
                return RecentRunStatus.inQueue;
            })() })); }) }));
};
exports.transformRecentRun = transformRecentRun;
var transformRecentRuns = function (recentRuns) { return recentRuns.map(function (recentRun) { return (0, exports.transformRecentRun)(recentRun); }); };
exports.transformRecentRuns = transformRecentRuns;
