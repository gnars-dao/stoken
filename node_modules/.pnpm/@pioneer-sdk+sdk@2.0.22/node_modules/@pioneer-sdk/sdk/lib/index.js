"use strict";
/*

     Pioneer SDK
        A typescript sdk for integrating cryptocurrency wallets info apps

 */
// import loggerdog from "@pioneer-platform/loggerdog";
// @ts-ignore
// import * as Events from "@pioneer-platform/pioneer-events";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = void 0;
const core_1 = require("@coinmasters/core");
const types_1 = require("@coinmasters/types");
// @ts-ignore
const pioneer_caip_1 = require("@pioneer-platform/pioneer-caip");
// @ts-ignore
const pioneer_client_1 = __importDefault(require("@pioneer-platform/pioneer-client"));
const pioneer_coins_1 = require("@pioneer-platform/pioneer-coins");
const events_1 = __importDefault(require("events"));
// @ts-ignore
// @ts-ignore
// @ts-ignore
const TAG = ' | Pioneer-sdk | ';
class SDK {
    constructor(spec, config) {
        this.status = 'preInit';
        this.appName = 'pioneer-sdk';
        this.appIcon = 'https://pioneers.dev/coins/pioneerMan.png';
        this.spec = spec || config.spec || 'https://pioneers.dev/spec/swagger';
        this.wss = config.wss || 'wss://pioneers.dev';
        this.username = config.username;
        this.queryKey = config.queryKey;
        this.keepkeyApiKey = config.keepkeyApiKey;
        this.ethplorerApiKey = config.ethplorerApiKey;
        this.covalentApiKey = config.covalentApiKey;
        this.utxoApiKey = config.utxoApiKey;
        this.walletConnectProjectId = config.walletConnectProjectId;
        this.paths = [];
        this.blockchains = [];
        this.pubkeys = [];
        this.balances = [];
        this.nfts = [];
        this.isPioneer = null;
        this.pioneer = null;
        this.swapKit = null;
        this.context = '';
        this.pubkeyContext = null;
        this.assetContext = null;
        this.blockchainContext = null;
        this.outboundAssetContext = null;
        this.outboundBlockchainContext = null;
        this.outboundPubkeyContext = null;
        this.wallets = [];
        this.events = new events_1.default();
        this.init = async function (walletsVerbose, setup) {
            const tag = `${TAG} | init | `;
            try {
                if (!this.username)
                    throw Error('username required!');
                if (!this.queryKey)
                    throw Error('queryKey required!');
                if (!this.wss)
                    throw Error('wss required!');
                if (!walletsVerbose)
                    throw Error("walletsVerbose required!");
                if (!setup)
                    throw Error("setup required!");
                if (!this.wallets)
                    throw Error('wallets required!');
                if (!this.ethplorerApiKey)
                    throw Error('ethplorerApiKey required!');
                if (!this.covalentApiKey)
                    throw Error('covalentApiKey required!');
                if (!this.utxoApiKey)
                    throw Error('utxoApiKey required!');
                if (!this.walletConnectProjectId)
                    throw Error('walletConnectProjectId required!');
                const PioneerClient = new pioneer_client_1.default(config.spec, config);
                this.pioneer = await PioneerClient.init();
                if (!this.pioneer)
                    throw Error('Fialed to init pioneer server!');
                //this.wallets = walletsVerbose
                this.wallets = walletsVerbose;
                let walletArray = [];
                for (let i = 0; i < this.wallets.length; i++) {
                    let walletVerbose = this.wallets[i];
                    let wallet = walletVerbose.wallet;
                    walletArray.push(wallet);
                }
                // log.info("wallets",this.wallets)
                // init swapkit
                this.swapKit = new core_1.SwapKitCore();
                // log.info(tag,"this.swapKit: ",this.swapKit)
                const { ethplorerApiKey } = this;
                const { covalentApiKey } = this;
                const { utxoApiKey } = this;
                if (!utxoApiKey)
                    throw Error('Unable to get utxoApiKey!');
                const { walletConnectProjectId } = this;
                const stagenet = false;
                const configKit = {
                    config: {
                        ethplorerApiKey,
                        covalentApiKey,
                        utxoApiKey,
                        walletConnectProjectId,
                        stagenet,
                        keepkeyConfig: {
                            apiKey: this.keepkeyApiKey,
                            pairingInfo: {
                                name: this.appName,
                                imageUrl: this.appIcon,
                                basePath: 'http://localhost:1646/spec/swagger.json',
                                url: 'http://localhost:1646',
                            },
                        },
                    },
                    wallets: walletArray,
                };
                // log.info(tag, "configKit: ", configKit);
                await this.swapKit.extend(configKit);
                this.events.emit('SET_STATUS', 'init');
                // done registering, now get the user
                // this.refresh()
                if (!this.pioneer)
                    throw Error('Failed to init pioneer server!');
                return this.pioneer;
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
        this.setBlockchains = async function (blockchains) {
            try {
                if (!blockchains)
                    throw Error('blockchains required!');
                console.log('setBlockchains called! blockchains: ', blockchains);
                this.blockchains = blockchains;
                this.events.emit('SET_BLOCKCHAINS', this.blockchains);
            }
            catch (e) {
                console.error('Failed to load balances! e: ', e);
            }
        };
        this.loadBalanceCache = async function (balances) {
            try {
                if (balances.length === 0)
                    throw Error('No balances to load!');
                this.balances = [...this.balances, ...balances];
                this.balances.sort((a, b) => b.valueUsd - a.valueUsd);
                console.log('SET BALANCES CALLED!!! balances: ', this.balances);
                this.events.emit('SET_BALANCES', this.balances);
                console.log('balance0: ', this.balances[0]);
                if (this.balances.length > 0) {
                    //TODO do this from local storage
                    this.setContext(this.balances[0].context);
                    this.setAssetContext(this.balances[0]);
                    this.setOutboundAssetContext(this.balances[1]);
                }
            }
            catch (e) {
                console.error('Failed to load balances! e: ', e);
            }
        };
        this.loadPubkeyCache = async function (pubkeys) {
            try {
                if (pubkeys.length === 0)
                    throw Error('No pubkeys to load!');
                this.pubkeys = [...this.pubkeys, ...pubkeys];
                console.log('SET pubkeys CALLED!!! balances: ', this.pubkeys);
                this.events.emit('SET_PUBKEYS', this.pubkeys);
            }
            catch (e) {
                console.error('Failed to load balances! e: ', e);
            }
        };
        this.pairWallet = async function (wallet, customPaths, ledgerApp) {
            const tag = `${TAG} | pairWallet | `;
            try {
                // log.debug(tag, "Pairing Wallet");
                if (!wallet)
                    throw Error('Must have wallet to pair!');
                if (!this.swapKit)
                    throw Error('SwapKit not initialized!');
                // filter wallets by type
                const walletSelected = this.wallets.find((w) => w.type === wallet);
                // log.info(tag,"walletSelected: ",walletSelected)
                console.log(tag, 'wallet: ', wallet);
                // supported chains
                const AllChainsSupported = types_1.availableChainsByWallet[wallet];
                console.log(tag, 'ChainToNetworkId: ', types_1.ChainToNetworkId);
                console.log(tag, 'ChainToNetworkId: ', types_1.ChainToNetworkId[types_1.Chain.Ethereum]);
                let allByCaip = AllChainsSupported.map(
                // @ts-ignore
                (chainStr) => types_1.ChainToNetworkId[(0, types_1.getChainEnumValue)(chainStr)]);
                console.log(tag, 'AllChainsSupported: ', AllChainsSupported);
                console.log(tag, 'allByCaip: ', allByCaip);
                this.blockchains = allByCaip;
                let allPaths = (0, pioneer_coins_1.getPaths)(allByCaip);
                console.log(tag, 'getPaths allPaths: ', allPaths);
                let walletPaths = [...(0, pioneer_coins_1.getPaths)(allByCaip), ...customPaths];
                console.log(tag, 'walletPaths: ', walletPaths);
                //for all supported chains add paths
                this.paths = walletPaths;
                // log.info(tag,"walletSelected.wallet.connectMethodName: ",walletSelected.wallet.connectMethodName)
                // log.info("AllChainsSupported: ", AllChainsSupported);
                let resultPair;
                if (walletSelected.type === 'KEEPKEY') {
                    resultPair =
                        (await this.swapKit[walletSelected.wallet.connectMethodName](AllChainsSupported, walletPaths)) || '';
                    console.log('resultPair: ', resultPair);
                    this.keepkeyApiKey = resultPair;
                    localStorage.setItem('keepkeyApiKey', resultPair);
                }
                else if (walletSelected.type === 'METAMASK') {
                    resultPair =
                        (await this.swapKit[walletSelected.wallet.connectMethodName](AllChainsSupported, walletPaths)) || '';
                }
                else if (walletSelected.type === 'LEDGER') {
                    console.log('ledgerApp: ', ledgerApp);
                    try {
                        if (!ledgerApp)
                            throw Error('Ledger app required for ledger pairing!');
                        if (ledgerApp === 'ETH') {
                            console.log('ETH');
                            //pair all evm chains
                            // eslint-disable-next-line @typescript-eslint/prefer-for-of
                            for (let i = 0; i < core_1.EVMChainList.length; i++) {
                                resultPair =
                                    (await this.swapKit[walletSelected.wallet.connectMethodName](core_1.EVMChainList[i], walletPaths)) || '';
                                console.log('LEDGER resultPair: ', resultPair);
                            }
                        }
                        else {
                            resultPair =
                                (await this.swapKit[walletSelected.wallet.connectMethodName](ledgerApp, walletPaths)) || '';
                            console.log('LEDGER resultPair: ', resultPair);
                        }
                    }
                    catch (e) {
                        console.error('Failed to pair ledger! e: ', e);
                        // @ts-ignore
                        if (e.toString().indexOf('LockedDeviceError') > -1) {
                            console.log('LockedDeviceError...');
                            return {
                                error: 'LockedDeviceError',
                            };
                        }
                        if (e.toString().indexOf('claimInterface')) {
                            return {
                                error: 'claimInterface',
                            };
                        }
                        if (e.toString().indexOf('decorateAppAPIMethods')) {
                            return {
                                error: 'WrongAppError',
                            };
                        }
                        if (e.toString().indexOf('TransportStatusError')) {
                            return {
                                error: 'WrongAppError',
                            };
                        }
                        return {
                            error: 'Unknown Error',
                        };
                        //TODO no device plugged in
                        //TODO wrong browser?
                    }
                }
                else {
                    resultPair =
                        (await this.swapKit[walletSelected.wallet.connectMethodName](AllChainsSupported)) || '';
                }
                // @ts-ignore
                if (resultPair) {
                    // update
                    const matchingWalletIndex = this.wallets.findIndex((w) => w.type === wallet);
                    console.log(tag, 'matchingWalletIndex: ', matchingWalletIndex);
                    // get balances
                    // @ts-ignore
                    let context;
                    if (wallet === 'LEDGER' && ledgerApp !== 'ETH') {
                        context = 'ledger:ledger.wallet'; //placeholder until we know eth address
                    }
                    else {
                        console.log("this.swapKit: ", this.swapKit);
                        console.log("this.swapKit.getWalletByChain: ", await this.swapKit.getWalletByChain(types_1.Chain.Ethereum));
                        const ethAddress = this.swapKit.getAddress(types_1.Chain.Ethereum);
                        if (!ethAddress)
                            throw Error('Failed to get eth address! can not pair wallet');
                        context = `${wallet.toLowerCase()}:${ethAddress}.wallet`;
                        // isPioneer?
                        // get pioneer status
                        let pioneerInfo = await this.pioneer.GetPioneer({
                            address: ethAddress,
                        });
                        pioneerInfo = pioneerInfo.data;
                        console.log('pioneerInfo: ', pioneerInfo);
                        if (pioneerInfo.isPioneer) {
                            this.isPioneer = pioneerInfo.image;
                        }
                    }
                    // log.info(tag, "context: ", context);
                    this.events.emit('CONTEXT', context);
                    // add context to wallet
                    //@ts-ignore
                    // this.wallets[matchingWalletIndex].context = context;
                    //@ts-ignore
                    // this.wallets[matchingWalletIndex].connected = true;
                    this.wallets[matchingWalletIndex].status = 'connected';
                    this.setContext(context);
                    // this.refresh(context);
                }
                else {
                    throw Error(`Failed to pair wallet! ${walletSelected.type}`);
                }
                return resultPair;
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                // response:
                console.error(tag, 'e: ', JSON.stringify(e));
                // log.error(tag, "e2: ", e.response)
                // log.error(tag, "e3: ", e.response.data)
                throw e;
            }
        };
        this.clearWalletState = async function () {
            const tag = `${TAG} | clearWalletState | `;
            try {
                // @ts-ignore
                this.context = null;
                this.paths = [];
                this.blockchains = [];
                this.pubkeys = [];
                return true;
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
        this.getPubkeys = async function () {
            var _a, _b, _c;
            const tag = `${TAG} | getPubkeys | `;
            try {
                if (this.paths.length === 0)
                    throw Error('No paths found!');
                if (!this.swapKit)
                    throw Error('this.swapKit not initialized!');
                //verify context
                //TODO handle ledger contexts
                const ethAddress = this.swapKit.getAddress(types_1.Chain.Ethereum);
                console.log('ethAddress: ', ethAddress);
                if (this.context.indexOf(ethAddress) === -1) {
                    console.log('Clearing Wallet state!');
                    this.clearWalletState();
                }
                // Verify if pubkeys match context
                if (this.pubkeys.some((pubkey) => pubkey.context !== this.context)) {
                    console.log('Invalid pubkeys found!');
                    this.pubkeys = [];
                }
                // Verify if balances match context
                if (this.balances.some((balance) => balance.context !== this.context)) {
                    console.log('Invalid balances found!');
                    this.balances = [];
                }
                console.log("paths: ", this.paths);
                //TODO if wallet doesn't support blockchains, throw error
                let pubkeysNew = [];
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.blockchains.length; i++) {
                    const blockchain = this.blockchains[i];
                    let chain = types_1.NetworkIdToChain[blockchain];
                    let paths = [];
                    console.log("blockchain: ", blockchain);
                    if (blockchain.indexOf('eip155') > -1) {
                        console.log("ETH like detected!");
                        //all eip155 blockchains use the same path
                        paths = this.paths.filter((path) => path.network === 'eip155:1');
                        chain = types_1.Chain.Ethereum;
                    }
                    else {
                        //get paths for each blockchain
                        paths = this.paths.filter((path) => path.network === blockchain);
                    }
                    if (paths.length === 0)
                        throw Error('Missing Path for blockchain: ' + blockchain);
                    for (let j = 0; j < paths.length; j++) {
                        const path = paths[j];
                        let pubkey;
                        console.log('Attemtping to get pubkeys for path: ', path);
                        //get pubkey on path
                        if (path.type === 'address') {
                            console.log('path type address detected: ');
                            let address = (_a = this.swapKit) === null || _a === void 0 ? void 0 : _a.getAddress(chain);
                            if (address) {
                                pubkey = {
                                    context: this.context, // TODO this is not right?
                                    // wallet:walletSelected.type,
                                    symbolSwapKit: chain,
                                    blockchain: pioneer_coins_1.COIN_MAP_LONG[chain] || 'unknown',
                                    type: 'address',
                                    networkId: blockchain,
                                    master: address,
                                    pubkey: address,
                                    address,
                                };
                                pubkeysNew.push(pubkey);
                            }
                        }
                        else {
                            console.log('path type address detected: ');
                            let walletForChain = await ((_b = this.swapKit) === null || _b === void 0 ? void 0 : _b.getWalletByChain(chain));
                            console.log('walletForChain: ', walletForChain);
                            if (walletForChain) {
                                const pubkeyForPath = walletForChain.pubkeys.find((pubkeyObj) => { var _a, _b; return ((_a = pubkeyObj === null || pubkeyObj === void 0 ? void 0 : pubkeyObj.addressNList) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = path === null || path === void 0 ? void 0 : path.addressNList) === null || _b === void 0 ? void 0 : _b.toString()); });
                                console.log('pubkeyForPath: ', pubkeyForPath);
                                let address = (_c = this.swapKit) === null || _c === void 0 ? void 0 : _c.getAddress(chain);
                                //TODO fix paths so metamask doesnt throw this on 84!
                                // if (!pubkeyForPath)
                                //   throw Error(
                                //     chain +
                                //       'Failed to get pubkey for path: ' +
                                //       path.addressNList +
                                //       ' chain: ' +
                                //       blockchain,
                                //   );
                                if (pubkeyForPath) {
                                    pubkey = {
                                        context: this.context, // TODO this is not right?
                                        networkId: blockchain,
                                        symbol: pubkeyForPath.symbol,
                                        symbolSwapKit: chain,
                                        type: pubkeyForPath.type,
                                        blockchain: pioneer_coins_1.COIN_MAP_LONG[chain] || 'unknown',
                                        master: address, //TODO this is probally wrong, get address for path
                                        address, //TODO get next unused address and save it here!
                                        pubkey: pubkeyForPath.xpub,
                                        xpub: pubkeyForPath.xpub,
                                    };
                                    pubkeysNew.push(pubkey);
                                }
                            }
                        }
                        //get balances for each pubkey
                    }
                }
                console.log('pubkeysNew: ', pubkeysNew);
                this.pubkeys = pubkeysNew;
                //load pubkeys into cache
                this.events.emit('SET_PUBKEYS', pubkeysNew);
                //TODO verify atleast 1 pubkey per blockchain
                return true;
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
        this.getBalances = async function () {
            var _a;
            const tag = `${TAG} | getBalances | `;
            try {
                //verify context
                //TODO handle ledger contexts
                // const ethAddress = this.swapKit.getAddress(Chain.Ethereum);
                // if (this.context.indexOf(ethAddress) === -1) this.clearWalletState();
                // // Verify if pubkeys match context
                // if (this.pubkeys.some((pubkey) => pubkey.context !== this.context)) {
                //   this.pubkeys = [];
                // }
                // // Verify if balances match context
                // if (this.balances.some((balance) => balance.context !== this.context)) {
                //   this.balances = [];
                // }
                //TODO if wallet doesn't support blockchains, throw error
                let balances = [];
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.blockchains.length; i++) {
                    const blockchain = this.blockchains[i];
                    let chain = types_1.NetworkIdToChain[blockchain];
                    //get balances for each pubkey
                    let walletForChain = await ((_a = this.swapKit) === null || _a === void 0 ? void 0 : _a.getWalletByChain(chain));
                    console.log('walletForChain: ', walletForChain);
                    if (walletForChain) {
                        // eslint-disable-next-line @typescript-eslint/prefer-for-of
                        // @ts-ignore
                        for (let j = 0; j < walletForChain.balance.length; j++) {
                            // @ts-ignore
                            let balance = walletForChain === null || walletForChain === void 0 ? void 0 : walletForChain.balance[j];
                            console.log('balance: ', balance);
                            if (Array.isArray(balance)) {
                                // If balance is an array, use the first element
                                balance = balance[0];
                            }
                            console.log('balance: ', balance);
                            let balanceString = {};
                            if (!balance.chain || !balance.symbol || !balance.ticker || !balance.type) {
                                console.error('chain: ', balance);
                                // console.error('chain: ', balance[0]);
                                // console.error('chain: ', balance[0].chain);
                                // console.error('symbol: ', balance[0].symbol);
                                // console.error('ticker: ', balance[0].ticker);
                                // console.error('type: ', balance[0].type);
                                console.error('Missing required properties for balance: ', balance);
                            }
                            else {
                                //caip
                                try {
                                    let caip = (0, pioneer_caip_1.thorchainToCaip)(balance.chain, balance.symbol, balance.ticker, balance.type);
                                    console.log('caip: ', caip);
                                    //if (!caip) throw Error('Failed to get caip for balance: ' + JSON.stringify(balance));
                                    if (caip) {
                                        //Assuming these properties already exist in each balance
                                        balanceString.context = this.context;
                                        balanceString.caip = caip;
                                        balanceString.address = balance.address;
                                        balanceString.symbol = balance.symbol;
                                        balanceString.chain = balance.chain;
                                        balanceString.ticker = balance.ticker;
                                        balanceString.type = balance.type;
                                        balanceString.balance = balance.toFixed(balance.decimal).toString();
                                        balances.push(balanceString);
                                    }
                                }
                                catch (e) {
                                    console.error('e: ', e);
                                    console.error('Invalid balance!: ', balance);
                                }
                            }
                        }
                    }
                }
                console.log('PRE-register balances: ', balances);
                const register = {
                    username: this.username,
                    blockchains: [],
                    publicAddress: 'none',
                    context: 'none',
                    walletDescription: {
                        context: 'none',
                        type: 'none',
                    },
                    data: {
                        pubkeys: this.pubkeys,
                        balances,
                    },
                    queryKey: this.queryKey,
                    auth: 'lol',
                    provider: 'lol',
                };
                console.log('register: ', register);
                console.log('register: ', JSON.stringify(register));
                const result = await this.pioneer.Register(register);
                console.log('result: ', result);
                console.log('result: ', result.data);
                console.log('result: ', result.data.balances);
                if (result.data.balances) {
                    console.log('Setting balances!');
                    this.balances = result.data.balances;
                }
                // TODO pick better default assets (last used)
                this.events.emit('SET_BALANCES', result.data.balances);
                this.assetContext = this.balances[0];
                this.events.emit('SET_ASSET_CONTEXT', this.assetContext);
                this.outboundAssetContext = this.balances[1];
                this.events.emit('SET_OUTBOUND_ASSET_CONTEXT', this.outboundAssetContext);
                return true;
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
        // @ts-ignore
        this.refresh = async function () {
            const tag = `${TAG} | refresh | `;
            try {
                // log.info(tag, "walletWithContext: ", walletWithContext);
                // // get chains of wallet
                // const chains = Object.keys(this.swapKit.connectedWallets);
                // // get address array
                // const addressArray = await Promise.all(
                //   // @ts-ignore
                //   chains.map(this.swapKit.getAddress),
                // );
                // // log.info(tag, "addressArray: ", addressArray);
                //
                // for (let i = 0; i < chains.length; i++) {
                //   const chain = chains[i];
                //   const address = addressArray[i];
                //   const pubkey = {
                //     context: this.context, // TODO this is not right?
                //     // wallet:walletSelected.type,
                //     symbol: chain,
                //     blockchain: COIN_MAP_LONG[chain] || 'unknown',
                //     type: 'address',
                //     caip: shortListSymbolToCaip[chain],
                //     master: address,
                //     pubkey: address,
                //     address,
                //   };
                //   this.pubkeys.push(pubkey);
                // }
                // this.events.emit('SET_PUBKEYS', this.pubkeys);
                // // set pubkeys
                // console.log('this.swapKit: ', this.swapKit);
                // // calculate walletDaa
                // const walletDataArray = await Promise.all(
                //   // @ts-ignore
                //   chains.map(this.swapKit.getWalletByChain),
                // );
                // console.log(tag, 'walletDataArray: ', walletDataArray);
                // // set balances
                // const balancesSwapKit: any = [];
                // // eslint-disable-next-line @typescript-eslint/prefer-for-of
                // for (let i = 0; i < walletDataArray.length; i++) {
                //   const walletData: any = walletDataArray[i];
                //   // console.log(tag, 'walletData: ', walletData);
                //   // const chain = chains[i];
                //   // log.info(tag, "chain: ", chain);
                //   if (walletData) {
                //     // eslint-disable-next-line @typescript-eslint/prefer-for-of
                //     for (let j = 0; j < walletData.balance.length; j++) {
                //       const balance = walletData.balance[j];
                //       // console.log('balance: ', balance);
                //       if (balance && balance?.baseValueNumber > 0) {
                //         balance.address = walletData.address;
                //         balance.context = this.context;
                //         balancesSwapKit.push(balance);
                //       }
                //     }
                //   }
                // }
                //
                // //
                // const pubkeysRegister = this.pubkeys.filter((pubkey) => pubkey.context === this.context);
                // const balancesRegister = balancesSwapKit
                //   .map((balance: any) => {
                //     const balanceString: any = {};
                //     // Assuming these properties already exist in each balance
                //     balanceString.context = this.context;
                //     balanceString.address = balance.address;
                //     balanceString.symbol = balance.symbol;
                //     balanceString.caip = shortListSymbolToCaip[balance.symbol];
                //     balanceString.chain = balance.chain;
                //     balanceString.ticker = balance.ticker;
                //     balanceString.type = balance.type;
                //     balanceString.balance = balance.value;
                //     balanceString.context = balance.context;
                //     return balanceString;
                //   })
                //   .filter((balance: any) => balance.context === this.context);
                //
                // const register: any = {
                //   username: this.username,
                //   blockchains: [],
                //   publicAddress: 'none',
                //   context: 'none',
                //   walletDescription: {
                //     context: 'none',
                //     type: 'none',
                //   },
                //   data: {
                //     pubkeys: pubkeysRegister,
                //     balances: balancesRegister,
                //   },
                //   queryKey: this.queryKey,
                //   auth: 'lol',
                //   provider: 'lol',
                // };
                // console.log('register: ', register);
                // console.log('register: ', JSON.stringify(register));
                // const result = await this.pioneer.Register(register);
                // console.log('result: ', result);
                // console.log('result: ', result.data);
                // console.log('result: ', result.data.balances);
                //
                // if (result.data.balances) {
                //   console.log('Setting balances!');
                //   this.balances = result.data.balances;
                // }
                //
                // // TODO pick better default assets (last used)
                // this.events.emit('SET_BALANCES', result.data.balances);
                //
                // this.assetContext = this.balances[0];
                // this.events.emit('SET_ASSET_CONTEXT', this.assetContext);
                //
                // this.outboundAssetContext = this.balances[1];
                // this.events.emit('SET_OUTBOUND_ASSET_CONTEXT', this.outboundAssetContext);
                return true;
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
        this.setContext = async function (context) {
            const tag = `${TAG} | setContext | `;
            try {
                this.context = context;
                this.events.emit('SET_CONTEXT', context);
                return { success: true };
            }
            catch (e) {
                console.error(tag, e);
                throw e;
            }
        };
        this.setAssetContext = async function (asset) {
            const tag = `${TAG} | setAssetContext | `;
            try {
                this.assetContext = asset;
                this.events.emit('SET_ASSET_CONTEXT', asset);
                return { success: true };
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
        this.setOutboundAssetContext = async function (asset) {
            const tag = `${TAG} | setOutputAssetContext | `;
            try {
                if (asset && this.outboundAssetContext !== asset) {
                    this.outboundAssetContext = asset;
                    this.events.emit('SET_OUTBOUND_ASSET_CONTEXT', asset);
                    return { success: true };
                }
                return { success: false, error: `already asset context=${asset}` };
            }
            catch (e) {
                console.error(tag, 'e: ', e);
                throw e;
            }
        };
    }
}
exports.SDK = SDK;
exports.default = SDK;
