<template>
  <q-card class="text-center q-pb-lg q-pl-lg q-pr-lg" style="min-width:450px;">
    <q-card-section>
      <h4>Welcome</h4>
      <p>(no wallet found!) What would you like to do? </p>
    </q-card-section>
    <q-card-actions vertical align="center" class="q-pb-lg q-pl-md q-pr-md">
      connect wallet
    </q-card-actions>
  </q-card>
</template>
<script>

  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations(['showModal','hideModal']),
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
