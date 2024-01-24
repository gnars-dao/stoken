export declare enum HDWALLETS {
    'pioneer' = 0,
    'trezor' = 1,
    'keepkey' = 2,
    'ledger' = 3,
    'metamask' = 4
}
export interface Balance {
    blockchain: string;
    symbol: string;
    asset: string;
    path: string;
    script_type: string;
    network: string;
    created: number;
    tags: any;
    pubkey: string;
    xpub: string;
    type: string;
    master: string;
    address: string;
    context: string;
    isToken: boolean;
    lastUpdated: number;
    balance: any;
    priceUsd: string;
    valueUsd: string;
    onCoinCap: boolean;
    id_coincap: string;
    id_coingecko: string;
    rank_coincap: string;
    rank_coingecko: number;
    name_coincap: string;
    name_coingecko: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
    onCoinGecko: boolean;
    coinGeckoAgreeSymbol: boolean;
    coinGeckoSymbol: string;
    image: string;
    current_price: string;
    market_cap: string;
    fully_diluted_valuation: string;
    total_volume: string;
    high_24h: string;
    low_24h: string;
    price_change_24h: string;
    price_change_percentage_24h: string;
    market_cap_change_24h: string;
    market_cap_change_percentage_24h: string;
    circulating_supply: string;
    total_supply: string;
    max_supply: string;
    ath: string;
    ath_change_percentage: string;
    ath_date: string;
    atl: string;
    atl_change_percentage: string;
    atl_date: string;
    roi: null;
    last_updated: string;
}
export interface Pubkey {
    blockchain: string;
    symbol: string;
    asset: string;
    path: string;
    script_type: string;
    network: string;
    created: number;
    tags: any;
    pubkey: string;
    master: string;
    address: string;
    priceUsd: string;
    balance: string;
    valueUsd: string;
    context: string;
    balances: [
        {
            balance: string;
            symbol: string;
            network: string;
        }
    ];
}
export interface SDKConfig {
    service?: string;
    url?: string;
    username: string;
    queryKey: string;
    spec: string;
    wss: string;
    context?: string;
    blockchains?: string;
    env?: string;
    mode?: string;
}
export interface EventsConfig {
    wss: string;
    username?: string;
    queryKey?: string;
}
export interface Config {
    context: string;
    blockchains: any;
    wss?: string;
    spec: string;
    env: string;
    mode: string;
    username: string;
    addresses?: [];
    wallet?: any;
    pubkeys?: any;
    auth?: string;
    paths?: any;
    privWallet?: any;
    mnemonic?: string;
    queryKey?: string;
    offline?: boolean;
    pioneerApi?: boolean;
}
export interface AppConfig {
    wss: string;
    password?: string;
    spec: string;
    username: string;
    queryKey: string;
    hardware?: string;
    locale?: string;
    localeSelected?: boolean;
    isCli?: boolean;
    temp?: string;
    pioneerApi: boolean;
    blockchains: any;
    created?: string;
}
export interface PioneerConfig {
    isTestnet?: boolean;
    mnemonic?: string;
    pioneerApi: boolean;
    paths?: any;
    context: string;
    wss: string;
    spec: string;
    username: string;
    queryKey: string;
    hardware?: boolean;
    wallet?: string;
    pubkeys?: string;
    vendor?: string;
    locale?: string;
    localeSelected?: boolean;
    isCli?: boolean;
    temp?: string;
    password?: string;
    blockchains: any;
    created?: string;
    walletDescription?: any;
}
export interface User {
    type: string;
    wallet: string;
    keystore: any;
    clients: any;
    context: string;
    availableContexts: any;
    valueUsdContext: string;
    assetContext: string;
    assetBalanceNativeContext: string;
    assetBalanceUsdValueContext: string;
}
export interface OnboardWallet {
    name: string;
    network: number;
    initialized: string;
    address: string;
}
export interface Wallet {
    mnemonic: string;
    password: string;
    masterAddress: string;
    temp?: string;
}
export interface CitadelWallet {
    isTestnet?: boolean;
    temp?: string;
    masterAddress: string;
    TYPE: string;
    seed_encrypted?: string;
    hash: string;
    filename: string;
}
export interface Transfer {
    context?: string;
    network: string;
    asset: string;
    symbol?: string;
    nonce?: number;
    fee?: any;
    recipient: string;
    amount: any;
    memo?: string;
    noBroadcast?: boolean;
}
export interface Delegate {
    context?: string;
    network: string;
    asset: string;
    symbol?: string;
    nonce?: number;
    fee?: any;
    validator: string;
    amount: any;
    memo?: string;
    noBroadcast?: boolean;
}
export interface Redelegate {
    context?: string;
    network: string;
    asset: string;
    symbol?: string;
    nonce?: number;
    fee?: any;
    validator: string;
    validatorOld: string;
    amount: any;
    memo?: string;
    noBroadcast?: boolean;
}
export interface JoinPool {
    context?: string;
    network: string;
    asset: string;
    symbol?: string;
    nonce?: number;
    fee?: any;
    poolId: string;
    shareOutAmount: string;
    tokenInMaxs: any;
    memo?: string;
    noBroadcast?: boolean;
}
export interface IBCdeposit {
    context?: string;
    network: string;
    asset: string;
    symbol?: string;
    nonce?: number;
    fee?: any;
    sender: string;
    timeout_height: any;
    receiver: string;
    token: any;
    source_port: string;
    source_channel: string;
    memo?: string;
    noBroadcast?: boolean;
}
export interface OsmosisSwap {
    context?: string;
    network: string;
    asset: string;
    symbol?: string;
    nonce?: number;
    fee?: any;
    routes: any;
    tokenIn: any;
    tokenOutMinAmount: string;
    memo?: string;
    noBroadcast?: boolean;
}
export interface Deposit {
    network: string;
    asset: string;
    inboundAddress?: any;
    invocationId: string;
    symbol?: string;
    addressFrom?: string;
    addressTo: string;
    address?: string;
    amount: string;
    memo?: string | undefined;
    nonce?: number;
    feeLevel?: string;
    noBroadcast?: boolean;
}
export interface Transaction {
    coin?: string;
    network: string;
    asset: string;
    symbol?: string;
    addressFrom?: string;
    addressTo: string;
    address?: string;
    amount: string;
    memo?: string | undefined;
    nonce?: number;
    feeLevel?: string;
    fee?: any;
    noBroadcast?: boolean;
}
export interface UnsignedTransaction {
    coin?: string;
    network: string;
    invocationId?: string;
    deposit?: any;
    transaction?: Transaction;
    HDwalletPayload: any;
    verbal: any;
}
export interface CoinInfo {
    coin: string;
    note?: string;
    script_type: string;
    available_scripts_types?: [string];
    long?: string;
    path: string;
    master: string;
    network: string;
    pubkey: string;
    curve?: string;
    xpub?: string;
    zpub?: string;
    type?: string;
}
export interface Approval {
    contract: string;
    tokenAddress: string;
    amount: number;
    invocationId?: string;
    nonce?: string;
    coin?: string;
    noBroadcast?: boolean;
}
export interface SendToAddress {
    invocationId?: string;
    blockchain: string;
    addressTo?: string;
    coin?: string;
    asset: string;
    network: string;
    amount: string;
    address: string;
    memo?: string;
    noBroadcast?: boolean;
}
