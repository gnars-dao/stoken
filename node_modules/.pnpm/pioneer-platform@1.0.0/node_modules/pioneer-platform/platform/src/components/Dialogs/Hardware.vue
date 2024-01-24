<template>
  <q-card class="text-center q-pb-lg" style="min-width:450px;">
    <q-card-section>
      <h4>Attempting to Connect Keepkey!</h4>
      <q-spinner
        color="primary"
        size="5rem"
        v-if="!isLoaded"
        key="spinner"
      />
    </q-card-section>
    <q-card-actions vertical align="center" class="q-pb-lg">
      <q-form
        class="q-gutter-md"
      >
<!--        Update-->
<!--        <q-btn-->
<!--          color="blue"-->
<!--          @click="updateDevices"-->
<!--          class="full-width"-->
<!--          icon="settings_ethernet"-->
<!--          align="left"-->
<!--          size="lg"-->
<!--          label="Check For Devices"-->
<!--          flat-->
<!--        />-->

      </q-form>

    </q-card-actions>
  </q-card>
</template>

<script>
  import { mapMutations } from 'vuex'
    export default {
      name: "Hardware",
      data() {
        return {
        };
      },
      methods: {
        ...mapMutations(['showModal','hideModal']),
        updateDevices: function () {
          this.$q.electron.ipcRenderer.send('checkDevices', {});
        },
        openRestore: function () {
          this.hideModal()
          this.showModal('Restore')
        },
        close: function () {
          this.hideModal()
        }
    }
  }
</script>

<style scoped>

</style>
