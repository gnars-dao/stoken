<template>
  <q-card class="text-center q-pb-lg" style="min-width:450px;">
    <q-form @submit.prevent.stop="tryLogin">
      <q-card-section class="q-pb-sm">
        <h4>Unlock Your Wallet</h4>
      </q-card-section>
      <q-card-section align="center" class="q-pt-sm">
        <q-input
          borderless
          v-model="password"
          size="lg"
          :label='$t("msg.password.body")'
          style="max-width: 400px;"
          type="password"
          error-message="Wrong Password"
          :error="error"
        >
        </q-input>
      </q-card-section>
      <q-card-actions align="center" class="q-pb-lg">
        <q-btn type="submit" color="primary" class="q-pl-md q-pr-md" style="font-size:1rem;"
               :label="$t('msg.password.body')" :loading="loading"/>
        <q-btn
          @click="close"
          label="cancel"
          size="small"
          class="font-weight-medium q-pl-md q-pr-md"
          style="font-size:1rem;"
        ></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script>

  import { mapMutations } from 'vuex'

  export default {
    name: 'Unlock',
    data() {
      return {
        password: '',
        loading: false,
        error: false,
      };
    },
    mounted() {
      try{

      }catch(e){
        console.error(e)
      }
    },
    methods: {
      ...mapMutations(['showModal','hideModal']),
      tryLogin() {
        const password = this.password;
        //tryLogin
        this.$q.electron.ipcRenderer.send('onLogin', {password});
      },
      close: function () {
        this.hideModal()
      },
      openStartup: function () {
        this.hideModal()
        //open setup
        this.showModal('Startup')
      }
    }
  };
</script>
