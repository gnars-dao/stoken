"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressInfoForCoin = exports.Coin = void 0;
/*
        Validate universial addresses

 */
var log = require('@pioneer-platform/loggerdog')();
var paths_1 = require("./paths");
var coins_1 = require("./coins");
var Coin;
(function (Coin) {
    Coin["BTC"] = "Bitcoin";
    Coin["ATOM"] = "Cosmos";
    Coin["ARB"] = "Arbitrum";
    Coin["OSMO"] = "Osmosis";
    Coin["TEST"] = "Testnet";
    Coin["BCH"] = "BitcoinCash";
    Coin["LTC"] = "Litecoin";
    Coin["DASH"] = "Dash";
    Coin["DGB"] = "DigiByte";
    Coin["DOGE"] = "Dogecoin";
    Coin["RUNE"] = "Thorchain";
    Coin["ETH"] = "Ethereum";
    Coin["ADA"] = "Cardano";
    Coin["MATIC"] = "Polygon";
    Coin["BNB"] = "Binance";
    Coin["AVAX"] = "Avalanche";
    Coin["EOS"] = "Eos";
    Coin["FIO"] = "Fio";
})(Coin || (exports.Coin = Coin = {}));
var EVM_COINS = ["AVAX", "ARB", "MATIC", "AVAX", "BASE"];
var addressInfoForCoin = function (symbol, isTestnet, scriptType, showDisplay, path) {
    if (!isTestnet)
        isTestnet = false;
    if (!showDisplay)
        showDisplay = false;
    var paths = (0, paths_1.getPaths)(paths_1.blockchains);
    console.log("paths: ", paths);
    //thorswap hack
    if (symbol === "THOR")
        symbol = "RUNE";
    if (symbol === "GAIA")
        symbol = "ATOM";
    //if any EVM
    if (EVM_COINS.includes(symbol))
        symbol = "ETH";
    // log.info('paths', paths)
    symbol = symbol.toUpperCase();
    var blockchainEntries = paths.filter(function (entry) { return entry.symbol === symbol.toUpperCase(); });
    // log.info('blockchainEntries', blockchainEntries)
    if (!blockchainEntries) {
        throw new Error("Blockchain symbol '".concat(symbol, "' not found."));
    }
    var entry;
    if (scriptType && blockchainEntries.length > 1) {
        //filter path by script type
        entry = blockchainEntries.find(function (entry) { return entry.script_type === scriptType; });
    }
    else {
        entry = blockchainEntries[0];
    }
    //validate script type options
    if (!entry)
        throw new Error("Blockchain symbol '".concat(symbol, "' not found."));
    var addressInfo = {
        address_n: entry.addressNListMaster,
        path: (0, coins_1.addressNListToBIP32)(entry.addressNListMaster),
        // @ts-ignore
        coin: coins_1.COIN_MAP_KEEPKEY_LONG[symbol.toUpperCase()],
        script_type: scriptType || entry.script_type,
        showDisplay: entry.showDisplay
    };
    // if (isTestnet && blockchainEntry.testnet) {
    //     addressInfo.addressNList[1] += 1; // Incrementing the account index for testnet
    // }
    return addressInfo;
};
exports.addressInfoForCoin = addressInfoForCoin;
