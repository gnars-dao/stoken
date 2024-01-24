/*
    E2E testing
        k8  "job" pattern

    load test seed

    verify empty

    request deposit from faucet

    watch till confirmed

    send back to faucet

    report



    SDK Arch pattern ***


        Start and configure app

        verify socket connection


    Use sdk to

        * check balances
        * check tx history
        * request faucet addresses
        * send x into faucet
        * request withdrawalf rom faucet
        * verify payment

 */

require("dotenv").config()
require('dotenv').config({path:"../../.env"});
require("dotenv").config({path:'../../../.env'})
const TAG  = " | e2e-test | "
const log = require("@pioneer-platform/loggerdog")()
let assert = require('assert')
import {v4 as uuidv4} from 'uuid';
let SDK = require('@pioneer-platform/pioneer-sdk')
let wait = require('wait-promise');
let sleep = wait.sleep;

const {
    startApp,
    sendPairingCode
} = require('./app')

let BLOCKCHAIN = 'thorchain'
let ASSET = 'RUNE'
let MIN_BALANCE = process.env['MIN_BALANCE_BNB'] || 0.0002
let TEST_AMOUNT = process.env['TEST_AMOUNT'] || 0.0001
let spec = process.env['URL_PIONEER_SPEC']
let NO_BROADCAST = process.env['E2E_BROADCAST'] || true

const test_service = async function () {
    let tag = TAG + " | test_service | "
    try {

        //start app and get wallet
        let wallet = await startApp()
        let username = wallet.username

        //assert balance local
        //log.info(tag,"wallet: ",wallet)
        log.info(tag,"wallet: ",wallet.WALLET_BALANCES)
        let balance = wallet.WALLET_BALANCES[ASSET]
        assert(balance)

        if(wallet.WALLET_BALANCES[ASSET] < MIN_BALANCE){
            log.info(tag," Test wallet low! amount: "+wallet.WALLET_BALANCES[ASSET]+" target: "+MIN_BALANCE+" Send moneies to "+ASSET+": "+await wallet.getMaster(ASSET))
            throw Error("101: Low funds!")
        } else {
            log.info(tag," Attempting e2e test "+ASSET+" balance: ",balance)
        }

        //generate new key
        const queryKey = uuidv4();
        assert(queryKey)

        let config = {
            queryKey,
            username,
            spec
        }

        let app = new SDK.SDK(spec,config)

        let seedChains = ['litecoin']
        await app.init(seedChains)

        //pair sdk
        let code = await app.createPairingCode()
        code = code.code
        log.info("code: ",code)
        assert(code)

        //
        let pairSuccess = await sendPairingCode(code)
        log.info("pairSuccess: ",pairSuccess)
        assert(pairSuccess)

        //assert sdk user
        //get user
        let user = await app.getUserParams()
        log.info("user: ",user)

        //intergration test asgard-exchange
        let blockchains = Object.keys(user.clients)
        log.info("blockchains: ",blockchains)

        //get address from faucet
        //TODO get this from api
        let address = "thor1vvehrsz8rwzaws4j94ak3a4zj7myjerx9xn9yp"

        //send to faucet
        let sendPayload:any = {
            blockchain:BLOCKCHAIN,
            asset:'RUNE',
            amount:TEST_AMOUNT,
            address,
        }
        sendPayload.noBroadcast = true

        log.info(tag,"sendPayload: ",sendPayload)
        let txid = await app.sendToAddress(sendPayload)
        console.log("txid: ",txid)

        //process
        process.exit(0)
    } catch (e) {
        log.error(e)
        //process
        process.exit(666)
    }
}
test_service()
