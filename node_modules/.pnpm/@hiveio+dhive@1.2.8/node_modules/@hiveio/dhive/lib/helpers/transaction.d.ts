/**
 * @file Transaction status API helpers.
 * @author Bartłomiej (@engrave) Górnicki
 */
import { Client } from './../client';
export declare type TransactionStatus = 'unknown' | 'within_mempool' | 'within_reversible_block' | 'within_irreversible_block' | 'expired_reversible' | 'expired_irreversible' | 'too_old';
export declare class TransactionStatusAPI {
    readonly client: Client;
    constructor(client: Client);
    /**
     * Convenience for calling `transaction_status_api`.
     */
    call(method: string, params?: any): Promise<any>;
    /**
     * Returns the status of a given transaction id
     */
    findTransaction(transaction_id: string, expiration?: string): Promise<{
        status: TransactionStatus;
    }>;
}
