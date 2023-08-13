"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditSshKeyMutation = exports.useArchiveSshKeyMutation = exports.useArchiveSelectedSshKeysMutation = exports.useAddSshKeyMutation = exports.useSshKeyData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var SshKeys_1 = require("./SshKeys");
var useSshKeyData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive ? '/ssh-keys/list/archived' : '/ssh-keys/list';
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: SshKeys_1.SshKeysSchema,
        staleTime: Infinity,
    });
    return {
        status: response.status,
        data: (0, SshKeys_1.transformSshKeys)(response.data || []),
    };
};
exports.useSshKeyData = useSshKeyData;
var useAddSshKeyMutation = function () { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: '/ssh-keys/add',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.POST,
    }); },
}); };
exports.useAddSshKeyMutation = useAddSshKeyMutation;
var useArchiveSelectedSshKeysMutation = function (sshKeys, isArchive) {
    var sshKeyIds = sshKeys.map(function (sshKey) { return sshKey.id; });
    var invalidateQueryKeysOnSuccess = [
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ];
    sshKeys.forEach(function (sshKey) {
        invalidateQueryKeysOnSuccess.push("/ssh-keys/".concat(sshKey.slug));
    });
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/ssh-keys/".concat(isArchive ? 'un-archive' : 'archive'),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
            payload: { sshKeyIds: sshKeyIds },
        }); },
    });
};
exports.useArchiveSelectedSshKeysMutation = useArchiveSelectedSshKeysMutation;
var useArchiveSshKeyMutation = function (sshKeyId, isArchive) {
    var invalidateQueryKeysOnSuccess = [
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ];
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/ssh-keys/".concat(isArchive ? 'un-archive' : 'archive', "/").concat(sshKeyId),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
    });
};
exports.useArchiveSshKeyMutation = useArchiveSshKeyMutation;
var useEditSshKeyMutation = function (slug) { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        "/ssh-keys/".concat(slug),
        '/ssh-keys/list',
        '/ssh-keys/list/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: "/ssh-keys/edit/".concat(slug),
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
    }); },
}); };
exports.useEditSshKeyMutation = useEditSshKeyMutation;
