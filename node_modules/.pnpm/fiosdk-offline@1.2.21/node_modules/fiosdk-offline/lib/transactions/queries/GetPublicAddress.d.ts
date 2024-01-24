import { Query } from './Query';
import { PublicAddressResponse } from '../../entities/PublicAddressResponse';
export declare class GetPublicAddress extends Query<PublicAddressResponse> {
    ENDPOINT: string;
    fioAddress: string;
    chainCode: string;
    tokenCode: string;
    constructor(fioAddress: string, chainCode: string, tokenCode: string);
    getData(): {
        fio_address: string;
        chain_code: string;
        token_code: string;
    };
}
