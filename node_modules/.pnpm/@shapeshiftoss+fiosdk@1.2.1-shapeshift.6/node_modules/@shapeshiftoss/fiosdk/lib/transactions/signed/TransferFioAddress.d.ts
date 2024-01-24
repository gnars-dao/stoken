import { SignedTransaction } from './SignedTransaction';
export declare class TransferFioAddress extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioAddress: string;
    newOwnerKey: string;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioAddress: string, newOwnerKey: string, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_address: string;
        new_owner_fio_public_key: string;
        actor: string;
        tpid: string;
        max_fee: number;
    }>;
}
