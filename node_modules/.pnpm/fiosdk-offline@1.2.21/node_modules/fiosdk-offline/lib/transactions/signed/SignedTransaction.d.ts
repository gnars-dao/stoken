import { Transactions } from '../Transactions';
export declare abstract class SignedTransaction extends Transactions {
    abstract ENDPOINT: string;
    abstract ACTION: string;
    abstract ACCOUNT: string;
    abstract getData(): any;
    execute(privateKey: string, publicKey: string, dryRun?: boolean): Promise<any>;
    prepareResponse(result: any): any;
    parseProcessedResult(processed: any): any;
    getAction(): string;
    getAccount(): string;
    getEndPoint(): string;
}
