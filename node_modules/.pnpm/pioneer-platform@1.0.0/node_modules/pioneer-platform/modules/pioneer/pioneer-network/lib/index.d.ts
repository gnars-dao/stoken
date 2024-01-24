declare const TAG = " | Pioneer network | ";
declare const bitcoin: any;
declare const ethUtils: any;
declare const ripemd160: any;
declare const CryptoJS: any;
declare const sha256: any;
declare const bech32: any;
declare let supportedBlockchains: any, supportedAssets: any, getPaths: any, get_address_from_xpub: any;
declare let cloneCrypto: any;
declare let coincap: any;
declare const tokenData: any;
declare const log: any;
declare const networks: any;
declare const blockbook: any;
declare const BigNumber: any;
declare let IS_TESTNET: boolean;
declare let PUBLIC_WALLET: any;
interface Tx {
    txid?: string;
    serialized?: string;
}
declare let prefurredScripts: any;
declare let BLOCKBOOK_COINS: string[];
declare let BLOCKBOOK_COINS_TESTNET: string[];
interface Recipient {
    address: string;
    amount: string;
    sendMax: boolean;
}
interface Input {
    network: string;
    xpub: string;
    account_address_n: [number];
    script_type: string;
}
declare const get_fio_actor_from_pubkey: (publicKey: string) => Promise<any>;
declare const get_fio_accounts_by_pubkey: (publicKey: string) => Promise<any>;
declare const get_fio_pubkey: () => Promise<any>;
declare const get_eos_pubkey: () => Promise<any>;
declare const validate_FIO_username: (username: string) => Promise<any>;
declare const validate_EOS_username: (username: string) => Promise<any>;
declare const balance_history: (coin: string) => Promise<"TODO" | undefined>;
declare const get_new_address: (coin: string) => Promise<"TODO" | undefined>;
declare const get_block_height: (coin: string) => Promise<any>;
declare const broadcast_transaction: (coin: string, tx: Tx) => Promise<any>;
declare function bech32ify(address: any, prefix: string): any;
declare function createBech32Address(publicKey: any, prefix: string): any;
declare const get_address: (coin: string, scriptType: string, account: number, index: number, isChange: boolean, isTestnet: boolean) => Promise<any>;
declare const get_address_master: (coin: string) => Promise<any>;
declare const get_balance: (coin: string, isTestnet?: boolean | undefined) => Promise<any>;
declare function divideBy10ToTheNthAndRoundDown(n: any, num: any): any;
declare const get_wallet_info: () => Promise<any>;
declare const init_wallet: (type: string, config: any, isTestnet: boolean) => Promise<boolean>;
