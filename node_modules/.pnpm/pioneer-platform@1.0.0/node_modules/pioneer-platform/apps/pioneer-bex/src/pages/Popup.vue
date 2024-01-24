<template>
  <div>
    <h3>You are Broke!</h3>
  </div>
</template>

<script lang="ts">
  import ExampleComponent from 'components/OptionsComponent.vue';
  import SetupKeepkey from 'components/OptionsComponent.vue';
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Popup',
    components: {
      ExampleComponent,
      SetupKeepkey
    },
    data() {
    }
  });
</script>
