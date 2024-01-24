/*
    Primary App functions

    App cycle

            -Highlander

 */
const TAG = " | App | ";
const log = require("loggerdog-client")();
const App = require("@pioneer-platform/pioneer-app");
const Hardware = require("@pioneer-platform/pioneer-hardware");
const generator = require('generate-password');
const describe = require("describe-export");
const CryptoJS = require("crypto-js");
const bip39 = require(`bip39`);
const open = require("open");
const vorpal = require("vorpal")();
const bcrypt = require("bcryptjs");
const prettyjson = require('prettyjson');
let wait = require('wait-promise');
let sleep = wait.sleep;

import {
    prompt_fio_enable,
    prompt_password_enable,
    prompt_create_wallet,
    prompt_password_create,
    prompt_password_input,
    prompt_seed_input
} from './inquiries'

let urlSpec = process.env['URL_PIONEER_SPEC'] || 'http://127.0.0.1:9001/spec/swagger.json'
let FIO_ACCEPT = false
let FIO_REJECT = false
let PASSWORDLESS_ENABLE = false

//global
let KEEPKEY:any
let help: any = {
    info: "",
};

function standardRandomBytesFunc(size:any) {
    /* istanbul ignore if: not testable on node */
    return CryptoJS.lib.WordArray.random(size).toString()
}

let apps = [
    {
        service:"AsgardDex (WEB)",
        url:"https://swaps.pro",
    }
]

export async function onStart() {
    let tag = TAG + " | onStart | ";
    try {
        //start keepkey
        KEEPKEY = await Hardware.start()

        //if hardware connected
        let info = await Hardware.info()
        info.type = 'keepkey'
        log.info(tag,"keepkey: info: ",info)

        let keepkeyStatus = await App.hardwareState()
        log.info("keepkeyStatus: ",keepkeyStatus)

        //get config
        let config = await App.getConfig()
        log.debug(tag,"config: ",config)

        if(!config){
            //TODO prompt language?
            //make config
            await App.initConfig("english");
            await App.updateConfig({created: new Date().getTime()});
            config = await App.getConfig()
        }

        if(keepkeyStatus.state > 3) {
            if(config && !config.promptedFio){
                //opt in to FIO
                //if unkown state, request
                if(!FIO_ACCEPT && !FIO_REJECT){
                    //prompt
                    let accepted = await prompt_fio_enable()
                    // @ts-ignore
                    if(accepted){
                        App.updateConfig({FIO_ACCEPT:true});
                        App.updateConfig({promptedFio:true});
                        FIO_ACCEPT = true
                    } else {
                        App.updateConfig({FIO_REJECT:true});
                        App.updateConfig({promptedFio:true});
                        FIO_REJECT = true
                    }
                }
                config = await App.getConfig()
            }

            if(config && !config.promptedPasswordless){
                //prompt
                let accepted = await prompt_password_enable()
                App.updateConfig({promptedPasswordless:true});
                // @ts-ignore
                if(!accepted){
                    PASSWORDLESS_ENABLE = true
                }
                config = await App.getConfig()
            }

            if(config && config.temp){
                PASSWORDLESS_ENABLE = true
            }

            /*
                Password setup

                Config password
                    //wallet passwords
             */

            let password

            //if passwordless generate
            if(PASSWORDLESS_ENABLE && !config.temp && !config.passwordHash){
                let passwords = generator.generateMultiple(1, {
                    length: 10,
                    uppercase: false
                });
                password = passwords[0]
                App.updateConfig({temp:password});
                config = await App.getConfig()
            } else if(!PASSWORDLESS_ENABLE && !config.passwordHash){
                //Create NEW password
                let responses = await prompt_password_create()
                log.debug(tag,"create password: ",responses)
                //TODO
                //verify password1 2 match
                if(responses.password !== responses.password2){
                    log.info("Invalid input! password dont match!")
                    await onStart()
                    return
                }
                //verify password not weak

                //if accept
                const hash = bcrypt.hashSync(responses.password, 10);
                await App.updateConfig({passwordHash:hash});
                //hash and create

                //if reject
                //try again

                password = responses.password
            } else if(config.temp){
                password = config.temp
                //

            } else if(config.passwordHash){
                let passwordInput = await prompt_password_input()
                log.debug(tag,"passwordInput: ",passwordInput)
                //TODO hash & verify
                let isValid = bcrypt.compareSync(passwordInput, config.passwordHash); // true
                if(!isValid) {
                    log.info("Invalid password!")
                    await onStart()
                    return
                }

                password = passwordInput
            }

            let wallets = await App.getWalletNames()
            log.debug(tag,"wallets: ",wallets)

            //if fio get fio username
            let username
            if(config && !config.username){
                //generate random
                let randomChars = generator.generateMultiple(1, {
                    length: 10,
                    uppercase: false
                });
                username = "temp:"+randomChars[0]
                config.username = username
            }

            //if no wallets
            if(wallets.length > 0){
                //wallet found
                log.debug(tag,"Wallets found! ",wallets)

            } else {
                //create wallet
                let type:any = await prompt_create_wallet()
                log.debug(tag,"type: ",type)

                // @ts-ignore
                if(type === "create a new wallet") {
                    log.debug(tag,"create new wallet!")
                    // //create a new
                    let randomBytesFunc = standardRandomBytesFunc
                    const randomBytes = Buffer.from(randomBytesFunc(32), `hex`)
                    if (randomBytes.length !== 32) throw Error(`Entropy has incorrect length`)
                    let mnemonic = bip39.entropyToMnemonic(randomBytes.toString(`hex`))

                    //create
                    let wallet:any = {
                        mnemonic,
                        username:config.username,
                        password
                    }
                    if(config.temp) wallet.temp = config.temp
                    //create wallet files
                    log.debug("1 creating wallet: ",wallet)
                    let resultCreate = await App.createWallet('software',wallet)
                    log.debug("result creating wallet: ",resultCreate)
                } else if (type === "restore from seed") {
                    let seed = await prompt_seed_input()
                    //TODO validate seed
                    //if invalid, ask for again
                    //create
                    let wallet:any = {
                        mnemonic:seed,
                        username:config.username,
                        password
                    }
                    if(config.temp) wallet.temp = config.temp
                    //create wallet files
                    log.debug("2 creating wallet: ",wallet)
                    let resultCreate = await App.createWallet('software',wallet)
                    log.debug("result creating wallet: ",resultCreate)
                } else if (type === "pair hardware wallet") {
                    log.info("pair hardware wallet!")

                    if(info.features){
                        //is locked?
                        let pubkeysKeepkey = await Hardware.getPubkeys()

                        //
                        let resultPair = await App.pairKeepkey(info.features.deviceId,pubkeysKeepkey)
                        log.info("resultPair: ",resultPair)
                    } else {
                        //try to reconnect
                        log.error(tag,"Device Connected to other host!")
                    }

                    //
                }
            }


            //start app
            log.debug("pre-init CONFIG: ",config)
            if(password) config.password = password
            if(!config.temp && !config.password) throw Error("102: password required for startup! ")

            //hardware
            config.hardware = true

            let keepkeyStatus2 = await App.hardwareState()
            log.info(tag,"keepkeyStatus2: ",keepkeyStatus2)

            let isTestnet = true
            let resultInit = await App.init(config,isTestnet)
            log.debug("resultInit: ",resultInit)

            //if username is temp
            if(config.FIO_ACCEPT && config.username.indexOf("temp:") >= 0){
                //FIO name enable
                let fioPubkey = await App.getFioPubkey()
                log.debug(tag,"fioPubkey: ",fioPubkey)

                let usernames = await App.getFioAccountsByPubkey(fioPubkey)
                if(usernames.length === 0){
                    //open fio signup
                    open("https://reg.fioprotocol.io/ref/shapeshift?publicKey=" + fioPubkey);
                } else {
                    username = usernames.fio_addresses[0].fio_address
                    if(!username) throw Error("failed to find fio username!")
                    App.updateConfig({username});
                }
            }
            return resultInit
        }else if(keepkeyStatus.state === 2){
            //prompt pin
            console.log("Device Locked!")
            Hardware.displayPin()
            //TODO unlock pin
            onStart()
        } else {

            await sleep(2000)
            onStart()
        }




        //return start failed
        //actions required
            //register config
            //register wallet

    } catch (e) {
        console.error(tag, "e: ", e);
        return {};
    }
}

/*
    Load a module into vorpal
        Module Export Spec:
            TODO
 */

export async function loadModule(moduleView:any,module:any) {
    let tag = TAG + " | loadModule | ";
    try {

        log.info(tag,"module: ",module)
        const map = describe.map(moduleView);
        log.info(tag,"map: ",map)

        Object.keys(map).forEach(function (key) {
            let tag = TAG + " | " + key + " | ";
            let debug = false;
            log.debug(tag, "key: ", key);
            let expectedParams = map[key];

            log.debug(tag, "expectedParams: ", expectedParams);

            let helpString;
            if (help[key]) helpString = help[key];
            if (!helpString){
                if(expectedParams.length > 1) helpString = " params: " + expectedParams;
            }

            vorpal.command(key, helpString)
                .action(function (args: any, cb: any) {
                    let params = [];

                    if (expectedParams.length > 0) {
                        for (let i = 0; i < expectedParams.length; i++) {
                            let param = {
                                type: "input",
                                name: expectedParams[i],
                                message: "input " + expectedParams[i] + ": ",
                            };
                            params.push(param);
                        }
                    }

                    // @ts-ignore
                    let promise = this.prompt(params, function (answers: any) {
                        // You can use callbacks...
                    });

                    promise.then(async (answers: any) => {
                        log.debug(tag, "answers: ", answers);

                        let parameters: any = [];
                        Object.keys(answers).forEach(function (answer) {
                            parameters.push(answers[answer]);
                        });
                        log.debug(tag, "parameters: ", parameters);
                        try {

                            log.debug("key: ",key)
                            log.debug("parameters: ",parameters)

                            const result = await module[key](parameters)
                            log.info("result: ", prettyjson.render(result));

                            cb()
                        } catch (e) {
                            console.error(tag, "e: ", e);
                        }
                    });
                })
        })

        return true
    } catch (e) {
        console.error(tag, "e: ", e);
        return {};
    }
}


/*
    Run Interactive terminal
 */
export async function onRun() {
    let tag = TAG + " | onRun | ";
    try {

        //get context
        let wallets = await App.getWallets()
        log.debug("wallets: ",wallets)

        let context = wallets[0]

        // let info = await context.getInfo()
        // log.debug("info: ",info)

        // let contextView:any = JSON.parse(JSON.stringify(context))
        let contextView:any = {}
        log.debug("contextView: ",contextView)

        let allKeys = Object.keys(context)
        for(let i = 0; i < allKeys.length; i++){
            let key = allKeys[i]
            if(typeof(context[key]) === 'function'){
                contextView[key] = context[key]
            }
        }
        log.debug("context: ",context)
        const map = describe.map(contextView);
        App.openApp = function(url:string){
            open("https://swaps.pro")
        }
        //
        let appView:any = {}
        let appFunctions = Object.keys(App)
        for(let i = 0; i < appFunctions.length; i++){
            let key = appFunctions[i]
            if(typeof(App[key]) === 'function'){
                appView[key] = App[key]
            }
        }
        log.info("appView: ",appView)


        //TODO add switch wallet context

        //any more 1 off CLI needs?

        let prompt = "client: ";

        let help: any = {
            info: "",
        };

        // let openApp = function(url:string){
        //     open("https://swaps.pro")
        // }
        //
        // let mockModule = {
        //     openApp:openApp('https://swaps.pro')
        // }

        //               view        controller
        await loadModule(contextView,context)
        await loadModule(Hardware,Hardware)
        await loadModule(appView,App)
        // await loadModule(mockModule,mockModule)

        vorpal
            .delimiter(prompt)
            //.action(app.tick())
            .show();

    } catch (e) {
        console.error(tag, "e: ", e);
        return {};
    }
}

// //TODO
// export function onSetup() {
//     let tag = TAG + " | onSetup | ";
//     try {
//
//     } catch (e) {
//         console.error(tag, "e: ", e);
//         return {};
//     }
// }
//
//
// //TODO
// export function onRestore() {
//     let tag = TAG + " | onRun | ";
//     try {
//
//     } catch (e) {
//         console.error(tag, "e: ", e);
//         return {};
//     }
// }
