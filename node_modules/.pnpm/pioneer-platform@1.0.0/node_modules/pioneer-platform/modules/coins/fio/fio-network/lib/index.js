"use strict";
/*

    Fio Network

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
var FIOSDK = require('@fioprotocol/fiosdk').FIOSDK;
var fetchJson = function (uri, opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch(uri, opts)];
        });
    });
};
var TAG = " | fio-network | ";
var log = require("@pioneer-platform/loggerdog")();
var Axios = require('axios');
var https = require('https');
var axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
var FIO_BASE = 1000000000;
var baseUrl = 'https://fioprotocol.io:443/v1';
var testnetUrl = 'http://testnet.fioprotocol.io/v1';
//const fioNode = 'https://testnet.fioprotocol.io:443/v1'
var fioNode = process.env['FIO_NODE'] || 'https://fio.eu.eosamsterdam.net/v1';
//const fioNode = process.env['FIO_NODE'] || 'https://fio.greymass.com/v1'
var historyNode = process.env['FIO_NODE_HISTORY'] || 'https://api.fio.eosdetroit.io/v1';
// let urlSpec = "https://developers.fioprotocol.io/api/api-spec/FIOChainAPI.oas2.json"
var fioTestnetDomain = 'fiotestnet';
var fioTokenCode = 'FIO';
var fioChainCode = 'FIO';
var defaultFee = 800 * FIOSDK.SUFUnit;
module.exports = {
    nodeInfo: function () {
        return get_node_info_verbose();
    },
    getAccountsFromPubkey: function (pubkey) {
        return get_accounts_from_pubkey(pubkey);
    },
    getBlockHeight: function () {
        return get_latest_block_height();
    },
    getActor: function (pubkey) {
        return get_actor(pubkey);
    },
    getPubkeyFromAccount: function (account) {
        return get_pubkey_from_account(account);
    },
    getAccount: function (account) {
        return get_account_info_from_account(account);
    },
    getAccountInfo: function (account) {
        return get_account_info_from_account(account);
    },
    getPendingRequests: function (pubkey) {
        return get_pending_requests(pubkey);
    },
    getAccountFromActor: function (pubkey) {
        return get_account_from_actor(pubkey);
    },
    getAccounts: function (pubkey) {
        return get_accounts_from_pubkey(pubkey);
    },
    getBalance: function (pubkey) {
        return get_balance(pubkey);
    },
    getBlock: function (height) {
        return get_block(height);
    },
    txs: function (account) {
        return get_txs(account);
    },
    getObtData: function (account) {
        return get_obt_data(account);
    },
    getAccountAddress: function (username, asset) {
        return get_account_address(username, asset);
    },
    isAvailable: function (username) {
        return is_available(username);
    },
    broadcast: function (tx) {
        return broadcast_tx(tx);
    },
    broadcastBundle: function (tx) {
        return broadcast_tx_bundle(tx);
    },
    broadcastSubmitPaymentRequest: function (tx) {
        return broadcast_payment_request(tx);
    },
    broadcastNewFundsRequestTx: function (tx) {
        return broadcast_new_funds_request_tx(tx);
    },
    // broadcastRegisterAddress:function (tx:any) {
    //     return broadcast_register_address(tx);
    // },
    broadcastAddPubAddressTx: function (tx) {
        return broadcast_add_pub_address_tx(tx);
    }
};
var get_pending_requests = function (pubkey) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, output_1, data, body, resp, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_pending_requests | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "fio_public_key": pubkey,
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_pending_fio_requests', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp);
                    return [2 /*return*/, resp.data];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, {
                            requests: []
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_account_info_from_account = function (account) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, output_2, isAvailable, chainCode, tokenCode, data, body, resp, coins, i, coin, address, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_account_info_from_account | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    output_2 = {};
                    output_2.account = account;
                    log.info(tag, "account: ", account);
                    //TODO is valid?
                    output_2.isValid = true;
                    return [4 /*yield*/, is_available(account)];
                case 2:
                    isAvailable = _a.sent();
                    log.debug(tag, "isAvailable: ", isAvailable);
                    if (!isAvailable) return [3 /*break*/, 3];
                    output_2.isAvailable = true;
                    return [3 /*break*/, 8];
                case 3:
                    chainCode = "FIO";
                    tokenCode = "FIO";
                    data = {
                        "fio_address": account,
                        "chain_code": chainCode,
                        "token_code": tokenCode
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_pub_address', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 4:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output_2.pubkey = resp.data.public_address;
                    log.debug(tag, "output.pubkey: ", output_2.pubkey);
                    coins = [
                        'EOS',
                        'ETH'
                    ];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < coins.length)) return [3 /*break*/, 8];
                    coin = coins[i];
                    log.debug(tag, "coin: ", coin);
                    return [4 /*yield*/, get_account_address(account, coin)];
                case 6:
                    address = _a.sent();
                    log.debug(tag, "address: ", address);
                    output_2[coin] = address.public_address;
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/, output_2];
                case 9:
                    e_2 = _a.sent();
                    log.error(tag, "e: ", e_2);
                    output.success = false;
                    output.error = e_2;
                    return [2 /*return*/, output];
                case 10: return [2 /*return*/];
            }
        });
    });
};
var get_pubkey_from_account = function (account) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, output_3, chainCode, tokenCode, data, body, resp, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_account_pubkey | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    chainCode = "FIO";
                    tokenCode = "FIO";
                    data = {
                        "fio_address": account,
                        "chain_code": chainCode,
                        "token_code": tokenCode
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_pub_address', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output_3 = resp.data;
                    return [2 /*return*/, output_3.public_address];
                case 3:
                    e_3 = _a.sent();
                    log.error(tag, "e: ", e_3);
                    output.success = false;
                    output.error = e_3;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var broadcast_new_funds_request_tx = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, request, options;
        return __generator(this, function (_a) {
            tag = TAG + " | broadcast_new_funds_request_tx | ";
            output = {};
            try {
                console.log(tag, "Checkpoint");
                request = require("request");
                options = {
                    method: 'POST',
                    url: fioNode + '/chain/new_funds_request',
                    headers: { 'content-type': 'application/json' },
                    body: tx,
                    json: true
                };
                request(options, function (error, response, body) {
                    console.log(error, response, body);
                    if (error) {
                        console.log(JSON.stringify(error));
                        throw new Error(error);
                    }
                    //console.log(JSON.stringify(body));
                    return body;
                });
            }
            catch (e) {
                log.error(tag, "e: ", e.response.data);
                log.error(tag, "e: ", e.response.data.error);
                log.error(tag, "e: ", e.response.data.error);
                output.success = false;
                output.error = e;
                return [2 /*return*/, output];
            }
            return [2 /*return*/];
        });
    });
};
var broadcast_payment_request = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, request, options;
        return __generator(this, function (_a) {
            tag = TAG + " | broadcast_payment_request | ";
            output = {};
            try {
                console.log(tag, "Checkpoint");
                request = require("request");
                options = {
                    method: 'POST',
                    url: fioNode + '/chain/new_funds_request',
                    headers: { 'content-type': 'application/json' },
                    body: tx,
                    json: true
                };
                request(options, function (error, response, body) {
                    console.log(error, response, body);
                    if (error) {
                        console.log(JSON.stringify(error));
                        throw new Error(error);
                    }
                    //console.log(JSON.stringify(body));
                    return body;
                });
                // let body = {method:'POST',url: fioNode+'/chain/push_transaction',body:""}
                // log.debug(body)
                // let resp = await axios(body)
                // log.debug(tag,"resp: ",resp.data)
                //
                // output = resp.data
                // return output
            }
            catch (e) {
                log.error(tag, "e: ", e.response.data);
                log.error(tag, "e: ", e.response.data.error);
                log.error(tag, "e: ", e.response.data.error);
                output.success = false;
                output.error = e;
                return [2 /*return*/, output];
            }
            return [2 /*return*/];
        });
    });
};
var broadcast_register_address = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, request, options;
        return __generator(this, function (_a) {
            tag = TAG + " | broadcast_register_address | ";
            output = {};
            try {
                console.log(tag, "Checkpoint");
                request = require("request");
                options = {
                    method: 'POST',
                    url: fioNode + '/chain/new_funds_request',
                    headers: { 'content-type': 'application/json' },
                    body: tx,
                    json: true
                };
                request(options, function (error, response, body) {
                    console.log(error, response, body);
                    if (error) {
                        console.log(JSON.stringify(error));
                        throw new Error(error);
                    }
                    //console.log(JSON.stringify(body));
                    return body;
                });
                // let body = {method:'POST',url: fioNode+'/chain/push_transaction',body:""}
                // log.debug(body)
                // let resp = await axios(body)
                // log.debug(tag,"resp: ",resp.data)
                //
                // output = resp.data
                // return output
            }
            catch (e) {
                log.error(tag, "e: ", e.response.data);
                log.error(tag, "e: ", e.response.data.error);
                log.error(tag, "e: ", e.response.data.error);
                output.success = false;
                output.error = e;
                return [2 /*return*/, output];
            }
            return [2 /*return*/];
        });
    });
};
var broadcast_add_pub_address_tx = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, request, options;
        return __generator(this, function (_a) {
            tag = TAG + " | broadcast_add_pub_address_tx | ";
            output = {};
            try {
                console.log(tag, "Checkpoint");
                request = require("request");
                options = {
                    method: 'POST',
                    url: fioNode + '/chain/add_pub_address',
                    headers: { 'content-type': 'application/json' },
                    body: tx,
                    json: true
                };
                request(options, function (error, response, body) {
                    console.log(error, response, body);
                    if (error) {
                        console.log(JSON.stringify(error));
                        throw new Error(error);
                    }
                    console.log(JSON.stringify(body));
                    return body;
                });
            }
            catch (e) {
                log.error(tag, "e: ", e.response.data);
                log.error(tag, "e: ", e.response.data.error);
                log.error(tag, "e: ", e.response.data.error);
                output.success = false;
                output.error = e;
                return [2 /*return*/, output];
            }
            return [2 /*return*/];
        });
    });
};
var broadcast_tx_bundle = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, request, options;
        return __generator(this, function (_a) {
            tag = TAG + " | broadcast_tx_bundle | ";
            output = {};
            try {
                console.log(tag, "Checkpoint");
                request = require("request");
                options = {
                    method: 'POST',
                    url: fioNode + '/chain/submit_bundle',
                    headers: { 'content-type': 'application/json' },
                    body: tx,
                    json: true
                };
                request(options, function (error, response, body) {
                    console.log(error, response, body);
                    if (error) {
                        console.log(JSON.stringify(error));
                        throw new Error(error);
                    }
                    console.log(JSON.stringify(body));
                    return body;
                });
                // let body = {method:'POST',url: fioNode+'/chain/push_transaction',body:""}
                // log.debug(body)
                // let resp = await axios(body)
                // log.debug(tag,"resp: ",resp.data)
                //
                // output = resp.data
                // return output
            }
            catch (e) {
                log.error(tag, "e: ", e.response.data);
                log.error(tag, "e: ", e.response.data.error);
                log.error(tag, "e: ", e.response.data.error);
                output.success = false;
                output.error = e;
                return [2 /*return*/, output];
            }
            return [2 /*return*/];
        });
    });
};
var broadcast_tx = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, request, options;
        return __generator(this, function (_a) {
            tag = TAG + " | broadcast_tx | ";
            output = {};
            try {
                console.log("CHeckpoint");
                request = require("request");
                options = {
                    method: 'POST',
                    url: fioNode + '/chain/push_transaction',
                    headers: { 'content-type': 'application/json' },
                    body: tx,
                    json: true
                };
                request(options, function (error, response, body) {
                    console.log(error, response, body);
                    if (error) {
                        console.log(JSON.stringify(error));
                        throw new Error(error);
                    }
                    console.log(JSON.stringify(body));
                    return body;
                });
                // let body = {method:'POST',url: fioNode+'/chain/push_transaction',body:""}
                // log.debug(body)
                // let resp = await axios(body)
                // log.debug(tag,"resp: ",resp.data)
                //
                // output = resp.data
                // return output
            }
            catch (e) {
                log.error(tag, "e: ", e.response.data);
                log.error(tag, "e: ", e.response.data.error);
                log.error(tag, "e: ", e.response.data.error);
                output.success = false;
                output.error = e;
                return [2 /*return*/, output];
            }
            return [2 /*return*/];
        });
    });
};
var get_block = function (height) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, data, body, resp, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_txs | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "block_num_or_id": height
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_block', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output = resp.data;
                    output = resp.data;
                    return [2 /*return*/, output];
                case 3:
                    e_4 = _a.sent();
                    log.error(tag, "e: ", e_4.response.data);
                    output.success = false;
                    output.error = e_4;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_latest_block_height = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, body, resp, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_latest_block_height | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    body = { method: 'POST', url: fioNode + '/chain/get_info' };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output = resp.data;
                    return [2 /*return*/, output];
                case 3:
                    e_5 = _a.sent();
                    log.error(tag, "e: ", e_5.response.data);
                    output.success = false;
                    output.error = e_5;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
/*
Get transactions by account
This provides action traces, not just transaction history which has several implications:

Multiple actions can be submitted in a single transaction, so several (different) actions can have the same transaction ID
Not all of the actions may be been performed by the account being queried (triggering internal actions within a contract for example.) It may or may not be beneficial to only show the actions directly performed by the account being queried, for example filtering out internal actions that have a different actor may result in missing some important FIO transactions, such as rewards payouts.
Note: there are some peculiarities in how paging works on this endpoint, this is not a FIO specific issue. We haven’t diverged from how EOS works in this case to avoid unexpected behavior for block explorers etc.

The getactions endpoint does allow a negative position for finding the most recent actions, but if a negative number is specified, the following caveats apply:

it will only start at the most recent transaction, only -1 is valid, cannot specify a lower offset.
it will not allow paging
it will always return 10 records.
Because of this limitation, getting the last 100 transactions for an account (for example) requires a call with the negative offset to find the highest position (using the last action in the returned array,) and then paging through the actions using positive pos and offset values. accountactionseq is the transaction count for the account, and is what should be used for paging.

https://developers.fioprotocol.io/fio-chain/history

 */
var get_txs = function (account) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, data, body, resp, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_txs | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "account_name": account,
                        "pos": -1
                    };
                    body = { method: 'POST', url: historyNode + '/history/get_actions', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output = resp.data;
                    return [2 /*return*/, output];
                case 3:
                    e_6 = _a.sent();
                    log.error(tag, "e: ", e_6.response.data);
                    output.success = false;
                    output.error = e_6;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_obt_data = function (fio_public_key) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, data, url, body, resp, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_txs | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "fio_public_key": fio_public_key,
                        "limit": 100,
                        "offset": 0
                    };
                    url = fioNode + '/chain/get_obt_data';
                    console.log(url);
                    body = { method: 'POST', url: fioNode + '/chain/get_obt_data', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output = resp.data;
                    return [2 /*return*/, output];
                case 3:
                    e_7 = _a.sent();
                    log.error(tag, "e: ", e_7.response.data);
                    output.success = false;
                    output.error = e_7;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance = function (pubkey) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, data, body, resp, output_4, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "fio_public_key": pubkey
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_fio_balance', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output_4 = resp.data;
                    return [2 /*return*/, output_4.balance / FIO_BASE];
                case 3:
                    e_8 = _a.sent();
                    log.error(tag, "e: ", e_8);
                    output.success = false;
                    output.error = e_8;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var is_available = function (username) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, output_5, data, body, resp, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_account | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output_5 = false;
                    data = {
                        "fio_name": username
                    };
                    body = { method: 'POST', url: fioNode + '/chain/avail_check', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    if (resp.data.is_registered === 0) {
                        output_5 = true;
                    }
                    return [2 /*return*/, output_5];
                case 3:
                    e_9 = _a.sent();
                    log.error(tag, "e: ", e_9);
                    output.success = false;
                    output.error = e_9;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_actor = function (pubkey) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, data, body, resp, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_account | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "fio_public_key": pubkey
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_actor', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    return [2 /*return*/, resp.data];
                case 3:
                    e_10 = _a.sent();
                    log.error(tag, "e: ", e_10);
                    output.success = false;
                    output.error = e_10;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// let get_accounts = async function(pubkey:string){
//     let tag = TAG + " | get_account | "
//     let output:any
//     try{
//         let output:any = []
//         let data = {
//             "fio_public_key":pubkey
//         }
//
//         let body = {method:'POST',url: fioNode+'/chain/get_fio_names',data}
//         log.debug(body)
//         let resp = await axios(body)
//         log.info(tag,"resp: ",resp.data)
//
//         //if more then 1
//         for(let i =0; i < resp.data.fio_addresses.length; i++){
//             let fioAccount = resp.data.fio_addresses[i].fio_address
//             output.push(fioAccount)
//         }
//
//         return output
//     }catch(e){
//         log.error(tag,"e: ",e)
//         output.success = false
//         output.error = e
//         return output
//     }
// }
var get_account_from_actor = function (actor) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, body, resp, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_account | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    body = {
                        method: 'GET',
                        url: fioNode + "/chain/get_account?data='{account_name: actor}'",
                        headers: { 'content-type': 'application/json' },
                    };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    return [3 /*break*/, 4];
                case 3:
                    e_11 = _a.sent();
                    log.error(tag, "e: ", e_11);
                    output.success = false;
                    output.error = e_11;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_account_address = function (username, asset) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, output_6, chainCode, tokenCode, data, body, resp, e_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_account_pubkey | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output_6 = {};
                    chainCode = asset;
                    tokenCode = asset;
                    data = {
                        "fio_address": username,
                        "chain_code": chainCode,
                        "token_code": tokenCode
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_pub_address', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output_6 = resp.data;
                    return [2 /*return*/, output_6];
                case 3:
                    e_12 = _a.sent();
                    log.error(tag, "e: ", e_12);
                    output.success = false;
                    output.error = e_12;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_accounts_from_pubkey = function (pubkey) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, data, body, resp, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_accounts_from_pubkey | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    data = {
                        "fio_public_key": pubkey
                    };
                    body = { method: 'POST', url: fioNode + '/chain/get_fio_names', data: data };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output = resp.data;
                    return [2 /*return*/, output];
                case 3:
                    e_13 = _a.sent();
                    //if 404 :rabble"
                    if (e_13.response.status === 404) {
                        //NOT AN ERROR!!!!
                        output = [];
                        return [2 /*return*/, output];
                    }
                    else {
                        //REALLY AN ERROR
                        log.error(tag, "e: ", JSON.stringify(e_13));
                        log.error(tag, "e: ", e_13);
                        throw e_13;
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_node_info_verbose = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, output_7, body, resp, e_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_node_info | ";
                    output = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output_7 = {};
                    body = { method: 'POST', url: fioNode + '/chain/get_info' };
                    log.debug(body);
                    return [4 /*yield*/, axios(body)];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    output_7 = resp.data;
                    return [2 /*return*/, output_7];
                case 3:
                    e_14 = _a.sent();
                    log.error(tag, "e: ", e_14);
                    output.success = false;
                    output.error = e_14;
                    return [2 /*return*/, output];
                case 4: return [2 /*return*/];
            }
        });
    });
};
