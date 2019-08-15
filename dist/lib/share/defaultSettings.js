"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClient = typeof window !== 'undefined';
exports.isServer = !exports.isClient;
var defaultAppSettings = {
    container: '#container',
    basename: '',
    context: {
        isServer: exports.isServer,
        isClient: exports.isClient
    },
    type: 'createHashHistory',
    loader: function (value) { return value; }
};
exports.default = defaultAppSettings;
//# sourceMappingURL=defaultSettings.js.map