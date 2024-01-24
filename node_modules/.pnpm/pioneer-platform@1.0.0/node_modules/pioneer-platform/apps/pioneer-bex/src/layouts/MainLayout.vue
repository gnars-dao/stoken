<template>
  <q-layout view="lHh Lpr lFf" style="min-width:333px">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
<!--          <q-img src="./assets/pioneer.jpeg"></q-img>-->
          Pioneer BEX
        </q-toolbar-title>

        <div>v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'MainLayout',
  data() {
    return {
    }
  }
});
</script>
