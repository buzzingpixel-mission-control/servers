"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedKeysSchema = exports.AuthorizedKeySchema = void 0;
var zod_1 = require("zod");
exports.AuthorizedKeySchema = zod_1.z.object({
    key: zod_1.z.string().min(1),
});
exports.AuthorizedKeysSchema = zod_1.z.array(exports.AuthorizedKeySchema);
