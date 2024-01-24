import { SignedTransaction } from './SignedTransaction';
export declare class PushTransaction extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    data: any;
    constructor(action: string, account: string, data: any);
    getData(): any;
}
