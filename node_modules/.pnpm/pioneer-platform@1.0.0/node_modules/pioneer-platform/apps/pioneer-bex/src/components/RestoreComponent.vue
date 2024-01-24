<template>
  <div style="min-width:666px">
    <div>
      <div
        class="tabs wrap is-centered text-center"
        style="max-width: 100%; border-width: thick;"
      >
        <h5>WARNING! This is NOT <div @click="">Hardware recovery!</div></h5>
          <br/><div class="q-gutter-sm"> Never enter a hardware wallets recovery phrase into anything other than the device itself!</div>
        <ul>
          <li :class="[tabOpen === 'word1' ? 'is-active' : '']">
            <a @click="tabOpen = 'word1'" class="is-large">
              <input
                v-model="word1"
                placeholder=""
                @paste="onPaste"
              /> </a
            >1
          </li>
          <li :class="[tabOpen === 'word2' ? 'is-active' : '']">
            <a @click="tabOpen = 'word2'">
              <input
                v-model="word2"
                placeholder=""
              /> </a
            >2
          </li>
          <li :class="[tabOpen === 'word3' ? 'is-active' : '']">
            <a @click="tabOpen = 'word3'">
              <input
                v-model="word3"
                placeholder=""
              /> </a
            >3
          </li>
          <li :class="[tabOpen === 'word4' ? 'is-active' : '']">
            <a @click="tabOpen = 'word4'">
              <input
                v-model="word4"
                placeholder=""
              /> </a
            >4
          </li>
          <li :class="[tabOpen === 'word5' ? 'is-active' : '']">
            <a @click="tabOpen = 'word5'">
              <input
                v-model="word5"
                placeholder=""
              /> </a
            >5
          </li>
          <li :class="[tabOpen === 'word6' ? 'is-active' : '']">
            <a @click="tabOpen = 'word6'">
              <input
                v-model="word6"
                placeholder=""
              /> </a
            >6
          </li>
        </ul>
      </div>
      <div class="tabs is-centered text-center">
        <ul>
          <li :class="[tabOpen === 'word7' ? 'is-active' : '']">
            <a @click="tabOpen = 'word7'">
              <input
                v-model="word7"
                placeholder=""
              /> </a
            >7
          </li>
          <li :class="[tabOpen === 'word8' ? 'is-active' : '']">
            <a @click="tabOpen = 'word8'">
              <input
                v-model="word8"
                placeholder=""
              /> </a
            >8
          </li>
          <li :class="[tabOpen === 'word9' ? 'is-active' : '']">
            <a @click="tabOpen = 'word9'">
              <input
                v-model="word9"
                placeholder=""
              /> </a
            >9
          </li>
          <li :class="[tabOpen === 'word10' ? 'is-active' : '']">
            <a @click="tabOpen = 'word10'">
              <input
                v-model="word10"
                placeholder=""
              /> </a
            >10
          </li>
          <li :class="[tabOpen === 'word11' ? 'is-active' : '']">
            <a @click="tabOpen = 'word11'">
              <input
                v-model="word11"
                placeholder=""
              /> </a
            >11
          </li>
          <li :class="[tabOpen === 'word12' ? 'is-active' : '']">
            <a @click="tabOpen = 'word12'">
              <input
                v-model="word12"
                placeholder=""
              /> </a
            >12
          </li>
        </ul>
        <h5>Restore a Software Wallet from seed</h5>
        <q-btn @click="onCancel" align="center" label="go back" type="configure" color="primary"/>
        <q-btn @click="onSubmit" align="center" label="go back" type="configure" color="primary"/>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'OptionsComponent',
  props: {
    mnemonic: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      username:'',
      tabOpen: 'word1',
      currentSeed: '',
      currentSeedInvalid: false,
      enoughSeeds: true,
      seeds: [],
      password: '',
      password2: '',
      total: 12, //TODO make optional 24
      page: 'addSeeds',
      errorPassword: false,
      errorInfoPassword: '',
      recoverErrorInfo: '',
      restoreOutputs: [],
      word1: '',
      word2: '',
      word3: '',
      word4: '',
      word5: '',
      word6: '',
      word7: '',
      word8: '',
      word9: '',
      word10: '',
      word11: '',
      word12: ''
    }
  },
  methods: {
    onCancel(): void {
      this.$emit('exit', true)
    },
    onSubmit(): void {

    }
  },
  computed: {
  }
});
</script>
<style>
  .hz-label-150 div.field-label {
    min-width: 150px;
  }

  .hz-label-200 div.field-label {
    min-width: 200px;
  }

  .hz-label-250 div.field-label {
    min-width: 250px;
  }

  .hz-label-300 div.field-label {
    min-width: 300px;
  }

  .hz-label-150 div.field.is-horizontal,
  .hz-label-200 div.field.is-horizontal,
  .hz-label-250 div.field.is-horizontal,
  .hz-label-300 div.field.is-horizontal {
    margin-bottom: 0.75rem;
  }

  .recover-body {
    display:flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    height:100vh;
  }
  h4.title {
    margin-top:0;
  }
  .recover-body .modal-card-body {
    max-width:750px;
  }

  #odd-fix ol li {
    display: inline-block;
    width: 100%;
  }
  ul {
    list-style: none;
    padding:0;
    margin:0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 30px;
    grid-gap: 30px;
  }
  ul li {
    margin-bottom:1rem;
    color:rgba(255,255,255,.5);
  }
  ul li a {
    width:100%;
    display:block;
  }
  ul li input {
    width:100%;
    background:transparent;
    border-bottom:1px solid var(--border-color);
    border-top:0;
    border-left:0;
    border-right:0;
    margin-bottom:0.375rem;
    color:#fff;
    text-align:center;
    outline: none;
    padding:1rem;
  }
  ul li input:focus {
    border-bottom-color: var(--primary);
  }
  ol {
    list-style: none;
    counter-reset: my-awesome-counter;
  }
  ol li {
    counter-increment: my-awesome-counter;
  }
  ol li::before {
    content: counter(my-awesome-counter) ". ";
    color: red;
    font-weight: bold;
  }

  ol {
    margin: 0 0 30px 20px;
    columns: 4;
    -webkit-columns: 4;
    -moz-columns: 4;
    column-gap: 30px;
    -webkit-column-gap: 30px;
    -moz-column-gap: 30px;
  }

  ol li {
    margin: 0 0 10px 0;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
