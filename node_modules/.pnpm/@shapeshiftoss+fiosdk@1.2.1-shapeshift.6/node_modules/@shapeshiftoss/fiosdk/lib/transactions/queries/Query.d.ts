import { PrivateKey } from '@shapeshiftoss/fiojs';
import { Transactions } from '../Transactions';
export declare abstract class Query<T> extends Transactions {
    abstract ENDPOINT: string;
    abstract getData(): Promise<any>;
    decrypt(result: any): Promise<any>;
    isEncrypted: boolean;
    execute(publicKey: string, privateKey?: PrivateKey): Promise<any>;
    getEndPoint(): string;
}
