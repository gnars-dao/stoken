<template>
  <div>
    <q-card class="text-center q-pb-lg" style="min-width:450px;">
      <q-form @submit="onSubmit">
        <q-card-section class="q-pb-sm">
          <div v-if="showPasswordlessOption">
            <h5>Would you like to enable encryption?</h5>
          </div>


          <div v-if="usePassword">
            <p>{{ $t("msg.create.encrypt") }}</p>
          </div>
        </q-card-section>
        <div v-if="usePassword">
          <q-card-section align="center" class="q-pt-sm">
            <q-input
              borderless
              v-model="password"
              size="lg"
              :label='$t("msg.password.title")'
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
        </div>
        <q-card-actions align="center" class="q-pb-lg">
          <div v-if="showPasswordlessOption">
            enable encryption (recommended)
            <q-toggle v-model="usePassword" color="green"/>
          </div>
          <q-btn type="submit" color="primary" class="q-pl-md q-pr-md" style="font-size:1rem;" :label="$t('msg.createWallet')" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    let featurePasswordless = process.env['PASSWORDLESS_FEATURE']

    export default {
        name: "PasswordCreate",
      data () {
        return {
          showPasswordlessOption:featurePasswordless,
          password: '',
          password2: '',
          usePassword: false,
        }
      },
      mounted() {
        try{
          if(!featurePasswordless){
            this.usePassword = true
          }

        }catch(e){
          console.error(e)
        }
      },
      methods: {
        ...mapMutations(['showModal','hideModal']),
        onSubmit: function () {
          try {
            // close password2
            this.loading = true
            console.log(this.loading)

            if(this.usePassword){
              // verify not empty
              if (this.password.length === 0) {
                this.error = true
                this.errorInfo = this.$t('msg.create.errorPasswdEmpty')
                return
              }

              // verify both password match
              if (this.password !== this.password2) {
                this.error = true
                this.errorInfo = this.$t('msg.create.errorPasswdConsistency')
                return
              }
            }

            //TODO this bad right??
            //this.$store.commit('setPassword',this.password)

            let input = {}
            if(this.usePassword){
              input.password = this.password
            }
            this.$q.electron.ipcRenderer.send('createWallet', input);
          } catch (e) {
            console.error(e)
          }
        }
      }
    }
</script>

<style scoped>

</style>
