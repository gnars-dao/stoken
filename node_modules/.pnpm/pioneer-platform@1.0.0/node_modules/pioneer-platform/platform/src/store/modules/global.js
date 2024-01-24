import axios from 'axios'
const state = {
    // keepkeyConnected:false,
    // trezorConnected:false,
    // ledgerConnected:false,
    offlineMode: false,
    modalVisible: false,
    modalComponent: null,
    tradeRate: {},
    rateLoading: false,
    tradeOrder: {},
    apps: [
    ],
    txPanel: true
}

const getters = {
    // getKeepkeyConnected: (state) => state.keepkeyConnected,
    // getTrezorConnected: (state) => state.trezorConnected,
    // getLedgerConnected: (state) => state.ledgerConnected,
    getRate: (state) => state.tradeRate,
    getApps: (state) => state.apps,
    getTradeOrder: (state) => state.tradeOrder,
    getRateLoading: (state) => state.rateLoading,
    txPanelVisible: (state) => state.txPanel
}

const mutations = {
    showModal(state, componentName) {
        state.modalVisible = componentName ? true : false
        state.modalComponent = componentName
    },
    setOffline(state) {
      state.offlineMode = true
    },
    hideModal(state) {
        state.modalVisible = false
    },
    // setKeepkeyConnected: (state, value) => (state.keepkeyConnected = value),
    // setTrezorConnected: (state, value) => (state.trezorConnected = value),
    // setLedgerConnected: (state, value) => (state.ledgerConnected = value),
    setRate: (state, tradeRate) => (state.tradeRate = tradeRate),
    setRateLoading: (state, loading) => (state.rateLoading = loading),
    setTradeOrder: (state, order) => (state.tradeOrder = order),
    addApp: (state, app) => state.apps.unshift(app),
    removeApp: (state, app) => {
        const i = state.apps.map(item => item._id).indexOf(app._id)
        state.apps.splice(i, 1)
    },
    togglePanel: (state) => {
        const visible = !state.txPanel
        state.txPanel = visible
    }
}

export default {
    state,
    getters,
    mutations
}
