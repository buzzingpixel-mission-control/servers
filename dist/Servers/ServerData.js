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
exports.useEditServerMutation = exports.useArchiveServerMutation = exports.useArchiveSelectedServersMutation = exports.useAddServerMutation = exports.useAllServerData = exports.useServerData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var Servers_1 = require("./Servers");
var SshKeyData_1 = require("../SshKey/SshKeyData");
var useServerData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive ? '/servers/archived' : '/servers';
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: Servers_1.ServersSchema,
        staleTime: Infinity,
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    var sshKeys = (0, SshKeyData_1.useSshKeyData)();
    if (response.status === 'loading'
        || projects.status === 'loading'
        || sshKeys.status === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }
    if (response.status === 'error'
        || projects.status === 'error'
        || sshKeys.status === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }
    return {
        status: 'success',
        data: (0, Servers_1.transformServers)(response.data, projects.data, sshKeys.data),
    };
};
exports.useServerData = useServerData;
var useAllServerData = function () {
    var _a = (0, exports.useServerData)(), unarchivedStatus = _a.status, unarchivedData = _a.data;
    var _b = (0, exports.useServerData)(true), archivedStatus = _b.status, archivedData = _b.data;
    if (unarchivedStatus === 'error' || archivedStatus === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }
    if (unarchivedStatus === 'loading' || archivedStatus === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }
    var archivedDataUpdated = archivedData.map(function (item) {
        var newItem = item;
        newItem.title += ' (archived)';
        return __assign({}, newItem);
    });
    return {
        status: 'success',
        data: unarchivedData.concat(archivedDataUpdated),
    };
};
exports.useAllServerData = useAllServerData;
var useAddServerMutation = function () { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        '/servers',
        '/servers/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: '/servers/add',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.POST,
    }); },
}); };
exports.useAddServerMutation = useAddServerMutation;
var useArchiveSelectedServersMutation = function (servers, isArchive) {
    var serverIds = servers.map(function (server) { return server.id; });
    var invalidateQueryKeysOnSuccess = [
        '/servers',
        '/servers/archived',
    ];
    servers.forEach(function (server) {
        invalidateQueryKeysOnSuccess.push("/servers/".concat(server.slug));
    });
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/servers/".concat(isArchive ? 'un-archive' : 'archive'),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
            payload: { serverIds: serverIds },
        }); },
    });
};
exports.useArchiveSelectedServersMutation = useArchiveSelectedServersMutation;
var useArchiveServerMutation = function (serverId, isArchive, projectId) {
    var invalidateQueryKeysOnSuccess = [
        '/servers',
        '/servers/archived',
    ];
    if (projectId) {
        invalidateQueryKeysOnSuccess.push("/servers/project/".concat(projectId));
    }
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/servers/".concat(isArchive ? 'un-archive' : 'archive', "/").concat(serverId),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
    });
};
exports.useArchiveServerMutation = useArchiveServerMutation;
var useEditServerMutation = function (slug) { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        "/servers/".concat(slug),
        '/servers',
        '/servers/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: "/servers/".concat(slug),
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
    }); },
}); };
exports.useEditServerMutation = useEditServerMutation;
