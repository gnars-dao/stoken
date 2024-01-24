import axios from 'axios';

const state = {
    // username:"",
    password: null,
    authToken: null,
    queryKey: null,
    isLoggedIn: false
}

const getters = {
    getPassword: state => state.password,
    getAuthToken: state => state.authToken,
    getQueryKey: state => state.queryKey,
    getIsLoggedIn: state => state.isLoggedIn,
    // getUsername: state => state.username,
}

const actions = {
    // async createApiKey({ commit }) {
    //
    // }
}

const mutations = {
    // setUsername(state, username){
    //   state.username = username
    // },
    setAuthToken(state, authToken) {
        state.authToken = authToken
    },
    setQueryKey(state, queryKey) {
      state.queryKey = queryKey
    },
    setPassword(state, password) {
        state.password = password
    },
    login(state) {
        state.isLoggedIn = true
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
