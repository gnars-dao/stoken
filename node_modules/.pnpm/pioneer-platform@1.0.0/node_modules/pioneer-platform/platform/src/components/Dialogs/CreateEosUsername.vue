<template>
  <q-card class="text-center q-pl-lg q-pr-lg" style="min-width:450px;">

    <div v-if="!confirmUsername">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        @cancel="onCancel"
      >
        <q-card-section>
          <h4>Register EOS Username!</h4>

          <p>Usernames must be exactly 12 character's long and only contain the letters a-z and the numbers 1-5 (a-z 1-5)</p>
          <p>
            <small>{{pubkey}}</small>
          </p>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length === 12 || 'not a-z 1-5 or length 12']"
          />
          <!--        <q-toggle v-model="accept" label="I accept the license and terms" />-->
        </q-card-section>
        <q-card-actions vertical align="center" class="q-pb-lg q-pl-md q-pr-md">
          <q-btn label="Continue" type="submit" color="primary" class="full-width" size="lg" />
          <q-btn label="Reset" type="reset" flat />
        </q-card-actions>
      </q-form>
    </div>

    <div v-if="confirmUsername">
        <h2> Confirm Register Username! </h2>
        <small>{{pubkey}}</small>
        <q-btn class="primary" @click="onConfirmed">
          Register {{username}}!
        </q-btn>
      <small>(can only do this one)</small>
      <q-btn class="primary" @click="onCancel">
        Cancel!
      </q-btn>

      <q-btn>

      </q-btn>
    </div>

  </q-card>
</template>
<script>

  import pioneer from '@pioneer-platform/pioneer-client';
  const urlSpec = process.env['URL_PIONEER_SPEC']
  import { mapMutations,mapGetters } from 'vuex'
  export default {
    data () {
      return {
        error:false,
        username: "",
        pubkey: "",
        confirmUsername:false,
        isSent:false,
        txid:""
      }
    },
    async mounted() {
      try{
        const coins = await this.getCoins()
        let EOS = coins.filter(e => e.symbol === 'EOS')
        EOS = EOS[0]
        console.log("EOS: ",EOS)
        console.log("EOS: ",EOS.stake)
        console.log("EOS: ",EOS.stake.pubkey)
        if(EOS.stake){
          this.pubkey= EOS.stake.pubkey
        }

        const queryKey = this.$store.getters['getQueryKey'];

        await pioneer.init(urlSpec,{queryKey})
        console.log('process.env',process.env)

      }catch(e){
        console.error(e)
      }
    },
    methods: {
      ...mapGetters(['getCoins']),
      ...mapMutations(['showModal','hideModal']),
      onSubmit: async function () {
        console.log("onSubmit")
        //is name registered?
        const userInfoPublic = await pioneer.validateEosUsername(this.username)
        console.log("userInfoPublic: ",userInfoPublic)

        //if so continue
        if(!userInfoPublic.isRegisterd && userInfoPublic.isValid){

          //get coins

          //get pubkey
          this.confirmUsername = true


        } else {
          this.onReset()
          this.error = "Username already taken!"
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: this.error
          })
        }
      },
      async onConfirmed () {
        //register
        if(this.pubkey && this.username){
          const registerResult = await pioneer.registerEosUsername(this.pubkey,this.username)
          console.log("registerResult: ",registerResult)

          //
          if(registerResult.success && registerResult.txid){
            this.txid = registerResult.txid

            //TODO add tx into tx history

            //TODO update coin info in state
            this.hideModal()
          }

        } else {
          throw Error("Unable to register! ")
        }

      },
      onReset () {
        this.username = null
      },
      onCancel () {
        this.hideModal()
      },
      openSetup: function () {
        this.hideModal()
        //open setup
        //this.showModal('Setup')
      }
    }
  }
</script>
