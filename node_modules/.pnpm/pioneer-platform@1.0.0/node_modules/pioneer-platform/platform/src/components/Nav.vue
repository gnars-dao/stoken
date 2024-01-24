<template>
  <q-item
    clickable
    tag="a"
    class="nav-link"
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-avatar class="nav-link--icon" :icon="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="font-weight-medium">{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-link.q-router-link--active .nav-link--icon {
  background:$primary;
  color:#fff;
  .q-icon {
    color:#fff;
  }
}
.nav-link .nav-link--icon {
  background:var(--disabled-gradient);
}
</style>