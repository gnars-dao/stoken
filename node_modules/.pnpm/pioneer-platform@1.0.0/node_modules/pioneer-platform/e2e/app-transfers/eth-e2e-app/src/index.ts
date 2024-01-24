/*
    E2E testing
        k8  "job" pattern

    load test seed

    verify empty

    request deposit from faucet

    watch till confirmed

    send back to faucet

    report

 */


require("dotenv").config()
require('dotenv').config({path:"../../.env"});
require("dotenv").config({path:'../../../.env'})
const TAG  = " | e2e-test | "
const log = require("@pioneer-platform/loggerdog")()
const assert = require('assert');


let urlSpec = 'https://pioneers.dev/spec/swagger.json'

//test app
let App = require("@pioneer-platform/pioneer-app")

//params
let seed = process.env['TEST_SEED']
let password = process.env['WALLET_PASSWORD']
let username = "eth-e2e-app"

let TEST_AMOUNT = 0.001 //TODO 1usd value?
let TEST_ASSET = "ETH"


const test_service = async function () {
    let tag = TAG + " | test_service | "
    try {
        //
        //get config
        let config = await App.getConfig()
        config.password = password
        config.username = username

        //if no config
        if(!config){
            //init config
            throw Error("Must setup!")
        }

        console.log("config: ",config)
        let pioneer = await App.init(config)
        console.log("pioneer: ",pioneer.TOTAL_VALUE_USD_LOADED)

        //subscribe to events
        pioneer.events.on('message',function(request:any){
            console.log("message: ",request)
        })

        //select 0 context
        let wallets = await App.getWallets()
        // console.log("wallets: ",wallets)
        let context = wallets[0]

        //pay test server
        let fioPublicInfo = await context.getFioAccountInfo("highlander@scatter")
        console.log("fioPublicInfo: ",fioPublicInfo)

        if(!fioPublicInfo.ETH) throw Error("Invalid test wallet user! ETH required!")

        //send payment
        let intent = {
            coin:TEST_ASSET,
            address:fioPublicInfo.ETH,
            amount:TEST_AMOUNT
        }
        let txid = await context.sendToAddress(intent.coin, intent.address, intent.amount)
        console.log("txid: ",txid)

        //verify send confirmed

        //request amount back

        //detect payment

        //process
        //process.exit(0)
    } catch (e) {
        log.error("test can not continue: ",e)
        process.exit(2)
    }
}
test_service()
