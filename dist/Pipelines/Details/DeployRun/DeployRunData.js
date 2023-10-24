"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeployRunData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var RecentRuns_1 = require("../RecentRuns");
// eslint-disable-next-line import/prefer-default-export
var useDeployRunData = function (pipelineId, jobId) {
    var uri = "/pipelines/".concat(pipelineId, "/run/").concat(jobId);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: RecentRuns_1.RecentRunSchema,
        staleTime: 5000,
    });
    if (response.status === 'loading') {
        return { status: 'loading' };
    }
    if (response.status === 'error') {
        return { status: 'error' };
    }
    return {
        status: 'success',
        data: (0, RecentRuns_1.transformRecentRun)(response.data),
    };
};
exports.useDeployRunData = useDeployRunData;
