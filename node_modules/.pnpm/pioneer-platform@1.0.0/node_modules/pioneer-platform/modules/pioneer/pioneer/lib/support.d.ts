/// <reference types="node" />
export declare const compileMemo: (memo: string) => Buffer;
export declare function getBase(coin: string): 1000000000000000000 | 100000000;
export declare function bip32Like(path: string): boolean;
export declare function bip32ToAddressNList(path: string): number[];
export declare function bech32ify(address: any, prefix: string): any;
