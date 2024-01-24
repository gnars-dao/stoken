import { PrivateKey } from '@shapeshiftoss/fiojs';
import { Transactions } from '../Transactions';
export declare abstract class SignedTransaction extends Transactions {
    abstract ENDPOINT: string;
    abstract ACTION: string;
    abstract ACCOUNT: string;
    abstract getData(): Promise<any>;
    execute(privateKey: PrivateKey, publicKey: string, dryRun?: boolean): Promise<any>;
    prepareResponse(result: {
        processed: {
            action_traces: {
                receipt: {
                    response: string;
                };
            }[];
        };
    } | any): any;
    static prepareResponse(result: {
        transaction_id: string;
        processed: {
            block_num: number;
            action_traces: {
                receipt: {
                    response: string;
                };
            }[];
        };
    } | any, includeTrxId?: boolean): any;
    static parseProcessedResult(processed: {
        action_traces: {
            receipt: {
                response: string;
            };
        }[];
    }): any;
    getAction(): string;
    getAccount(): string;
    getEndPoint(): string;
}
