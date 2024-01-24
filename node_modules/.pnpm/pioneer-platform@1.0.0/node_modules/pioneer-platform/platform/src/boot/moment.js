// import something here
import vueMoment from 'vue-moment'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default  ({Vue}) => {
  Vue.use(vueMoment)
}
