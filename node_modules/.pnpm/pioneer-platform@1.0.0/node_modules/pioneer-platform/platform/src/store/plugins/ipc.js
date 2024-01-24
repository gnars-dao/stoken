import { ipcRenderer } from 'electron'

function playSound(type) {
  if(type === 'send') {
    const audio = new Audio(require('../../assets/sounds/send.mp3'))
    audio.play()
  }
  if(type === 'receive') {
    const audio = new Audio(require('../../assets/sounds/chaching.mp3'))
    audio.play()
  }
  if(type === 'success') {
    const audio = new Audio(require('../../assets/sounds/success.wav'))
    audio.play()
  }
  if(type === 'fail') {
    const audio = new Audio(require('../../assets/sounds/fail.mp3'))
    audio.play()
  }
}


export default store => {
  ipcRenderer.on('payments', (event, data) => {
    console.log(event, data)
    store.commit('newTx', data)
    playSound('receive')
    // const myNotification = new Notification(`You just received ${data.asset}!`, {
    //   body: `You just got ${data.amount} ${data.asset}!`,
    //   silent: true
    // })
  })
  ipcRenderer.on('hardware', (event, data) => {
    //event
    console.log('hardware event: ', data)

    switch(data.event.event) {
      case "connect":
        playSound('success')
        store.commit('connectKeepkey',true)
        // code block
        break;
      case "disconnect":
        playSound('fail')
        store.commit('disconnectKeepkey',false)
        // code block
        break;
      default:
        console.log("unhandled event! ",data.event)
    }

    //

    //if connect show icon

    //if disconect hide icon

  })
  ipcRenderer.on('dashboard', (event, data) => {
    console.log('dashboard event! ')
    console.log('data: ', data)

    for(let i = 0; i < data.layout.length; i++){
      let app = data.layout[i]
      store.commit('registerApp',app)
    }
  })
  ipcRenderer.on('setWalletInfoContext', (event, data) => {
    console.log(' setWalletInfoContext event! ')
    console.log('data: ', data)
    store.commit('setWalletInfo',data)

  })
  ipcRenderer.on('init', (event, data) => {
    console.log('init event! ')
    console.log('data: ', data)
    console.log('totalValueUsd: ', data.TOTAL_VALUE_USD_LOADED)

    //total USD value
    store.commit('setTotal',data.TOTAL_VALUE_USD_LOADED)

    for(let i = 0; i < data.wallets.length; i++){
      let wallet = data.wallets[i]
      console.log("wallet: ",wallet)

      store.commit('registerWallet',wallet)
    }

    //for each coin

    //set state

    //load wallet info

  })
  ipcRenderer.on('updateTotalValue', (event, data) => {
    console.log('updateTotalValue: ', data)
    store.commit('setTotal',data)
  })
  ipcRenderer.on('updateWalletsLoaded', (event, data) => {
    console.log('updateWalletsLoaded: ', data)
    for(let i = 0; i < data.length; i++){
      let wallet = data[i]
      store.commit('registerWallet',wallet)
    }
  })
  ipcRenderer.on('loadApps', (event, data) => {
    console.log('init event! ')
    console.log('data: ', data)
    console.log('APPS: ', data.APPS)

    for(let i = 0; i < data.APPS.length; i++){
      const app = data.APPS[i]
      store.commit('addApp',app)
    }

    //for each coin

    //set state

    //load wallet info

  })
  ipcRenderer.on('checkPioneerUrl', (event, data) => {
    console.log('checkPioneerUrl: ', data)
    console.log('checkPioneerUrl: online: ', data.online)
    store.commit('setPioneerLive',data.online)
  })
  ipcRenderer.on('setPioneerUrl', (event, data) => {
    //event
    console.log('setPioneerUrl', data.urlSpec)
    store.commit('setPioneerUrl',data.urlSpec)
  })
  ipcRenderer.on('setUsername', (event, data) => {
    //event
    console.log('**** setUsername', data)
    store.commit('setUsername',data.username)
    store.commit('setQueryKey',data.queryKey)
    //store.commit('setUsername',data.username)
  })
  ipcRenderer.on('hardwareInit', (event, data) => {
    console.log('**** hardwareInit', data)
    //TODO if not already in state

    //enable keepkey icon
    store.commit('connectKeepkey',true)

    //push device info to devices
    store.commit('registerDevice',data.info)
  })
  ipcRenderer.on('events', (event, data) => {
    //event
    console.log('event', data)
  })
  // ipcRenderer.on('startup', (event, data) => {
  //   //store.commit('hideModal','Connect')
  //
  //   //if setup
  //   //else
  // })
  ipcRenderer.on('viewSeed', (event, data) => {
    console.log('viewSeed!', data)
    store.commit('setViewSeed',data.seed)
  })
  // ipcRenderer.on('registerWallet', (event, data) => {
  //   console.log('wallet registered!', data)
  //   store.commit('registerWallet',data)
  // })
  ipcRenderer.on('navigation', (event, data) => {
    if(data.dialog){
      if(data.action === 'close'){
        store.commit('hideModal',data.dialog)
      }else if(data.action === 'open'){
        store.commit('showModal',data.dialog)
      }
    }
  })
  store.subscribe(( mutation) => {
    if (mutation.type === 'Something') {
      console.log('something called')
    }
  })
  store.subscribeAction({
    after: (action) => {
      if(action.type === 'load') {
        console.log('birds')
      }
    }
  })
}
