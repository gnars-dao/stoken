<template>
  <div>
    <q-card class="text-center q-pb-lg" style="min-width:450px;">
      <div>
        <h3>Enter PIN</h3>
        <p>
          Use the PIN layout shown on your device to find the location to press on this PIN pad.
        </p>
        <button @click="handlePinDigit(7)" class="button button-outline">
          &#x25CF;</button
        >&nbsp;
        <button @click="handlePinDigit(8)" class="button button-outline">
          &#x25CF;</button
        >&nbsp;
        <button @click="handlePinDigit(9)" class="button button-outline">
          &#x25CF;</button
        ><br />
        <button @click="handlePinDigit(4)" class="button button-outline">
          &#x25CF;</button
        >&nbsp;
        <button @click="handlePinDigit(5)" class="button button-outline">
          &#x25CF;</button
        >&nbsp;
        <button @click="handlePinDigit(6)" class="button button-outline">
          &#x25CF;</button
        ><br />
        <button @click="handlePinDigit(1)" class="button button-outline">
          &#x25CF;</button
        >&nbsp;
        <button @click="handlePinDigit(2)" class="button button-outline">
          &#x25CF;</button
        >&nbsp;
        <button @click="handlePinDigit(3)" class="button button-outline">
          &#x25CF;</button
        ><br />
<!--        <input id="#pinInput" type="text" style="-webkit-text-security: disc;" />-->
        <q-input
          v-model="pin"
          type="password"
          error-message="invalid pin!"
          :error="error"
        >
        </q-input>
        <button @click="handlePinDigit('')" class="button button-outline">
          (del)
        </button>

        <button class="button button-outline" @click="tryPin()">
          Unlock
        </button>
        <button class="button button-outline" @click="close()">
          Close
        </button>
<!--        <button type="password" @click="switchVisibility">show / hide</button>-->
      </div>
    </q-card>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "Pin",
    data() {
      return {
        pin: '',
        pinType:'',
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
      switchVisibility() {
        this.pinType = this.pinType === 'password' ? 'text' : 'password'
      },
      handlePinDigit(digit){
        //if backspace remove
        console.log("digit: ",digit)
        if (digit === "") {
          this.pin = this.pin.slice(0, -1);
        } else {
          //else add
          this.pin += digit.toString();
        }
      },
      tryPin() {
        const pin = this.pin;
        //tryPin
        this.$q.electron.ipcRenderer.send('onTryPin', {pin});

        //close pin
        this.hideModal('pin')
      },
      close() {
        //close pin
        this.hideModal('pin')
      },
    }
  }
</script>

<style scoped>

</style>
