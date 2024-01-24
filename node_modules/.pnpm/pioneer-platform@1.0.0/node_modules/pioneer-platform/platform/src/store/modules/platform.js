const state = {
    testnet:false,
    username:"",
    pioneerUrl:"",
    pioneerLive:false,
    coins: [],
    pubkeys: [],
    apps: [],
    totalUsd: 0,
    viewSeed: "",
    layout:[],
    wallets: [],
    devices: [],
    walletInfo: {}, //Current wallet context
    mnemonic: null,
    walltedLoaded: false,
    walletSendInfo:{},
    recentEvents:[],
    walletStart: {},
    assetLoading: false,
    txBuilding: false,
    keepkeyConnected:false
}

const getters = {
    isTestnet:state => state.testnet,
    getUsername:state => state.username,
    getTotal:state => state.totalUsd,
    wallets:state => state.wallets,
    layout:state => state.layout,
    devices:state => state.devices,
    getCoins:state => state.coins,
    getPubkeys:state => state.pubkeys,
    getPioneerLive: state => state.pioneerLive,
    getPioneerUrl: state => state.pioneerUrl,
    getMnemonic: state => state.mnemonic,
    walletStart: (state) => state.walletStart,
    getWalletSendInfo: state => state.walletSendInfo,
    getMasterAddresses: state => state.masterAddresses,
    getBalances: state => state.balances,
    getWalletInfo: state => state.walletInfo,
    getWalletLoaded: state => state.walltedLoaded,
    getAssetLoading: state => state.assetLoading,
    getKeepkeyConnected: state => state.keepkeyConnected,
    txBuilding: state => state.txBuilding
}

const actions = {
    updatePrice({ commit }, payload) {
        commit('SetPrice', payload)
    }
}

const mutations = {
    registerApp(state, app) {
      if (state.layout.filter(e => e.type === app.type).length === 0) {
        state.layout.push(app)
      } else {
        console.log("app already in dashboard")
      }
    },
    registerWallet(state, wallet) {
      if (state.wallets.filter(e => e.type === wallet.type).length === 0) {
        state.wallets.push(wallet)
      } else {
        console.log("wallet type already added")
      }
    },
    registerDevice(state, device) {
      if (state.devices.filter(e => e.type === devices.type).length === 0) {
        state.devices.push(device)
      } else {
        console.log("device already added")
      }
    },
    viewSeed(state, apps) {
      //
    },
    addApps(state, apps) {
      for(let i = 0; i < apps.length; i++){
        const app = apps[i]
        state.apps.push(app)
        if(map[app]) state.apps.push(map[app])
      }
    },
    addPubkey(state, coin) {
      state.coins.push([coin])
      if(map[coin]) state.coins.push(map[coin])
    },
    addCoins(state, coins) {
        for(let i = 0; i < coins.length; i++){
          const coin = coins[i]
          state.coins.push(coin)
          if(map[app]) state.coins.push(map[coin])
        }
      },
    addCoin(state, coin) {
        state.coins.push([coin])
        if(map[coin]) state.coins.push(map[coin])
    },
    addMasterAddress(state,asset,address){
        state.masterAddresses[asset] = address
    },
    setBalance(state,payload){
        const { symbol, balance } = payload
        const asset = state.coins.find(a => a.symbol === symbol)
        asset.balance = balance
    },
    setAssets: (state, assets) => state.coins = assets,
    setTotal(state,value){
      state.totalUsd = value
    },
    setWalletInfo(state,value){
      state.walletInfo = value
    },
    setViewSeed(state,value){
      state.mnemonic = value
    },
    setUsername(state,value){
      console.log("set username: ",value)
      state.username = value
    },
    setPioneerUrl(state,value){
      state.pioneerUrl = value
    },
    setPioneerLive(state,value){
      state.pioneerLive = value
    },
    setTestnet(state,value){
      state.testnet = value
    },
    setSendInfo(state,params){
        state.walletSendInfo = params
    },
    clearSendInfo(state,params){
        state.walletSendInfo = {}
    },
    setSendStatus(state,params){
        state.walletSendInfo.status = params.status
    },
    setSendTxid(state,params){
      state.walletSendInfo.txid = params.txid
    },
    setTxBuilding(state, param) {
        state.txBuilding = param
    },
    setMnemonic(state, mnemonic) {
        state.mnemonic = mnemonic
    },
    setWalletLoaded(state) {
        state.walltedLoaded = true
    },
    setAssetLoading(state, value) {
        state.assetLoading = value
    },
    updateAsset(state, {symbol, price}) {
        const item = state.coins.find(e => e.symbol === symbol)
        item.price = price
        Object.assign(item, asset)
    },
    connectKeepkey(state) {
      state.keepkeyConnected = true
    },
    disconnectKeepkey(state) {
      state.keepkeyConnected = false
    },
    SOCKET_ONOPEN(state) {
        state.isConnected = true
    },
    SOCKET_ONCLOSE(state) {
        state.isConnected = false
    },
    SOCKET_ONMESSAGE(state, message) {
        // const data = JSON.parse(message.data)
        // const keys = Object.keys(data)
        // keys.forEach(key => {
        //     const item = state.coins.find(e => e.displayName.replace(/\s+/g, '-').toLowerCase() === key)
        //     if(item) {
        //         const update = {
        //             ...item,
        //             price: data[key]
        //         }
        //         Object.assign(item, update)
        //     }
        // })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
