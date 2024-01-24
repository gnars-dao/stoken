<template>
    <q-form @submit="onSubmit" ref="sendForm">
        <div class="full-width row wrap justify-center items-center content-start q-mt-lg">
            <div class="full-width row justify-center">
                <q-input
                    v-model="amount"
                    size="lg"
                    class="q-pt-lg q-pb-lg q-input--amount"
                    :input-style="{width: flexGrow + 'ch', maxWidth: '300px', minWidth: '50px'}"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'You Must Select an Amount']"
                    placeholder="0.00">
                    <template v-slot:append>
                        {{from.symbol}}
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
        <accountSelector v-model="from" />
        <q-input
            borderless
            stack-label
            v-model="to"
            size="lg"
            label="Send To"
            input-class="sendTo"
            class="q-pt-lg q-pb-lg q-mb-sm"
            :placeholder="from.displayName + ' Address'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'You must put an address']">
            <template v-slot:append v-if="hasWebCam">
                <q-btn round dense flat icon="app:receive" @click="showQrCode = true" />
            </template>
            </q-input>
        <q-btn label="Send" unelevated size="lg" class="full-width" type="submit" color="primary" :loading="txBuilding" />
        <q-dialog v-model="showQrCode" position="top" v-if="hasWebCam">
            <q-card>
                <q-card-section>
                    <qrcode-stream @decode="onDecode" :camera="selectedCamera" v-if="hasWebCam"></qrcode-stream>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-form>
</template>

<script>
import accountSelector from '../AccountSelector'
import { mapActions } from 'vuex'
import { mapMutations, mapGetters } from 'vuex'
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    name: 'Send',
    props: ['currentAccount'],
    components: {
        accountSelector,
        QrcodeStream
    },
    data () {
        return {
            from: this.currentAccount || null,
            to: '',
            coin:"",
            amount: null,
            max: null,
            loading: false,
            disable: true,
            rate: 9048.57,
            showQrCode: false,
            hasWebCam: false,
            cameras: [{
                label: 'Auto',
                value: null
            }],
            selectedCamera: 'auto',
            sendMaxOptions : [{
                label: 'All',
                value: 100
            }, {
                label: 'Half',
                value: 50
            }]
        }
    },
    computed: {
        ...mapGetters(['txBuilding']),
        flexGrow: function() {
            return this.amount ? this.amount.length : 4
        },
        fiatAmount: function() {
            return this.amount * this.rate
        }
    },
    methods: {
        ...mapActions(['addTx']),
        ...mapMutations(['showModal', 'hideModal', 'setTxBuilding']),
        onDecode (decodedString) {
            console.log(decodedString)
            this.showQrCode = false
            this.to = decodedString
        },
        onSubmit () {
            try {
                //clear end state!
                this.$store.commit('clearSendInfo',{})

                console.log("from: ",this.from)

                this.loading = true
                this.$refs.sendForm.resetValidation()

                //TODO validate address

                const params = {coin:this.from.symbol,address:this.to,amount:this.amount,memo:false, network: this.from.network}
                console.log("params: ",params)
                //send money
                this.$q.electron.ipcRenderer.send('wallet-send-build', params)
                this.setTxBuilding(true)

            } catch(err) {
                this.$q.notify({
                    message: err,
                    color: 'negative'
                })
                console.log(err);
                this.loading = false
            }
        },
        setMax(percentage) {
            this.amount = this.from.balance * (percentage * 0.01)
        }
    },
    watch: {
        max: function(value) {
            this.setMax(value)
        }
    },
    async mounted () {
        const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
            ({ kind }) => kind === 'videoinput'
        )
        if (devices.length > 0) {
            this.selectedCamera = devices[0].deviceId
            this.hasWebCam = true
        }
        this.setTxBuilding(false)

    }
}
</script>
