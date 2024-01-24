<template>
  <q-card class="text-center q-pb-lg q-pt-lg q-pl-lg q-pr-lg" style="min-width:550px">
      <q-form @submit="confirmTransaction" key="built">
        <q-card-section class="q-pt-xl">
          <p>Are you sure you want to</p>
          <h4 class="q-mt-sm qmb-sm">Trade {{getTradeOrder.fiatAmount | numeralFormat(('$0,0.00')) }}</h4>
        </q-card-section>
        <q-card-section>
          <q-list bordered padding class="rounded-borders q-ml-lg q-mr-lg">
            <q-item>
              <q-item-section>
                <q-item-label class="text-left">From:</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{getTradeOrder.order.from.amount}} {{getTradeOrder.order.from.coin.symbol}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-left">To:</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{getTradeOrder.order.to.amount}} {{getTradeOrder.order.to.coin.symbol}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn label="Confirm and Trade" unelevated size="lg" type="submit" color="primary" class="font-weight-medium q-pl-md q-pr-md" style="font-size:1rem;" @click="confirmTransaction" />
        </q-card-actions>
      </q-form>
    <q-btn label="exit" unelevated color="grey" class="q-pl-md q-pr-md" flat @click="cancel" />
  </q-card>
</template>
<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ConfirmSend',
    computed: {
      ...mapGetters(['getTradeOrder','getAuthToken'])
    },
    methods: {
      ...mapMutations(['showModal', 'hideModal', 'setTradeOrder']),
      ...mapActions(['addTx']),
      confirmTransaction: function () {
        try {
          console.log("")

          const auth = this.getAuthToken
          console.log("auth: ",auth)
          // if(!auth) throw Error("cant trade unless logged in!" )
          //broadcast
          this.$q.electron.ipcRenderer.send('wallet-shift', {pair:"ETH_DAI",amount:0.001,auth})

          this.status = "broadcasted"

          //this.hideModal('ConfirmSend') //@TODO: how do we know this is done?
        } catch (e) {
          console.error(e)
        }
      },
      cancel: function () {
        try {
          this.setTradeOrder({})
          this.hideModal()
        } catch (e) {
          console.error(e)
        }
      },
    },
    mounted () {
        console.log('auth', this.getAuthToken)
        console.log('order', this.getTradeOrder)
    }
  }
</script>
