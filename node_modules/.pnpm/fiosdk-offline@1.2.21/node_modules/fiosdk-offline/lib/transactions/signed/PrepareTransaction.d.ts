import { SignedTransaction } from './SignedTransaction';
export declare class PrepareTransaction extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    data: any;
    constructor(action: string, account: string, data: any);
    execute(privateKey: string, publicKey: string): Promise<any>;
    getData(): any;
}
