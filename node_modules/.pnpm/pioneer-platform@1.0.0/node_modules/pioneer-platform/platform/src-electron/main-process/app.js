/*
    Primary Application Module

      Pioneer Platform

          -highlander
 */

const TAG = ' | APP | '
import {checkConfigs, getConfig, innitConfig, updateConfig} from "@pioneer-platform/pioneer-config";
const CryptoJS = require("crypto-js")
const bip39 = require(`bip39`)
const App = require("@pioneer-platform/pioneer-app");
const figlet = require('figlet');
const bcrypt = require("bcryptjs");
const chalk = require("chalk");
let wait = require('wait-promise');
let sleep = wait.sleep;
const log = require('electron-log');
const generator = require('generate-password');
const Hardware = require("@pioneer-platform/pioneer-hardware")

//Globals
let WALLETS_LOADED = []
let WALLET_LOADED = {}
let WALLET_CONTEXT = 0
let FIO_ACCEPT = false
let FIO_REJECT = false
let PASSWORDLESS_ENABLE = false
let WALLET_PASSWORD
let WALLET_HASH
let USERNAME
let PRIMARY_VAULT
let FIRST_START = true

function standardRandomBytesFunc(size) {
  /* istanbul ignore if: not testable on node */
  return CryptoJS.lib.WordArray.random(size).toString()
}

//feature flags
let featureKeepkey = process.env['KEEPKEY_FEATURE']
let featureSoftwareCreate = process.env['CREATE_SOFTWARE_FEATURE']
let featurePasswordless = process.env['PASSWORDLESS_FEATURE']
let featureInsecurePassword = process.env['INSECURE_PASSWORD']

export async function attemptPair(event, data) {
  let tag = TAG + " | attemptPair | ";
  try {
    log.info(tag,"data: ",data)
    let resultPair = await App.pair(data)
    return resultPair
  } catch (e) {
    console.error(tag, "e: ", e);
    return {error:e};
  }
}

/*
  Maintain current state of devices
  'unkown',
  'conected',
  'locked',
  'unlocked'

 */
let KEEPKEY_STATUS = 'unkown'
async function lifecycleKeepkey(event, data) {
  let tag = TAG + " | lifecycleKeepkey | ";
  try {

    //start
    let KEEPKEY = await Hardware.start()
    KEEPKEY.events.on('event', async (eventKeepkey) => {
      log.info(tag,"eventKeepkey: ",eventKeepkey)
      event.sender.send('hardware',{event:eventKeepkey})
    });

    let state = await Hardware.state()
    log.info("state: ",state)

    if(state > 1){
      //lockStatus
      let lockStatus = await Hardware.isLocked()
      log.info("lockStatus: ",lockStatus)

      //if locked
      if(lockStatus){
        KEEPKEY_STATUS = 'locked'
        Hardware.displayPin()
        //open pin
        event.sender.send('navigation',{ dialog: 'Pin', action: 'open'})
      } else {
        KEEPKEY_STATUS = 'unlocked'
        //is connected?
        let info = await Hardware.info()
        log.info("info: ",info)
        if(info.features){
          event.sender.send('navigation',{ dialog: 'Hardware', action: 'close'})
        }
        event.sender.send('deviceInfo',info)
      }
    }
  } catch (e) {
    console.error(tag, "e: ", e);
    return {error:e};
  }
}

export async function onStart(event,data) {
  let tag = TAG + " | onStart | ";
  try {

    log.info(tag," onStart() ")
    if(FIRST_START){
      //Print banner
      log.info(  chalk.red(
        figlet.textSync('Pioneer-Native', { horizontalLayout: 'full' })
      ))
      log.info(
        "\n \n \n        ,    .  ,   .           .\n" +
        "    *  / \\_ *  / \\_      " +
        chalk.yellowBright(".-.") +
        "  *       *   /\\'__        *\n" +
        "      /    \\  /    \\,   " +
        chalk.yellowBright("( ₿ )") +
        "     .    _/  /  \\  *'.\n" +
        " .   /\\/\\  /\\/ :' __ \\_  " +
        chalk.yellowBright(" - ") +
        "          _^/  ^/    `--.\n" +
        "    /    \\/  \\  _/  \\-'\\      *    /.' ^_   \\_   .'\\  *\n" +
        "  /\\  .-   `. \\/     \\ /==~=-=~=-=-;.  _/ \\ -. `_/   \\\n" +
        " /  `-.__ ^   / .-'.--\\ =-=~_=-=~=^/  _ `--./ .-'  `-\n" +
        "/        `.  / /       `.~-^=-=~=^=.-'      '-._ `._"
      );
      FIRST_START = false
    }

    let configStatus = checkConfigs()
    let config = await App.getConfig()

    log.info(tag,"config: ",config)
    log.debug(tag,"configStatus() | configStatus: ", configStatus)

    if(data.password){
      config.temp = data.password
      WALLET_PASSWORD = data.password
      if(featureInsecurePassword){
        //write password to file (auto-login)
        //NOTE: it is bad form to store USER passwords on disk
        //however: it is accepted to store generated passwords on disk
        await App.updateConfig({temp: data.password});
      }
    }

    if(!config){
      if(featureKeepkey){
        // if first time startup
        // Launch keepkey connect
        event.sender.send('navigation',{ dialog: 'Hardware', action: 'open'})
        //start
        lifecycleKeepkey(event,data)
      }

      //TODO prompt language?
      //make config
      await App.initConfig("english");
      await App.updateConfig({created: new Date().getTime()});
      config = await App.getConfig()

      //TODO when pioneer local node working
      //event.sender.send('navigation',{ dialog: 'Create', action: 'open'})

      //navigate to setup
      event.sender.send('navigation',{ dialog: 'Setup', action: 'open'})

      return true
    }

    if(config && !config.promptedPasswordless){
      //log.info(tag," offer encryption ")
      //TODO
      //event.sender.send('navigation',{ dialog: 'PasswordCreate', action: 'open'})
      //return true
    }


    if(config && !config.promptedFio){
      //TODO opt in to FIO
    }

    //if pioneer api found
    // let url = await pioneer.url()
    // log.debug("url: ",url)
    //
    // let health = await pioneer.health()
    // log.info("health: ",health)

    //if online
    // if(health.online){
    //   //TODO state online
    //
    // }

    // if(!config.username){
    //   //create username
    //   let randomChars = generator.generateMultiple(1, {
    //     length: 10,
    //     uppercase: false
    //   });
    //   USERNAME = "temp:"+randomChars[0]
    //   config.username = USERNAME
    //   await App.updateConfig({username:USERNAME});
    // } else {
    //   USERNAME = config.username
    // }

    if(!config.temp && config.passwordHash && !WALLET_PASSWORD){
      WALLET_HASH = config.passwordHash
      event.sender.send('navigation',{ dialog: 'Unlock', action: 'open'})
      return
    } else if(config.temp) {
      WALLET_PASSWORD = config.temp
    } else {
      //generate password
      if(featurePasswordless){
        log.info(tag,"featurePasswordless TRUE")
        //create password
        let randomChars = generator.generateMultiple(1, {
          length: 10,
          uppercase: false
        });
        WALLET_PASSWORD = randomChars[0]
        await App.updateConfig({temp:WALLET_PASSWORD});
      } else {
        //get password
        event.sender.send('navigation',{ dialog: 'Unlock', action: 'open'})
        return true
      }
    }
    if(!WALLET_PASSWORD) throw Error("Error: Password required! ")

    //get wallet files
    let walletFiles = await App.getWalletNames()
    log.info("walletFiles: ",walletFiles)

    if(!config.spec || true){
      // config.spec = "https://pioneers.dev/spec/swagger.json"
      // config.urlSpec = "https://pioneers.dev/spec/swagger.json" // rabble
      config.spec = "http://127.0.0.1:9001/spec/swagger.json"
      config.urlSpec = "http://127.0.0.1:9001/spec/swagger.json" // rabble
      //config.spec = "https://pioneers.dev/spec/swagger.json"
    }

    if(walletFiles.length === 0){
      //Always have atleast 1 wallet!
      log.info(" No Wallets found! ")

      return true
    }

    let isTestnet = null
    //TODO testnet feature
    //if feature flag mainnet
    // if(process.env['MAINNET_FEATURE']){
    //   //TODO offer promt?
    // } else {
    //   isTestnet = true
    //   config.isTestnet = isTestnet
    // }
    config.isTestnet = null

    config.blockchains = ['bitcoin','ethereum','thorchain','bitcoincash','litecoin','binance']

    //start App
    if(!WALLET_PASSWORD) throw Error("unable to start! missing, WALLET_PASSWORD")
    config.password = WALLET_PASSWORD
    log.info(tag,"config: ",config)
    let resultInit = await App.init(config)
    log.info(tag,"resultInit: ",resultInit)

    //push init
    event.sender.send('init',resultInit)

    event.sender.send('updateTotalValue',resultInit.TOTAL_VALUE_USD_LOADED)
    event.sender.send('navigation',{ dialog: 'Connect', action: 'close'})

    let wallets = App.getWallets()
    let walletNames = App.getWalletNames()
    log.info(tag,"walletNames: ",walletNames)
    event.sender.send('updateWalletsLoaded',resultInit.walletFiles)

    //wallet events
    resultInit.events.on('message', async (request) => {
      console.log("*** message: ", request)
      //TODO messages
      //event.sender.send('navigation',{ dialog: 'Connect', action: 'close'})
    })

    //TODO blocks
    //txs
    //requests
    //globals


    //TODO is context pref in config?

    //set primary context
    let context = wallets[0]
    WALLETS_LOADED = context

    //load masters
    let info = await context.getInfo()
    log.info("info: ",info)
    event.sender.send('setWalletInfoContext',info)
    //Start wallet interface


  } catch (e) {
    console.error(tag, "e: ", e);
    return {error:e};
  }
}

export async function setMnemonic(event, data) {
  let tag = TAG + " | setMnemonic | ";
  try {
    log.info(tag,"data: ",data)


    let resultCreate = await App.setSeed('software',wallet)
    return resultCreate
  } catch (e) {
    console.error(tag, "e: ", e);
    return {error:e};
  }
}

export async function createWallet(event, data) {
  let tag = TAG + " | createWallet | ";
  try {
    log.info(tag,"data: ",data)

    //if no password
    if(!data.password){
      if(featurePasswordless){
        log.info(tag,"featurePasswordless TRUE")
        let randomChars = generator.generateMultiple(1, {
          length: 10,
          uppercase: false
        });
        data.password = "temp:"+randomChars[0]
      }else{
        throw Error("unhandled action featurePasswordless: "+featurePasswordless)
      }
    }

    //if no username
    if(!data.username){
      let randomChars = generator.generateMultiple(1, {
        length: 10,
        uppercase: false
      });
      data.username = "user:"+randomChars[0]
      //add to config
      await updateConfig({username:data.username})
    }

    //if no mnemonic
    if(!data.mnemonic){
      if(featureSoftwareCreate){
        log.info(tag,"featureSoftwareCreate TRUE")
        let randomBytesFunc = standardRandomBytesFunc
        const randomBytes = Buffer.from(randomBytesFunc(32), `hex`)
        if (randomBytes.length !== 32) throw Error(`Entropy has incorrect length`)
        let mnemonic = bip39.entropyToMnemonic(randomBytes.toString(`hex`))
        data.mnemonic = mnemonic

      }else{
        throw Error("unhandled action featureSoftwareCreate: "+featureSoftwareCreate)
      }
    }

    //create
    let wallet = {
      mnemonic:data.mnemonic,
      username:data.username,
      password:data.password
    }


    //create wallet files
    log.info("1 creating wallet: ",wallet)
    let resultCreate = await App.createWallet('software',wallet)
    return resultCreate
  } catch (e) {
    console.error(tag, "e: ", e);
    return {error:e};
  }
}

export function onLogin(event, data) {
  let tag = TAG + " | onLogin | ";
  try {
    //
    if(!WALLET_HASH) throw Error("Wallet Hash not found! ")
    if(!data.password) throw Error("password not found! ")

    let isValid = bcrypt.compareSync(data.password, WALLET_HASH); // true
    if(isValid) {
      //close password
      WALLET_PASSWORD = data.password
      onStart(event, data)
    } else {
      log.error(tag," invalid password! ")
      //TODO send error msg over ipc invalid pw
    }
  } catch (e) {
    console.error(tag, "e: ", e);
    return {error:e};
  }
}
