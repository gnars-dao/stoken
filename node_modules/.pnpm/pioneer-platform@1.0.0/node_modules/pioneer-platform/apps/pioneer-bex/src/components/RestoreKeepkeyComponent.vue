<template>
  <div style="min-width:666px">
    <div>TODO</div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    name: 'PairKeepkey',
    props: {
      mnemonic: {
        type: String,
        required: true
      },
    },
    data () {
      return {
        username:'',
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
