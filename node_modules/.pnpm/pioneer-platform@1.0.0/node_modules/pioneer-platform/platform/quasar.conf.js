/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */
require('dotenv').config()
require('dotenv').config({path:"../../.env"})
require('dotenv').config({path:"../../../.env"})
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */

module.exports = function (ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [

      'i18n',
      'axios',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      // transpile: false,
      env: {
        MAINNET_FEATURE:false,
        INSECURE_PASSWORD:true, //TODO dev mode only
        KEEPKEY_FEATURE:true,
        CREATE_SOFTWARE_FEATURE:true,
        PASSWORDLESS_FEATURE:true,
        FIO_FEATURE:false,
        CONTACTS_FEATURE:false,
        UI_THEME_FEATURE:false,
        UI_LIGHT_MODE_FEATURE:false,
        ADD_WALLET_FEATURE:false,
        UI_APP_STORE_FEATURE:true,
        FEATURE_BITCOIN_BLOCKCHAIN:true,
        FEATURE_ETHEREUM_BLOCKCHAIN:true,
        FEATURE_THORCHAIN_BLOCKCHAIN:true,
        FEATURE_COSMOS_BLOCKCHAIN:true,
        FEATURE_SECRET_BLOCKCHAIN:true,
        FEATURE_KAVA_BLOCKCHAIN:true,
        FEATURE_TERRA_BLOCKCHAIN:true,
        // URL_PIONEER_SPEC: JSON.stringify("https://pioneers.dev/spec/swagger.json"),
        // URL_PIONEER_WS: JSON.stringify("wss://pioneers.dev"),
        URL_PIONEER_SPEC: JSON.stringify("http://127.0.0.1:9001/spec/swagger.json"),
        URL_PIONEER_WS: JSON.stringify("ws://127.0.0.1:9001"),
        PIONEER_URL: JSON.stringify("pioneers.dev"),
      },

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: []
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: `pioneer-platform`,
        short_name: `pioneer-platform`,
        description: `Pioneer Platform SDK`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'builder', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      /*
         "afterAllArtifactBuild?",
         "afterPack?",
         "afterSign?",
         "apk?",
         "appId?",
         "appImage?",
         "appx?",
         "appxManifestCreated?",
         "artifactBuildCompleted?",
         "artifactBuildStarted?",
         "artifactName?",
         "asar?",
         "asarUnpack?",
         "beforeBuild?",
         "buildDependenciesFromSource?",
         "buildVersion?",
         "compression?",
         "copyright?",
         "cscKeyPassword?",
         "cscLink?",
         "deb?",
         "defaultArch?",
         "detectUpdateChannel?",
         "directories?",
         "dmg?",
         "electronCompile?",
         "electronDist?",
         "electronDownload?",
         "electronUpdaterCompatibility?",
         "electronVersion?",
         "executableName?",
         "extends?",
         "extraFiles?",
         "extraMetadata?",
         "extraResources?",
         "fileAssociations?",
         "files?",
         "forceCodeSigning?",
         "framework?",
         "freebsd?",
         "generateUpdatesFilesForAllChannels?",
         "icon?",
         "includePdb?",
         "launchUiVersion?",
         "linux?",
         "mac?",
         "mas?",
         "masDev?",
         "msi?",
         "nodeGypRebuild?",
         "nodeVersion?",
         "npmArgs?",
         "npmRebuild?",
         "nsis?",
         "nsisWeb?",
         "onNodeModuleFile?",
         p5p?,
         "pacman?",
         "pkg?",
         "portable?",
         "productName?",
         "protocols?",
         "publish?",
         "releaseInfo?",
         "remoteBuild?",
         "removePackageScripts?",
         "rpm?",
         "snap?",
         "squirrelWindows?",
         "target?",
         "win?",
         "$schema?"
       */
      // https://www.electron.build/configuration/configuration
      // https://discuss.circleci.com/t/mac-os-app-signing-without-fastlane/27292/8
      builder: {
        appId: 'dev.pioneer.platform',
        afterSign:"scripts/afterSignHook.js",
        "mac": {
          "icon": "build/icon.png",
          "hardenedRuntime": true,
          "gatekeeperAssess": false,
          "entitlements": "build/entitlements.mac.plist",
          "entitlementsInherit": "build/entitlements.mac.plist"
        },
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
