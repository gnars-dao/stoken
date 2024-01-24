/// <reference types="node" />
import { PrivateKey } from '@shapeshiftoss/fiojs';
import { AbiResponse } from '../entities/AbiResponse';
import { RawTransaction } from '../entities/RawTransaction';
declare type FetchJson = (uri: string, opts?: Object) => any;
export declare class Transactions {
    static baseUrl: string;
    static abiMap: Map<string, AbiResponse>;
    static FioProvider: {
        prepareTransaction(param: any): Promise<any>;
        accountHash(pubkey: string): string;
    };
    static fetchJson: FetchJson;
    publicKey: string;
    privateKey: PrivateKey;
    serilizeEndpoint: string;
    validationData: object;
    validationRules: any | null;
    getActor(publicKey?: string): string;
    getChainInfo(): Promise<any>;
    getBlock(chain: any): Promise<any>;
    pushToServer(transaction: RawTransaction, endpoint: string, dryRun: boolean): Promise<any>;
    executeCall(endPoint: string, body: string, fetchOptions?: any): Promise<any>;
    getCipherContent(contentType: string, content: any, privateKey: PrivateKey, publicKey: string, iv?: Buffer): Promise<string>;
    getUnCipherContent(contentType: string, content: any, privateKey: PrivateKey, publicKey: string): Promise<any>;
    validate(): void;
}
export {};
