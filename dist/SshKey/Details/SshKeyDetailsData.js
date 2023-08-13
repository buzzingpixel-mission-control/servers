"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSshKeyDetailsData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var SshKeys_1 = require("../SshKeys");
// eslint-disable-next-line import/prefer-default-export
var useSshKeyDetailsData = function (slug) {
    var uri = "/ssh-keys/".concat(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: SshKeys_1.SshKeySchema,
        staleTime: Infinity,
    });
    return {
        status: response.status,
        data: (0, SshKeys_1.transformSshKey)(response.data || {}),
    };
};
exports.useSshKeyDetailsData = useSshKeyDetailsData;
