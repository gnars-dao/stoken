/**
 * @file Account by key API helpers.
 * @author Bartłomiej (@engrave) Górnicki
 */
import { PublicKey } from '../crypto';
import { Client } from './../client';
export interface AccountsByKey {
    accounts: string[][];
}
export declare class AccountByKeyAPI {
    readonly client: Client;
    constructor(client: Client);
    /**
     * Convenience for calling `account_by_key_api`.
     */
    call(method: string, params?: any): Promise<any>;
    /**
     * Returns all accounts that have the key associated with their owner or active authorities.
     */
    getKeyReferences(keys: (PublicKey | string)[]): Promise<AccountsByKey>;
}
