/*
   *** E2E TEST ***
        App Module


    Init from env vars
    * verify empty env at start
    * verify creation

 */

require("dotenv").config({path:'./../../.env'})
require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})

let assert = require('assert')

//test app
let App = require("@pioneer-platform/pioneer-app")
const log = require("@pioneer-platform/loggerdog")()

//general dev envs
let seed = process.env['WALLET_MAINNET_DEV_OLD']
let password = process.env['WALLET_PASSWORD']
let username = process.env['TEST_USERNAME_2']
let queryKey = process.env['TEST_QUERY_KEY_2']


export async function startApp() {
    let tag = " | app_assert_env_start | "
    try {
        //assert env correct
        assert(seed)
        assert(password)
        assert(username)
        assert(queryKey)

        //get config
        let config = await App.getConfig()
        assert(config === null)

        let wallet1 = {
            mnemonic:seed,
            username:username,
            password
        }

        //create wallet files
        let successCreate = await App.createWallet('software',wallet1)
        log.info(tag,"successCreate: ",successCreate)
        //assert(successCreate)

        await App.initConfig("english");
        // App.updateConfig({isTestnet:true});
        App.updateConfig({username});
        App.updateConfig({temp:password});
        App.updateConfig({created: new Date().getTime()});

        //get config
        config = await App.getConfig()

        config.blockchains = ['ethereum']

        //verify startup
        //let isTestnet = null
        log.info(tag,"config: ",config)
        let resultInit = await App.init(config)
        assert(resultInit)

        config.password = password
        config.username = username

        //get wallets
        let wallets = await App.getWallets()

        //assert only 1
        let context = wallets[0]

        return context
    } catch (e) {
        log.error(e)
        throw e
    }
}

export async function sendPairingCode(code:string) {
    let tag = " | sendPairingCode | "
    try {
        let pairResult = await App.pair(code)
        //console.log("pairResult: ",pairResult.data)

        return true
    } catch (e) {
        log.error(e)
        throw e
    }
}
