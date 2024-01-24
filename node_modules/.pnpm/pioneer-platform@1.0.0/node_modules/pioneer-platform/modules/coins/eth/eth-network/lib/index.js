"use strict";
/*
   ETH Network tools


       Goals:

        *


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
var TAG = " | eth-network | ";
var Web3 = require('web3');
var ethers_1 = require("ethers");
//
var Axios = require('axios');
var https = require('https');
var axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
//blockbook
var blockbook = require("@pioneer-platform/blockbook");
var providers_1 = require("@ethersproject/providers");
var utils_1 = require("./utils");
var xchain_util_1 = require("@xchainjs/xchain-util");
var etherscanAPI = __importStar(require("./etherscan-api"));
//
var tokenData = require("@pioneer-platform/pioneer-eth-token-data");
var log = require('@pioneer-platform/loggerdog')();
var ETHPLORER_API_KEY = process.env['ETHPLORER_API_KEY'] || 'freekey';
var utils_2 = require("ethers/lib/utils");
//
var web3;
var ETHERSCAN;
var ETHPLORER;
var PROVIDER;
//TODO precision module
var BASE = 1000000000000000000;
//TODO move thorchain/eth stuff to its own module?
var THORCHAIN_ROUTER_TESTNET = process.env['THORCHAIN_ROUTER_TESTNET'] || "0x9d496De78837f5a2bA64Cb40E62c19FBcB67f55a";
//const THORCHAIN_ROUTER_MAINNET = process.env['THORCHAIN_ROUTER_MAINNET'] || ''
var TCRopstenAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "memo", "type": "string" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldVault", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newVault", "type": "address" }, { "indexed": false, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "memo", "type": "string" }], "name": "TransferAllowance", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "vault", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "memo", "type": "string" }], "name": "TransferOut", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldVault", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newVault", "type": "address" }, { "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "indexed": false, "internalType": "struct Router.Coin[]", "name": "coins", "type": "tuple[]" }, { "indexed": false, "internalType": "string", "name": "memo", "type": "string" }], "name": "VaultTransfer", "type": "event" }, { "inputs": [], "name": "RUNE", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Router.Coin[]", "name": "coins", "type": "tuple[]" }, { "internalType": "string[]", "name": "memos", "type": "string[]" }], "name": "batchTransferOut", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "vault", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "memo", "type": "string" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "router", "type": "address" }, { "internalType": "address payable", "name": "asgard", "type": "address" }, { "components": [{ "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Router.Coin[]", "name": "coins", "type": "tuple[]" }, { "internalType": "string", "name": "memo", "type": "string" }], "name": "returnVaultAssets", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "router", "type": "address" }, { "internalType": "address", "name": "newVault", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "memo", "type": "string" }], "name": "transferAllowance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "to", "type": "address" }, { "internalType": "address", "name": "asset", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "memo", "type": "string" }], "name": "transferOut", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "vaultAllowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
module.exports = {
    init: function (settings) {
        blockbook.init();
        if (!settings) {
            //use default
            web3 = new Web3(process.env['PARITY_ARCHIVE_NODE']);
            ETHERSCAN = new providers_1.EtherscanProvider('mainnet', process.env['ETHERSCAN_API_KEY']);
            PROVIDER = new ethers_1.ethers.providers.InfuraProvider('mainnet', process.env['INFURA_API_KEY']);
        }
        else if (settings.testnet) {
            if (!process.env['INFURA_TESTNET_ROPSTEN'])
                throw Error("Missing INFURA_TESTNET_ROPSTEN");
            if (!process.env['ETHERSCAN_API_KEY'])
                throw Error("Missing ETHERSCAN_API_KEY");
            //if testnet
            web3 = new Web3(process.env['INFURA_TESTNET_ROPSTEN']);
            ETHERSCAN = new providers_1.EtherscanProvider('ropsten', process.env['ETHERSCAN_API_KEY']);
            PROVIDER = new ethers_1.ethers.providers.InfuraProvider('ropsten', process.env['INFURA_API_KEY']);
        }
        else {
            //TODO if custom
            web3 = new Web3(process.env['PARITY_ARCHIVE_NODE']);
        }
    },
    getInfo: function () {
        return check_online_status();
    },
    getAllowance: function (token, spender, sender) {
        return get_allowance(token, spender, sender);
    },
    getNonce: function (address) {
        return web3.eth.getTransactionCount(address, 'pending');
    },
    getFees: function (params) {
        return get_fees(params);
    },
    estimateFee: function (sourceAsset, params) {
        return estimate_fee(sourceAsset, params);
    },
    getMemoEncoded: function (params) {
        return get_memo_data(params);
    },
    getPoolPositions: function (address) {
        return get_pool_positions(address);
    },
    getAllTokensEth: function (address) {
        return get_all_tokens_blockbook(address);
    },
    // getFees: function (params: XFeesParams & FeesParams): Promise<Fees> {
    // 	return get_fees()
    // },
    // estimateGasNormalTx: function (address:string): Promise<BaseAmount> {
    // 	return get_balance_tokens(address)
    // },
    // estimateGasERC20Tx: function (address:string): Promise<BaseAmount> {
    // 	return get_balance_tokens(address)
    // },
    getGasPrice: function () {
        return web3.eth.getGasPrice();
    },
    getTransaction: function (txid) {
        return get_transaction(txid);
    },
    getBalance: function (address) {
        return get_balance(address);
    },
    getBalanceAddress: function (address) {
        return get_balance(address);
    },
    getBalanceToken: function (address, token) {
        return get_balance_token(address, token);
    },
    getBalanceTokens: function (address) {
        return get_balance_tokens(address);
    },
    broadcast: function (tx) {
        return broadcast_transaction(tx);
    }
};
var ERC20ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
//get_approval_status
var get_allowance = function (tokenAddress, spender, sender) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, contract, allowance, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_allowance | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    contract = new web3.eth.Contract(ERC20ABI, tokenAddress);
                    return [4 /*yield*/, contract.methods.allowance(spender, sender).call()];
                case 2:
                    allowance = _a.sent();
                    return [2 /*return*/, allowance];
                case 3:
                    e_1 = _a.sent();
                    console.error(tag, e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_all_tokens_blockbook = function (address) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, ethInto, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_all_tokens_blockbook | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, blockbook.getEthInfo(address)];
                case 2:
                    ethInto = _a.sent();
                    log.info(tag, "ethInto: ", ethInto);
                    return [2 /*return*/, true];
                case 3:
                    e_2 = _a.sent();
                    console.error(tag, e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_pool_positions = function (address) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, ethInto, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_pool_positions | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, blockbook.getEthInfo(address)
                        //TODO filter by LP contracts
                    ];
                case 2:
                    ethInto = _a.sent();
                    //TODO filter by LP contracts
                    log.info(tag, "ethInto: ", ethInto);
                    return [2 /*return*/, true];
                case 3:
                    e_3 = _a.sent();
                    console.error(tag, e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
/*
let swap = {
    inboundAddress: {
        chain: 'ETH',
        pub_key: 'tthorpub1addwnpepqvuy8vh6yj4h28xp6gfpjsztpj6p46y2rs0763t6uw9f6lkky0ly5uvwla6',
        address: '0x36286e570c412531aad366154eea9867b0e71755',
        router: '0x9d496De78837f5a2bA64Cb40E62c19FBcB67f55a',
        halted: false
    },
    asset: {
        chain: 'ETH',
        symbol: 'ETH',
        ticker: 'ETH',
        iconPath: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/ETH-1C9/logo.png'
    },
    memo: '=:THOR.RUNE:tthor1veu9u5h4mtdq34fjgu982s8pympp6w87ag58nh',
    amount: "0.1"
}
 */
var get_memo_data = function (swap) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, web3_1, routerContract, memo, data;
        return __generator(this, function (_a) {
            tag = TAG + " | get_memo_data | ";
            try {
                web3_1 = new Web3();
                if (!swap.inboundAddress.router)
                    throw Error("Router required!");
                routerContract = new web3_1.eth.Contract(TCRopstenAbi, swap.inboundAddress.router);
                memo = swap.memo;
                data = routerContract.methods
                    .deposit(swap.inboundAddress.address, '0x0000000000000000000000000000000000000000', // 0 = ETH
                web3_1.utils.toBN(swap.amount * BASE), memo)
                    .encodeABI();
                return [2 /*return*/, data];
            }
            catch (e) {
                log.error(tag, e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
};
/*
    X-chain compatible call
 */
var estimate_fee = function (sourceAsset, params) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, checkSummedAddress, decimal, provider, contract, estimateGas, entry, fees, minimumWeiCost, e_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tag = TAG + " | estimate_fee | ";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    checkSummedAddress = void 0;
                    decimal = void 0;
                    if (sourceAsset.symbol === 'ETH') {
                        checkSummedAddress = '0x0000000000000000000000000000000000000000';
                        decimal = utils_1.ETH_DECIMAL;
                    }
                    else {
                        throw Error("TODO");
                        // const assetAddress = sourceAsset.symbol.slice(sourceAsset.ticker.length + 1);
                        // const strip0x = assetAddress.substr(2);
                        // checkSummedAddress = ethers.utils.getAddress(strip0x);
                        //
                        // const tokenContract = new ethers.Contract(checkSummedAddress, erc20ABI, wallet);
                        // const tokenDecimals = await tokenContract.decimals();
                        // decimal = tokenDecimals.toNumber();
                    }
                    provider = PROVIDER;
                    contract = new ethers_1.ethers.Contract(THORCHAIN_ROUTER_TESTNET, TCRopstenAbi, provider);
                    console.log('checkppint estimateFee: params', params);
                    return [4 /*yield*/, (_a = contract.estimateGas).deposit.apply(_a, params)];
                case 2:
                    estimateGas = _b.sent();
                    console.log('checkppint estimateFee: params', params);
                    entry = {
                        asset: {
                            chain: "ETH",
                            symbol: "ETH",
                            ticker: "ETH",
                        },
                        amount: params[2],
                        recipient: params[0],
                        memo: params[3],
                    };
                    return [4 /*yield*/, get_fees(entry)];
                case 3:
                    fees = (_b.sent()).fees;
                    minimumWeiCost = ethers_1.BigNumber.from(fees.average);
                    minimumWeiCost = minimumWeiCost.mul(estimateGas.toNumber());
                    return [2 /*return*/, minimumWeiCost];
                case 4:
                    e_4 = _b.sent();
                    log.error(tag, e_4);
                    throw e_4;
                case 5: return [2 /*return*/];
            }
        });
    });
};
var get_gas_limit = function (_a) {
    var asset = _a.asset, recipient = _a.recipient, amount = _a.amount, memo = _a.memo;
    return __awaiter(this, void 0, void 0, function () {
        var tag, txAmount, assetAddress, estimate, contract, transactionRequest, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tag = TAG + " | get_gas_limit | ";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    log.info(tag, "input: ", { asset: asset, recipient: recipient, amount: amount, memo: memo });
                    txAmount = ethers_1.BigNumber.from(amount === null || amount === void 0 ? void 0 : amount.amount().toFixed());
                    assetAddress = void 0;
                    if (asset && xchain_util_1.assetToString(asset) !== xchain_util_1.assetToString(xchain_util_1.AssetETH)) {
                        assetAddress = utils_1.getTokenAddress(asset);
                    }
                    estimate = void 0;
                    if (!(assetAddress && assetAddress !== utils_1.ETHAddress)) return [3 /*break*/, 3];
                    contract = new ethers_1.ethers.Contract(assetAddress, utils_1.erc20ABI, PROVIDER);
                    return [4 /*yield*/, contract.estimateGas.transfer(recipient, txAmount, {
                            from: recipient,
                        })];
                case 2:
                    estimate = _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    transactionRequest = {
                        from: recipient,
                        to: recipient,
                        value: txAmount,
                        data: memo ? utils_2.toUtf8Bytes(memo) : undefined,
                    };
                    return [4 /*yield*/, PROVIDER.estimateGas(transactionRequest)];
                case 4:
                    estimate = _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, estimate];
                case 6:
                    e_5 = _b.sent();
                    log.error(tag, e_5);
                    throw e_5;
                case 7: return [2 /*return*/];
            }
        });
    });
};
var get_fees = function (params) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var tag, response, averageWei, fastWei, fastestWei, gasPrices, fastGP, fastestGP, averageGP, gasLimit, output, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tag = TAG + " | get_fees | ";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, etherscanAPI.getGasOracle(ETHERSCAN.baseUrl, ETHERSCAN.apiKey)
                        // Convert result of gas prices: `Gwei` -> `Wei`
                    ];
                case 2:
                    response = _b.sent();
                    averageWei = utils_2.parseUnits(response.SafeGasPrice, 'gwei');
                    fastWei = utils_2.parseUnits(response.ProposeGasPrice, 'gwei');
                    fastestWei = utils_2.parseUnits(response.FastGasPrice, 'gwei');
                    gasPrices = {
                        average: xchain_util_1.baseAmount(averageWei.toString(), utils_1.ETH_DECIMAL),
                        fast: xchain_util_1.baseAmount(fastWei.toString(), utils_1.ETH_DECIMAL),
                        fastest: xchain_util_1.baseAmount(fastestWei.toString(), utils_1.ETH_DECIMAL),
                    };
                    fastGP = gasPrices.fast, fastestGP = gasPrices.fastest, averageGP = gasPrices.average;
                    if (!params.amount || !((_a = params === null || params === void 0 ? void 0 : params.amount) === null || _a === void 0 ? void 0 : _a.amount)) {
                        // @ts-ignore
                        params.amount = {
                            // @ts-ignore
                            amount: function () { return .98; }
                        };
                    }
                    return [4 /*yield*/, get_gas_limit({
                            asset: params.asset,
                            amount: params.amount,
                            recipient: params.recipient,
                            memo: params.memo,
                        })];
                case 3:
                    gasLimit = _b.sent();
                    output = {
                        gasPrices: gasPrices,
                        fees: {
                            type: 'byte',
                            average: utils_1.getFee({ gasPrice: averageGP, gasLimit: gasLimit }).amount().toString(),
                            fast: utils_1.getFee({ gasPrice: fastGP, gasLimit: gasLimit }).amount().toString(),
                            fastest: utils_1.getFee({ gasPrice: fastestGP, gasLimit: gasLimit }).amount().toString(),
                        },
                        gasLimit: gasLimit,
                    };
                    return [2 /*return*/, output];
                case 4:
                    e_6 = _b.sent();
                    log.error(tag, e_6);
                    throw e_6;
                case 5: return [2 /*return*/];
            }
        });
    });
};
var broadcast_transaction = function (tx) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, result, output, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | broadcast_transaction | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!tx)
                        throw Error("101: missing tx!");
                    return [4 /*yield*/, web3.eth.sendSignedTransaction(tx)];
                case 2:
                    result = _a.sent();
                    output = {
                        success: true,
                        blockIncluded: result.result,
                        block: result.blockNumber,
                        txid: result.transactionHash,
                        gas: result.cumulativeGasUsed
                    };
                    return [2 /*return*/, output];
                case 3:
                    e_7 = _a.sent();
                    log.error(tag, e_7);
                    throw e_7;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance_tokens = function (address) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, balances, valueUsds, coinInfo, resp, tokenInfo, i, info, symbol, rate, balance, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    balances = {};
                    valueUsds = {};
                    coinInfo = {};
                    return [4 /*yield*/, axios({
                            method: 'GET',
                            url: 'http://api.ethplorer.io/getAddressInfo/' + address + '?apiKey=' + ETHPLORER_API_KEY
                        })];
                case 2:
                    resp = _a.sent();
                    log.debug(tag, "resp: ", resp.data);
                    balances['ETH'] = resp.data.ETH.balance;
                    valueUsds['ETH'] = parseFloat(resp.data.ETH.balance) * parseFloat(resp.data.ETH.price.rate);
                    tokenInfo = resp.data.tokens;
                    log.debug(tag, "tokenInfo: ", tokenInfo);
                    //
                    if (tokenInfo && Object.keys(tokenInfo).length > 0) {
                        for (i = 0; i < tokenInfo.length; i++) {
                            info = tokenInfo[i];
                            if (info) {
                                log.debug(tag, "info: ", info);
                                symbol = info.tokenInfo.symbol;
                                log.debug(tag, "symbol: ", symbol);
                                rate = 0;
                                if (info.tokenInfo.price && info.tokenInfo.price.rate) {
                                    log.debug(tag, "rate: ", info.tokenInfo.price.rate);
                                    rate = info.tokenInfo.price.rate;
                                }
                                balance = info.balance / parseInt(Math.pow(10, info.tokenInfo.decimals));
                                log.debug({ rate: rate, symbol: symbol, balance: balance });
                                balances[symbol] = balance;
                                valueUsds[symbol] = balance * rate;
                                coinInfo[symbol] = info.tokenInfo;
                            }
                        }
                    }
                    return [2 /*return*/, { balances: balances, valueUsds: valueUsds, coinInfo: coinInfo }];
                case 3:
                    e_8 = _a.sent();
                    console.error(tag, e_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance_token = function (address, token) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, abiInfo, ABI, metaData, contract, balance, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    abiInfo = tokenData.ABI[token];
                    if (!abiInfo)
                        return [2 /*return*/, 0
                            //console.log(tag,"abiInfo: ",abiInfo)
                            //
                        ];
                    ABI = abiInfo.ABI;
                    metaData = abiInfo.metaData;
                    contract = new web3.eth.Contract(ABI, metaData.contractAddress);
                    return [4 /*yield*/, contract.methods.balanceOf(address).call()];
                case 2:
                    balance = _a.sent();
                    log.info(tag, "balance: ", balance);
                    return [2 /*return*/, balance / metaData.BASE];
                case 3:
                    e_9 = _a.sent();
                    console.error(tag, e_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_balance = function (address) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | get_balance | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output = {};
                    return [4 /*yield*/, web3.eth.getBalance(address)];
                case 2:
                    //normal tx info
                    output = (_a.sent()) / BASE;
                    return [2 /*return*/, output];
                case 3:
                    e_10 = _a.sent();
                    console.error(tag, e_10);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_transaction = function (txid) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, _a, _b, e_11;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tag = TAG + " | get_transaction | ";
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    output = {};
                    //normal tx info
                    _a = output;
                    return [4 /*yield*/, web3.eth.getTransaction(txid)
                        //if contract
                    ];
                case 2:
                    //normal tx info
                    _a.txInfo = _c.sent();
                    //if contract
                    _b = output;
                    return [4 /*yield*/, web3.eth.getTransactionReceipt(txid)];
                case 3:
                    //if contract
                    _b.receipt = _c.sent();
                    return [2 /*return*/, output];
                case 4:
                    e_11 = _c.sent();
                    console.error(tag, e_11);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
var check_online_status = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, _a, _b, _c, _d, networkName, _e, _f, e_12;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    tag = TAG + " | check_online_status | ";
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 8, , 9]);
                    output = {};
                    //isTestnet
                    _a = output;
                    return [4 /*yield*/, web3.eth.getNodeInfo()];
                case 2:
                    //isTestnet
                    _a.version = _g.sent();
                    _b = output;
                    return [4 /*yield*/, web3.eth.getChainId()];
                case 3:
                    _b.chainId = _g.sent();
                    _c = output;
                    return [4 /*yield*/, web3.eth.getBlockNumber()
                        //TODO get peer count
                    ];
                case 4:
                    _c.height = _g.sent();
                    //TODO get peer count
                    _d = output;
                    return [4 /*yield*/, web3.eth.net.getPeerCount()];
                case 5:
                    //TODO get peer count
                    _d.peers = _g.sent();
                    networkName = void 0;
                    switch (output.chainId.toString()) {
                        case "1":
                            networkName = "Main";
                            break;
                        case "2":
                            networkName = "Morden";
                            break;
                        case "3":
                            networkName = "Ropsten";
                            break;
                        case "4":
                            networkName = "Rinkeby";
                            break;
                        case "42":
                            networkName = "Kovan";
                            break;
                        default:
                            networkName = "Unknown";
                    }
                    output.networkName = networkName;
                    //
                    _e = output;
                    return [4 /*yield*/, web3.eth.getGasPrice()
                        //
                    ];
                case 6:
                    //
                    _e.gasPrice = _g.sent();
                    //
                    _f = output;
                    return [4 /*yield*/, web3.eth.isSyncing()];
                case 7:
                    //
                    _f.syncing = _g.sent();
                    return [2 /*return*/, output];
                case 8:
                    e_12 = _g.sent();
                    console.error(tag, e_12);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
};
