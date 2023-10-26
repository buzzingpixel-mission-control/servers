"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPillStyleClasses = void 0;
var RecentRuns_1 = require("./RecentRuns");
// eslint-disable-next-line import/prefer-default-export
exports.StatusPillStyleClasses = (_a = {},
    _a[RecentRuns_1.RecentRunStatus.inQueue] = 'text-gray-800 bg-gray-50 ring-gray-600/20',
    _a[RecentRuns_1.RecentRunStatus.running] = 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    _a[RecentRuns_1.RecentRunStatus.finished] = 'text-green-800 bg-green-50 ring-green-600/20',
    _a[RecentRuns_1.RecentRunStatus.failed] = 'text-red-800 bg-red-50 ring-red-600/20',
    _a[RecentRuns_1.RecentRunStatus.other] = 'text-gray-800 bg-gray-50 ring-gray-600/20',
    _a);
