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
exports.transformServers = exports.transformServer = exports.ServersSchema = exports.ServerSchema = void 0;
var zod_1 = require("zod");
exports.ServerSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    isActive: zod_1.z.boolean(),
    projectId: zod_1.z.string().nullable(),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    sshUserName: zod_1.z.string().nullable(),
    address: zod_1.z.string().nullable(),
    sshPort: zod_1.z.number().nullable(),
    sshKeyId: zod_1.z.string().nullable(),
});
exports.ServersSchema = zod_1.z.array(exports.ServerSchema);
var transformServer = function (server, projects, sshKeys) {
    projects = projects || [];
    var project;
    if (projects) {
        var filteredProjects = projects.filter(function (p) { return p.id === server.projectId; });
        if (filteredProjects[0]) {
            // eslint-disable-next-line prefer-destructuring
            project = filteredProjects[0];
        }
    }
    var sshKey;
    if (sshKeys) {
        var filteredSshKeys = sshKeys.filter(function (k) { return k.id === server.sshKeyId; });
        if (filteredSshKeys[0]) {
            // eslint-disable-next-line prefer-destructuring
            sshKey = filteredSshKeys[0];
        }
    }
    return (__assign(__assign({}, server), { href: "/servers/".concat(server.slug), manageAuthorizedKeysHref: "/servers/".concat(server.slug, "/authorized-keys"), activeOrArchivedText: server.isActive ? 'Active' : 'Archive', project: project, sshKey: sshKey }));
};
exports.transformServer = transformServer;
var transformServers = function (servers, projects, sshKeys) { return servers.map(function (server) { return (0, exports.transformServer)(server, projects, sshKeys); }); };
exports.transformServers = transformServers;
