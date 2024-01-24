<template>
  <div>

    <h2>Pair Keepkey</h2>
    <q-spinner
      color="primary"
      size="5rem"
      v-if="isReady === false"
      key="spinner"
    />

    <q-btn @click="onCancel" align="center" label="go back" type="configure" color="primary"/>
    <q-btn @click="onSubmit" align="center" label="go back" type="configure" color="primary"/>


  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    name: 'SetupKeepkey',
    props: {
      mnemonic: {
        type: String,
        required: true
      },
    },
    data () {
      return {
        isReady:false
      }
    },
    methods: {
      onCancel(): void {
        this.$emit('exit', true)
      },
      onSubmit(): void {

      }
    },
    computed: {
    }
  });
</script>
<style>

</style>
