"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaths = void 0;
function getPaths(isTestnet, blockchains) {
    var output = [];
    if (!blockchains)
        blockchains = [];
    if (process.env['FEATURE_BITCOIN_BLOCKCHAIN'] || blockchains.indexOf('bitcoin') >= 0) {
        if (isTestnet) {
            output.push({
                note: "Bitcoin testnet account 0",
                coin: 'Bitcoin',
                testnet: true,
                symbol: 'BTC',
                network: 'BTC',
                script_type: "p2wpkh",
                available_scripts_types: ['p2pkh', 'p2sh', 'p2wpkh', 'p2sh-p2wpkh'],
                type: "zpub",
                addressNList: [0x80000000 + 44, 0x80000000 + 1, 0x80000000 + 0],
                addressNListMaster: [0x80000000 + 44, 0x80000000 + 1, 0x80000000 + 0, 0, 0],
                curve: 'secp256k1',
                showDisplay: true // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            });
        }
        else {
            output.push({
                note: "Bitcoin account 0",
                coin: 'Bitcoin',
                symbol: 'BTC',
                network: 'BTC',
                script_type: "p2wpkh",
                available_scripts_types: ['p2pkh', 'p2sh', 'p2wpkh', 'p2sh-p2wpkh'],
                type: "zpub",
                addressNList: [0x80000000 + 44, 0x80000000 + 0, 0x80000000 + 0],
                addressNListMaster: [0x80000000 + 44, 0x80000000 + 0, 0x80000000 + 0, 0, 0],
                curve: 'secp256k1',
                showDisplay: true // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            });
        }
    }
    if (process.env['FEATURE_ETHEREUM_BLOCKCHAIN'] || blockchains.indexOf('ethereum') >= 0) {
        var entry = {
            note: " ETH primary (default)",
            symbol: 'ETH',
            network: 'ETH',
            script_type: "ethereum",
            available_scripts_types: ['ethereum'],
            type: "address",
            addressNList: [0x80000000 + 44, 0x80000000 + 60, 0x80000000 + 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 60, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true,
            coin: 'Ethereum'
        };
        if (isTestnet)
            entry.testnet = true;
        output.push(entry);
    }
    if (process.env['FEATURE_THORCHAIN_BLOCKCHAIN'] || blockchains.indexOf('thorchain') >= 0) {
        var entry = {
            note: " Default RUNE path ",
            type: "address",
            addressNList: [0x80000000 + 44, 0x80000000 + 931, 0x80000000 + 0, 0, 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 931, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            script_type: "thorchain",
            showDisplay: true,
            coin: 'Thorchain',
            symbol: 'RUNE',
            network: 'RUNE',
        };
        if (isTestnet) {
            entry.testnet = true;
        }
        output.push(entry);
    }
    if (process.env['FEATURE_SECRET_BLOCKCHAIN'] || blockchains.indexOf('secret') >= 0) {
        var entry = {
            note: " Default Secret path ",
            type: "address",
            addressNList: [0x80000000 + 44, 0x80000000 + 931, 0x80000000 + 0, 0, 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 931, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            script_type: "thorchain",
            showDisplay: true,
            coin: 'Thorchain',
            symbol: 'RUNE',
            network: 'RUNE',
        };
        if (isTestnet) {
            entry.testnet = true;
        }
        output.push(entry);
    }
    if (process.env['FEATURE_COSMOS_BLOCKCHAIN'] || blockchains.indexOf('cosmos') >= 0) {
        var entry = {
            note: " Default ATOM path ",
            type: "address",
            script_type: "cosmos",
            available_scripts_types: ['cosmos'],
            addressNList: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0, 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true,
            coin: 'Cosmos',
            symbol: 'ATOM',
            network: 'ATOM',
        };
        if (isTestnet) {
            entry.testnet = true;
        }
        output.push(entry);
    }
    if (process.env['FEATURE_BINANCE_BLOCKCHAIN'] || blockchains.indexOf('binance') >= 0) {
        var entry = {
            note: "Binance default path",
            type: "address",
            script_type: "binance",
            available_scripts_types: ['binance'],
            addressNList: [0x80000000 + 44, 0x80000000 + 714, 0x80000000 + 0, 0, 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 714, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true,
            coin: 'Binance',
            symbol: 'BNB',
            network: 'BNB',
        };
        if (isTestnet) {
            entry.testnet = true;
        }
        output.push(entry);
    }
    if (process.env['FEATURE_BITCOINCASH_BLOCKCHAIN'] || blockchains.indexOf('bitcoincash') >= 0) {
        var entry = {
            note: "Bitcoin Cash Default path",
            type: "xpub",
            script_type: "p2pkh",
            available_scripts_types: ['p2pkh'],
            addressNList: [0x80000000 + 44, 0x80000000 + 145, 0x80000000 + 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 145, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true,
            coin: 'BitcoinCash',
            symbol: 'BCH',
            network: 'BCH',
        };
        if (isTestnet) {
            entry.testnet = true;
        }
        output.push(entry);
    }
    if (process.env['FEATURE_LITECOIN_BLOCKCHAIN'] || blockchains.indexOf('litecoin') >= 0) {
        var entry = {
            note: "Litecoin Default path",
            type: "xpub",
            script_type: "p2pkh",
            available_scripts_types: ['p2pkh'],
            addressNList: [0x80000000 + 44, 0x80000000 + 2, 0x80000000 + 0],
            addressNListMaster: [0x80000000 + 44, 0x80000000 + 2, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true,
            coin: 'Litecoin',
            symbol: 'LTC',
            network: 'LTC',
        };
        if (isTestnet) {
            entry.testnet = true;
        }
        output.push(entry);
    }
    return output;
}
exports.getPaths = getPaths;
// {
//     note:"",
//     type:"address",
//     script_type:"binance",
//     available_scripts_types:['binance'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 714, 0x80000000 + 0, 0 , 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Binance',
//     symbol: 'BNB',
//     network: 'BNB',
// },
// {
//     note:" Default ATOM path ",
//     type:"address",
//     script_type:"cosmos",
//     available_scripts_types:['cosmos'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0, 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Cosmos',
//     symbol: 'ATOM',
//     network: 'ATOM',
// },
//TODO More paths
// [
//
// // {
// //     note:"Bitcoin account 1",
// //     coin: 'Bitcoin',
// //     symbol: 'BTC',
// //     network: 'BTC',
// //     script_type:"p2pkh",
// //     available_scripts_types:['p2pkh'],
// //     type:"xpub",
// //     addressNList: [0x80000000 + 44, 0x80000000 + 0, 0x80000000 + 1],
// //     curve: 'secp256k1',
// //     showDisplay: true // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// // },
// // {
// //     note:"bitcoin segwit bip49",
// //     coin: 'Bitcoin',
// //     symbol: 'BTC',
// //     network: 'BTC',
// //     script_type:"p2pkh",
// //     available_scripts_types:['p2pkh'],
// //     type:"xpub",
// //     addressNList: [0x80000000 + 49, 0x80000000 + 0, 0x80000000 + 0],
// //     curve: 'secp256k1',
// //     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// //     scriptType: 'p2sh'
// // },
// {
//     note:"Standard bitcoin cash default path",
//     type:"xpub",
//     script_type:"p2pkh",
//     available_scripts_types:['p2pkh'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 145, 0x80000000 + 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'BitcoinCash',
//     symbol: 'BCH',
//     network: 'BCH',
// },
// {
//     note:"Default litecoin path",
//     coin: 'Litecoin',
//     symbol: 'LTC',
//     network: 'LTC',
//     script_type:"p2pkh",
//     available_scripts_types:['p2pkh'],
//     type:"xpub",
//     addressNList: [0x80000000 + 44, 0x80000000 + 2, 0x80000000 + 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// },
// {
//     note:"Default dogecoin path",
//     coin: 'Dogecoin',
//     symbol: 'DOGE',
//     network: 'DOGE',
//     script_type:"p2pkh",
//     available_scripts_types:['p2pkh'],
//     type:"xpub",
//     addressNList: [0x80000000 + 44, 0x80000000 + 3, 0x80000000 + 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// },
// {
//     note:"Default dash path",
//     coin: 'Dash',
//     symbol: 'DASH',
//     network: 'DASH',
//     script_type:"p2pkh",
//     available_scripts_types:['p2pkh'],
//     type:"xpub",
//     addressNList: [0x80000000 + 44, 0x80000000 + 5, 0x80000000 + 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// },
// {
//     note:" ETH primary (default)",
//     symbol: 'ETH',
//     network: 'ETH',
//     script_type:"eth",
//     available_scripts_types:['eth'],
//     type:"address",
//     addressNList: [0x80000000 + 44, 0x80000000 + 60, 0x80000000 + 0,0,0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Ethereum'
// },
// // {
// //     note:" ETH primary (ledger)",
// //     symbol: 'ETH',
// //     network: 'ETH',
// //     script_type:"eth",
// //     available_scripts_types:['eth'],
// //     type:"address",
// //     addressNList: [0x80000000 + 44, 0x80000000 + 60, 0],
// //     curve: 'secp256k1',
// //     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// //     coin: 'Ethereum'
// // },
// {
//     note:"Fio primary",
//     type:"address",
//     script_type:"fio",
//     available_scripts_types:['fio'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 235, 0x80000000 + 0, 0, 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Fio',
//     symbol: 'FIO',
//     network: 'FIO',
// },
// {
//     note:" Default eos path ",
//     type:"address",
//     script_type:"eos",
//     available_scripts_types:['eos'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 194, 0x80000000 + 0, 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Eos',
//     symbol: 'EOS',
//     network: 'EOS',
// },
// {
//     note:"",
//     type:"address",
//     script_type:"binance",
//     available_scripts_types:['binance'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 714, 0x80000000 + 0, 0 , 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Binance',
//     symbol: 'BNB',
//     network: 'BNB',
// },
// {
//     note:" Default ATOM path ",
//     type:"address",
//     script_type:"cosmos",
//     available_scripts_types:['cosmos'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0, 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Cosmos',
//     symbol: 'ATOM',
//     network: 'ATOM',
// },
// {
//     note:" Default RUNE path ",
//     type:"address",
//     script_type:"tthor",
//     available_scripts_types:['tthor'],
//     addressNList: [0x80000000 + 44, 0x80000000 + 931, 0x80000000 + 0, 0, 0],
//     curve: 'secp256k1',
//     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
//     coin: 'Thorchain',
//     symbol: 'RUNE',
//     network: 'RUNE',
// },
// // {
// //     note:"",
// //     type:"address",
// //     addressNList: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0x80000000 + 0],
// //     curve: 'secp256k1',
// //     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
// //     coin: 'Cardano',
// //     symbol: 'ADA'
// // }
//
// ]
