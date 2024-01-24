<template>
  <q-card class="text-center q-pb-lg q-pt-lg q-pl-lg q-pr-lg" style="min-width:750px">
    <slide-y-down-transition appear group>
      <q-form @submit="confirmTransaction" v-if="status === 'built'" key="built">
        <q-card-section class="q-pt-xl">
          <p>Are you sure you want to</p>
          <h4 class="q-mt-sm q-mb-sm">Send {{getWalletSendInfo.amount}} {{getWalletSendInfo.asset}}</h4>
        </q-card-section>
        <q-card-section>
          <q-list bordered padding class="rounded-borders q-ml-lg q-mr-lg">
            <q-item>
              <q-item-section>
                <q-item-label class="text-left">Sending:</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{getWalletSendInfo.amount}} {{getWalletSendInfo.asset}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-left">Value:</q-item-label>
              </q-item-section>
              <q-item-section side>
                Some value in USD
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-left">Address:</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label lines="1" style="">
                  {{getWalletSendInfo.address}}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-left">Status:</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label lines="1" style="">
                  {{getWalletSendInfo.status}}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn label="Send" unelevated size="lg" type="submit" color="primary" class="font-weight-medium q-pl-md q-pr-md" style="font-size:1rem;" @click="confirmTransaction" />
        </q-card-actions>
      </q-form>
      <q-card-section v-if="getWalletSendInfo.status === 'broadcasted' || getWalletSendInfo.status === 'confirmed'" key="broadcast">
        <q-item>
          <q-item-section>
            <q-item-label class="text-left">TXID:</q-item-label>
          </q-item-section>
          <q-item-section side style="max-width:80%" lines="1">
            <q-item-label lines="1">{{getWalletSendInfo.txid}}</q-item-label>
          </q-item-section>
        </q-item>

        <slide-y-down-transition group>
          <q-spinner
            color="primary"
            size="5rem"
            v-if="status === 'broadcasted'"
            key="spinner"
          />
          <q-icon name="check_circle" color="primary" size="5rem" v-if="getWalletSendInfo.status === 'confirmed'" key="confirm" />
        </slide-y-down-transition>
        <h4>Transaction Pending!</h4>
      </q-card-section>
    </slide-y-down-transition>
    <q-btn label="exit" unelevated color="grey" class="q-pl-md q-pr-md" flat @click="cancel" />
  </q-card>
</template>
<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import {SlideYDownTransition} from 'vue2-transitions'
  export default {
    name: 'ConfirmSend',
    components: {
      SlideYDownTransition
    },
    data () {
      return {
        walletSendInfo:{
          coin:'ETH',
          rawTx:'',
          address:'',
          amount:'',
          txid:'',
        },
        error: false,
        loading: false,
        status: 'built'
      }
    },
    computed: {
      ...mapGetters(['getWalletSendInfo'])
    },
    methods: {
      ...mapMutations(['showModal', 'hideModal']),
      ...mapActions(['addTx']),
      confirmTransaction: function () {
        try {
          console.log(this.getWalletSendInfo)

          //broadcast
          this.$q.electron.ipcRenderer.send('wallet-send-broadcast', this.getWalletSendInfo)
          
          this.status = "broadcasted"


          //this.hideModal('ConfirmSend') //@TODO: how do we know this is done?
        } catch (e) {
          console.error(e)
        }
      },
      cancel: function () {
        try {
          this.hideModal('ConfirmSend')
        } catch (e) {
          console.error(e)
        }
      },
    }
  }
</script>
