import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist';

import global from './modules/global'
import wallet from './modules/platform'
import auth from './modules/auth'
import coincap from './modules/coincap'


import ipc from './plugins/ipc'

// import app from './App'

Vue.use(Vuex)

/**
 * Get coinMap
 */

import coinMap from '../statics/coinMap'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
// });

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      global,
      wallet,
      auth,
      coincap
    },
    plugins: [ipc],
    strict: true,
  });

  return Store
}


//TODO break out to modules!
// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       app
//     },
//
//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEV
//   })
//
//   return Store
// }
