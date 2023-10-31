"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditPipelineMutation = exports.useAddPipelineMutation = exports.useArchiveServerMutation = exports.useArchiveSelectedPipelinesMutation = exports.usePipelineData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var Pipelines_1 = require("./Pipelines");
var usePipelineData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive ? '/pipelines/archived' : '/pipelines';
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: Pipelines_1.PipelinesSchema,
        staleTime: Infinity,
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    if (response.status === 'loading'
        || projects.status === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }
    if (response.status === 'error'
        || projects.status === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }
    return {
        status: 'success',
        data: (0, Pipelines_1.transformPipelines)(response.data, projects.data),
    };
};
exports.usePipelineData = usePipelineData;
var useArchiveSelectedPipelinesMutation = function (pipelines, isArchive) {
    var pipelineIds = pipelines.map(function (pipeline) { return pipeline.id; });
    var invalidateQueryKeysOnSuccess = [
        '/pipelines',
        '/pipelines/archived',
    ];
    pipelines.forEach(function (pipeline) {
        invalidateQueryKeysOnSuccess.push("/pipelines/".concat(pipeline.slug));
    });
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/pipelines/".concat(isArchive ? 'un-archive' : 'archive'),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
            payload: { pipelineIds: pipelineIds },
        }); },
    });
};
exports.useArchiveSelectedPipelinesMutation = useArchiveSelectedPipelinesMutation;
var useArchiveServerMutation = function (pipelineId, isArchive, projectId) {
    var invalidateQueryKeysOnSuccess = [
        '/pipelines',
        '/pipelines/archived',
    ];
    if (projectId) {
        invalidateQueryKeysOnSuccess.push("/pipelines/project/".concat(projectId));
    }
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/pipelines/".concat(isArchive ? 'un-archive' : 'archive', "/").concat(pipelineId),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
    });
};
exports.useArchiveServerMutation = useArchiveServerMutation;
var useAddPipelineMutation = function () { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        '/pipelines',
        '/pipelines/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: '/pipelines',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.POST,
    }); },
}); };
exports.useAddPipelineMutation = useAddPipelineMutation;
var useEditPipelineMutation = function (slug) { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        "/pipelines/".concat(slug),
        '/pipelines',
        '/pipelines/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: "/pipelines/".concat(slug),
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
    }); },
}); };
exports.useEditPipelineMutation = useEditPipelineMutation;
