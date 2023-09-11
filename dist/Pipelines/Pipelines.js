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
exports.transformPipelines = exports.transformPipeline = exports.PipelinesSchema = exports.PipelineSchema = void 0;
var zod_1 = require("zod");
var PipelineItems_1 = require("./PipelineItems");
exports.PipelineSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    projectId: zod_1.z.string().nullable(),
    secretId: zod_1.z.string().min(1),
    isActive: zod_1.z.boolean(),
    enableWebhook: zod_1.z.boolean(),
    webhookCheckForBranch: zod_1.z.string(),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    runBeforeEveryItem: zod_1.z.string(),
    pipelineItems: PipelineItems_1.PipelineItemsSchema,
    webhookTrigger: zod_1.z.string(),
});
exports.PipelinesSchema = zod_1.z.array(exports.PipelineSchema);
var transformPipeline = function (pipeline, projects) {
    projects = projects || [];
    var project;
    if (projects) {
        var filteredProjects = projects.filter(function (p) { return p.id === pipeline.projectId; });
        if (filteredProjects[0]) {
            // eslint-disable-next-line prefer-destructuring
            project = filteredProjects[0];
        }
    }
    return (__assign(__assign({}, pipeline), { href: "/pipelines/".concat(pipeline.slug), activeOrArchivedText: pipeline.isActive ? 'Active' : 'Archive', project: project }));
};
exports.transformPipeline = transformPipeline;
var transformPipelines = function (pipelines, projects) { return pipelines.map(function (pipeline) { return (0, exports.transformPipeline)(pipeline, projects); }); };
exports.transformPipelines = transformPipelines;
