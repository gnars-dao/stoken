<template>
  <q-card class="text-center q-pb-lg q-pl-lg q-pr-lg" style="min-width:450px;">
      Edit config:
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      @cancel="onCancel"
    >
      <q-card-section>

        <q-input
          outlined
          v-model="config"
          type="textarea"
          label="Config File" ></q-input>

      </q-card-section>
      <q-card-actions vertical align="center" class="q-pb-lg q-pl-md q-pr-md">
        <q-btn label="Continue" type="submit" color="primary" class="full-width" size="lg" />
        <q-btn label="Reset" type="reset" flat />
        <q-btn @click=onCancel() label="Cancel" flat />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>

    // import {
    //   getConfig,
    // } from '@pioneer-platform/pioneer-config'
    import {mapGetters, mapMutations} from "vuex";
    export default {
        name: "Config",
      data () {
        return {
          error:false,
          config: "",
        }
      },
      mounted() {
          // let config = getConfig()
          // this.config = JSON.stringify(config, undefined, 4);
      },
      methods: {
        ...mapGetters(['getCoins']),
        ...mapMutations(['showModal','hideModal']),
        onSubmit: async function () {

        },
        onConfirmed () {

        },
        onReset () {
          console.log("clicked reset!~")
        },
        onCancel () {
          console.log("clicked cancel!~")
          this.hideModal()
        }
      }
    }
</script>

<style scoped>

</style>
