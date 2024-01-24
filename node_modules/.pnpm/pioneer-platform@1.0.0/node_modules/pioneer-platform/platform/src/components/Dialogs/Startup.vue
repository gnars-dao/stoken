<template>
  <q-card class="text-center q-pb-lg">
    <q-card-section>
      <h4>Attempting to Start Wallet!</h4>
      <q-spinner
        color="primary"
        size="5rem"
        v-if="isReady === false"
        key="spinner"
      />
      <div v-if="isReady">
        <h3>Loaded Wallet Successfully!</h3>
        <q-icon name="done" />
      </div>
      <div v-if="!isReady">
        <p>Loading Wallet! </p>
      </div>
    </q-card-section>
    <q-card-actions vertical align="left" class="q-pb-lg">
      <div class="q-pa-md text-white">
        <q-list align="left" separator style="width: 418px">
          <q-item clickable v-ripple>
            <q-item-section>
              Username: {{username}}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-section>
                QueryKey: {{queryKey}}</q-item-section>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-section>
                WalletId: {{walletId}}

                <br/>
                total Value: {{totalValueUsd}}

                <br/>
<!--                Master BTC:{{masterAddressBtc}}-->

<!--                <br/>-->
<!--                Master ETH: {{masterAddressEth}}-->
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-list>
      </div>


<!--      <q-btn-->
<!--        color="primary"-->
<!--        @click="checkWallet"-->
<!--        label="Update"-->
<!--        size="lg"-->
<!--        class="font-weight-medium q-pl-md q-pr-md"-->
<!--        style="font-size:1rem;"-->
<!--      ></q-btn>-->
<!--      <q-btn-->
<!--        color="primary"-->
<!--        @click="changeWallet"-->
<!--        label="Change Wallet"-->
<!--        size="lg"-->
<!--        class="font-weight-medium q-pl-md q-pr-md"-->
<!--        style="font-size:1rem;"-->
<!--      ></q-btn>-->
<!--      <q-btn-->
<!--        color="primary"-->
<!--        @click="addPath"-->
<!--        label="Add Path"-->
<!--        size="lg"-->
<!--        class="font-weight-medium q-pl-md q-pr-md"-->
<!--        style="font-size:1rem;"-->
<!--      ></q-btn>-->
<!--      <q-btn-->
<!--        color="primary"-->
<!--        @click="startPlatform"-->
<!--        label="Continue"-->
<!--        size="lg"-->
<!--        class="font-weight-medium q-pl-md q-pr-md"-->
<!--        style="font-size:1rem;"-->
<!--      ></q-btn>-->
    </q-card-actions>
  </q-card>
</template>
<script>

  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        isReady:false,
        walletId:"",
        masterAddressBtc:"",
        masterAddressEth:"",
        totalValueUsd:0,
        isUsernameValid:false,
        isQuerykeyActive:false,
        isWalletLoaded:false,
        isWalletCorrect:false,
        pioneerUrl:"",
        error:false,
        username: "",
        password: "",
        auth: "",
        queryKey: ""
      }
    },
    mounted() {
      try{

      }catch(e){
        console.error(e)
      }
    },
    watch: {
      "$store.state.totalUsd": {
        handler: function(value) {
          console.log("TOTAL USD CHANGED!")
          //get value
          const totalUsd = this.$store.getters['getTotal'];
          console.log("TOTAL USD: ",totalUsd)
          this.totalValueUsd = totalUsd
          this.isReady = true
          this.hideModal()
        },
        immediate: true // provides initial (not changed yet) state
      }
    },
    computed: {
      ...mapGetters(['getTotal']),
    },
    methods: {
      ...mapMutations(['showModal','hideModal']),
      onReset () {
        this.username = null
      },
      startPlatform: function () {
        this.hideModal()
      },
      addPath () {
        this.hideModal()
        //open migrate
        //this.showModal('Setup')
      },
      changeWallet: function () {
        this.hideModal()
        //open migrate
        //this.showModal('Setup')
      }
    }
  }
</script>
