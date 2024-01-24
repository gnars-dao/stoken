"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bech32ify = exports.bip32ToAddressNList = exports.bip32Like = exports.getBase = exports.compileMemo = void 0;
var bech32 = require("bech32");
var Bitcoin = __importStar(require("bitcoinjs-lib")); // https://github.com/bitcoinjs/bitcoinjs-lib
//TODO move to coins
var ETH_BASE = 1000000000000000000;
var HARDENED = 0x80000000;
//
exports.compileMemo = function (memo) {
    var data = Buffer.from(memo, 'utf8'); // converts MEMO to buffer
    return Bitcoin.script.compile([Bitcoin.opcodes.OP_RETURN, data]); // Compile OP_RETURN script
};
//TODO THIS IS DUMB AS SHIT FIXME default cant be null?
function getBase(coin) {
    switch (coin) {
        case "ETH":
            return ETH_BASE;
        default:
            return 100000000;
    }
}
exports.getBase = getBase;
function bip32Like(path) {
    if (path == "m/")
        return true;
    return /^m(((\/[0-9]+h)+|(\/[0-9]+H)+|(\/[0-9]+')*)((\/[0-9]+)*))$/.test(path);
}
exports.bip32Like = bip32Like;
function bip32ToAddressNList(path) {
    if (!bip32Like(path)) {
        throw new Error("Not a bip32 path: '" + path + "'");
    }
    if (/^m\//i.test(path)) {
        path = path.slice(2);
    }
    var segments = path.split("/");
    if (segments.length === 1 && segments[0] === "")
        return [];
    var ret = new Array(segments.length);
    for (var i = 0; i < segments.length; i++) {
        var tmp = /(\d+)([hH\']?)/.exec(segments[i]);
        if (tmp === null) {
            throw new Error("Invalid input");
        }
        ret[i] = parseInt(tmp[1], 10);
        if (ret[i] >= HARDENED) {
            throw new Error("Invalid child index");
        }
        if (tmp[2] === "h" || tmp[2] === "H" || tmp[2] === "'") {
            ret[i] += HARDENED;
        }
        else if (tmp[2].length !== 0) {
            throw new Error("Invalid modifier");
        }
    }
    return ret;
}
exports.bip32ToAddressNList = bip32ToAddressNList;
function bech32ify(address, prefix) {
    var words = bech32.toWords(address);
    return bech32.encode(prefix, words);
}
exports.bech32ify = bech32ify;
