<template>
    <div class="q-gutter-md">
      <q-select
        borderless
        v-model="selectedAccount"
        :options="getCoins"
        :label="label"
        hide-bottom-space
        popup-content-class="asset-selector"
      >
      <template v-slot:selected>
          <q-item v-if="selectedAccount" class="select--asset">
              <q-item-section avatar class="select--asset-icon">
                <q-avatar class="asset-icon" :style="`background-image: linear-gradient(155deg, ${selectedAccount.color} 4%, ${selectedAccount.secondaryColor} 100%);`">
                    <img v-bind:src="selectedAccount.transparentIcon">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                  <q-item-label class="text-weight-medium" v-html="selectedAccount.displayName" />
                  <q-item-label caption>{{ selectedAccount.symbol }}</q-item-label>
              </q-item-section>
          </q-item>
          <q-badge v-else>*none*</q-badge>
      </template>
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section avatar>
                <q-avatar class="asset-icon" :style="`background-image: linear-gradient(155deg, ${scope.opt.color} 4%, ${scope.opt.secondaryColor} 100%);`">
                    <img v-bind:src="scope.opt.transparentIcon">
                </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" v-html="scope.opt.displayName" />
              <q-item-label caption>{{ scope.opt.symbol }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
</template>

<script>
import Coins from '../statics/coins'
import coinMap from '../statics/coinMap'
import { mapGetters } from 'vuex'

export default {
    name: 'AccountSelector',
    props: {
      value: {
        type: Object,
        required: true
      },
      label: {
        type: String,
        required: false,
        default: 'Send From'
      }
    },
    data() {
      return {
        coins: Coins
      }
    },
    computed: {
      selectedAccount: {
        get() {return this.value},
        set(selectedAccount) { this.$emit('input', selectedAccount)}
      },
      ...mapGetters(['getCoins'])
    }
}
</script>

<style lang="scss">
    .asset-selector {
        max-height:500px;
    }
    .select--asset {
      padding-left:0;
      padding-bottom:0;
    }
    .select--asset-icon {
      width:32px;
    }
</style>
