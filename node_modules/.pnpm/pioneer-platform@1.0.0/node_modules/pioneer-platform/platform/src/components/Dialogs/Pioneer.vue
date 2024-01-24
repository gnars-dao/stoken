<template>
  <q-card class="text-center q-pl-lg q-pr-lg" style="min-width:450px;">
    <div class="q-pa-md">
      <h5>Configure Pioneer Node!</h5>
      <br />node version:
      <br />pioneer version:
      <br />server status
      <br />Pioneer Config file
      <br />Install
      <br />Start
    </div>
  </q-card>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "Pioneer",
        data () {
          return {
            error:false,
            pioneerLive:false,
            pioneerUrl:"",
          }
        },
        watch: {
          "$store.state.pioneerUrl": {
            handler: function(value) {
              console.log("pioneerUrl value: ",value)
              this.pioneerUrl = value
            },
            immediate: true
          },
          "$store.state.pioneerLive": {
            handler: function(value) {
              console.log("pioneerLive value: ",value)
              this.pioneerLive = value
            },
            immediate: true
          }
        },
        async mounted() {
          try{

            //
            this.onStartPioneer()

          }catch(e){
            console.error(e)
          }
        },
        methods: {
          ...mapMutations(['showModal','hideModal']),
          onInstallPioneer: async function () {
            console.log("install Pioneer cli")
            //
          },
          onStartPioneer: async function () {
            console.log("start Pioneer")
            //
            this.$q.electron.ipcRenderer.send('onStartPioneer', {});
          },
          onStopPioneer: async function () {
            console.log("start Pioneer")
            //
            this.$q.electron.ipcRenderer.send('onStopPioneer', {});
          },
          openSetup: function () {
            this.hideModal()
            //open setup
            this.showModal('Setup')
          }
        }
    }
</script>

<style scoped>

</style>
