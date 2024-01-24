import { SignedTransaction } from './SignedTransaction';
export declare class TransferFioDomain extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioDomain: string;
    newOwnerKey: string;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioDomain: string, newOwnerKey: string, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_domain: string;
        new_owner_fio_public_key: string;
        actor: string;
        tpid: string;
        max_fee: number;
    }>;
}
