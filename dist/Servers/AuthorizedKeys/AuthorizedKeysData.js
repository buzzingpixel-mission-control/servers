"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAddAuthorizedKeyMutation = exports.useAuthorizedKeysData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var AuthorizedKeys_1 = require("./AuthorizedKeys");
var ServerDetailsData_1 = require("../Details/ServerDetailsData");
var useAuthorizedKeysData = function (slug) {
    var uri = "/servers/".concat(slug, "/authorized-keys");
    var server = (0, ServerDetailsData_1.useServerDetailsData)(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: AuthorizedKeys_1.AuthorizedKeysSchema,
        staleTime: Infinity,
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
    });
    var status = 'loading';
    if (response.status === 'error'
        || server.status === 'error') {
        status = 'error';
    }
    else if (response.status === 'loading' && server.status === 'loading') {
        status = 'loading';
    }
    else if (server.status !== 'loading') {
        status = 'success';
    }
    return {
        status: status,
        data: {
            keys: response.data,
            server: server.data,
        },
    };
};
exports.useAuthorizedKeysData = useAuthorizedKeysData;
var useAddAuthorizedKeyMutation = function (slug) { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: ["/servers/".concat(slug, "/authorized-keys")],
    prepareApiParams: function (data) { return ({
        uri: "/servers/".concat(slug, "/authorized-keys"),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.POST,
    }); },
}); };
exports.useAddAuthorizedKeyMutation = useAddAuthorizedKeyMutation;
