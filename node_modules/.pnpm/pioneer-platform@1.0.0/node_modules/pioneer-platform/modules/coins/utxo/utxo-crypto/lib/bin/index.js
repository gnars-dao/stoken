"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
    Multisig Crypto gen

 */
const bip39 = require(`bip39`);
const bip32 = require(`bip32`);
const bech32 = require(`bech32`);
const secp256k1 = require(`secp256k1`);
const sha256 = require("crypto-js/sha256");
const ripemd160 = require("crypto-js/ripemd160");
const CryptoJS = require("crypto-js");
const HDKey = require('hdkey');
let bitcoin = require("bitcoinjs-lib");
const log = require('@pioneer-platform/loggerdog')();
var b58 = require('bs58check');
const BIP84 = require('bip84');
/**********************************
 // Module
 //**********************************/
var COIN_SUPPORT_ENUM;
(function (COIN_SUPPORT_ENUM) {
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["BTC"] = 0] = "BTC";
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["BCH"] = 1] = "BCH";
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["DASH"] = 2] = "DASH";
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["DGB"] = 3] = "DGB";
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["DOGE"] = 4] = "DOGE";
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["LTC"] = 5] = "LTC";
    COIN_SUPPORT_ENUM[COIN_SUPPORT_ENUM["RDD"] = 6] = "RDD";
})(COIN_SUPPORT_ENUM || (COIN_SUPPORT_ENUM = {}));
const COIN_SUPPORT = [
    'BTC',
];
const SLIP_44 = {
    BTC: 0,
    BCH: 145,
    LTC: 2,
    DOGE: 3,
    RDD: 4,
    DASH: 5,
    DGB: 20
};
const NETWORKS = {
    btc: {
        messagePrefix: '\x18Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
            public: 0x0488b21e,
            private: 0x0488ade4
        },
        pubKeyHash: 0x00,
        scriptHash: 0x05,
        wif: 0x80
    },
    bch: {
        messagePrefix: '\x18Bitcoin Cash Signed Message:\n',
        bip32: {
            public: 0x0488B21e,
            private: 0x0488ade4
        },
        pubKeyHash: 0x00,
        scriptHash: 0x05,
        wif: 0x80
    },
    test: {
        messagePrefix: '\x18Bitcoin Signed Message:\n',
        bech32: 'tb',
        bip32: {
            public: 0x043587cf,
            private: 0x04358394
        },
        pubKeyHash: 0x6f,
        scriptHash: 0xc4,
        wif: 0xef
    },
    ltc: {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bip32: {
            public: 0x019da462,
            private: 0x019d9cfe
        },
        pubKeyHash: 0x30,
        scriptHash: 0x32,
        wif: 0xb0
    },
    doge: {
        messagePrefix: '\x19Dogecoin Signed Message:\n',
        bip32: {
            public: 0x02FD3929,
            private: 0x02FD3955
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x16,
        wif: 0x9e
    },
    dash: {
        messagePrefix: 'unused',
        bip32: {
            public: 0x0488b21e,
            private: 0x0488ade4
        },
        pubKeyHash: 0x4c,
        scriptHash: 0x10,
        wif: 0xcc
    },
    dgb: {
        messagePrefix: '\x18DigiByte Signed Message:\n',
        bip32: {
            public: 0x0488B21E,
            private: 0x0488ADE4,
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x3f,
        wif: 0x80,
    },
    rdd: {
        messagePrefix: '\x18Reddcoin Signed Message:\n',
        bip32: {
            public: 0x0488B21E,
            private: 0x0488ADE4,
        },
        pubKeyHash: 0x3d,
        scriptHash: 0x05,
        wif: 0xbd,
    }
};
// All known xpub formats
const prefixes = new Map([
    ['xpub', '0488b21e'],
    ['ypub', '049d7cb2'],
    ['Ypub', '0295b43f'],
    ['zpub', '04b24746'],
    ['Zpub', '02aa7ed3'],
    ['tpub', '043587cf'],
    ['upub', '044a5262'],
    ['Upub', '024289ef'],
    ['vpub', '045f1cf6'],
    ['Vpub', '02575483'],
    ['Ltub', '02575483'],
]);
var AddressTypes;
(function (AddressTypes) {
    AddressTypes[AddressTypes["bech32"] = 0] = "bech32";
    AddressTypes[AddressTypes["legacy"] = 1] = "legacy";
})(AddressTypes || (AddressTypes = {}));
module.exports = {
    xpubConvert: function (xpub, target) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!prefixes.has(target)) {
                return "Invalid target version";
            }
            // trim whitespace
            xpub = xpub.trim();
            var data = b58.decode(xpub);
            data = data.slice(4);
            data = Buffer.concat([Buffer.from(prefixes.get(target), 'hex'), data]);
            return b58.encode(data);
        });
    },
    generateAddressZpub: function (zpub, index, isChange, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var account1 = new BIP84.fromZPub(zpub);
            let address = account1.getAddress(index, isChange);
            return address;
        });
    },
    generatePubkey: function (xpub, index, isChange, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let account = 1;
            //if(isChange) account = 0
            let publicKey = bitcoin.bip32.fromBase58(xpub).derive(account).derive(index).publicKey;
            log.debug("publicKey: ", publicKey);
            return publicKey.toString(`hex`);
        });
    },
    generateAddress: function (coin, pubkey, scriptType, isTestnet) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            let output;
            switch (coin) {
                case 'BTC':
                    if (isTestnet) {
                        const { address } = bitcoin.payments.p2pkh({
                            pubkey: Buffer.from(pubkey, 'hex'),
                            network: NETWORKS['testnet']
                        });
                    }
                    else {
                        //if no type default to bech32
                        if (!scriptType)
                            scriptType = 'bech32';
                        if (scriptType === 'bech32') {
                            const { address } = bitcoin.payments.p2wpkh({ pubkey: Buffer.from(pubkey, 'hex') });
                            output = address;
                        }
                        else if (scriptType === 'legacy') {
                            const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(pubkey, 'hex') });
                            output = address;
                        }
                    }
                    break;
                default:
                    if (!NETWORKS[coin.toLowerCase()])
                        throw Error("103: unknown coin, no network found! coin: " + coin);
                    const { address } = bitcoin.payments.p2pkh({
                        pubkey: Buffer.from(pubkey, 'hex'),
                        network: NETWORKS[coin.toLowerCase()]
                    });
                    output = address;
                    break;
            }
            return output;
        });
    },
    generateMultiSigAddress: function (pubkeys, m) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address } = bitcoin.payments.p2wsh({
                redeem: bitcoin.payments.p2ms({ m, pubkeys }),
            });
            return address;
        });
    },
    generateAddressPrivkey: function (mnemonic, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const seed = yield bip39.mnemonicToSeed(mnemonic);
            let mk = new HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
            //parse path
            // "m/44'/714'/0'/0/093"
            mk = mk.derive(path);
            let privateKey = mk.privateKey;
            let publicKey = mk.publicKey;
            //let address = createBNBAddress(mk.publicKey)
            return { privateKey, publicKey };
        });
    },
    generateWalletFromSeed: function (mnemonic) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = {
                coins: {}
            };
            //for each coin
            for (let i = 0; i < COIN_SUPPORT.length; i++) {
                let coin = COIN_SUPPORT[i];
                let path = "m/44'/" + SLIP_44[coin] + "'/0'";
                const { masterKey, xpub } = yield deriveMasterKey(mnemonic, path);
                //
                const { privateKey, publicKey } = deriveKeypair(masterKey, path);
                //const bnbAddress = createBNBAddress(publicKey)
                // let master = bitcoin.bip32.fromBase58(xpub).derive(0).derive(0)
                let addressMaster = "";
                if (coin === "BTC") {
                    const { address } = bitcoin.payments.p2wpkh({ pubkey: publicKey, network: NETWORKS[coin.toLowerCase()] });
                    addressMaster = address;
                }
                else {
                    const { address } = bitcoin.payments.p2pkh({ pubkey: publicKey, network: NETWORKS[coin.toLowerCase()] });
                    addressMaster = address;
                }
                log.info(addressMaster);
                let coinInfo = {
                    coin,
                    master: addressMaster,
                    privateKey: privateKey.toString('hex'),
                    publicKey: publicKey.toString(`hex`),
                    xpub
                };
                if (coin === "BTC") {
                    let root = new BIP84.fromSeed(mnemonic);
                    let child0 = root.deriveAccount(0);
                    let account0 = new BIP84.fromZPrv(child0);
                    let zpub = account0.getAccountPublicKey();
                    coinInfo.zpub = zpub;
                }
                log.info({ coinInfo });
                output.coins[coin] = coinInfo;
            }
            return output;
        });
    },
    generateSeed: function () {
        let randomBytesFunc = standardRandomBytesFunc;
        const randomBytes = Buffer.from(randomBytesFunc(32), `hex`);
        if (randomBytes.length !== 32)
            throw Error(`Entropy has incorrect length`);
        const mnemonic = bip39.entropyToMnemonic(randomBytes.toString(`hex`));
        return mnemonic;
    },
};
//get Xpub
function standardRandomBytesFunc(size) {
    /* istanbul ignore if: not testable on node */
    return CryptoJS.lib.WordArray.random(size).toString();
}
function deriveMasterKey(mnemonic, path) {
    return __awaiter(this, void 0, void 0, function* () {
        // throws if mnemonic is invalid
        bip39.validateMnemonic(mnemonic);
        const seed = yield bip39.mnemonicToSeed(mnemonic);
        // let masterKey =  new HDKey.fromMasterSeed(new Buffer(seed, 'hex'), coininfo(network).versions.bip32.versions)
        // log.debug("masterKey: ",masterKey)
        let mk = new HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));
        log.debug(mk.publicExtendedKey);
        //get key
        mk = mk.derive(path);
        log.debug(mk.publicExtendedKey);
        //get correct address with xpub
        let xpub = mk.publicExtendedKey;
        log.debug("xpub: ", xpub);
        let publicKey = bitcoin.bip32.fromBase58(xpub).derive(0).derive(0).publicKey;
        log.debug("publicKey: ", publicKey);
        const masterKey = bip32.fromSeed(seed);
        return { masterKey, xpub };
    });
}
function deriveKeypair(masterKey, path) {
    const master = masterKey.derivePath(path);
    const privateKey = master.privateKey;
    const publicKey = secp256k1.publicKeyCreate(privateKey, true);
    return {
        privateKey,
        publicKey
    };
}
//# sourceMappingURL=index.js.map