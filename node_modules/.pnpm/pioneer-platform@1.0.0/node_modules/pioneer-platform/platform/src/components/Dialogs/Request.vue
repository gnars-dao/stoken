<template>
  <div>
    <q-card class="text-center q-pb-lg" style="min-width:450px;">

        <q-card-section>
          Message: Send my moniez
        </q-card-section>
        <q-card-section>

        </q-card-section>
        <q-card-actions align="center" class="q-pb-lg q-pl-md q-pr-md">
          <q-btn label="Accept" type="submit" color="green" @click="onAccept"/>
          <q-btn label="Reject" type="reject" color="red" @click="onReject"/>
          <q-btn label="Cancel" type="cancel" @click="onCancel"/>
        </q-card-actions>

    </q-card>
  </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "Request",
        data () {
          return {
          }
        },
        methods:{
          ...mapMutations(['showModal','hideModal']),
          onAccept: async function () {
            console.log("onAccept")
            //set send context

            //open send window

          },
          onReject: async function () {
            console.log("onReject")
          },
          onCancel: async function () {
            console.log("onCancel")
            this.hideModal()
          }
        }
    }
</script>

<style scoped>

</style>
