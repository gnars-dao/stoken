
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


const TAG = " | utxo-api | "
const Axios = require('axios')
const https = require('https')
const axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
const log = require('@pioneer-platform/loggerdog')()
// const ElectrumClient = require('@pioneer-platform/electrum-client')
const bitcoin = require("bitcoinjs-lib");

import {
    TxHistoryParams,
    TxsPage,
    Address,
    XChainClient,
    Tx,
    TxParams,
    TxHash,
    Balance,
    Network,
    Fees,
    XChainClientParams,
} from '@xchainjs/xchain-client'

const BitcoinRpc = require('bitcoin-rpc-promise');
// import { Blockbook } from 'blockbook-client'

const blockbook = require('@pioneer-platform/blockbook')
import * as sochain from './sochain-api'
import { FeesWithRates, FeeRate, FeeRates } from './types/client-types'
import * as Utils from './utils'

let BLOCKBOOK:any
//if(!process.env['BTC_RPC_HOST'])

let coins = [
    'TBTC',
    'BCH'
    //'BTC',
    //'DOGE','DASH','DGB','BCH','LTC'
]

let nodeMap:any = {}
for(let i = 0; i < coins.length; i++){
    let coin = coins[i]
    let connString = 'https://user:hunter2@'+process.env[coin+'_RPC_HOST']
    //console.log("connString: ",connString)

    nodeMap[coin] = new BitcoinRpc(connString);
}
//log.info("nodeMap: ",nodeMap)

const URL_SOCHAIN = "https://sochain.com/api/v2"

const URL_BLOCKCHAIN_INFO = "http://blockchain.info"

const URL_BLOCKBOOK_BTC = ""

//let remote nodes
const URL_BTC_TIER_1 = "https://blockchain.info"

const URL_LTC_TIER_1 = "https://blockchain.info"

const URL_ETH_TIER_1 = "https://blockchain.info"

//const URL_BTC_INSIGHT_1 = "https://insight.bitpay.com/api"
const URL_BTC_SMART_1 = "https://api.smartbit.com.au/v1/blockchain/"

// let default
let DEFAULT_SERVERS:any = {
    "BTC":{
        host:"127.0.0.1",
        port:50001
    }
}


let ANYCOIN_COINS = ['BTC','LTC','BCH','DASH','DOGE']

let ELECTRUM_SERVERS:any = {}

const ASSET = "ANY"

let RUNTIME = 'pioneer'

const ONLINE = []
const OFFLINE = []


module.exports = {
    init:function (runtime:string,servers:any) {
    	return init_network(runtime,servers);
    },
    getInfo:function (coin:string) {
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
    txsMulti: function (coin:string,addresses:any) {
        return get_txs_by_addresses(coin,addresses);
    },
    txsByXpub: function (coin:string,addresses:any) {
        return get_txs_by_xpub(coin,addresses);
    },
    utxosByXpub: function (coin:string,xpub:any) {
        return get_utxos_by_xpub(coin,xpub);
    },
    getBalanceByXpub: function (coin:string,xpub:any) {
        return get_balance_by_xpub(coin,xpub);
    },
    getBalance: function (coin:string,address:string) {
        return get_balance_by_address(coin,address);
    },
    getBalances: function (coin:string,addresses:any) {
        return get_balance_by_addresses(coin,addresses);
    },
    // unspentInputs: function (coin:string,address:string) {
    //     return get_unspent_by_address(coin,address);
    // },
    // txsByHeight: function (height,address) {
    //     return get_txs_by_height(height,address);
    // },
    getBlockHeight:async function (coin:string) {
        return nodeMap[coin].getBlockCount();
    },
    getTransaction:function (coin:string,txid:string,format?:string) {
        return get_transaction(coin,txid,format);
    },
    // getBalance:function (address) {
    //     return get_balance(address);
    // },
    getFee:function (coin:string) {
        return get_fee(coin);
    },
    getFeeRates:function (coin:string,memo?:string) {
        return get_fees_with_rates(coin,memo);
    },
    getFeesWithMemo:function (coin:string,memo?:string) {
        return get_fees_with_memo(coin,memo);
    },
    getFeesWithRates:function (coin:string,memo?:string) {
        return get_fees_with_rates(coin,memo);
    },
    getBlock:function (coin:string,height:number) {
        return get_block(coin,height);
    },
    getBlockHash:function (coin:string,height:number) {
        return get_block_hash(coin,height);
    },
    decodeRawTransaction:function (coin:string,hex:string) {
        return nodeMap[coin].decodeRawTransaction(hex);
    },
    createRawTransaction:function (coin:string,hex:string) {
        return nodeMap[coin].decodeRawTransaction(hex);
    },
    broadcast:function (coin:string,tx:string) {
        return broadcast_transaction(coin,tx);
    },
    // getAccount:function (address) {
    //     return get_account(address);
    // },
    // getSequence:function (address) {
    //     return get_account_sequence(address);
    // },
    // getValidators:function () {
    //     return get_validators();
    // }
}

let get_fees_with_memo = async function(coin:string,memo?:string){
    let tag = TAG + " | get_fees_with_memo | "
    try{
        // @ts-ignore
        const { fees } = await get_fees_with_rates(<string>memo)
        return fees
    }catch(e){
        console.error(tag,e)
    }
}

let get_fees_with_rates = async function(coin:string,memo?:string){
    let tag = TAG + " | get_fees_with_rates | "
    try{
        let output:any = {}
        const txFee = await sochain.getSuggestedTxFee(coin.toLowerCase())
        console.log("txFee: ",txFee)

        const rates: FeeRates = {
            fastest: txFee * 5, //holy fuck
            fast: txFee * 1,
            average: txFee * 0.5,
        }

        const fees: Fees = {
            type: 'byte',
            fast: Utils.calcFee(rates.fast, memo),
            average: Utils.calcFee(rates.average, memo),
            fastest: Utils.calcFee(rates.fastest, memo),
        }

        return { fees, rates }
    }catch(e){
        console.error(tag,e)
    }
}

let get_fee = async function(coin:string){
    let tag = TAG + " | get_fee | "
    try{
        let output:any = {}
        if(coin === 'BTC'){
            //
            let query = "https://bitcoinfees.earn.com/api/v1/fees/recommended"

            output = await axios({method:'GET',url:query})
            log.info(tag,"output: ",output.data)
            output = output.data.fastestFee
        }else{
            //eh just send whatever, probally be fine
            throw Error("unknown coin! "+coin)
        }


        return output
    }catch(e){
        console.error(tag,e)
    }
}

let broadcast_transaction = async function(coin:string,tx:string){
    let tag = TAG + " | broadcast_transaction | "
    try{
        //use nodes
        // let txid = await nodeMap[coin].sendRawTransaction(tx)
        // return txid

        let txid = await blockbook.broadcast(coin,tx)
        return txid
    }catch(e){
        console.error(tag,e)
    }
}

let get_balance_by_addresses = async function(coin:string,addresses:any){
    let tag = TAG + " | get_balance_by_address | "
    try{

        let query = URL_BLOCKCHAIN_INFO + "/multiaddr?active="
        for(let i = 0; i < addresses.length; i++){
            let address = addresses[i]
            query = query + address + "|"
        }

        console.log(query)
        //let query =

        let balanceInfo = await axios({method:'GET',url:query})


        //https://blockchain.info/multiaddr?active=$address|$address

        return balanceInfo.data
    }catch(e){
        console.error(tag,e)
    }
}

let get_balance_by_address = async function(coin:string,address:string){
    let tag = TAG + " | get_balance_by_address | "
    try{
        //
        let balanceInfo = await axios({method:'GET',url:URL_BLOCKBOOK_BTC+'/address/'+address})


        return balanceInfo.data.balance
    }catch(e){
        console.error(tag,e)
    }
}

let get_utxos_by_xpub = async function(coin:string,xpub:string){
    let tag = TAG + " | get_utxos_by_xpub | "
    try{
        let output = await blockbook.utxosByXpub(coin,xpub)
        log.debug(tag,"output: ",output)

        return output
    }catch(e){
        console.error(tag,e)
    }
}

let get_balance_by_xpub = async function(coin:string,xpub:any){
    let tag = TAG + " | get_balance_by_xpub | "
    try{
        let output = await blockbook.utxosByXpub(coin,xpub)
        log.debug(tag,"output: ",output)

        let balance = 0

        //tally
        for(let i = 0; i < output.length; i++){
            let uxto = output[i]
            balance = balance + parseInt(uxto.value)
        }

        return balance / 100000000
    }catch(e){
        console.error(tag,e)
    }
}

let get_block_hash = async function(coin:string,height:number){
    let tag = TAG + " | get_node_info | "
    try{
        let blockHash = await nodeMap[coin].getBlockHash(height)
        log.debug(tag,"blockHash: ",blockHash)

        return blockHash
    }catch(e){
        console.error(tag,e)
    }
}


let init_network = async function (runtime:string,servers:any) {
    let tag = ' | get_txs_by_address | '
    try {
        log.debug(tag,"checkpoint: ")
        let output:any = []

        RUNTIME = runtime

        await blockbook.init()


        return true
    } catch (e) {
        console.error(tag, 'Error: ', e)
        throw e
    }
}


let get_transaction = async function (coin:string,txid:string,format?:string) {
    let tag = ' | get_transaction | '
    try {
        log.debug(tag,"checkpoint: ")
        let txInfo:any = {}

        let output = await blockbook.getTransaction(coin,txid)
        log.debug(tag,"output: ",output)


        return output
    } catch (e) {
        console.error(tag, 'Error: ', e)
        throw e
    }
}


let get_txs_by_xpub = async function (coin:string,xpub:string) {
    let tag = ' | get_txs_by_address | '
    try {
        log.debug(tag,"checkpoint: ",xpub)
        let output:any = []


        let url = "https://blockchain.info/" +"rawaddr/"+xpub

        //
        // let txInfo = await axios({method:'GET',url})


        // return txInfo.data
    } catch (e) {
        console.error(tag, 'Error: ', e)
        throw e
    }
}

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

let get_txs_by_addresses = async function (coin:string,addresses:any) {
    let tag = ' | get_txs_by_address | '
    try {
        log.debug(tag,"checkpoint: ",addresses)
        let output:any = []

        //tier 0



        //tier 1
        // let url = "https://blockchain.info/" +"multiaddr?active="+address
        // //
        // let txInfo = await axios({method:'GET',url})
        //
        //
        // return txInfo.data
    } catch (e) {
        console.error(tag, 'Error: ', e)
        throw e
    }
}

let get_txs_by_xpubs = async function (coin:string,xpub:string) {
    let tag = ' | get_txs_by_address | '
    try {
        log.debug(tag,"checkpoint: ",xpub)
        let output:any = []

        //tier 0
        let txInfo
        if(coin !== "BTC"){

            //tier 1
            let url = "https://blockchain.info/" +"multiaddr?active="+xpub
            //
            // txInfo = await axios({method:'GET',url})


        } else {
            //TODO
            throw Error("not supported! '")
        }

        // return txInfo.data
    } catch (e) {
        console.error(tag, 'Error: ', e)
        throw e
    }
}


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

let get_block = async function(coin:string,height:number){
    let tag = TAG + " | get_node_info | "
    try{
        let blockHash = await nodeMap[coin].getBlockHash(height)
        log.debug(tag,"blockHash: ",blockHash)

        log.debug(tag, 'blockHash: ', blockHash)
        let blockInfo = await nodeMap[coin].getBlock(blockHash,2)
        log.debug(tag,"blockInfo: ",blockInfo)

        return blockInfo
    }catch(e){
        console.error(tag,e)
    }
}

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



let get_node_info = async function(coin:string){
    let tag = TAG + " | get_node_info | "
    try{
        log.info(nodeMap)
        //
        //let results = await nodeMap[coin].getBlockchainInfo()
        // let results = await nodeMap[coin].getBlockchainInfo()

        let results = await nodeMap[coin].getBlockchainInfo()
        results.coin = coin

        return results
    }catch(e){
        console.error(tag,e)
    }
}
