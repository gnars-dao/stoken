/*
    Pioneer SDK

        A ultra-light bridge to the pioneer platform

              ,    .  ,   .           .
          *  / \_ *  / \_      .-.  *       *   /\'__        *
            /    \  /    \,   ( ₿ )     .    _/  /  \  *'.
       .   /\/\  /\/ :' __ \_   -           _^/  ^/    `--.
          /    \/  \  _/  \-'\      *    /.' ^_   \_   .'\  *
        /\  .-   `. \/     \ /==~=-=~=-=-;.  _/ \ -. `_/   \
       /  `-.__ ^   / .-'.--\ =-=~_=-=~=^/  _ `--./ .-'  `-
      /        `.  / /       `.~-^=-=~=^=.-'      '-._ `._

                             A Product of the CoinMasters Guild
                                              - Highlander
  
    Wallet Providers:
    
    1. Metmask:
      if metamask derivice pioneer seed from metamask
      
    2. keepkey:
      If keepkey detected: use it, otherwise use the native adapter
      
    3. Native Adapter:
        If no wallets, use the native adapter
  


      Api Docs:
        * https://pioneers.dev/docs/
      Transaction Diagram
        * https://github.com/BitHighlander/pioneer/blob/master/docs/pioneerTxs.png


*/
import { KkRestAdapter } from "@keepkey/hdwallet-keepkey-rest";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import { SDK } from "@pioneer-sdk/sdk";
import * as core from "@shapeshiftoss/hdwallet-core";
import {
  enableShapeShiftSnap,
  shapeShiftSnapInstalled,
  BTCGetAddress as snapBitcoinGetAddress,
  BTCGetPublicKeys as snapBitcoinGetPublicKeys,
  BTCSignTransaction as snapBitcoinSignTransaction,
} from "@shapeshiftoss/metamask-snaps-adapter";
// import * as keplr from "@shapeshiftoss/hdwallet-keplr";
// import * as metaMask from "@shapeshiftoss/hdwallet-metamask";
import * as metaMask from "@shapeshiftoss/hdwallet-shapeshift-multichain";
import { MetaMaskAdapter as MetaMaskSnapAdapter } from '@shapeshiftoss/hdwallet-shapeshift-multichain'
import { MetaMaskShapeShiftMultiChainHDWallet } from '@shapeshiftoss/hdwallet-shapeshift-multichain'
import type { NativeHDWallet } from "@shapeshiftoss/hdwallet-native";
import { EventEmitter } from "events";
import { NativeAdapter } from "@shapeshiftoss/hdwallet-native";
import { entropyToMnemonic } from "bip39";
import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { checkKeepkeyAvailability, timeout } from "lib/components/utils";

const eventEmitter = new EventEmitter();

const SNAP_ID = "npm:@shapeshiftoss/metamask-snaps";

export enum WalletActions {
  SET_STATUS = "SET_STATUS",
  SET_USERNAME = "SET_USERNAME",
  OPEN_MODAL = "OPEN_MODAL",
  SET_API = "SET_API",
  SET_APP = "SET_APP",
  SET_WALLET = "SET_WALLET",
  SET_WALLET_DESCRIPTIONS = "SET_WALLET_DESCRIPTIONS",
  SET_CONTEXT = "SET_CONTEXT",
  SET_ASSET_CONTEXT = "SET_ASSET_CONTEXT",
  SET_BLOCKCHAIN_CONTEXT = "SET_BLOCKCHAIN_CONTEXT",
  SET_PUBKEY_CONTEXT = "SET_PUBKEY_CONTEXT",
  ADD_WALLET = "ADD_WALLET",
  RESET_STATE = "RESET_STATE",
}

export interface InitialState {
  // keyring: Keyring;
  status: any;
  username: string;
  serviceKey: string;
  queryKey: string;
  context: string;
  assetContext: string;
  blockchainContext: string;
  pubkeyContext: string;
  walletDescriptions: any[];
  totalValueUsd: number;
  app: any;
  api: any;
}

const initialState: InitialState = {
  status: "disconnected",
  username: "",
  serviceKey: "",
  queryKey: "",
  context: "",
  assetContext: "",
  blockchainContext: "",
  pubkeyContext: "",
  walletDescriptions: [],
  totalValueUsd: 0,
  app: null,
  api: null,
};

export interface IPioneerContext {
  state: InitialState;
  username: string | null;
  context: string | null;
  status: string | null;
  totalValueUsd: number | null;
  assetContext: string | null;
  blockchainContext: string | null;
  pubkeyContext: string | null;
  app: any;
  api: any;
}

export type ActionTypes =
  | { type: WalletActions.SET_STATUS; payload: any }
  | { type: WalletActions.SET_USERNAME; payload: string }
  | { type: WalletActions.OPEN_MODAL; payload: string }
  | { type: WalletActions.SET_APP; payload: any }
  | { type: WalletActions.SET_API; payload: any }
  | { type: WalletActions.SET_CONTEXT; payload: any }
  | { type: WalletActions.SET_ASSET_CONTEXT; payload: any }
  | { type: WalletActions.SET_BLOCKCHAIN_CONTEXT; payload: any }
  | { type: WalletActions.SET_PUBKEY_CONTEXT; payload: any }
  | { type: WalletActions.ADD_WALLET; payload: any }
  | { type: WalletActions.RESET_STATE };

const reducer = (state: InitialState, action: ActionTypes) => {
  switch (action.type) {
    case WalletActions.SET_STATUS:
      eventEmitter.emit("SET_STATUS", action.payload);
      return { ...state, status: action.payload };
    case WalletActions.SET_CONTEXT:
      //eventEmitter.emit("SET_CONTEXT", action.payload);
      return { ...state, context: action.payload };
    case WalletActions.SET_ASSET_CONTEXT:
      //eventEmitter.emit("SET_ASSET_CONTEXT", action.payload);
      return { ...state, assetContext: action.payload };
    case WalletActions.SET_BLOCKCHAIN_CONTEXT:
      //eventEmitter.emit("SET_BLOCKCHAIN_CONTEXT", action.payload);
      return { ...state, blockchainContext: action.payload };
    case WalletActions.SET_PUBKEY_CONTEXT:
      //eventEmitter.emit("SET_PUBKEY_CONTEXT", action.payload);
      return { ...state, pubkeyContext: action.payload };
    case WalletActions.SET_USERNAME:
      //eventEmitter.emit("SET_USERNAME", action.payload);
      return { ...state, username: action.payload };
    case WalletActions.OPEN_MODAL:
      return { ...state, payload: action.payload };
    case WalletActions.SET_APP:
      return { ...state, app: action.payload };
    case WalletActions.SET_API:
      return { ...state, api: action.payload };
    case WalletActions.RESET_STATE:
      return {
        ...state,
        api: null,
        user: null,
        username: null,
        context: null,
        status: null,
      };
    default:
      return state;
  }
};

const PioneerContext = createContext(initialState);

export const PioneerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (message:string) => {
    console.log("OPEN MODAL: modal: ", message)
    setIsModalOpen(true);
    // Optional: You can also set a message to be displayed in the modal
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  //TODO add wallet to state
  const connectWallet = async function (wallet: string) {
    try {
      console.log("connectWallet: ", wallet);

      if (wallet === "metamask") {
        // walletMetaMask = await metaMaskAdapter.pairDevice();
        // if (walletMetaMask) {
        //   // pair metamask
        //   await walletMetaMask.initialize();
        //   //console.log("walletMetaMask: ", walletMetaMask);
        //
        //   // get all accounts
        //   //@ts-ignore
        //   const accounts = await window.ethereum.request({
        //     method: "eth_requestAccounts",
        //   });
        //   //console.log("accounts: ", accounts);
        //   //@ts-ignore
        //   walletMetaMask.accounts = accounts;
        //
        //   const successMetaMask = await appInit.pairWallet(walletMetaMask);
        //   console.log("successMetaMask: ", successMetaMask);
        //   if(successMetaMask){
        //     // @ts-ignore
        //     if (appInit.pubkeyContext?.master || appInit?.pubkey){
        //       // @ts-ignore
        //       dispatch({
        //         type: WalletActions.SET_PUBKEY_CONTEXT,
        //         // @ts-ignore
        //         payload: appInit.pubkeyContext?.master || appInit?.pubkey,
        //       });
        //     }
        //   }
        //   // @ts-ignore
        //   dispatch({
        //     type: WalletActions.SET_STATUS,
        //     payload: "MetaMask connected!",
        //   });
        // }
      } else if (wallet === "keepkey") {

      }
    } catch (e) {
      console.error(e);
    }
  };

  const onStart = async function () {
    try {
      const serviceKey: string | null = localStorage.getItem("serviceKey"); // KeepKey api key
      let queryKey: string | null = localStorage.getItem("queryKey");
      let username: string | null = localStorage.getItem("username");
      //@ts-ignore
      dispatch({ type: WalletActions.SET_USERNAME, payload: username });

      //if auto connecting
      const isOnboarded = localStorage.getItem("userOnboarded");
      console.log("isOnboarded: ", isOnboarded);

      //


      const isKeepkeyAvailable = await checkKeepkeyAvailability();
      console.log("isKeepkeyAvailable: ", isKeepkeyAvailable);

      //is metamask available?
      const isMetaMaskAvailable = (): boolean => {
        return (
          (window as any).ethereum !== undefined &&
          (window as any).ethereum.isMetaMask
        );
      };
      const keyring = new core.Keyring();
      const metaMaskAdapter = metaMask.MetaMaskAdapter.useKeyring(keyring);

      if (!queryKey) {
        queryKey = `key:${uuidv4()}`;
        localStorage.setItem("queryKey", queryKey);
      }
      if (!username) {
        username = `user:${uuidv4()}`;
        username = username.substring(0, 13);
        localStorage.setItem("username", username);
      }
      const blockchains = [
        "bitcoin",
        "ethereum",
        "thorchain",
        "bitcoincash",
        "litecoin",
        "binance",
        "cosmos",
        "dogecoin",
      ];

      // @TODO add custom paths from localstorage
      const paths: any = [];
      console.log("VITE_PIONEER_URL_SPEC: ");
      const spec =
        //@ts-ignore
        "https://pioneers.dev/spec/swagger.json";
      //@ts-ignore
      console.log("spec: ", spec);
      const wss = "wss://pioneers.dev";
      const configPioneer: any = {
        blockchains,
        username,
        queryKey,
        spec,
        wss,
        paths,
      };
      const appInit = new SDK(spec, configPioneer);
      const api = await appInit.init();
      // @ts-ignore
      dispatch({ type: WalletActions.SET_API, payload: api });
      // @ts-ignore
      dispatch({ type: WalletActions.SET_APP, payload: appInit });
      // Example usage
      // @ts-ignore
      let walletMetaMask: metaMask.MetaMaskHDWallet | undefined;
      if (isMetaMaskAvailable()) {
        //is snap enabled?
        const isSnapInstalled = await shapeShiftSnapInstalled(SNAP_ID);
        console.log(isSnapInstalled);

        //if not installed install snap
        if (!isSnapInstalled) {
          //install it
          const result = await enableShapeShiftSnap(SNAP_ID,"1.0.0");
          console.log("result: ", result);
        }

        //console.log("isMetaMaskAvailable ")
        walletMetaMask = await metaMaskAdapter.pairDevice();
        if (walletMetaMask) {
          // pair metamask
          await walletMetaMask.initialize();
          console.log("walletMetaMask: ", walletMetaMask);

          // get all accounts
          //@ts-ignore
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          //console.log("accounts: ", accounts);
          //@ts-ignore
          walletMetaMask.accounts = accounts;

          // @ts-ignore
          dispatch({
            type: WalletActions.SET_STATUS,
            payload: "MetaMask connected!",
          });
          //@ts-ignore
          dispatch({ type: WalletActions.ADD_WALLET, payload: walletMetaMask });

          appInit.pairWallet(walletMetaMask);
          console.log("walletMetaMask: ", walletMetaMask);
          //get btc address
          // let accountInfo = await walletMetaMask.getAccountInfo("bitcoin");
          // console.log("accountInfo: ", accountInfo);
          
          //get pubkeys
          // let pubkeys = await walletMetaMask.getPublicKeys([
          //   {
          //     addressNList: [0x80000000 + 44, 0x80000000 + 0, 0x80000000 + 0],
          //     curve: "secp256k1",
          //     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
          //     coin: "Bitcoin",
          //   }])
          // console.log(pubkeys)

          let address = await walletMetaMask.binanceGetAddress({
            addressNList: [ 2147483692, 2147483648, 2147483648, 0, 4 ]
          })
          
          // let address = await walletMetaMask.btcGetAddress({
          //   addressNList: [ 2147483692, 2147483648, 2147483648, 0, 4 ],
          //   coin: 'Bitcoin',
          //   scriptType: 'p2pkh',
          //   showDisplay: false
          // })

          // let address = await walletMetaMask.btcGetAddress({
          //   addressNList: [ 2147483692, 2147483793, 2147483648, 0, 3 ],
          //   coin: 'BitcoinCash',
          //   scriptType: 'p2pkh',
          //   showDisplay: false
          // })
          console.log("METAMASK BTC ADDRESS: ", address);
          
          
          // console.log("successMetaMask: ", successMetaMask);
          // if (successMetaMask) {
          //   // @ts-ignore
          //   if (appInit.pubkeyContext?.master || appInit?.pubkey) {
          //     // @ts-ignore
          //     dispatch({
          //       type: WalletActions.SET_PUBKEY_CONTEXT,
          //       // @ts-ignore
          //       payload: appInit.pubkeyContext?.master || appInit?.pubkey,
          //     });
          //   }
          // }

        }
      } else {
        console.log("MetaMask is not available");
      }

      let walletKeepKey: core.HDWallet;
      if (isKeepkeyAvailable) {
        const config: any = {
          apiKey: serviceKey || "notSet",
          pairingInfo: {
            name: "Pioneer",
            imageUrl: "https://i.imgur.com/BdyyJZS.png",
            basePath: "http://localhost:1646/spec/swagger.json",
            url: "https://pioneer-template.vercel.com",
          },
        };
        const sdkKeepKey = await KeepKeySdk.create(config);
        if (config.apiKey !== serviceKey) {
          localStorage.setItem("serviceKey", config.apiKey);
        }

        try {
          //@ts-ignore
          walletKeepKey = await Promise.race([
            //@ts-ignore
            KkRestAdapter.useKeyring(keyring).pairDevice(sdkKeepKey),
            timeout(30000),
          ]);
          //@ts-ignore
          dispatch({ type: WalletActions.ADD_WALLET, payload: walletKeepKey });
          // @ts-ignore
          dispatch({
            type: WalletActions.SET_STATUS,
            payload: "KeepKey connected!",
          });
          // pair keepkey
          appInit.pairWallet(walletKeepKey);
          //console.log("successKeepKey: ", successKeepKey);

        } catch (error) {
          //@ts-ignore
          console.error("Error or Timeout:", error.message);
          alert("Please restart your KeepKey and try again.");
        }
      }
      
      let walletSoftware: NativeHDWallet | null;
      //if native wallet saved
      let mnemonic = localStorage.getItem("seedPhrase");
      const nativeAdapter = NativeAdapter.useKeyring(keyring);

      if(mnemonic){
        console.log("mnemonic: ", mnemonic);
        
        //if no metamask AND no keepkey
        // get walletSoftware
        walletSoftware = await nativeAdapter.pairDevice("testid");
        await nativeAdapter.initialize();
        // @ts-ignore
        await walletSoftware.loadDevice({ mnemonic });

        // @ts-ignore
        dispatch({ type: WalletActions.ADD_WALLET, payload: walletSoftware });
        // @ts-ignore
        dispatch({
          type: WalletActions.SET_STATUS,
          payload: "Software wallet connected!",
        });
        
        console.log("walletSoftware: ", walletSoftware);
        appInit.pairWallet(walletSoftware);
      }



    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onstart get data
  useEffect(() => {
    showModal('foo');
    onStart();
  }, []);

  // end
  const value: any = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <PioneerContext.Provider value={value}>{children}</PioneerContext.Provider>
  );
};

type ModalProps = {
  onClose: () => void;
};

export const usePioneer = (): any =>
  useContext(PioneerContext as unknown as React.Context<IPioneerContext>);
