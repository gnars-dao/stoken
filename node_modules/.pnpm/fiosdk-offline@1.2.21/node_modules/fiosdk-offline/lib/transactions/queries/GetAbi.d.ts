import { Query } from './Query';
import { AbiResponse } from '../../entities/ABIResponse';
export declare class GetAbi extends Query<AbiResponse> {
    ENDPOINT: string;
    accountName: string;
    constructor(accountName: string);
    getData(): {
        account_name: string;
    };
}
