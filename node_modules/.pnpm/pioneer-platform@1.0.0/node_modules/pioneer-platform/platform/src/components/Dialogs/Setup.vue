<template>
    <q-card class="text-center q-pb-lg q-pl-lg q-pr-lg" style="min-width:450px;">
        <q-card-section>
        <h4>Setup</h4>
        <p>(no wallets found!) What would you like to do? </p>
        </q-card-section>
        <q-card-actions vertical align="center" class="q-pb-lg q-pl-md q-pr-md">
            <q-btn
              v-if="showSoftwareCreate"
              color="green"
              flat
              @click="openCreate()"
              label="Create New Wallet"
              align="left"
              icon="add"
              size="lg"
              class="full-width"
         />
            <!-- <q-btn color="primary" label="Configure Hardware Wallet" class="q-mt-md">
            <q-tooltip content-class="bg-accent">Keepkey, Ledger and Trezor wallets supported</q-tooltip>
            </q-btn> -->
          <q-btn
            color="white"
            @click="openRestore"
            label="Restore from seed..."
            icon="account_balance_wallet"
            class="full-width"
            flat
        />
        <q-btn
          v-if="showKeepkey"
          color="blue"
          @click="openConnect"
          class="full-width"
          icon="settings_ethernet"
          align="left"
          size="lg"
          label="Connect Hardware Wallet"
          flat
        />
        </q-card-actions>
    </q-card>
</template>
<script>

import { mapMutations } from 'vuex'

let featureSoftwareCreate = process.env['CREATE_SOFTWARE_FEATURE']
let featureKeepkey = process.env['KEEPKEY_FEATURE']

export default {
    data() {
      return {
        showSoftwareCreate: featureSoftwareCreate,
        showKeepkey: featureKeepkey,
      };
    },
    methods: {
      ...mapMutations(['showModal','hideModal']),
      openCreate: function () {
        this.$q.electron.ipcRenderer.send('createWallet', {});
      },
      openRestore: function () {
        this.hideModal()
        this.showModal('Restore')
      },
      openConnect: function () {
        this.hideModal()
        this.showModal('Hardware')
      }
    }
}
</script>
