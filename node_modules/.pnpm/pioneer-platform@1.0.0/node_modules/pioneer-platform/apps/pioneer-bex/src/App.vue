<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { colors } from 'quasar'

export default Vue.extend({
  name: 'App',
  created () {
    this.$q.dark.set(true)
    colors.setBrand('light', '#DDD')
    colors.setBrand('primary', '#263f10')
  }
});
</script>
