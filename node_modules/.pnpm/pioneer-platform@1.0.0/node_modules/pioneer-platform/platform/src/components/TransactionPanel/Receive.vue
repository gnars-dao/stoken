<template>
    <div class="recieve-tab">
        <q-card class="qr-code q-mb-xl q-mt-md">
            <q-card-section class="items-center text-center q-pt-xl q-pb-xl">
                <qr-code :value="from.address" :options="{ width: 200 }" />
            </q-card-section>
            <q-separator />
            <q-input borderless readonly v-model="from.address" class="q-pb-none borderless--transparent">
                <template v-slot:append>
                    <q-btn round dense flat icon="file_copy" @click="copyAddress(from.address)">
                        <q-tooltip content-class="bg-primary" content-style="font-size: 0.75rem" :offset="[10, 10]">
                            {{copyText}}
                        </q-tooltip> 
                                             
                    </q-btn>
                </template>
            </q-input>
        </q-card>
        <accountSelector v-model="from" label="Account" />     
    </div>
</template>

<script>
import accountSelector from '../AccountSelector'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { copyToClipboard } from 'quasar'

export default {
    name: 'Recieve',
    props: ['currentAccount'],
    components: {
        accountSelector,
        QrCode: VueQrcode
    },
    data () {
        return {
            from: this.currentAccount || null,
            copyText: 'Copy Address'         
        }
    },
    methods: {
        copyAddress (value) {
            copyToClipboard(value)
                .then(() => {
                    this.copied = 'Copied!'
                    setTimeout(() => {
                        this.copyText = 'Copy Address'
                    }, 2000)
                })
                .catch(() => {
                // fail
                })        
        }
    }    
}
</script>
<style lang="scss" scoped>
    .qr-code {
        background:transparent;
    }
</style>