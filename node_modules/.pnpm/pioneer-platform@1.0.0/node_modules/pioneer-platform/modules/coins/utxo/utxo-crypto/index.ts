/*
    Multisig Crypto gen

 */
const bip39 = require(`bip39`)
const bip32 = require(`bip32`)
const bech32 = require(`bech32`)
const secp256k1 = require(`secp256k1`)
const sha256 = require("crypto-js/sha256")
const ripemd160 = require("crypto-js/ripemd160")
const CryptoJS = require("crypto-js")
const HDKey = require('hdkey')
let bitcoin = require("bitcoinjs-lib");
const log = require('@pioneer-platform/loggerdog')()
var b58 = require('bs58check');
const BIP84 = require('bip84')
var wif = require('wif')

/**********************************
 // Module
 //**********************************/



enum COIN_SUPPORT_ENUM {
    BTC,
    BCH,
    DASH,
    DGB,
    DOGE,
    LTC,
    RDD,
}


const COIN_SUPPORT = [
    'BTC',
    'TEST',
    // 'BCH',
    // 'DASH',
    // 'DGB',
    // 'DOGE',
    'LTC',
    // 'RDD',
]

const SLIP_44:any = {
    BTC: 0,
    TEST: 1,
    BCH:145,
    LTC: 2,
    DOGE: 3,
    RDD: 4,
    DASH: 5,
    DGB: 20
}

const NETWORKS:any = {
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
    },
    testnet: {
        base: {
            messagePrefix: "\x18Bitcoin Signed Message:\n",
            bech32: "tb",
            pubKeyHash: 0x6f,
            scriptHash: 0xc4,
            wif: 0xef,
        },
        p2sh: {
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
        },
        p2pkh: {
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
        },
        "p2sh-p2wpkh": {
            bip32: {
                public: 0x044a5262,
                private: 0x044a4e28,
            },
        },
        p2wpkh: {
            bip32: {
                public: 0x045f1cf6,
                private: 0x045f18bc,
            },
        },
    },
}


// TYPES

interface CoinInfo {
    privateKey:string
    coin: string
    master:string
    publicKey:string,
    xpub:string,
    zpub?:string
}

interface Wallet {
    coins: {
        [index: string]: CoinInfo
    }
}

// All known xpub formats
const prefixes:any = new Map(
    [
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
    ]
);

enum AddressTypes {
    "bech32",
    "legacy"
}



module.exports = {
    xpubConvert: async function (xpub:string,target:string) {
        if (!prefixes.has(target)) {
            return "Invalid target version";
        }

        // trim whitespace
        xpub = xpub.trim();

        var data = b58.decode(xpub);
        data = data.slice(4);
        data = Buffer.concat([Buffer.from(prefixes.get(target),'hex'), data]);
        return b58.encode(data);
    },
    generateAddressZpub: async function (zpub:string,index:number,isChange:boolean,type:string) {
        var account1 = new BIP84.fromZPub(zpub)
        let address = account1.getAddress(index,isChange)
        return address
    },
    generatePubkey: async function (xpub:string,index:number,isChange:boolean,type:string) {
        let account = 1
        //if(isChange) account = 0
        let publicKey = bitcoin.bip32.fromBase58(xpub).derive(account).derive(index).publicKey
        log.debug("publicKey: ",publicKey)
        return publicKey.toString(`hex`)
    },
    generateAddress: async function (coin:string,pubkey:any,scriptType:string,isTestnet:boolean) {
        //
        let output:any

        switch(coin) {
            case 'BTC':
                if(isTestnet){
                    const { address } = bitcoin.payments.p2pkh({
                        pubkey: Buffer.from(pubkey,'hex'),
                        network: NETWORKS['testnet'].base
                    })
                    output = address
                }else{
                    //if no type default to bech32
                    if(!scriptType) scriptType = 'bech32'

                    if(scriptType === 'bech32'){
                        const { address } = bitcoin.payments.p2wpkh({ pubkey: Buffer.from(pubkey,'hex') });
                        output = address
                    } else if(scriptType === 'legacy'){
                        const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(pubkey,'hex') });
                        output = address
                    }
                }


                break;
            default:
                if(!NETWORKS[coin.toLowerCase()]) throw Error("103: unknown coin, no network found! coin: "+coin)
                const { address } = bitcoin.payments.p2pkh({
                    pubkey: Buffer.from(pubkey,'hex'),
                    network: NETWORKS[coin.toLowerCase()]
                })

                output = address
                break;
        }


        return output
    },
    generateMultiSigAddress: async function (pubkeys:any,m:number) {
        const { address } = bitcoin.payments.p2wsh({
            redeem: bitcoin.payments.p2ms({ m, pubkeys }),
        });
        return address
    },
    generateAddressPrivkey: async function (mnemonic:string,path:string) {
        const seed = await bip39.mnemonicToSeed(mnemonic)
        let mk = new HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))

        //parse path
        // "m/44'/714'/0'/0/093"
        mk = mk.derive(path)
        let privateKey = mk.privateKey
        let publicKey = mk.publicKey

        //let address = createBNBAddress(mk.publicKey)

        return {privateKey,publicKey}
    },
    generateWalletFromSeed: async function (mnemonic:string,isTestnet?:boolean) {
        let output:Wallet = {
            coins:{}
        }
        //for each coin
        for(let i = 0; i < COIN_SUPPORT.length; i++){
            let coin = COIN_SUPPORT[i]

            let pathXpub = "m/44'/"+SLIP_44[coin]+"'/0'"
            log.info("path: ",pathXpub)
            const {xpub} = await deriveMasterKey(mnemonic,pathXpub)


            let pathMaster = "m/44'/"+SLIP_44[coin]+"'/0'/0/0"
            //let pathMaster = "m/44'/"+SLIP_44[coin]+"'/1'"
            log.info("pathMaster: ",pathMaster)
            const {masterKey} = await deriveMasterKey(mnemonic,pathXpub)

            const { privateKey, publicKey } = deriveKeypair(masterKey,pathMaster)
            //const bnbAddress = createBNBAddress(publicKey)


            // let master = bitcoin.bip32.fromBase58(xpub).derive(0).derive(0)
            let addressMaster:string = ""
            if(coin === "BTC" || true){
                const { address } = bitcoin.payments.p2sh({
                    redeem: bitcoin.payments.p2wpkh({ pubkey: publicKey, network:NETWORKS[coin.toLowerCase()] }),
                    network:NETWORKS[coin.toLowerCase()],
                });
                addressMaster = address

                //  const { address } = bitcoin.payments.p2wpkh({ pubkey: publicKey, network:NETWORKS[coin.toLowerCase()] });
                // addressMaster = address
            } else {
                const { address } = bitcoin.payments.p2pkh({ pubkey: publicKey, network:NETWORKS[coin.toLowerCase()] });
                addressMaster = address
            }

            log.info(addressMaster)

            let coinInfo: any = {
                coin,
                master:addressMaster,
                //privateKey:privateKey.toString('hex'),
                privateKey:privateKey.toString(`hex`),
                privateKeyWif:wif.encode(128, privateKey, true),
                publicKey:publicKey.toString(`hex`),
                xpub
            }

            if(coin === "TEST"){
                //get tpub
                let tpub = await this.xpubConvert(xpub,'tpub')
                coinInfo.tpub = tpub
            }

            if(coin === "BTC"){
                let root = new BIP84.fromSeed(mnemonic)
                let child0 = root.deriveAccount(0)
                let account0 = new BIP84.fromZPrv(child0)
                let zpub = account0.getAccountPublicKey()
                let master = account0.getAddress(0)
                log.info("master: ",master)
                coinInfo.master = account0.getAddress(0)
                coinInfo.zpub = zpub
            }

            log.info({coinInfo})

            output.coins[coin] = coinInfo

        }
        return output
    },
    generateSeed: function () {
        let randomBytesFunc = standardRandomBytesFunc
        const randomBytes = Buffer.from(randomBytesFunc(32), `hex`)
        if (randomBytes.length !== 32) throw Error(`Entropy has incorrect length`)
        const mnemonic = bip39.entropyToMnemonic(randomBytes.toString(`hex`))
        return mnemonic
    },
}

//get Xpub


function standardRandomBytesFunc(size:any) {
    /* istanbul ignore if: not testable on node */

    return CryptoJS.lib.WordArray.random(size).toString()
}



async function deriveMasterKey(mnemonic:string,path:string) {
    // throws if mnemonic is invalid
    bip39.validateMnemonic(mnemonic)

    const seed = await bip39.mnemonicToSeed(mnemonic)
    // let masterKey =  new HDKey.fromMasterSeed(new Buffer(seed, 'hex'), coininfo(network).versions.bip32.versions)
    // log.debug("masterKey: ",masterKey)
    let mk = new HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
    log.debug(mk.publicExtendedKey)

    //get key
    mk = mk.derive(path)
    log.debug(mk.publicExtendedKey)

    //get correct address with xpub
    let xpub = mk.publicExtendedKey
    log.debug("xpub: ",xpub)

    let publicKey = bitcoin.bip32.fromBase58(xpub).derive(0).publicKey
    log.debug("publicKey: ",publicKey)

    const masterKey = bip32.fromSeed(seed)
    return {masterKey,xpub}
}

function deriveKeypair(masterKey:any,path:string) {
    const master = masterKey.derivePath(path)
    const privateKey = master.privateKey
    const publicKey = secp256k1.publicKeyCreate(privateKey, true)

    return {
        privateKey,
        publicKey
    }
}


