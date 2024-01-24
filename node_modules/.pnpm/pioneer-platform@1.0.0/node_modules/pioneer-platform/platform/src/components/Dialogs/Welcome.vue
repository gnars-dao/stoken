<template>
  <q-card class="text-center q-pl-lg q-pr-lg" style="min-width:450px;">
    <div class="q-pa-md">
      <h5>Welcome!</h5>
      <div class="q-gutter-sm">
        <small>the software is provided 'as is', without warranty of any kind, express or implied. </small>
      </div>
      <br>
      <div v-if="!usePrivateNode">
        <div class="q-gutter-sm">
          <q-checkbox v-model="acceptTerms" label="Using Public Rosetta Servers may link your public crypto activity with your IP address as well as other metadata. I understand the risks."></q-checkbox>
        </div>
      </div>
      <div class="q-px-sm">
      </div>
      <small>Self Host & configure</small><q-toggle v-model="usePrivateNode" color="green"/>
      <div v-if="!usePrivateNode">
        <q-btn @click="onSubmitQuick" label="Continue to using Public Nodes" type="configure" color="primary" class="q-ml-sm"/>
      </div>
      <div v-if="usePrivateNode">
        <q-btn @click="onSetupPioneer" label="Continue to Node Setup" type="configure" color="primary" class="q-ml-sm"/>
      </div>
    </div>
  </q-card>
</template>
<script>
  /*

      Username Dialog

      Verify connected to pioneer:

      Offer changing of url if not live

   */


  //TODO offer pre-generated name
  // import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        error:false,
        pioneerLive:false,
        acceptTerms:false,
        username: "",
        usePrivateNode: false,
        // pioneerUrl:"",
        password:""
      }
    },
    async mounted() {
      try{
        // console.log("env var: ",process.env['URL_PIONEER_SPEC'])
        // this.pioneerUrl = process.env['URL_PIONEER_SPEC']
        this.$q.electron.ipcRenderer.send('checkPioneerUrl', {});

      }catch(e){
        console.error(e)
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
    methods: {
      ...mapMutations(['showModal','hideModal']),
      onSetupPioneer: async function () {
        console.log("Setup Pioneer")
        this.showModal('Pioneer')
      },
      onSubmitQuick: async function () {
        console.log("onSubmit")

        //if accepted terms
        if(this.acceptTerms){
          this.$q.electron.ipcRenderer.send('setPioneerUrl', {});
          this.hideModal()
          this.showModal('Username')
        }else{
          console.error("Must Accept terms!")
          alert("Must Accept terms!")
        }
      },
      accept () {
        console.log("clicked checkbox")

      },
      onReset () {
        this.username = null
      },
      openSetup: function () {
        this.hideModal()
        //open setup
        this.showModal('Setup')
      }
    }
  }
</script>
