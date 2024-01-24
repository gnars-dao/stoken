<template>
  <q-card class="text-center q-pl-lg q-pr-lg" style="min-width:450px;">
    <small>Setup Username</small>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
    <q-card-section>
      <div v-if="pioneerLive">
        <p>Please create a user</p>
      </div>
      <div v-if="!pioneerLive">
        <q-input
          filled
          v-model="pioneerUrl"
          label="Pioneer URL"
          hint=""
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <small>Attempting to connect...</small>
        <q-spinner
          color="primary"
          size="5rem"
          v-if="true"
          key="spinner"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div v-if="pioneerLive">
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something unique']"
        />
      </div>
<!--  TODO      <q-toggle v-model="accept" label="I accept the license and terms" />-->
    </q-card-section>
      <q-card-actions align="center" class="q-pb-lg q-pl-md q-pr-md">
        <div v-if="pioneerLive">
          <q-btn label="Continue" type="submit" color="primary" />
        </div>
        <div v-if="!pioneerLive">
          <q-btn label="Test" @click="onTest" color="primary" />
          <q-btn label="Reset" type="reset" flat />
        </div>
      </q-card-actions>
    </q-form>
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

  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        error:false,
        pioneerLive:false,
        username: "",
        pioneerUrl:"",
        password:""
      }
    },
    computed: {
      ...mapGetters(['pioneerUrl','pioneerLive']),
    },
    async mounted() {
      try{
        this.$q.electron.ipcRenderer.send('checkPioneerUrl', {});
      }catch(e){
        console.error(e)
      }
    },
    watch: {
      "$store.state.pioneerUrl": {
        handler: function() {
          const pioneerUrl = this.$store.getters['getPioneerUrl'];
          console.log("pioneerUrl: ",pioneerUrl)
          this.pioneerUrl = pioneerUrl
        },
        immediate: true
      },
      "$store.state.pioneerLive": {
        handler: function() {
          const pioneerLive = this.$store.getters['getPioneerLive'];
          console.log("pioneerLive: ",pioneerLive)
          this.pioneerLive = pioneerLive
        },
        immediate: true
      }
    },
    methods: {
      ...mapMutations(['showModal','hideModal']),
      onSubmit: async function () {
        console.log("onSubmit")

        //update url


        //if password
        let payload = {
          username:this.username
        }
        if(this.usePassword){
          //check rules
          // > x
          console.log("password")
          payload.password = this.password
        }

        if(this.pioneerUrl){
          payload.urlSpec = this.pioneerUrl
        }

        this.$q.electron.ipcRenderer.send('onAttemptCreate', payload);

        //check username

        //if username available
        //else clear username


        //if so continue
        // if(userInfoPublic.available){
        //   //set username to state
        //   this.$store.commit('setUsername',this.username)
        //
        // } else {
        //   this.onReset()
        //   this.error = "Username already taken!"
        //   this.$q.notify({
        //     color: 'red-5',
        //     textColor: 'white',
        //     icon: 'warning',
        //     message: this.error
        //   })
        // }
      },
      onTest () {
        //update url
        console.log("pioneerUrl: ",this.pioneerUrl)
        this.$q.electron.ipcRenderer.send('checkPioneerUrl', {urlSpec:this.pioneerUrl});
        this.onSubmit()
        //test url
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
