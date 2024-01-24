"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableChainsByWallet = void 0;
const types_1 = require("@pioneer-platform/types");
//Support Array
const AllChainsSupported = [
    types_1.Chain.Arbitrum,
    types_1.Chain.Avalanche,
    types_1.Chain.Binance,
    types_1.Chain.BinanceSmartChain,
    types_1.Chain.Bitcoin,
    types_1.Chain.BitcoinCash,
    types_1.Chain.Cosmos,
    types_1.Chain.Dogecoin,
    types_1.Chain.Ethereum,
    types_1.Chain.Litecoin,
    types_1.Chain.Optimism,
    types_1.Chain.Polygon,
    types_1.Chain.THORChain,
];
exports.availableChainsByWallet = {
    [types_1.WalletOption.BRAVE]: types_1.EVMChainList,
    [types_1.WalletOption.COINBASE_WEB]: types_1.EVMChainList,
    [types_1.WalletOption.KEPLR]: [types_1.Chain.Cosmos],
    [types_1.WalletOption.KEYSTORE]: AllChainsSupported,
    [types_1.WalletOption.LEDGER]: AllChainsSupported,
    [types_1.WalletOption.TREZOR]: [
        types_1.Chain.Bitcoin,
        types_1.Chain.BitcoinCash,
        types_1.Chain.Litecoin,
        types_1.Chain.Dogecoin,
        types_1.Chain.Ethereum,
        types_1.Chain.Avalanche,
        types_1.Chain.BinanceSmartChain,
    ],
    [types_1.WalletOption.KEEPKEY]: AllChainsSupported,
    [types_1.WalletOption.METAMASK]: [
        types_1.Chain.Arbitrum,
        types_1.Chain.Avalanche,
        types_1.Chain.BinanceSmartChain,
        types_1.Chain.Bitcoin,
        types_1.Chain.BitcoinCash,
        types_1.Chain.Cosmos,
        types_1.Chain.Dogecoin,
        types_1.Chain.Ethereum,
        types_1.Chain.Litecoin,
        types_1.Chain.Optimism,
        types_1.Chain.Polygon,
        types_1.Chain.THORChain,
    ],
    [types_1.WalletOption.TRUSTWALLET_WEB]: types_1.EVMChainList,
    [types_1.WalletOption.XDEFI]: AllChainsSupported,
    [types_1.WalletOption.WALLETCONNECT]: [
        types_1.Chain.Ethereum,
        types_1.Chain.Binance,
        types_1.Chain.BinanceSmartChain,
        types_1.Chain.Avalanche,
        types_1.Chain.THORChain,
    ],
    [types_1.WalletOption.OKX]: [
        types_1.Chain.Ethereum,
        types_1.Chain.Avalanche,
        types_1.Chain.BinanceSmartChain,
        types_1.Chain.Bitcoin,
        types_1.Chain.Cosmos,
    ],
};
