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

let urlSpec = 'https://pioneers.dev/spec/swagger.json'

//test app
let App = require("@pioneer-platform/pioneer-app")

//params
let seed = process.env['TEST_SEED']
let password = process.env['WALLET_PASSWORD']
let username = "atom-e2e-app"

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
        let resultInit = await App.init(config)
        console.log("resultInit: ",resultInit)

        //process
        process.exit(0)
    } catch (e) {
        log.error(e)
        throw e
    }
}
test_service()
