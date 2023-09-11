"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePipelineDetailsData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var Pipelines_1 = require("../Pipelines");
// eslint-disable-next-line import/prefer-default-export
var usePipelineDetailsData = function (slug) {
    var uri = "/pipelines/".concat(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: Pipelines_1.PipelineSchema,
        staleTime: Infinity,
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    if (response.status === 'loading'
        || projects.status === 'loading') {
        return { status: 'loading' };
    }
    if (response.status === 'error'
        || projects.status === 'error') {
        return { status: 'error' };
    }
    return {
        status: 'success',
        data: (0, Pipelines_1.transformPipeline)(response.data, projects.data),
    };
};
exports.usePipelineDetailsData = usePipelineDetailsData;
