<template>
    <q-dialog v-model="visible" persistent position="top">
        <component :is="component"></component>
    </q-dialog>
</template>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppModal',
  data() {
    return {
      component: null,
    };
  },
  computed: {
    ...mapState({
      visible: state => state.global.modalVisible,
      modalComponent: state => state.global.modalComponent,
    }),
  },
  methods: {
    ...mapMutations(['hideModal']),
  },
  watch: {
    modalComponent(componentName) {
      console.log('modal name', componentName)
      if (!componentName) return 

      Vue.component(componentName, () => import(`./Dialogs/${componentName}`));

      this.component = componentName;
    },
  },
  mounted () {
    if(this.modalComponent && !this.component) {
      Vue.component(this.modalComponent, () => import(`./Dialogs/${this.modalComponent}`));

      this.component = this.modalComponent;     
    }
  }
};
</script>