// import axios from 'axios'

const state = {
    isConnected: false,
    message: '',
    stats: {}
}

const getters = {
    getStats: (state) => state.stats
}

const actions = {
    fetchStats({ commit }, asset) {
        //todo THIS BREAK THE APP!  https://api.coincap.io/v2/assets/bnb 404 :rabble:
        // commit('setAssetLoading', true)
        // const response = await axios.get(`https://api.coincap.io/v2/assets/${asset.replace(/\s+/g, '-').toLowerCase()}`)
        // commit('setStats', response.data.data)

       commit('setAssetLoading', false)
    }
}

const mutations = {
    setStats: (state, stats) => (state.stats = stats)
}

export default {
    state,
    getters,
    actions,
    mutations
}
