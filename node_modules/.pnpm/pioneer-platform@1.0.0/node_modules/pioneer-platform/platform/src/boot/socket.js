// import something here
import VueNativeSock from 'vue-native-websocket'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file

export default ({ app, Vue }) => {
  Vue.use(VueNativeSock, 'wss://ws.coincap.io/prices?assets=ALL', { store: app.store })
}
