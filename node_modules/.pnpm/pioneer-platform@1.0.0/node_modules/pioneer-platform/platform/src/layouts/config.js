const TAG = ' | Config | '
const VERSION = 1.0
// eslint-disable-next-line
const fs = require('fs-extra')

import path from 'path'
import { app, remote } from 'electron'

import os from 'os'
// eslint-disable-next-line
const mkdirp = require('mkdirp')

// const appRootDir = require('app-root-dir')
//   .get()
//   .replace('app.asar', '')
//   .replace(/(\s+)/g, '\\$1')

export const rootDir = require('app-root-dir').get()

export const moneroNode = 'http://node.moneroworld.com:18089'
export const cosmosNode = ''
export const infuraNode = ''

// TODO this needs to be public repo to work!
export const releaseUrl = ''
export const downloadUrl = ''

// defaults

function getPlatform () {
  switch (os.platform()) {
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'android':
      return 'linux'
    case 'darwin':
    case 'sunos':
      return 'mac'
    case 'win32':
      return 'win'
  }
}

export const platform = getPlatform()

// const IS_PROD = process.env.NODE_ENV === 'production'
// For bundling nodes
// const root = process.cwd();
const APP = process.type === 'renderer' ? remote.app : app

// const binariesPath =
//     IS_PROD || APP.isPackaged
//         ? path.join(process.resourcesPath, 'bin', platform)
//         : path.join(root, 'resources', 'bin', platform);

// Language Settings

export const languageList = [
  'English',
  '简体中文', // Mandrin
  'русский', // Russian
  'español' // Spanish
]

export const languages = [
  {
    name: 'English',
    code: 'en',
    english: 'English'
  },
  {
    name: '简体中文',
    code: 'zh',
    english: 'Chinese'
  },
  {
    name: 'русский',
    code: 'ru',
    english: 'russian'
  },
  {
    name: 'español',
    code: 'es',
    english: 'Spanish'
  }
]

export const pioneerPath = path.join(APP.getPath('home'), '.pioneer')
export const pioneerConfig = path.join(APP.getPath('home'), '.pioneer', 'pioneer.json')
export const configPath = path.join(APP.getPath('home'), '.pioneer', 'pioneer.json')
export const seedDir = path.join(APP.getPath('home'), '.pioneer', 'wallet_data')
export const seedPath = path.join(
  APP.getPath('home'),
  '.pioneer',
  'wallet_data/wallet.seed'
)

// XMR not implemented
// export const seedPath = path.join(APP.getPath('home'), '.pioneer', 'wallet_data/wallet.seed')
// export const seedPathMonero = path.join(APP.getPath('home'), '.pioneer', 'wallet_data/monero/moneroWallet')
// export const seedDirMonero = path.join(APP.getPath('home'), '.pioneer', 'wallet_data/monero')

export const logDir = path.join(pioneerPath, 'log')

// innit
export function initConfig (languageSelected) {
  const tag = TAG + ' | initConfig | '
  try {
    // const output = {}
    console.log(tag, 'CHECKPOINT innitConfig')
    console.log(tag, 'pioneerPath: ', pioneerPath)
    console.log(tag, 'seedDir: ', seedDir)

    const resp = mkdirp.sync(pioneerPath)
    console.log("resp:" ,resp)

    mkdirp.sync(logDir)

    mkdirp.sync(seedDir)

    console.log(tag, ' innit config checkpiont 2')

    const config = {}
    config.locale = languageSelected
    config.localeSelected = true
    config.version = VERSION

    fs.writeFileSync(pioneerConfig, JSON.stringify(config))
  } catch (e) {
    console.error(tag, 'e: ', e)
    return {}
  }
}

// innit Wallet
export function initWallet (encryptedSeed, passwordHash) {
  const tag = TAG + ' | initWallet | '
  try {
    mkdirp.sync(seedDir)

    console.log('seedDir: ', seedDir)

    // const output = {}
    console.log(tag, 'CHECKPOINT innitConfig')
    console.log(tag, 'encryptedSeed: ', encryptedSeed)

    const wallet = {}
    wallet.hash = passwordHash
    wallet.version = 1
    wallet.type = 'seedwords'
    wallet.vault = encryptedSeed

    const result = fs.writeFileSync(seedPath, JSON.stringify(wallet))
    console.log('result: ', result)

  } catch (e) {
    console.error(tag, 'e: ', e)
    return {}
  }
}

// check
export function checkConfigs () {
  const output = {}
  output.isConfigured = false
  output.isWallet = false
  output.isRegistered = false

  const fileFound = !!fs.existsSync(pioneerConfig)
  if (fileFound) {
    output.config = JSON.parse(fs.readFileSync(configPath))
    if (output.config.version) output.isConfigured = true
    if (output.config.username) output.isRegistered = true
  }

  if (output.config && output.config.version) output.isConfigured = true

  // wallet found?
  const walletFound = !!fs.existsSync(seedPath)
  if (walletFound) {
    output.isWallet = true
  }

  return output
}

/*
    Export CSV to file

 */
export function writeCsv () {
  try {
    //
  } catch (e) {
    return {}
  }
}

export function getWallet () {
  try {
    return fs.readFileSync(seedPath)
  } catch (e) {
    return {}
  }
}

export function getConfig () {
  try {
    const output = JSON.parse(fs.readFileSync(configPath))
    return output
  } catch (e) {
    return {}
  }
}

export function setConfig (options) {
  return fs.writeFileSync(configPath, JSON.stringify(options))
}

export function updateConfig (options) {
  const options_ = getConfig()
  for (const key in options) {
    options_[key] = options[key]
  }
  setConfig(options_)
}

// export const logLevel = getConfig()['debug']?'debug':'info'
export const logLevel = 'debug'

export function getLocale () {
  let locale = getConfig().locale
  if (locale) return locale
  locale = APP.getLocale().toLowerCase()
  if (locale.startsWith('zh')) return 'zh'
  if (locale.startsWith('ru')) return 'ru'
  return 'en'
}

export function setLocale (locale) {
  updateConfig({ locale: locale })
}
export const locale = getLocale()

// import pkg from './package.json'
// export const version = pkg.version
