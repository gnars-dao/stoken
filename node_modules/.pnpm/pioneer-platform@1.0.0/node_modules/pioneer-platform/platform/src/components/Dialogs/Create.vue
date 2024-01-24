<template>
  <q-card class="text-center q-pb-lg" style="min-width:450px;">
    <q-form @submit="generateWallet">
      <q-card-section class="q-pb-sm">
        <h4>Create a New Password</h4>
        Citadel Wallet Version:
        <p></p>
      </q-card-section>
      <q-card-section align="center" class="q-pt-sm">
        <q-input
          borderless
          v-model="password"
          size="lg"
          :label='password'
          style="max-width: 400px;"
          type="password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('msg.emptyPassword') ]">
        </q-input>
        <q-input
          borderless
          v-model="password2"
          size="lg"
          :label='$t("msg.confirmPassword")'
          style="max-width: 400px;"
          type="password"
          lazy-rules
          :rules="[ val => val && val === password || $t('msg.passwordMatch') ]">
        </q-input>
      </q-card-section>
      <q-card-actions align="center" class="column q-pb-lg">
        <q-btn type="submit" color="primary" class="q-pl-md q-pr-md" style="font-size:1rem;" :label="$t('msg.createWallet')" :loading="loading" />
        <q-btn color="transparent" class="q-mt-md" flat @click="hideModal">Cancel</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script>
  //crypto
  import { mapMutations } from 'vuex'

  let featurePasswordless = process.env['PASSWORDLESS_FEATURE']

  export default {
    name: 'Create',
    data () {
      return {
        showPasswordlessOption:featurePasswordless,
        username:'',
        isPassword:false,
        password: '',
        password2: '',
        mnemonic: '',
        error: false,
        loading: false
      }
    },
    mounted() {
      try{
        //
        if(!featurePasswordless){

        }

        //get username from state
        this.username = this.$store.getters['getUsername'];

      }catch(e){
        console.error(e)
      }
    },
    methods: {
      ...mapMutations(['hideModal']),
      generateWallet: function () {
        console.log('generate wallet')
      }
    }
  }
</script>
