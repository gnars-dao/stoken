<template>
  <q-card class="text-center q-pb-lg q-pr-lg q-pl-lg" style="min-width: 700px;">
      <q-card-section>
        <div class="text-h4 q-mb-md">Your Secret Phrase</div>
        <p class="q-mb-sm">Write your secret, 12 word phrase on paper in numerical order.</p>
        <p>Never share this with anyone! Anyone with it can steal your funds from anywhere!</p>
      </q-card-section>
      <q-card-section class="q-mb-lg">
        <div class="seed-rows">
          <div v-for='(word, index) in splitPhrase' :key="word" class="col-2 word-phrase">
            <div class="value">{{ word }}</div>
            <div class="number">{{ index + 1}}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Done" v-close-popup />
      </q-card-actions>
  </q-card>
</template>
<script>

  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        mnemonic:'',
      }
    },
    computed: {
      splitPhrase: function() {
        if(this.mnemonic && this.mnemonic.length > 0) {
          const parts = this.mnemonic.split(' ')
          return parts
        } else {
          return []
        }
      }
    },
    watch: {
      "$store.state.viewSeed": {
        handler: function (value) {
          console.log("seed available!")
          console.log("value: ",value)
          this.mnemonic = value
        },
        immediate: true // provides initial (not changed yet) state
      },
    },
    methods: {
      ...mapMutations(['showModal','hideModal']),
    }
  }
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
