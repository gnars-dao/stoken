import { Query } from './Query';
import { AbiResponse } from '../../entities/AbiResponse';
export declare class GetAbi extends Query<AbiResponse> {
    ENDPOINT: string;
    accountName: string;
    constructor(accountName: string);
    getData(): Promise<{
        account_name: string;
    }>;
}
