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
exports.base64toHEX = exports.atob = exports.normalizeHidFeatures = exports.normalizeWebUsbFeatures = void 0;
//
var bootloaderHashToVersion = {
    '6397c446f6b9002a8b150bf4b9b4e0bb66800ed099b881ca49700139b0559f10': 'v1.0.0',
    'f13ce228c0bb2bdbc56bdcb5f4569367f8e3011074ccc63331348deb498f2d8f': 'v1.0.0',
    'd544b5e06b0c355d68b868ac7580e9bab2d224a1e2440881cc1bca2b816752d5': 'v1.0.1',
    'ec618836f86423dbd3114c37d6e3e4ffdfb87d9e4c6199cf3e163a67b27498a2': 'v1.0.1',
    'cd702b91028a2cfa55af43d3407ba0f6f752a4a2be0583a172983b303ab1032e': 'v1.0.2',
    'bcafb38cd0fbd6e2bdbea89fb90235559fdda360765b74e4a8758b4eff2d4921': 'v1.0.2',
    'cb222548a39ff6cbe2ae2f02c8d431c9ae0df850f814444911f521b95ab02f4c': 'v1.0.3',
    '917d1952260c9b89f3a96bea07eea4074afdcc0e8cdd5d064e36868bdd68ba7d': 'v1.0.3',
    '6465bc505586700a8111c4bf7db6f40af73e720f9e488d20db56135e5a690c4f': 'v1.0.3',
    'db4bc389335e876e942ae3b12558cecd202b745903e79b34dd2c32532708860e': 'v1.0.3',
    '2e38950143cf350345a6ddada4c0c4f21eb2ed337309f39c5dbc70b6c091ae00': 'v1.0.3',
    '83d14cb6c7c48af2a83bc326353ee6b9abdd74cfe47ba567de1cb564da65e8e9': 'v1.0.3',
    '770b30aaa0be884ee8621859f5d055437f894a5c9c7ca22635e7024e059857b7': 'v1.0.4',
    'fc4e5c4dc2e5127b6814a3f69424c936f1dc241d1daf2c5a2d8f0728eb69d20d': 'v1.0.4',
    'e45f587fb07533d832548402d0e71d8e8234881da54d86c4b699c28a6482b0ee': 'v1.1.0',
    '9bf1580d1b21250f922b68794cdadd6c8e166ae5b15ce160a42f8c44a2f05936': 'v2.0.0',
};
exports.normalizeWebUsbFeatures = function (features) {
    if (!features)
        return null;
    var majorVersion = features.majorVersion, minorVersion = features.minorVersion, patchVersion = features.patchVersion, bootloaderHash = features.bootloaderHash;
    var decodedHash = exports.base64toHEX(bootloaderHash);
    return __assign(__assign({}, features), { firmwareVersion: "v" + majorVersion + "." + minorVersion + "." + patchVersion, bootloaderVersion: bootloaderHashToVersion[decodedHash] });
};
exports.normalizeHidFeatures = function (features) {
    if (!features)
        return null;
    var bootloaderHash = features.bootloaderHash, bootloaderMode = features.bootloaderMode;
    var decodedHash = exports.base64toHEX(bootloaderHash);
    var normedFeatures = __assign(__assign({}, features), { bootloaderVersion: bootloaderHashToVersion[decodedHash] });
    if (!bootloaderMode) {
        var majorVersion = features.majorVersion, minorVersion = features.minorVersion, patchVersion = features.patchVersion, bootloaderHash_1 = features.bootloaderHash;
        normedFeatures.firmwareVersion = "v" + majorVersion + "." + minorVersion + "." + patchVersion;
    }
    return normedFeatures;
};
exports.atob = function (str) { return Buffer.from(str, 'base64').toString('binary'); };
exports.base64toHEX = function (base64) {
    var raw = exports.atob(base64);
    var HEX = '';
    for (var i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16);
        HEX += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return HEX;
};
