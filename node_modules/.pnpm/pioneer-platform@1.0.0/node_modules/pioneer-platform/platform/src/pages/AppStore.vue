<template>
  <q-page>
    <div class="page-header">
      <h4>Explore</h4>
    </div>

    <div class="column" style="height: 150px">
      <div class="col">

        <q-scroll-area style="height: calc(100vh - 100px)">
          <div id="app">
            <div class="search-wrapper">
              <input type="text" v-model="search" placeholder="Search title.."/>
              <label>Search title:</label>
            </div>
            <div class="wrapper">
              <div class="card" v-for="app in filteredList" v-bind:key="app.key">
                <a v-bind:href="app.launch" target="_blank">
                  <img v-bind:src="app.logoUrl"/>
                  <small>description: {{ app.description }}</small>
                  {{ app.name }}
                </a>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <br/>

    </div>


  </q-page>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  // class Post {
  //   constructor(title, link, author, img) {
  //     this.title = title;
  //     this.link = link;
  //     this.author = author;
  //     this.img = img;
  //   }
  // }

  let swapsPro = {
    name:"swaps.pro",
    description:"Decentralized multi-chain swaps!",
    launch:"https://swaps.pro",
    logoUrl:"https://avatars.githubusercontent.com/u/40639099?s=280&v=4",
    key:1,
  }

  export default {
    name: 'AppStore',
    data () {
      return {
        queryKey:"",
        apps:[swapsPro],
        installing: [],
        search: "",
      }
    },
    mounted() {
      try{
        this.loadApps()
        this.$q.electron.ipcRenderer.send('loadInstalledApps', {});

      }catch(e){
        console.error(e)
      }
    },
    computed: {
      ...mapGetters(['getApps']),
      filteredList() {
        return this.apps
        //TODO add search back
        // return this.apps.filter((app) => {
        //   //send to ipc
        //   this.$q.electron.ipcRenderer.send('onSearchApps', {query:this.search})
        //   return app.name.toLowerCase().includes(this.search.toLowerCase());
        // });
      }
    },
    methods: {
      ...mapMutations(['addApp', 'removeApp']),
      openApp (app) {
        console.log("opening app: ",app)
        window.open(app, '_blank', 'nodeIntegration=no')
      },
      loadApps () {
        // const apps = this.$store.getters['getApps'];
        // this.apps = apps
      },
      install (app) {
        this.installing.push(app._id)

        //download

        //move component to pages

        //save to config installed

        setTimeout(() => {
          const index = this.installing.indexOf(app._id)
          this.installing.splice(index, 1)
          const apptmp = {
            ...app,
            route: '/testapp',
            color: 'secondary'
          }
          this.addApp(apptmp)
        }, 2000)
      }
    }
  }
</script>
<style lang="scss" scoped>
  html, body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  div#app {
  }
  div#app .search-wrapper {
  }
  div#app .search-wrapper label {
    position: absolute;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    top: 8px;
    left: 12px;
    z-index: -1;
    transition: 0.15s all ease-in-out;
  }
  div#app .search-wrapper input {
    padding: 4px 12px;
    color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.12);
    transition: 0.15s all ease-in-out;

  }
  div#app .search-wrapper input:focus {
    outline: none;
    transform: scale(1.05);
  }
  div#app .search-wrapper input:focus + label {
    font-size: 10px;
    transform: translateY(-24px) translateX(-12px);
  }
  div#app .search-wrapper input::-webkit-input-placeholder {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 100;
  }
  div#app .wrapper {
    display: flex;
    max-width: 444px;
    flex-wrap: wrap;
    padding-top: 12px;
  }
  div#app .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    max-width: 124px;
    margin: 12px;
    transition: 0.15s all ease-in-out;
  }
  div#app .card:hover {
    transform: scale(1.1);
  }
  div#app .card a {
    text-decoration: none;
    padding: 12px;
    color: #03A9F4;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div#app .card a img {
    height: 100px;
  }
  div#app .card a small {
    font-size: 10px;
    padding: 4px;
  }
  div#app .hotpink {
    background: hotpink;
  }
  div#app .green {
    background: green;
  }
  div#app .box {
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .page-header {
    height:70px;
    border-bottom:1px solid var(--border-color);
    padding:0 1.5rem;
    display:flex;
    align-items: center;
    h4 {
      margin-top:0;
      margin-bottom:0;
    }
  }
  .my-card {
    height: 100%;
  }
</style>
