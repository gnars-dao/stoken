<template>
  <q-card class="text-center q-pb-lg" style="min-width:450px;">
    <q-card-section>
      <div v-if="!isLoaded">
        <p>Waiting for response from a Pioneer server! </p>
      </div>
      <small>Connecting to keepkey!</small>

      <q-spinner
        color="primary"
        size="5rem"
        v-if="!isLoaded"
        key="spinner"
      />


    </q-card-section>
    <q-card-actions vertical align="center" class="q-pb-lg">
      <q-form
        class="q-gutter-md"
      >
        <h5>Wallets loaded: {{wallets.length}}</h5>
        <h5>total value (USD) {{formatToPriceUSD(totalValueUsd)}}</h5>
        <q-input
          v-if="showUrl"
          filled
          v-model="pioneerUrl"
          label="Pioneer URL"
          hint=""
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-btn
          v-if="showUrl"
          @click="onLogin" label="Update" type="submit" color="primary"/>

        <div v-if="!isLoaded">
          <q-btn @click="closeConnect" label="Continue in offline mode" type="configure" color="primary" flat class="q-ml-sm"/>
        </div>

      </q-form>

    </q-card-actions>
  </q-card>
</template>
<script>

  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        // wallets:[],
        totalValueUsd: 0,
        isLoaded:false,
        interval:null,
        showUrl:false,
        pioneerUrl:"",
        error:false,
        username: ""
      }
    },
    computed: {
      ...mapGetters(['wallets']),
    },
    watch: {
      "$store.state.pioneerUrl": {
        handler: function(value) {
          console.log("pioneerUrl value: ",value)
          this.pioneerUrl = value
        },
        immediate: true
      },
      // "$store.state.pioneerLive": {
      //   handler: function(value) {
      //     console.log("pioneerLive value: ",value)
      //     this.pioneerLive = value
      //   },
      //   immediate: true
      // },
      // "$store.state.wallets": {
      //   handler: function (value) {
      //     console.log("wallet registered!")
      //     console.log("value: ",value)
      //     this.isLoaded = true
      //     const wallets = this.$store.getters['getWallets'];
      //     this.hideModal('Connect')
      //   },
      //   immediate: true // provides initial (not changed yet) state
      // },
      // "$store.state.totalUsd": {
      //   handler: function(value) {
      //     console.log("TOTAL USD CHANGED!")
      //     //get value
      //     const totalUsd = this.$store.getters['getTotal'];
      //     console.log("TOTAL USD: ",totalUsd)
      //     this.totalValueUsd = totalUsd
      //
      //     //setTimeout(6000,this.closeConnect())
      //   },
      //   immediate: true // provides initial (not changed yet) state
      // },
    },
    mounted() {
      //this.onLogin()
    },
    methods: {
      ...mapMutations(['showModal','hideModal','setOffline']),
      formatToPriceUSD(value) {
        return `$ ${Number(value).toFixed(2)}`;
      },
      onLogin() {
        this.$q.electron.ipcRenderer.send('onLogin', {});
      },
      onReset() {
        this.pioneerUrl = null
      },
      closeConnect() {
        //this.hideModal('Connect')
      }
    }
  }
</script>
