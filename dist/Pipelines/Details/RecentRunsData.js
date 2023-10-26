"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecentRunsData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var RecentRuns_1 = require("./RecentRuns");
// eslint-disable-next-line import/prefer-default-export
var useRecentRunsData = function (pipelineId, activeRefetch) {
    var uri = "/pipelines/".concat(pipelineId, "/recent-runs");
    var options = {
        zodValidator: RecentRuns_1.RecentRunsSchema,
        staleTime: 30000,
        refetchInterval: 30000,
    };
    if (activeRefetch) {
        options.staleTime = 3000;
        options.refetchInterval = 3000;
    }
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, options);
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
