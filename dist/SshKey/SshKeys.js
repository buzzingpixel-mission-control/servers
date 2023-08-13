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
exports.transformSshKeys = exports.transformSshKey = exports.SshKeysSchema = exports.SshKeySchema = void 0;
var zod_1 = require("zod");
exports.SshKeySchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    isActive: zod_1.z.boolean(),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    public: zod_1.z.string().min(1),
    private: zod_1.z.string().min(1),
});
exports.SshKeysSchema = zod_1.z.array(exports.SshKeySchema);
var transformSshKey = function (sshKey) { return (__assign(__assign({}, sshKey), { href: "/ssh-keys/".concat(sshKey.slug), activeOrArchivedText: sshKey.isActive ? 'Active' : 'Archive' })); };
exports.transformSshKey = transformSshKey;
var transformSshKeys = function (sshKeys) { return sshKeys.map(function (sshKey) { return (0, exports.transformSshKey)(sshKey); }); };
exports.transformSshKeys = transformSshKeys;
