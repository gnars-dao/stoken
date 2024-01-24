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

let BLOCKCHAIN = 'bitcoinCash'
let ASSET = 'BCH'
let MIN_BALANCE = process.env['MIN_BALANCE_BTC'] || 0.00002
let TEST_AMOUNT = process.env['TEST_AMOUNT'] || 0.00001
let spec = process.env['URL_PIONEER_SPEC']
let NO_BROADCAST = process.env['E2E_BROADCAST'] || true
let wss = process.env['URL_PIONEER_SOCKET']

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
            spec,
            wss
        }


        let app = new SDK.SDK(spec,config)

        let events = await app.startSocket()

        let eventPairReceived = false
        events.on('message', async (request:any) => {
            assert(request.queryKey)
            assert(request.username)
            assert(request.url)
            eventPairReceived = true
        })

        let seedChains = ['bitcoincash']
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

        //dont release till pair event
        while(!eventPairReceived){
            await sleep(300)
        }

        //assert sdk user
        //get user
        let user = await app.getUserParams()
        log.info("user: ",user)

        //intergration test asgard-exchange
        let blockchains = Object.keys(user.clients)
        log.info("blockchains: ",blockchains)

        //expect special bitcoin functions

        //getFeeWithMemo
        let feeEstimate = await user.clients.bitcoinCash.getFeesWithMemo()
        log.info(tag,"feeEstimate: ",feeEstimate)
        log.info(tag,"feeEstimate: fast:",feeEstimate.fast.amount())
        log.info(tag,"feeEstimate: average: ",feeEstimate.average.amount())
        log.info(tag,"feeEstimate: fastest: ",feeEstimate.fastest.amount())
        assert(feeEstimate)
        assert(feeEstimate.type)
        assert(feeEstimate.fast)
        assert(feeEstimate.average)
        assert(feeEstimate.fastest)

        //get address from faucet
        //TODO get this from api
        let address = "1Dmjt2DWjNpVWRPXRNuhwfDnSqPmfxGLLG"

        //send to faucet
        let sendPayload:any = {
            blockchain:BLOCKCHAIN,
            asset:'BCH',
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
