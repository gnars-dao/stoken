export declare function getBlockBooks(): ({
    name: string;
    networkType: string;
    symbol: string;
    bip44: string;
    hasSignVerify: boolean;
    decimals: number;
    explorer: {
        tx: string;
        account: string;
    };
    accountType?: undefined;
    chainId?: undefined;
    testnet?: undefined;
} | {
    name: string;
    networkType: string;
    accountType: string;
    symbol: string;
    bip44: string;
    hasSignVerify: boolean;
    decimals: number;
    explorer: {
        tx: string;
        account: string;
    };
    chainId?: undefined;
    testnet?: undefined;
} | {
    name: string;
    networkType: string;
    symbol: string;
    chainId: number;
    bip44: string;
    hasSignVerify: boolean;
    decimals: number;
    explorer: {
        tx: string;
        account: string;
    };
    accountType?: undefined;
    testnet?: undefined;
} | {
    name: string;
    networkType: string;
    symbol: string;
    bip44: string;
    decimals: number;
    explorer: {
        tx: string;
        account: string;
    };
    hasSignVerify?: undefined;
    accountType?: undefined;
    chainId?: undefined;
    testnet?: undefined;
} | {
    name: string;
    networkType: string;
    symbol: string;
    bip44: string;
    hasSignVerify: boolean;
    decimals: number;
    testnet: boolean;
    explorer: {
        tx: string;
        account: string;
    };
    accountType?: undefined;
    chainId?: undefined;
} | {
    name: string;
    networkType: string;
    accountType: string;
    symbol: string;
    bip44: string;
    hasSignVerify: boolean;
    decimals: number;
    testnet: boolean;
    explorer: {
        tx: string;
        account: string;
    };
    chainId?: undefined;
} | {
    name: string;
    networkType: string;
    symbol: string;
    bip44: string;
    hasSignVerify: boolean;
    chainId: number;
    decimals: number;
    testnet: boolean;
    explorer: {
        tx: string;
        account: string;
    };
    accountType?: undefined;
} | {
    name: string;
    networkType: string;
    symbol: string;
    bip44: string;
    decimals: number;
    testnet: boolean;
    explorer: {
        tx: string;
        account: string;
    };
    hasSignVerify?: undefined;
    accountType?: undefined;
    chainId?: undefined;
})[];
