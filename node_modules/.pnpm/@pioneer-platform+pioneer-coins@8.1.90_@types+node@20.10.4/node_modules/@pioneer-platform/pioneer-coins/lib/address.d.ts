export declare enum Coin {
    BTC = "Bitcoin",
    ATOM = "Cosmos",
    ARB = "Arbitrum",
    OSMO = "Osmosis",
    TEST = "Testnet",
    BCH = "BitcoinCash",
    LTC = "Litecoin",
    DASH = "Dash",
    DGB = "DigiByte",
    DOGE = "Dogecoin",
    RUNE = "Thorchain",
    ETH = "Ethereum",
    ADA = "Cardano",
    MATIC = "Polygon",
    BNB = "Binance",
    AVAX = "Avalanche",
    EOS = "Eos",
    FIO = "Fio"
}
export interface AddressInfo {
    address_n: number[];
    path: string;
    coin: Coin;
    script_type: string;
    curve: string;
    show_display: boolean;
}
export declare const addressInfoForCoin: (symbol: string, isTestnet?: boolean, scriptType?: string, showDisplay?: boolean, path?: any) => any;
