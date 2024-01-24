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
require("dotenv").config({path:'../../../../.env'})
require("dotenv").config({path:'../../../../../.env'})
const TAG  = " | e2e-test | "
const log = require("@pioneer-platform/loggerdog")()

let assert = require('assert')
import {v4 as uuidv4} from 'uuid';
let BigNumber = require('@ethersproject/bignumber')
let SDK = require('@pioneer-platform/pioneer-sdk')
let wait = require('wait-promise');
let sleep = wait.sleep;

const {
    startApp,
    sendPairingCode
} = require('./app')

let BLOCKCHAIN = 'ethereum'
let ASSET = 'ETH'
let MIN_BALANCE = process.env['MIN_BALANCE_ETH'] || 0.0002
let TEST_AMOUNT = process.env['TEST_AMOUNT'] || 0.0001
let spec = process.env['URL_PIONEER_SPEC']
let NO_BROADCAST = process.env['E2E_NO_BROADCAST'] || null
let wss = process.env['URL_PIONEER_SOCKET']

const test_service = async function () {
    let tag = TAG + " | test_service | "
    try {

        //start app and get wallet
        let wallet = await startApp()
        let username = wallet.username
        assert(username)

        let balance = wallet.WALLET_BALANCES[ASSET]
        assert(balance)

        //assert balance local
        //log.info(tag,"wallet: ",wallet)
        log.debug(tag,"wallet: ",wallet.WALLET_BALANCES)
        if(balance < MIN_BALANCE){
            log.error(tag," Test wallet low! amount: "+balance+" target: "+MIN_BALANCE+" Send moneies to "+ASSET+": "+await wallet.getMaster(ASSET))
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

        let seedChains = ['ethereum']
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

        // for(let i = 0; i < blockchains.length; i++){
        //     let blockchain = blockchains[i]
        //     let client = user.clients[blockchain]
        //
        //     let balance = await client.getBalance()
        //     log.info(blockchain+ " balance: ",balance.amount.amount())
        // }

        let client = user.clients['ethereum']
        let balanceSdk = await client.getBalance()
        log.info(" balanceSdk: ",balanceSdk[0].amount.amount().toString())

        //let tokenAddress
        //tether
        //Router RUNE
        let contract = "0x42A5Ed456650a09Dc10EBc6361A7480fDd61f27B"
        // //USDT
        // let tokenAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7"

        //SUSHI
        let tokenAddress = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"


        //TODO approve max int?
        let amountApprove = 1000000000

        //Xchain amount object
        let amount = {
            amount:function(){
                return BigNumber.BigNumber.from(amountApprove)
            }
        }

        log.info(tag,"app: ",app)
        let isApproved = await client.isApproved(contract,tokenAddress,amount)
        log.info("isApproved: ",isApproved)

        //verify not already approved

        //build approvalTx
        let txid = await client.approve(contract,tokenAddress,amount,true)
        log.info("txid: ",txid)

        //TODO let confirm

        //TODO verify approval on contract

        //process
        process.exit(0)
    } catch (e) {
        log.error(e)
        //process
        process.exit(666)
    }
}
test_service()
