"use strict";
/*


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
Object.defineProperty(exports, "__esModule", { value: true });
var TAG = " | blockbook-client | ";
var blockbook_client_1 = require("blockbook-client");
var log = require('@pioneer-platform/loggerdog')();
var fakeUa = require('fake-useragent');
var Axios = require('axios');
var https = require('https');
var axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
var axiosRetry = require('axios-retry');
axiosRetry(axios, {
    retries: 3,
    retryDelay: function (retryCount) {
        console.log("retry attempt: " + retryCount);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: function (error) {
        // if retry condition is not specified, by default idempotent requests are retried
        return error.response.status === 503;
    },
});
var blockbooks_1 = require("./blockbooks");
var BLOCKBOOKS = {};
var BLOCKBOOK_URLS = {};
var RUNTIME;
var ETH_BLOCKBOOK_URL = "";
module.exports = {
    init: function (runtime, servers) {
        return init_network(runtime, servers);
    },
    getInfo: function () {
        return get_node_info();
    },
    getTransaction: function (coin, txid) {
        return get_transaction(coin, txid);
    },
    getEthInfo: function (address, filter) {
        return get_eth_info_by_address(address, filter);
    },
    // txsByXpub: function (coin:string,addresses:any) {
    //     return get_txs_by_xpub(coin,addresses);
    // },
    utxosByXpub: function (coin, xpub) {
        return get_utxos_by_xpub(coin, xpub);
    },
    getBalanceByXpub: function (coin, xpub) {
        return get_balance_by_xpub(coin, xpub);
    },
    broadcast: function (coin, hex) {
        return broadcast_transaction(coin, hex);
    },
};
var get_eth_info_by_address = function (address, filter) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, url, body, resp, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_eth_info_by_address | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!filter)
                        filter = "all";
                    url = ETH_BLOCKBOOK_URL + "/api/v2/address/" + address + "?=" + filter;
                    body = {
                        method: 'GET',
                        url: url,
                        headers: {
                            'content-type': 'application/json',
                            'User-Agent': fakeUa()
                        },
                    };
                    return [4 /*yield*/, axios(body)
                        //TODO paginate?
                    ];
                case 2:
                    resp = _a.sent();
                    //TODO paginate?
                    return [2 /*return*/, resp.data];
                case 3:
                    e_1 = _a.sent();
                    console.error(tag, e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var broadcast_transaction = function (coin, hex) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, url, data, body, resp, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | broadcast_transaction | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    url = BLOCKBOOK_URLS[coin.toUpperCase()] + "/api/v2/sendtx/";
                    data = hex;
                    body = {
                        url: url,
                        headers: {
                            'content-type': 'application/json',
                            'User-Agent': fakeUa()
                        },
                        method: 'POST',
                        json: false,
                        data: data,
                    };
                    return [4 /*yield*/, axios(body)
                        // let output = await BLOCKBOOKS[coin].sendTx(hex)
                        // log.debug(tag,"output: ",output)
                    ];
                case 2:
                    resp = _a.sent();
                    // let output = await BLOCKBOOKS[coin].sendTx(hex)
                    // log.debug(tag,"output: ",output)
                    return [2 /*return*/, resp.data];
                case 3:
                    e_2 = _a.sent();
                    console.error(tag, e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_transaction = function (coin, txid) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, url, body, resp, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_transaction | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    url = BLOCKBOOK_URLS[coin.toUpperCase()] + "/api/v2/tx/" + txid;
                    body = {
                        method: 'GET',
                        url: url,
                        headers: {
                            'content-type': 'application/json',
                            'User-Agent': fakeUa()
                        },
                    };
                    return [4 /*yield*/, axios(body)
                        // let output = await BLOCKBOOKS[coin].getTx(txid)
                        // log.debug(tag,"output: ",output)
                    ];
                case 2:
                    resp = _a.sent();
                    // let output = await BLOCKBOOKS[coin].getTx(txid)
                    // log.debug(tag,"output: ",output)
                    return [2 /*return*/, resp.data];
                case 3:
                    e_3 = _a.sent();
                    console.error(tag, e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_utxos_by_xpub = function (coin, xpub) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, url, body, resp, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | FA get_utxos_by_xpub | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    url = BLOCKBOOK_URLS[coin.toUpperCase()] + "/api/v2/utxo/" + xpub + "?confirmed=false";
                    body = {
                        method: 'GET',
                        url: url,
                        headers: {
                            'content-type': 'application/json',
                            'User-Agent': fakeUa()
                        },
                    };
                    return [4 /*yield*/, axios(body)
                        // let output = await BLOCKBOOKS[coin].getUtxosForXpub(xpub, { confirmed: false })
                        // log.debug(tag,"output: ",output)
                    ];
                case 2:
                    resp = _a.sent();
                    // let output = await BLOCKBOOKS[coin].getUtxosForXpub(xpub, { confirmed: false })
                    // log.debug(tag,"output: ",output)
                    return [2 /*return*/, resp.data];
                case 3:
                    e_4 = _a.sent();
                    console.error(tag, e_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance_by_xpub = function (coin, xpub) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, balance, i, uxto, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance_by_xpub | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    log.debug(tag, "coin: ", coin);
                    log.debug(tag, "xpub: ", xpub);
                    log.debug(tag, "BLOCKBOOKS: ", BLOCKBOOKS);
                    return [4 /*yield*/, get_utxos_by_xpub(coin, xpub)];
                case 2:
                    output = _a.sent();
                    log.info(tag, "output: ", output);
                    balance = 0;
                    //tally
                    for (i = 0; i < output.length; i++) {
                        uxto = output[i];
                        balance = balance + parseInt(uxto.value);
                    }
                    return [2 /*return*/, balance / 100000000];
                case 3:
                    e_5 = _a.sent();
                    console.error(tag, e_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var init_network = function (runtime, servers) {
    var tag = ' | get_txs_by_address | ';
    try {
        log.debug(tag, "checkpoint: ");
        var output = [];
        RUNTIME = runtime;
        var blockbooks = blockbooks_1.getBlockBooks();
        for (var i = 0; i < blockbooks.length; i++) {
            var coinInfo = blockbooks[i];
            log.debug("coinInfo: ", coinInfo);
            //
            var blockbookurl = coinInfo.explorer.tx;
            blockbookurl = blockbookurl.replace("/tx/", "");
            if (coinInfo.symbol.toUpperCase() === 'ETH')
                ETH_BLOCKBOOK_URL = blockbookurl;
            BLOCKBOOK_URLS[coinInfo.symbol.toUpperCase()] = blockbookurl;
            log.debug("blockbookurl: ", blockbookurl);
            BLOCKBOOKS[coinInfo.symbol.toUpperCase()] = new blockbook_client_1.Blockbook({
                nodes: [blockbookurl],
            });
        }
        return true;
    }
    catch (e) {
        console.error(tag, 'Error: ', e);
        throw e;
    }
};
var get_node_info = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag;
        return __generator(this, function (_a) {
            tag = TAG + " | get_node_info | ";
            try {
                return [2 /*return*/, true];
            }
            catch (e) {
                console.error(tag, e);
            }
            return [2 /*return*/];
        });
    });
};
