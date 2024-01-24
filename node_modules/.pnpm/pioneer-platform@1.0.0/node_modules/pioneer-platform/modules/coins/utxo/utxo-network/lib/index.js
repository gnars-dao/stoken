"use strict";
/*
    Anycoin Nodes:

    BTC BCH DOGE LTC DASH DGB


    Tier 0:
        cointainers


    Tier 1

    https://www.blockchain.com/explorer
    BTC: BCH ETH
        https://www.blockchain.com/api/q


    Indexers

    Tier 0
        * coinquery

        Blockbook
            *   nodes: ['btc1.trezor.io', 'btc2.trezor.io'],

        electrumx



    Tier 1

    (no segwit)
       * Bitpay
            https://insight.bitpay.com/api

        https://chain.api.btc.com/v3/block/latest/tx?verbose=2

    (segwit)
        https://api.smartbit.com.au/v1/blockchain/tx/


    Notes on batching jsonrpc
    https://bitcoin.stackexchange.com/questions/89066/how-to-scale-json-rpc


    Blockbook docs
    https://www.npmjs.com/package/blockbook-client



    electrum  server lists

    BTC:
        More: https://uasf.saltylemon.org/electrum


    'erbium1.sytes.net':DEFAULT_PORTS,                  # core, e-x
    'ecdsa.net':{'t':'50001', 's':'110'},               # core, e-x
    'gh05.geekhosters.com':DEFAULT_PORTS,               # core, e-s
    'VPS.hsmiths.com':DEFAULT_PORTS,                    # core, e-x
    'electrum.anduck.net':DEFAULT_PORTS,                # core, e-s; banner with version pending
    'electrum.no-ip.org':DEFAULT_PORTS,                 # core, e-s
    'electrum.be':DEFAULT_PORTS,                        # core, e-x
    'helicarrier.bauerj.eu':DEFAULT_PORTS,              # core, e-x
    'elex01.blackpole.online':DEFAULT_PORTS,            # core, e-x
    'electrumx.not.fyi':DEFAULT_PORTS,                  # core, e-x
    'node.xbt.eu':DEFAULT_PORTS,                        # core, e-x
    'kirsche.emzy.de':DEFAULT_PORTS,                    # core, e-x
    'electrum.villocq.com':DEFAULT_PORTS,               # core?, e-s; banner with version recommended
    'us11.einfachmalnettsein.de':DEFAULT_PORTS,         # core, e-x
    'electrum.trouth.net':DEFAULT_PORTS,                # BU, e-s
    'Electrum.hsmiths.com':{'t':'8080', 's':'995'},     # core, e-x
    'electrum3.hachre.de':DEFAULT_PORTS,                # core, e-x
    'b.1209k.com':DEFAULT_PORTS,                        # XT, jelectrum
    'elec.luggs.co':{ 's':'443'},                       # core, e-x
    'btc.smsys.me':{'t':'110', 's':'995'},              # BU, e-x

    BTC (testnet)

    'testnetnode.arihanc.com': DEFAULT_PORTS,
    'testnet1.bauerj.eu': DEFAULT_PORTS,
    '14.3.140.101': DEFAULT_PORTS,
    'testnet.hsmiths.com': {'t':'53011', 's':'53012'},
    'electrum.akinbo.org': DEFAULT_PORTS,
    'ELEX05.blackpole.online': {'t':'52011', 's':'52002'},


    LTC:



    BCH:



    DOGE:



    DASH:



 */
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
var TAG = " | utxo-api | ";
var Axios = require('axios');
var https = require('https');
var axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
var log = require('@pioneer-platform/loggerdog')();
// const ElectrumClient = require('@pioneer-platform/electrum-client')
var bitcoin = require("bitcoinjs-lib");
var BitcoinRpc = require('bitcoin-rpc-promise');
// import { Blockbook } from 'blockbook-client'
var blockbook = require('@pioneer-platform/blockbook');
var sochain = __importStar(require("./sochain-api"));
var Utils = __importStar(require("./utils"));
var BLOCKBOOK;
//if(!process.env['BTC_RPC_HOST'])
var coins = [
    'TBTC',
    'BCH'
    //'BTC',
    //'DOGE','DASH','DGB','BCH','LTC'
];
var nodeMap = {};
for (var i = 0; i < coins.length; i++) {
    var coin = coins[i];
    var connString = 'https://user:hunter2@' + process.env[coin + '_RPC_HOST'];
    //console.log("connString: ",connString)
    nodeMap[coin] = new BitcoinRpc(connString);
}
//log.info("nodeMap: ",nodeMap)
var URL_SOCHAIN = "https://sochain.com/api/v2";
var URL_BLOCKCHAIN_INFO = "http://blockchain.info";
var URL_BLOCKBOOK_BTC = "";
//let remote nodes
var URL_BTC_TIER_1 = "https://blockchain.info";
var URL_LTC_TIER_1 = "https://blockchain.info";
var URL_ETH_TIER_1 = "https://blockchain.info";
//const URL_BTC_INSIGHT_1 = "https://insight.bitpay.com/api"
var URL_BTC_SMART_1 = "https://api.smartbit.com.au/v1/blockchain/";
// let default
var DEFAULT_SERVERS = {
    "BTC": {
        host: "127.0.0.1",
        port: 50001
    }
};
var ANYCOIN_COINS = ['BTC', 'LTC', 'BCH', 'DASH', 'DOGE'];
var ELECTRUM_SERVERS = {};
var ASSET = "ANY";
var RUNTIME = 'pioneer';
var ONLINE = [];
var OFFLINE = [];
module.exports = {
    init: function (runtime, servers) {
        return init_network(runtime, servers);
    },
    getInfo: function (coin) {
        return get_node_info(coin);
    },
    // nodeInfoSyncing:function () {
    //     return get_node_syncing();
    // },
    // nodeInfoVersion:function () {
    //     return get_node_version();
    // },
    // txsByAddress: function (coin:string,address:string) {
    //     return get_txs_by_address(coin,address);
    // },
    txsMulti: function (coin, addresses) {
        return get_txs_by_addresses(coin, addresses);
    },
    txsByXpub: function (coin, addresses) {
        return get_txs_by_xpub(coin, addresses);
    },
    utxosByXpub: function (coin, xpub) {
        return get_utxos_by_xpub(coin, xpub);
    },
    getBalanceByXpub: function (coin, xpub) {
        return get_balance_by_xpub(coin, xpub);
    },
    getBalance: function (coin, address) {
        return get_balance_by_address(coin, address);
    },
    getBalances: function (coin, addresses) {
        return get_balance_by_addresses(coin, addresses);
    },
    // unspentInputs: function (coin:string,address:string) {
    //     return get_unspent_by_address(coin,address);
    // },
    // txsByHeight: function (height,address) {
    //     return get_txs_by_height(height,address);
    // },
    getBlockHeight: function (coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, nodeMap[coin].getBlockCount()];
            });
        });
    },
    getTransaction: function (coin, txid, format) {
        return get_transaction(coin, txid, format);
    },
    // getBalance:function (address) {
    //     return get_balance(address);
    // },
    getFee: function (coin) {
        return get_fee(coin);
    },
    getFeeRates: function (coin, memo) {
        return get_fees_with_rates(coin, memo);
    },
    getFeesWithMemo: function (coin, memo) {
        return get_fees_with_memo(coin, memo);
    },
    getFeesWithRates: function (coin, memo) {
        return get_fees_with_rates(coin, memo);
    },
    getBlock: function (coin, height) {
        return get_block(coin, height);
    },
    getBlockHash: function (coin, height) {
        return get_block_hash(coin, height);
    },
    decodeRawTransaction: function (coin, hex) {
        return nodeMap[coin].decodeRawTransaction(hex);
    },
    createRawTransaction: function (coin, hex) {
        return nodeMap[coin].decodeRawTransaction(hex);
    },
    broadcast: function (coin, tx) {
        return broadcast_transaction(coin, tx);
    },
};
var get_fees_with_memo = function (coin, memo) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, fees, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_fees_with_memo | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, get_fees_with_rates(memo)];
                case 2:
                    fees = (_a.sent()).fees;
                    return [2 /*return*/, fees];
                case 3:
                    e_1 = _a.sent();
                    console.error(tag, e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_fees_with_rates = function (coin, memo) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, txFee, rates, fees, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_fees_with_rates | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output = {};
                    return [4 /*yield*/, sochain.getSuggestedTxFee(coin.toLowerCase())];
                case 2:
                    txFee = _a.sent();
                    console.log("txFee: ", txFee);
                    rates = {
                        fastest: txFee * 5,
                        fast: txFee * 1,
                        average: txFee * 0.5,
                    };
                    fees = {
                        type: 'byte',
                        fast: Utils.calcFee(rates.fast, memo),
                        average: Utils.calcFee(rates.average, memo),
                        fastest: Utils.calcFee(rates.fastest, memo),
                    };
                    return [2 /*return*/, { fees: fees, rates: rates }];
                case 3:
                    e_2 = _a.sent();
                    console.error(tag, e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_fee = function (coin) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, query, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_fee | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    output = {};
                    if (!(coin === 'BTC')) return [3 /*break*/, 3];
                    query = "https://bitcoinfees.earn.com/api/v1/fees/recommended";
                    return [4 /*yield*/, axios({ method: 'GET', url: query })];
                case 2:
                    output = _a.sent();
                    log.info(tag, "output: ", output.data);
                    output = output.data.fastestFee;
                    return [3 /*break*/, 4];
                case 3: 
                //eh just send whatever, probally be fine
                throw Error("unknown coin! " + coin);
                case 4: return [2 /*return*/, output];
                case 5:
                    e_3 = _a.sent();
                    console.error(tag, e_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
var broadcast_transaction = function (coin, tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, txid, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | broadcast_transaction | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, blockbook.broadcast(coin, tx)];
                case 2:
                    txid = _a.sent();
                    return [2 /*return*/, txid];
                case 3:
                    e_4 = _a.sent();
                    console.error(tag, e_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance_by_addresses = function (coin, addresses) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, query, i, address, balanceInfo, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance_by_address | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    query = URL_BLOCKCHAIN_INFO + "/multiaddr?active=";
                    for (i = 0; i < addresses.length; i++) {
                        address = addresses[i];
                        query = query + address + "|";
                    }
                    console.log(query);
                    return [4 /*yield*/, axios({ method: 'GET', url: query })
                        //https://blockchain.info/multiaddr?active=$address|$address
                    ];
                case 2:
                    balanceInfo = _a.sent();
                    //https://blockchain.info/multiaddr?active=$address|$address
                    return [2 /*return*/, balanceInfo.data];
                case 3:
                    e_5 = _a.sent();
                    console.error(tag, e_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance_by_address = function (coin, address) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, balanceInfo, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance_by_address | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({ method: 'GET', url: URL_BLOCKBOOK_BTC + '/address/' + address })];
                case 2:
                    balanceInfo = _a.sent();
                    return [2 /*return*/, balanceInfo.data.balance];
                case 3:
                    e_6 = _a.sent();
                    console.error(tag, e_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_utxos_by_xpub = function (coin, xpub) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_utxos_by_xpub | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, blockbook.utxosByXpub(coin, xpub)];
                case 2:
                    output = _a.sent();
                    log.debug(tag, "output: ", output);
                    return [2 /*return*/, output];
                case 3:
                    e_7 = _a.sent();
                    console.error(tag, e_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance_by_xpub = function (coin, xpub) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, balance, i, uxto, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance_by_xpub | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, blockbook.utxosByXpub(coin, xpub)];
                case 2:
                    output = _a.sent();
                    log.debug(tag, "output: ", output);
                    balance = 0;
                    //tally
                    for (i = 0; i < output.length; i++) {
                        uxto = output[i];
                        balance = balance + parseInt(uxto.value);
                    }
                    return [2 /*return*/, balance / 100000000];
                case 3:
                    e_8 = _a.sent();
                    console.error(tag, e_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_block_hash = function (coin, height) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, blockHash, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_node_info | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, nodeMap[coin].getBlockHash(height)];
                case 2:
                    blockHash = _a.sent();
                    log.debug(tag, "blockHash: ", blockHash);
                    return [2 /*return*/, blockHash];
                case 3:
                    e_9 = _a.sent();
                    console.error(tag, e_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var init_network = function (runtime, servers) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = ' | get_txs_by_address | ';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    log.debug(tag, "checkpoint: ");
                    output = [];
                    RUNTIME = runtime;
                    return [4 /*yield*/, blockbook.init()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    e_10 = _a.sent();
                    console.error(tag, 'Error: ', e_10);
                    throw e_10;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_transaction = function (coin, txid, format) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, txInfo, output, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = ' | get_transaction | ';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    log.debug(tag, "checkpoint: ");
                    txInfo = {};
                    return [4 /*yield*/, blockbook.getTransaction(coin, txid)];
                case 2:
                    output = _a.sent();
                    log.debug(tag, "output: ", output);
                    return [2 /*return*/, output];
                case 3:
                    e_11 = _a.sent();
                    console.error(tag, 'Error: ', e_11);
                    throw e_11;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_txs_by_xpub = function (coin, xpub) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, url;
        return __generator(this, function (_a) {
            tag = ' | get_txs_by_address | ';
            try {
                log.debug(tag, "checkpoint: ", xpub);
                output = [];
                url = "https://blockchain.info/" + "rawaddr/" + xpub;
                //
                // let txInfo = await axios({method:'GET',url})
                // return txInfo.data
            }
            catch (e) {
                console.error(tag, 'Error: ', e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
};
// let get_unspent_by_address = async function (coin:string,address:string) {
//     let tag = ' | get_txs_by_address | '
//     try {
//         log.debug(tag,"checkpoint: ",address)
//         let output:any = []
//
//
//         let client = new ElectrumClient(DEFAULT_SERVERS[coin].port,DEFAULT_SERVERS[coin].host, 'tcp')
//         await client.connect()
//
//         //get script hash of address
//         let script = bitcoin.address.toOutputScript(address)
//         let hash = bitcoin.crypto.sha256(script)
//         let reversedHash = new Buffer(hash.reverse())
//
//         log.debug(tag,address, ' maps to ', reversedHash.toString('hex'))
//         let scriptHex = reversedHash.toString('hex')
//
//         let unspent = await client.blockchainScripthash_listunspent(scriptHex)
//         await client.close()
//
//         return unspent
//     } catch (e) {
//         console.error(tag, 'Error: ', e)
//         throw e
//     }
// }
var get_txs_by_addresses = function (coin, addresses) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output;
        return __generator(this, function (_a) {
            tag = ' | get_txs_by_address | ';
            try {
                log.debug(tag, "checkpoint: ", addresses);
                output = [];
                //tier 0
                //tier 1
                // let url = "https://blockchain.info/" +"multiaddr?active="+address
                // //
                // let txInfo = await axios({method:'GET',url})
                //
                //
                // return txInfo.data
            }
            catch (e) {
                console.error(tag, 'Error: ', e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
};
var get_txs_by_xpubs = function (coin, xpub) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, txInfo, url;
        return __generator(this, function (_a) {
            tag = ' | get_txs_by_address | ';
            try {
                log.debug(tag, "checkpoint: ", xpub);
                output = [];
                txInfo = void 0;
                if (coin !== "BTC") {
                    url = "https://blockchain.info/" + "multiaddr?active=" + xpub;
                    //
                    // txInfo = await axios({method:'GET',url})
                }
                else {
                    //TODO
                    throw Error("not supported! '");
                }
                // return txInfo.data
            }
            catch (e) {
                console.error(tag, 'Error: ', e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
};
// let get_txs_by_address = async function (coin:string,address:string) {
//     let tag = ' | get_txs_by_address | '
//     try {
//         log.debug(tag,"checkpoint: ",address)
//
//         let client = new ElectrumClient(DEFAULT_SERVERS[coin].port,DEFAULT_SERVERS[coin].host, 'tcp')
//         await client.connect()
//
//         //get script hash of address
//         let script = bitcoin.address.toOutputScript(address)
//         let hash = bitcoin.crypto.sha256(script)
//         let reversedHash = new Buffer(hash.reverse())
//
//         log.debug(tag,address, ' maps to ', reversedHash.toString('hex'))
//         let scriptHex = reversedHash.toString('hex')
//
//         let history = await client.blockchainScripthash_getHistory(scriptHex)
//         await client.close()
//
//         return history
//     } catch (e) {
//         console.error(tag, 'Error: ', e)
//         throw e
//     }
// }
var get_block = function (coin, height) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, blockHash, blockInfo, e_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_node_info | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, nodeMap[coin].getBlockHash(height)];
                case 2:
                    blockHash = _a.sent();
                    log.debug(tag, "blockHash: ", blockHash);
                    log.debug(tag, 'blockHash: ', blockHash);
                    return [4 /*yield*/, nodeMap[coin].getBlock(blockHash, 2)];
                case 3:
                    blockInfo = _a.sent();
                    log.debug(tag, "blockInfo: ", blockInfo);
                    return [2 /*return*/, blockInfo];
                case 4:
                    e_12 = _a.sent();
                    console.error(tag, e_12);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
// let get_node_info = async function(){
//     let tag = TAG + " | get_node_info | "
//     try{
//
//         //
//         let results = await client.getBlockchainInfo()
//
//         return results
//     }catch(e){
//         console.error(tag,e)
//     }
// }
// let get_node_info = async function(){
//     let tag = TAG + " | get_node_info | "
//     try{
//
//         //
//         let results = await client.getBlockchainInfo()
//
//         return results
//     }catch(e){
//         console.error(tag,e)
//     }
// }
var get_node_info = function (coin) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, results, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_node_info | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    log.info(nodeMap);
                    return [4 /*yield*/, nodeMap[coin].getBlockchainInfo()];
                case 2:
                    results = _a.sent();
                    results.coin = coin;
                    return [2 /*return*/, results];
                case 3:
                    e_13 = _a.sent();
                    console.error(tag, e_13);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
