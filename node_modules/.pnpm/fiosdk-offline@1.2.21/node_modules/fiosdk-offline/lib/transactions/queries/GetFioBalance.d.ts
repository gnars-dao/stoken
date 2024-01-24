import { Query } from './Query';
import { BalanceResponse } from '../../entities/BalanceResponse';
export declare class GetFioBalance extends Query<BalanceResponse> {
    ENDPOINT: string;
    keyToUse: string;
    constructor(othersBalance?: string);
    getData(): {
        fio_public_key: string;
    };
}
