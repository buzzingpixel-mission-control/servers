"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useServerDetailsData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var Servers_1 = require("../Servers");
var SshKeyData_1 = require("../../SshKey/SshKeyData");
// eslint-disable-next-line import/prefer-default-export
var useServerDetailsData = function (slug) {
    var uri = "/servers/".concat(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: Servers_1.ServerSchema,
        staleTime: Infinity,
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    var sshKeys = (0, SshKeyData_1.useSshKeyData)();
    if (response.status === 'loading'
        || projects.status === 'loading'
        || sshKeys.status === 'loading') {
        return {
            status: 'loading',
        };
    }
    if (response.status === 'error'
        || projects.status === 'error'
        || sshKeys.status === 'error') {
        return {
            status: 'error',
        };
    }
    return {
        status: response.status,
        data: (0, Servers_1.transformServer)(response.data, projects.data, sshKeys.data),
    };
};
exports.useServerDetailsData = useServerDetailsData;
