<template>
    <q-form @submit="onSubmit" ref="tradeForm">
        <div class="balance text-center q-mt-lg">
            Your {{from.coin.symbol}} balance = {{from.coin.balance * from.coin.price | numeralFormat('($0.00a)')}}
        </div>
        <div class="full-width row wrap justify-center items-center content-start">
            <div class="full-width row justify-center">
                <q-input
                    v-model="amount"
                    size="lg"
                    class="q-pt-lg q-pb-lg q-input--amount"
                    :input-style="{width: flexGrow + 'ch', maxWidth: '300px', minWidth: '50px'}"
                    @input="updateFiatAmount"
                    placeholder="0.00">
                    <template v-slot:prepend>
                        $
                    </template>
                </q-input>
            </div>
            <q-btn-toggle
                v-model="max"
                class="toggle--send-max q-mb-lg"
                toggle-color="primary"
                :options="sendMaxOptions"
                unelevated
            />
        </div>
        <div class="trade-inputs q-mb-lg">
            <q-btn-group class="full-width trade-row">
                <label class="inline-label">From</label>
                <AssetSelect v-model="from.coin" :other="to.coin"/>
                <q-input 
                    borderless 
                    :placeholder="from.coin.displayName" 
                    hide-bottom-space
                    v-model="from.amount" 
                    class="full-width" 
                    @input="updateFromAmount" />
            </q-btn-group>  
            <div class="full-width trade-switch">
                <q-separator color="gray" />
                <q-btn @click="switchTrade" unelevated round color="disabled-gradient" size="sm" class="q-mr-md">
                    <q-avatar icon="import_export" size="sm" />
                </q-btn>
            </div>
            <q-btn-group class="full-width trade-row">
                <label class="inline-label">To</label>
                <AssetSelect v-model="to.coin" :other="from.coin" />
                <q-input borderless :placeholder="to.coin.displayName" v-model="to.amount" class="full-width" @input="updateToAmount"/>
            </q-btn-group>
        </div>
        <div class="rate text-center q-mb-lg">1 {{from.coin.symbol}} = {{getRate.rate}} {{to.coin.symbol}}</div>
        <q-btn label="Trade" unelevated size="lg" class="full-width" type="submit" color="primary" :loading="getRateLoading" />
    </q-form>
</template>

<script>
import AssetSelect from '../AssetSelect'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    name: 'Trade',
    props: ['currentAccount'],
    components: {
        AssetSelect
    },
    data () {
        return {
            from: {
                coin: this.currentAccount || null,
                amount: null
            },
            to: {
                coin: {},
                amount: null
            },
            coin:"",
            amount: null,
            max: null,
            loading: false,
            disable: true,
            rate: 9048.57,
            fromAmountTest: null,
            toAmountTest: null,
            fiatAmountTest: null,
            sendMaxOptions : [
            {
                label: 'Min',
                value: 0
            },
            {
                label: 'Half',
                value: 50
            }, {
                label: 'Max',
                value: 100
            }]
        }
    },
    computed: {
        ...mapGetters(['getRate', 'getRateLoading']),
        flexGrow: function() {
            return this.amount ? this.amount.length : 4
        },
        tradePair: function() {
            return this.from.coin.symbol + '_' + this.to.coin.symbol
        } 
    },
    watch: {
        tradePair(newValue) {
            this.to.amount = null
            this.from.amount = null
            this.amount = null
            this.fetchRate(newValue)
        }
    },
    methods: {
        ...mapActions(['addTx', 'fetchRate']),
        ...mapMutations(['showModal', 'hideModal', 'setTradeOrder']),
        switchTrade () {
            const tFrom = this.from
            const tTo = this.to
            this.from = tTo
            this.to = tFrom
        },
        updateToAmount (e) {
            this.from.amount = (1/this.getRate.rate) * e
            this.amount = parseFloat(this.from.amount * this.from.coin.price).toFixed(2)
        },

        updateFromAmount (e) {
            this.to.amount = e * this.getRate.rate
            this.amount = parseFloat(e * this.from.coin.price).toFixed(2)
        },
        updateFiatAmount (e) {
            this.from.amount = e / this.from.coin.price
            this.to.amount = this.from.amount * this.getRate.rate
        },
        pollRate() {
            this.polling = setInterval(() => {
                this.fetchRate(this.tradePair)
            }, 15000)
        },
        onSubmit () {
            try {
                this.setTradeOrder({pair: this.tradePair, fiatAmount: this.amount, order: {from: this.from, to: this.to}})
                this.showModal('ConfirmTrade')

            } catch(err) {
                this.$q.notify({
                    message: err,
                    color: 'negative'
                })
                console.log(err);
                this.loading = false
            }
        }
    },
    beforeDestroy () {
        clearInterval(this.polling)
    },
    created () {
        this.pollRate()
    }
}
</script>

<style lang="scss">
    .trade-inputs {
        background: var(--border-color);
        border-radius: var(--border-radius);
        .trade-row {
            box-shadow: none;
            .inline-label {
                min-width:4rem;
                align-self: center;
                padding-left:1rem;
            }
            .q-field--borderless .q-field__inner {
                background:transparent;
            }
        }
        .trade-switch {
            display:flex;
            align-items:center;
            justify-content: space-between;
            padding:0;
            margin:-0.5rem 0;
        }
    }
    .rate {
        color:var(--text-color-2)
    }
</style>
