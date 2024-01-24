"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWallets = void 0;
const types_1 = require("@coinmasters/types");
const support_1 = require("./support");
// const TAG = " | connectWallets | ";
async function initializeWallets() {
    // const tag = `${TAG} | initializeWallets | `;
    const wallets = [];
    const walletsVerbose = [];
    // Importing wallets
    const { keepkeyWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-keepkey')));
    // @ts-ignore
    const { keplrWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-keplr')));
    // @ts-ignore
    const { keystoreWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-keystore')));
    const { metamaskWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-metamask')));
    // @ts-ignore
    // const { ledgerWallet } = await import('@coinmasters/wallet-ledger');
    const { okxWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-okx')));
    // @ts-ignore
    const { trezorWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-trezor')));
    // @ts-ignore
    // const { walletconnectWallet } = await import('@coinmasters/wallet-wc');
    // @ts-ignore
    const { xdefiWallet } = await Promise.resolve().then(() => __importStar(require('@coinmasters/wallet-xdefi')));
    // Initialize and push each wallet into the wallets array
    const walletKeepKey = {
        type: types_1.WalletOption.KEEPKEY,
        icon: 'https://pioneers.dev/coins/keepkey.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.KEEPKEY],
        wallet: keepkeyWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(keepkeyWallet);
    walletsVerbose.push(walletKeepKey);
    const walletMetaMask = {
        type: types_1.WalletOption.METAMASK,
        icon: 'https://pioneers.dev/coins/metamask.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.METAMASK],
        wallet: metamaskWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(metamaskWallet);
    walletsVerbose.push(walletMetaMask);
    // const walletEVM = {
    //   type: "EVM", // TODO
    //   icon: "https://pioneers.dev/coins/evm.png",
    //   chains: availableChainsByWallet.EVM, // TODO
    //   wallet: evmWallet,
    //   status: "offline",
    //   isConnected: false,
    // };
    // wallets.push(evmWallet);
    // walletsVerbose.push(walletEVM);
    const walletKeplr = {
        type: types_1.WalletOption.KEPLR,
        icon: 'https://pioneers.dev/coins/keplr.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.KEPLR],
        wallet: keplrWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(keplrWallet);
    walletsVerbose.push(walletKeplr);
    const walletKeystore = {
        type: types_1.WalletOption.KEYSTORE,
        icon: 'https://pioneers.dev/coins/keystore.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.KEYSTORE],
        wallet: keystoreWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(keystoreWallet);
    walletsVerbose.push(walletKeystore);
    // const walletLedger = {
    //     type: WalletOption.LEDGER,
    //     icon: 'https://pioneers.dev/coins/ledger.png',
    //     chains: availableChainsByWallet[WalletOption.LEDGER],
    //     wallet: ledgerWallet,
    //     status: 'offline',
    //     isConnected: false,
    // };
    // wallets.push(ledgerWallet);
    // walletsVerbose.push(walletLedger);
    const walletOKX = {
        type: types_1.WalletOption.OKX,
        icon: 'https://pioneers.dev/coins/okx.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.OKX],
        wallet: okxWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(okxWallet);
    walletsVerbose.push(walletOKX);
    const walletTrezor = {
        type: types_1.WalletOption.TREZOR,
        icon: 'https://pioneers.dev/coins/trezor.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.TREZOR],
        wallet: trezorWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(trezorWallet);
    walletsVerbose.push(walletTrezor);
    // const walletWalletConnect = {
    //     type: WalletOption.WALLETCONNECT,
    //     icon: 'https://pioneers.dev/coins/walletconnect.png',
    //     chains: availableChainsByWallet[WalletOption.WALLETCONNECT],
    //     wallet: walletconnectWallet,
    //     status: 'offline',
    //     isConnected: false,
    // };
    // wallets.push(walletconnectWallet);
    // walletsVerbose.push(walletWalletConnect);
    const walletXDefi = {
        type: types_1.WalletOption.XDEFI,
        icon: 'https://pioneers.dev/coins/xdefi.png',
        chains: support_1.availableChainsByWallet[types_1.WalletOption.XDEFI],
        wallet: xdefiWallet,
        status: 'offline',
        isConnected: false,
    };
    wallets.push(xdefiWallet);
    walletsVerbose.push(walletXDefi);
    // TODO test each for detection
    return { wallets, walletsVerbose };
}
exports.initializeWallets = initializeWallets;
