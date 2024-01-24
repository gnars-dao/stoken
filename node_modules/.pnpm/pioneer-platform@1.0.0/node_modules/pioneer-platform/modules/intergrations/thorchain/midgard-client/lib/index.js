"use strict";
/*



https://defi.delphidigital.io/testnet/v1/thorchain/constants

http://174.138.103.9:8080/v1/doc

 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TAG = " | midgard network | ";
var log = require("@pioneer-platform/loggerdog")();
var SEED_TESTNET = "https://testnet-seed.thorchain.info/";
//let MIDGARD_API = "https://chaosnet-midgard.bepswap.com/v1"
//let MIDGARD_API = "https://testnet-midgard.bepswap.com/v1"
//let MIDGARD_API = "https://54.0.0.27/v1"
//let MIDGARD_API = "https://testnet.multichain.midgard.thorchain.info/v2"
// const MIDGARD_API = 'http://174.138.103.9:8080/v1'
// let MIDGARD_API_RAW = 'https://testnet.thornode.thorchain.info'
var MIDGARD_API = process.env['URL_MIDGARD'] || 'https://midgard.thorchain.info/v2';
var URL_THORNODE = process.env['URL_THORNODE'] || 'https://thornode.thorchain.info';
log.debug("URL_THORNODE: ", URL_THORNODE);
log.debug("MIDGARD_API: ", MIDGARD_API);
//http://174.138.103.9:8080/v1/doc
var Axios = require('axios');
var https = require('https');
var axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
module.exports = {
    // init: function (type:string,config:any,isTestnet:boolean) {
    //     return init_wallet(type,config,isTestnet);
    // },
    getInfo: function () {
        return get_info();
    },
    getPools: function () {
        return get_pools();
    },
    getPrice: function (asset) {
        return get_price(asset);
    },
    getPool: function (poolId) {
        return get_pool(poolId);
    },
    getPoolAddress: function () {
        return get_pool_addresses();
    },
    getNewAddress: function () {
        return get_new_addresses();
    }
};
var get_new_addresses = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, params, body, resp, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_new_addresses | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output = {};
                    params = {};
                    body = {
                        method: 'GET',
                        url: URL_THORNODE + "/thorchain/inbound_addresses",
                        headers: { 'content-type': 'application/json' },
                    };
                    log.info(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    return [2 /*return*/, resp.data];
                case 3:
                    e_1 = _a.sent();
                    log.error(tag, "e: ", e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_price = function (asset) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, params, body, resp, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_price | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output = {};
                    params = {
                        asset: asset
                    };
                    body = {
                        method: 'GET',
                        url: MIDGARD_API + "/assets",
                        headers: { 'content-type': 'application/json' },
                        params: params
                    };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    return [2 /*return*/, resp.data];
                case 3:
                    e_2 = _a.sent();
                    log.error(tag, "e: ", e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
//https://testnet.thornode.thorchain.info/thorchain/inbound_addresses
var get_pool_addresses = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, body, resp, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_pool_addresses | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output = {};
                    body = {
                        method: 'GET',
                        url: URL_THORNODE + "/thorchain/inbound_addresses",
                        headers: { 'content-type': 'application/json' },
                    };
                    log.info(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    return [2 /*return*/, resp.data];
                case 3:
                    e_3 = _a.sent();
                    log.error(tag, "e: ", e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_info = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, body, resp, bodyStats, respStats, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_info | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    output = {};
                    body = {
                        method: 'GET',
                        url: MIDGARD_API + "/health",
                        headers: { 'content-type': 'application/json' },
                    };
                    log.info(body.url);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    bodyStats = {
                        method: 'GET',
                        url: MIDGARD_API + "/stats",
                        headers: { 'content-type': 'application/json' },
                    };
                    log.debug(bodyStats);
                    return [4 /*yield*/, axios(bodyStats)];
                case 3:
                    respStats = _a.sent();
                    log.info(tag, "respStats: ", respStats.data);
                    output.stats = respStats.data;
                    output.health = resp.data;
                    return [2 /*return*/, output];
                case 4:
                    e_4 = _a.sent();
                    log.error(tag, "e: ", e_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
var get_pools = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, body, resp, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_pools | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    body = {
                        method: 'GET',
                        url: MIDGARD_API + "/pools",
                        headers: { 'content-type': 'application/json' },
                    };
                    log.debug(body.url);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    return [2 /*return*/, resp.data];
                case 3:
                    e_5 = _a.sent();
                    log.error(tag, "e: ", e_5);
                    throw e_5;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_pool = function (poolId) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, params, body, resp, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_pool | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    params = {
                        view: "full",
                        asset: poolId
                    };
                    body = {
                        method: 'GET',
                        url: MIDGARD_API + "/pools/detail",
                        headers: { 'content-type': 'application/json' },
                        params: params
                    };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    return [2 /*return*/, resp.data];
                case 3:
                    e_6 = _a.sent();
                    log.error(tag, "e: ", e_6);
                    throw e_6;
                case 4: return [2 /*return*/];
            }
        });
    });
};
