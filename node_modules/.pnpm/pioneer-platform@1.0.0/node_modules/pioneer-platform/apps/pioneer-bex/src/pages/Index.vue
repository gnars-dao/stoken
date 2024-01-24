<template>
  <q-page class="row items-center justify-evenly">

    <!-- If new -->
    <div v-if="firstOpen" align="center">
      <h2>Welcome</h2>

<!--      <q-btn @click="onPairKeepkey" align="center" label="Pair Keepkey" type="configure" color="primary" />-->
<!--      <br/>-->

      <br/>
<!--      <div class="q-gutter-sm">-->
<!--        <small>the software is provided 'as is', without warranty of any kind, express or implied. </small>-->
<!--      </div>-->
    </div>


    <!-- If pair keepkey -->
    <div v-if="pairKeepkey" align="center">
      <setup-keepkey
        title="Pair Keepkey"
        active
        :mnemonic="seed"
        @exit="pairKeepkey = false; firstOpen = true"
      ></setup-keepkey>
    </div>

    <!-- If dashboard -->
    <div v-if="showDashboard" align="center">

      total value: {{totalValue}}


<!--      <dashboard-component-->
<!--        title="Pair Keepkey"-->
<!--        active-->
<!--        :mnemonic="seed"-->
<!--        @exit="confirmSeed = false; showDashboard = true"-->
<!--      ></dashboard-component>-->
    </div>

  </q-page>
</template>

<script lang="ts">
import RestoreComponent from 'components/RestoreComponent.vue';
import SetupKeepkey from 'components/SetupKeepkeyComponent.vue';
import DisplaySeedComponent from 'components/DisplaySeedComponent.vue';
import DashboardComponent from 'components/DashboardComponent.vue';

import Vue from 'vue';
import * as ls from "local-storage";
const Pioneer = require('@pioneer-platform/pioneer')


//TODO
let urlSpec = "http://127.0.0.1:9001/spec/swagger.json"
let walletName = "bex_new_2"

let WALLET:any

export default Vue.extend({
  name: 'PageIndex',
  components: {
    SetupKeepkey,
    RestoreComponent,
    DisplaySeedComponent,
    DashboardComponent
  },
  data () {
    return {
      totalValue:0,
      showDashboard:false,
      pairKeepkey:false,
      enterSeed:false,
      firstOpen:false,
      confirmSeed:false,
      error:false,
      seed:"",
      pioneerLive:false,
      acceptTerms:false,
      username: "",
      usePrivateNode: false,
      // pioneerUrl:"",
      password:""
    }
  },
  async mounted() {
    try {

      //get lock status
      // let lockStatus = await Hardware.isLocked()
      // console.log("lockStatus: ",lockStatus)

      let config = ls.get('config')
      console.log("config: ",config)

      // if(!config){
      //
      // } else {
      //
      // }


    }catch(e){
      //TODO show error page
      console.error("Failed to run UI! error: ",e)
    }
  },
  methods: {
    async onStart(){
      try{

      }catch(e){

      }
    },
    onPairKeepkey(){
      //open pin select
      this.firstOpen = false
      this.pairKeepkey = true

    },
    submitPin(pin:any){
      //open pin select

    },
    onSubmitSeed(){
      //
      console.log("onSubmitSeed")
    },
  }
});
</script>
