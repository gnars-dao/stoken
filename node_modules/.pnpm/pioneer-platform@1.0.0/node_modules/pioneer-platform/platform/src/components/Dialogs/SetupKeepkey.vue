<template>
  <q-card class="text-center q-pb-lg" style="min-width:450px;">
    <q-card-section>
      New Keepkey found!
      <div id="devices">
        <div v-for="device in devices" :key="device.deviceId">
          <q-card>
            <q-card-title>
              <br/>
              <div v-if="device.vendor === 'keepkey.com'">
                <q-img src="~assets/box-logo.png"
                       spinner-color="red"
                       :ratio="1/1"
                       style="height: 30px; max-width: 70px">
                </q-img>
              </div>
              model:{{ device.model }}
              <br/>
              vendor: {{ device.vendor }}
              <br/>
              hash:{{ device.firmwareHash }}
              <br/>
              version: {{ device.majorVersion }}.{{ device.minorVersion }}.{{ device.patchVersion }}
              <br/>
              initialized:{{ device.initialized }}
              <br/>
              pin enabled:{{ device.pinProtection }}
              <br/>
              passphrase enabled:{{ device.passphraseProtection }}
              <br/>

              <small>Policies</small>
              <div v-for="policy in device.policiesList" :key="policy">


                  {{ policy.policyName }}
                  <br/>
                  enabled: {{ policy.enabled }}
                  <br/>
              </div>
              <div slot="right" class="row items-center">
                <!--              <q-icon name="place" /> 250 ft-->
              </div>
            </q-card-title>
            <q-card-main>
              <!--            label: {{ wallet.features }}-->
              <!--            majorVersion: {{ wallet.features.majorVersion }}-->
              <!--            label: {{ wallet.features.majorVersion }}-->
            </q-card-main>
            <q-card-separator />
            <q-card-actions>
              <q-btn flat round small><q-icon name="settings" /></q-btn>
              <q-menu fit :offset="[-16, -3]">
                <q-list style="min-width: 100px">
                  <q-list>
                    <q-item-label header>Device Options</q-item-label>

                    <q-item tag="label" v-ripple>
                      Upgrade firmware
                    </q-item>
                    <q-item tag="label" v-ripple>
                      Add policy
                    </q-item>
                  </q-list>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-card-actions>
            <q-btn
              @click="setupKeepkey(device)" label="Continue" color="primary"/>
            <q-btn
              @click="onClose" label="Close"/>
          </q-card>


        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "setupKeepkey",
        computed: {
          ...mapGetters(['devices']),
        },
        watch: {
          "$store.state.devices": {
            handler: function (value) {
              console.log("device registered!")
              console.log("value: ",value)
            },
            immediate: true // provides initial (not changed yet) state
          }
        },
        methods: {
          ...mapMutations(['showModal','hideModal','setOffline']),
          setupKeepkey(device) {
            console.log("pair Device: ",device)
            this.$q.electron.ipcRenderer.send('onPairKeepkey', device);
          },
          onClose() {
            this.hideModal()
          }
        }
    }
</script>

<style scoped>

</style>
