"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecentRunsData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var RecentRuns_1 = require("./RecentRuns");
// eslint-disable-next-line import/prefer-default-export
var useRecentRunsData = function (pipelineId) {
    var uri = "/pipelines/".concat(pipelineId, "/recent-runs");
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: RecentRuns_1.RecentRunsSchema,
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
        data: (0, RecentRuns_1.transformRecentRuns)(response.data),
    };
};
exports.useRecentRunsData = useRecentRunsData;
