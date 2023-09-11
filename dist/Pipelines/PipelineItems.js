"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineItemsSchema = exports.PipelineItemSchema = void 0;
var zod_1 = require("zod");
exports.PipelineItemSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    pipelineId: zod_1.z.string().min(1),
    type: zod_1.z.string(),
    description: zod_1.z.string(),
    script: zod_1.z.string(),
    runOnServers: zod_1.z.array(zod_1.z.string()),
    runAfterFail: zod_1.z.boolean(),
});
exports.PipelineItemsSchema = zod_1.z.array(exports.PipelineItemSchema);
