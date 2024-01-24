import { Transactions } from '../Transactions';
export declare abstract class Query<T> extends Transactions {
    abstract ENDPOINT: string;
    abstract getData(): any;
    decrypt(result: any): any;
    isEncrypted: boolean;
    execute(publicKey: string, privateKey?: string): Promise<any>;
    getEndPoint(): string;
}
