/*
    Pioneer Wallet tests
          (Node.js)
              -Highlander

    Test Apps

    Applications MUST confirm to formats!

    goals:
      * Packaged into npm
      * hash Signed by Shapeshift
      * typed interface
      * HDwallet interface


    TODO move to to typescript and run in jest!
 */

const TAG = ' | test-module | '
require('dotenv').config()

//global modules
// eslint-disable-next-line
const log = require('loggerdog-client')();
// eslint-disable-next-line
const tokenData = require('@pioneer-platform/pioneer-eth-token-data')

//vuex
// eslint-disable-next-line
const axios = require('axios');
// eslint-disable-next-line
const Vue = require('vue');
// eslint-disable-next-line
const Vuex = require('vuex');
Vue.use(Vuex);

//installed Applications
//NOTE: while this may look like its 1 app = 1 coin
//GOAL: app registers an interface, that knows of x assets
//wallet knows global assets and allows multiple
//multiple apps per asset and multiple assets per app

const apps = {}
apps['ETH'] =  require('@pioneer-platform/pioneer-eth-uwallet')
apps['BNB'] =  require('@pioneer-platform/pioneer-bnb-uwallet')

//for each token //TODO all tokens one App!
for(let i = 0; i < tokenData.tokens.length; i++){
  const token = tokenData.tokens[i]
  log.debug('Supported Token: ',token)
  // eslint-disable-next-line
  apps[token] =  require('@pioneer-platform/pioneer-eth-uwallet')
}

//total apps installed
const allApps = Object.keys(apps)
log.info('allApps: ',allApps.length)

//TEST PARAMS
const SEED = process.env['SEED']
if(!SEED) throw Error('Must have a SEED in ENV to run tests!')

const PASSWORD = process.env['PASSWORD']
if(!PASSWORD) throw Error('Must have a PASSWORD in ENV to run tests!')

const USERNAME = process.env['USERNAME']
if(!USERNAME) throw Error('Must have a USERNAME in ENV to run tests!')

// eslint-disable-next-line
const coins = require('./coins')
const map = {}

for(let i = 0; i < coins.length; i++){
  const coinInfo = coins[i]
  map[coinInfo.symbol] = coinInfo
}

console.log('MAP: ',map)


//init store
//TODO DRY move this to app
const Store = {
  strict: true,
  state: {
    apps:[],
    masterAddresses:{},
    balances:{},
    coins:[],
    password: null,
    authToken: null,
    isLoggedIn: false,
    mnemonic: null
  },
  mutations: {
    addCoins(state, apps) {
      for(let i = 0; i < apps.length; i++){
        const app = apps[i]
        state.apps.push(app)
        if(map[app]) state.coins.push(map[app])
      }
    },
    addCoin(state, app) {
      state.apps.push([app])
      if(map[app]) state.coins.push(map[app])
    },
    addMasterAddress(state,asset,address){
      state.masterAddresses[asset] = address
    },
    /*
        TODO
        Balance type object

        available
        pending
        staked
        usdValue (total)
        wallets ['wallet']

        Pending is ALL pending tx's combined
              (including withdrawals)

        Wallets shows if balance spread out over multiple wallets
                (balances global is always all wallets combined)

     */
    setBalance(state,params){
      console.log({state,params})
      state.balances[params.app] = params.balance
    },
    setMnemonic(state, mnemonic) {
      state.mnemonic = mnemonic
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken
    },
    setPassword(state, password) {
      state.password = password
    },
    login(state) {
      state.isLoggedIn = true
    }
  },
  actions: {
    //Anything that needs await!
  },
  getters: {
    getApps:state => state.apps,
    getCoins:state => state.coins,
    getBalances: state => state.balances,
    getMasterAddresses: state => state.masterAddresses,
    getMnemonic: state => state.mnemonic,
    getPassword: state => state.password,
    getAuthToken: state => state.authToken,
    getIsLoggedIn: state => state.isLoggedIn,
  }
}
const store = new Vuex.Store(Store);

//register apps to state
store.commit('addCoins',allApps)

const runTest = async function(){
  try{
    const appList = store.getters['getApps']
    log.info('appList: ',appList.length)

    //INIT APPS
    for(let i = 0; i < appList.length; i++){
      const app = appList[i]
      await apps[app].init(SEED,{username:USERNAME,gasLimit:80000})
    }

    //BUILD pubwallets
    for(let i = 0; i < appList.length; i++){
      const app = appList[i]
      const masterAddress = await apps[app].getMaster()
      store.commit('addMasterAddress',app,masterAddress)
    }

    //BUILD balances
    for(let i = 0; i < appList.length; i++){
      const app = appList[i]
      const balance = await apps[app].getBalance()
      log.info(app,' balance: ',balance)
      store.commit('setBalance',{app,balance})
    }

    //TODO BUILD USD Values

    //get balances
    const balances = store.getters['getBalances']
    log.info(' balance: ',balances)

    const masterAddresses = store.getters['getMasterAddresses']
    log.info(' masterAddresses: ',masterAddresses)
  }catch(e){
    console.error(e)
  }
}
runTest()
