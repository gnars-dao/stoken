/*

    Pioneer API
      A High Availability blockchain api

    Goals:
      v1 compatibility with watchtower with 0 change
      Multi-asset support

    V2 goals:
      Treat Xpubs as passwords
      encrypt long term data storage
      maintain hash table to detect and cache payments



    getTransactions:

    Data: example

    { success: true,
      pagination: { page: 1, total_objects: 88, total_pages: 9 },
      data:
        [ { txid:
          '',
          status: 'confirmed',
          type: 'send',
          amount: -78602,
          date: '2019-05-10T21:01:23Z',
          confirmations: 1055,
          network: 'BTC',
          xpub:
            '' },
         }
       ]
      }
     }

*/


const TAG = " | Pioneer | "
const queue = require('@pioneer-platform/redis-queue');
const uuid = require('short-uuid');
let blocknative = require("@pioneer-platform/blocknative-client")
blocknative.init()

let {
    supportedBlockchains,
    supportedAssets,
    getPaths,
    get_address_from_xpub
} = require('@pioneer-platform/pioneer-coins')

//const bcrypt = require('bcryptjs');
var numbro = require("numbro");

const log = require('@pioneer-platform/loggerdog')()
const {subscriber, publisher, redis, redisQueue} = require('@pioneer-platform/default-redis')
let connection  = require("@pioneer-platform/default-mongo")


let wait = require('wait-promise');
let sleep = wait.sleep;


let usersDB = connection.get('users')
let txsDB = connection.get('transactions')
let pubkeysDB = connection.get('pubkeys')
//let txsRawDB = connection.get('transactions-raw')
let inputsDB = connection.get('unspent')

usersDB.createIndex({id: 1}, {unique: true})
txsDB.createIndex({txid: 1}, {unique: true})
//txsRawDB.createIndex({txhash: 1}, {unique: true})
inputsDB.createIndex({txid: 1}, {unique: true})
pubkeysDB.createIndex({pubkey: 1}, {unique: true})

const BALANCE_ON_REGISTER = true

module.exports = {
    register: async function (username:string, xpubs:any, walletId:string) {
        return register_pubkeys(username, xpubs, walletId);
    },
    update: async function (username:string, xpubs:any, walletId:string) {
        return update_pubkeys(username, xpubs, walletId);
    },
}


let register_xpub = async function (username:string, pubkey:any, walletId:string) {
    let tag = TAG + " | register_xpub | "
    try {
        if(!pubkey.coin) throw Error("102: invalid pubkey! missing coin!")
        if(!pubkey.symbol) pubkey.symbol = pubkey.coin
        let xpub = pubkey.xpub
        //save info
        redis.sadd(xpub+":username", username)
        redis.hset(xpub, "xpub", pubkey.xpub)
        redis.hset(xpub, "username", username)
        redis.hset(xpub, "coin", pubkey.coin)
        redis.hset(xpub, "network", pubkey.symbol)
        redis.hset(xpub, "type", pubkey.script_type)


        //if zpub add zpub
        let queueId = uuid.generate()
        if(pubkey.zpub){
            //get master
            let account = 0
            let index = 0
            let address = await get_address_from_xpub(pubkey.xpub,pubkey.scriptType,pubkey.coin,account,index,false,false)

            let work = {
                type:'zpub',
                pubkey:pubkey.zpub,
                master:address,
                coin:pubkey.coin,
                network:pubkey.coin,
                asset:pubkey.coin,
                queueId,
                username,
                walletId,
                inserted: new Date().getTime()
            }
            await queue.createWork("pioneer:pubkey:ingest",work)
        } else if (pubkey.xpub){
            //get master
            let account = 0
            let index = 0
            let address = await get_address_from_xpub(pubkey.xpub,pubkey.scriptType,pubkey.coin,account,index,false,false)

            let work = {
                type:'xpub',
                coin:pubkey.coin,
                pubkey:pubkey.xpub,
                master:address,
                network:pubkey.coin,
                asset:pubkey.coin,
                queueId,
                username,
                xpub,
                inserted: new Date().getTime()
            }
            await queue.createWork("pioneer:pubkey:ingest",work)
        } else {
            log.error(tag,"pubkey: ",pubkey)
            throw Error("Attempting to register an invalid xpub! ")
        }

        return queueId
    } catch (e) {
        console.error(tag, "e: ", e)
        throw e
    }
}

let register_address = async function (username:string, pubkey:any, walletId:string) {
    let tag = TAG + " | register_address | "
    try {
        if(!pubkey.symbol) pubkey.symbol = pubkey.coin
        let address = pubkey.pubkey
        let coin = pubkey.coin
        redis.sadd(address+":username", username)
        redis.hset(address, "address", address)
        redis.hset(address, "coin", pubkey.symbol)
        redis.hset(address, "network", pubkey.coin)

        let queueId = uuid.generate()

        //add to work
        let work = {
            type:'address',
            coin:pubkey.coin,
            pubkey:address,
            network:pubkey.coin,
            asset:pubkey.coin,
            walletId,
            queueId,
            username,
            address,
            master:address,
            inserted: new Date().getTime()
        }
        log.info("adding work: ",work)

        queue.createWork("pioneer:pubkey:ingest",work)

        return queueId
    } catch (e) {
        console.error(tag, "e: ", e)
        throw e
    }
}

let update_pubkeys = async function (username:string, pubkeys:any, walletId:string) {
    let tag = TAG + " | update_pubkeys | "
    try {
        log.info(tag,"input: ",{username,pubkeys,walletId})
        let saveActions = []
        //generate addresses
        let output:any = {}
        output.work = []

        let allPubkeys = []
        let PubkeyMap = {}
        for (let i = 0; i < pubkeys.length; i++) {
            let pubkeyInfo = pubkeys[i]
            allPubkeys.push(pubkeyInfo.pubkey)
            PubkeyMap[pubkeyInfo.pubkey] = pubkeyInfo
        }
        //remove duplicates
        allPubkeys = Array.from(new Set(allPubkeys))

        //get pubkeys from mongo
        log.info(tag,"allPubkeys: ",allPubkeys)
        let allKnownPubkeys = await pubkeysDB.find({"pubkey" : {"$in" : allPubkeys}})
        log.info(tag,"allKnownPubkeys: ",allKnownPubkeys)

        //
        let knownPubkeys = []
        for(let i = 0; i < allKnownPubkeys.length; i++){
            knownPubkeys.push(allKnownPubkeys[i].pubkey)
        }
        log.info(tag,"allKnownPubkeys: ",allKnownPubkeys.length)
        log.info(tag,"allPubkeys: ",allPubkeys.length)
        if(allPubkeys.length > allKnownPubkeys.length){
            //build diff array known
            let unknown = allPubkeys.filter(x => !knownPubkeys.includes(x));
            log.info(tag,"unknown: ",unknown)
            log.info(tag,"Registering pubkeys : ",unknown.length)

            //TODO register unkonw!

            //if(BALANCE_ON_REGISTER){} //TODO dont return till work complete
            for(let i = 0; i < unknown.length; i++){
                let pubkey = unknown[i]
                let pubkeyInfo = PubkeyMap[pubkey]
                //save to mongo
                let entryMongo:any = {
                    coin:pubkeyInfo.coin,
                    path:pubkeyInfo.path,
                    master:pubkeyInfo.master,
                    script_type:pubkeyInfo.script_type,
                    xpub:true,
                    network:pubkeyInfo.network,
                    created:new Date().getTime(),
                    tags:[username,pubkeyInfo.coin,pubkeyInfo.network,walletId],
                }

                if(pubkeyInfo.type === "xpub" || pubkeyInfo.type === "zpub"){
                    let xpub = pubkeyInfo.xpub

                    entryMongo.pubkey = xpub
                    entryMongo.xpub = true
                    saveActions.push({insertOne:entryMongo})

                    let queueId = await register_xpub(username,pubkeyInfo,walletId)

                    //add to Mutex array for async xpub register option
                    output.work.push(queueId)

                } else if(pubkeyInfo.type === "address"){
                    entryMongo.pubkey = pubkeyInfo.pubkey
                    let queueId = await register_address(username,pubkeyInfo,walletId)
                    output.work.push(queueId)
                } else {
                    log.error("Unhandled type: ",pubkeyInfo.type)
                }

                saveActions.push({insertOne: entryMongo})
            }

            //save pubkeys in mongo
            try {
                let result = await pubkeysDB.bulkWrite(saveActions, {ordered: false})
                log.info(tag, "result: ", result)
            } catch (e) {
                log.error(tag,"Failed to update pubkeys! e: ",e)
            }

            if (BALANCE_ON_REGISTER) {
                output.results = []
                //verifies balances returned are final
                log.info(tag, " BALANCE VERIFY ON")
                //let isDone
                let isDone = false
                while (!isDone) {
                    //block on
                    log.info(tag, "output.work: ", output.work)
                    let promised = []
                    for (let i = 0; i < output.work.length; i++) {
                        let promise = redisQueue.blpop(output.work[i], 30)
                        promised.push(promise)
                    }

                    output.results = await Promise.all(promised)

                    isDone = true
                }
            }


        } else {
            log.info(tag," No new pubkeys! ")
        }



        log.info(tag," return object: ",output)
        return output
    } catch (e) {
        console.error(tag, "e: ", e)
        throw e
    }
}

let register_pubkeys = async function (username: string, pubkeys: any, walletId: string) {
    let tag = TAG + " | register_pubkeys | "
    try {
        log.info(tag, "input: ", {username, pubkeys, walletId})
        let saveActions = []
        //generate addresses
        let output: any = {}
        output.work = []

        for (let i = 0; i < pubkeys.length; i++) {
            let pubkeyInfo = pubkeys[i]
            log.info(tag, "pubkeyInfo: ", pubkeyInfo)
            if (!pubkeyInfo.coin) throw Error("Invalid pubkey required field: coin")
            //hack missing symbol
            if (!pubkeyInfo.symbol) pubkeyInfo.symbol = pubkeyInfo.coin
            if (!pubkeyInfo.script_type) throw Error("Invalid pubkey required field: script_type coin:" + pubkeyInfo.coin)
            if (!pubkeyInfo.network) throw Error("Invalid pubkey required field: network coin:" + pubkeyInfo.coin)
            if (!pubkeyInfo.master) throw Error("Invalid pubkey required field: master coin:" + pubkeyInfo.coin)

            //if eth use master
            if (pubkeyInfo.coin === 'ETH') {
                //register to blocknative
                blocknative.submitAddress("ETH", pubkeyInfo.master)
            }

            //save to mongo
            let entryMongo: any = {
                coin: pubkeyInfo.coin,
                asset: pubkeyInfo.coin,
                path: pubkeyInfo.path,
                script_type: pubkeyInfo.script_type,
                network: pubkeyInfo.network,
                created: new Date().getTime(),
                tags: [username, pubkeyInfo.coin, pubkeyInfo.network, walletId],
            }

            if (pubkeyInfo.type === "xpub") {
                let xpub = pubkeyInfo.xpub

                entryMongo.pubkey = xpub
                entryMongo.xpub = xpub
                entryMongo.xpub = true
                entryMongo.type = 'xpub'

                let queueId = await register_xpub(username, pubkeyInfo, walletId)

                //add to Mutex array for async xpub register option
                output.work.push(queueId)

            } else if (pubkeyInfo.type === "zpub") {
                let zpub = pubkeyInfo.zpub

                entryMongo.pubkey = zpub
                entryMongo.zpub = zpub
                entryMongo.zpub = true
                entryMongo.type = 'zpub'

                let queueId = await register_xpub(username, pubkeyInfo, walletId)

                //add to Mutex array for async xpub register option
                output.work.push(queueId)

            } else if (pubkeyInfo.type === "address") {
                entryMongo.pubkey = pubkeyInfo.pubkey
                entryMongo.master = pubkeyInfo.pubkey
                entryMongo.address = pubkeyInfo.address
                let queueId = await register_address(username, pubkeyInfo, walletId)

                output.work.push(queueId)
            } else {
                log.error("Unhandled type: ", pubkeyInfo.type)
            }

            //verify write
            log.info(tag,"entryMongo: ",entryMongo)
            //check exists
            let keyExists = await pubkeysDB.findOne({pubkey:entryMongo.pubkey})
            if(keyExists){
                log.info(tag,"Key already registered! key: ",entryMongo)
                //TODO update?
            }else{
                let saveMongo = await pubkeysDB.insert(entryMongo)
                log.info(tag,"saveMongo: ",saveMongo)
            }

        }


        if (BALANCE_ON_REGISTER) {
            output.results = []
            //verifies balances returned are final
            log.info(tag, " BALANCE VERIFY ON")
            //let isDone
            let isDone = false
            while (!isDone) {
                //block on
                log.info(tag, "output.work: ", output.work)
                let promised = []
                for (let i = 0; i < output.work.length; i++) {
                    let promise = redisQueue.blpop(output.work[i], 30)
                    promised.push(promise)
                }

                output.results = await Promise.all(promised)

                isDone = true
            }
        }


        log.info(tag, " return object: ", output)
        return output
    } catch (e) {
        console.error(tag, "e: ", e)
        throw e
    }
}
