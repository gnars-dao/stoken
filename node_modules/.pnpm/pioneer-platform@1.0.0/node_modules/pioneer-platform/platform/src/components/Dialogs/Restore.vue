<template>
  <q-card class="text-center q-pb-lg q-pl-lg q-pr-lg" style="min-width:450px;">
<!--    <q-card-section>-->
<!--      <h4>Recovery Wizzard</h4>-->

<!--      I have a hardware wallet-->
<!--      <q-icon name="account"></q-icon>-->

<!--      import seed-->


<!--      Supported wallets:-->


<!--      <div class="q-pa-md">-->
<!--        <h5>Welcome!</h5>-->
<!--        <div class="q-gutter-sm">-->
<!--          <h4>Recovery Wizzard</h4>-->
<!--          <small>setup your wallet</small>-->
<!--        </div>-->
<!--          <q-btn @click="openConnect" label="Connect Hardware Wallet" type="configure" color="primary" class="q-ml-sm"/>-->
<!--          <q-btn @click="openRestore" label="Restore From seed" type="configure" color="primary" class="q-ml-sm"/>-->
<!--        </div>-->


<!--    </q-card-section>-->


    <q-card-section>
      <h4>Recovery Wizzard</h4>
      <p>restore your wallet</p>
    </q-card-section>
    <q-card-actions vertical align="center" class="q-pb-lg q-pl-md q-pr-md">

<!--      <div v-if="showKeepkey">-->
<!--        <q-btn-->
<!--          color="green"-->
<!--          flat-->
<!--          @click="openConnect()"-->
<!--          label="Connect Hardware Wallet"-->
<!--          align="left"-->
<!--          icon="add"-->
<!--          size="lg"-->
<!--          class="full-width"-->
<!--        />-->
<!--      </div>-->

      <!-- <q-btn color="primary" label="Configure Hardware Wallet" class="q-mt-md">
      <q-tooltip content-class="bg-accent">Keepkey, Ledger and Trezor wallets supported</q-tooltip>
      </q-btn> -->

      <!-- TODO offer 24! -->
      <q-btn
        color="white"
        align="left"
        @click="openRestore"
        label="Restore from 12 word seed"
        icon="account_balance_wallet"
        class="full-width"
        flat
      />
    </q-card-actions>

  </q-card>
</template>
<script>

  let featureKeepkey = process.env['KEEPKEY_FEATURE']

  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        showKeepkey: featureKeepkey,
      };
    },
    methods: {
      ...mapMutations(['showModal','hideModal']),
      openRestore: function () {
        this.hideModal()
        this.showModal('RestoreFromSeed')
      },
      openConnect: function () {
        this.hideModal()
        this.showModal('Hardware')
      }
    }
  }
</script>
