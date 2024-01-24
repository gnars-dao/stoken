<template>
  <div id="q-app">
    <q-ajax-bar ref="bar" position="top" color="primary" size="3px" />
    <router-view />
  </div>
</template>

<script>
import './helpers/filters'
import store from './store'


export default {
  name: 'App',
  created () {
    this.$q.dark.set(true)
    this.$q.iconMapFn = (iconName) => {
      // iconName is the content of QIcon "name" prop

      // your custom approach, the following
      // is just an example:
      if (iconName.startsWith('app:') === true) {
        // we strip the "app:" part
        const name = iconName.substring(4)

        return {
          cls: 'axiom-' + name
        }
      }

      // when we don't return anything from our
      // iconMapFn, the default Quasar icon mapping
      // takes over
    }   
  }
}
</script>

<style lang="scss" scoped>
  .axiom-app-bar {
    background: var(--background-accent);
    backdrop-filter: blur(100px);
  }
</style>
