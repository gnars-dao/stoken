"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bech32ify = exports.bip32ToAddressNList = exports.bip32Like = exports.getBase = void 0;
var bech32 = require("bech32");
var supportedCoins = [
    "Bitcoin",
    "Testnet",
    "BitcoinCash",
    "BitcoinGold",
    "Litecoin",
    "EOS",
    "FIO",
    "Dash",
    "DigiByte",
    "Dogecoin",
];
var PoScoins;
(function (PoScoins) {
    PoScoins[PoScoins["EOS"] = 0] = "EOS";
    PoScoins[PoScoins["ATOM"] = 1] = "ATOM";
})(PoScoins || (PoScoins = {}));
var stakingCoins = ["EOS", "ATOM"];
var segwitCoins = ["Bitcoin", "Testnet", "BitcoinGold", "Litecoin"];
var COIN_MAP = {
    Bitcoin: "BTC",
    Cosmos: "ATOM",
    Testnet: "BTCT",
    BitcoinCash: "BCH",
    Litecoin: "LTC",
    Dash: "DASH",
    DigiByte: "DGB",
    Dogecoin: "DOGE",
    Ethereum: "ETH",
    Cardano: "ADA",
    Binance: "BNB",
    Eos: "EOS",
    EOS: "EOS",
    Fio: "FIO",
    FIO: "FIO",
};
var COIN_MAP_LONG = {
    BTC: "Bitcoin",
    ATOM: "Cosmos",
    BTCT: "testnet",
    BCH: "BitcoinCash",
    LTC: "Litecoin",
    DASH: "Dash",
    DGB: "DigiByte",
    DOGE: "Dogecoin",
    ETH: "Ethereum",
    ADA: "Cardano",
    BNB: "Binance",
    EOS: "Eos",
    FIO: "Fio",
};
var HD_ATOM_KEYPATH = "m/44'/118'/0'/0/0";
var ATOM_CHAIN = "cosmoshub-3";
var ATOM_BASE = 1000000;
var ATOM_TX_FEE = "100";
var ATOM_MAX_GAS = "100000";
var HD_BNB_KEYPATH = "44'/714'/0'/0/";
var BNB_ASSET_SYMBOL = "BNB";
var BNB_CHAIN = "";
var BNB_MAX_GAS = "100000";
var BNB_TX_FEE = "100";
var BNB_BASE = 100000000;
var HD_EOS_KEYPATH = "44'/194'/0'/0/";
var EOS_ASSET_SYMBOL = "EOS";
var EOS_CHAIN = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";
var EOS_MAX_GAS = "100000";
var EOS_TX_FEE = "100";
var EOS_BASE = 1000;
var ETH_BASE = 1000000000000000000;
var HARDENED = 0x80000000;
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
