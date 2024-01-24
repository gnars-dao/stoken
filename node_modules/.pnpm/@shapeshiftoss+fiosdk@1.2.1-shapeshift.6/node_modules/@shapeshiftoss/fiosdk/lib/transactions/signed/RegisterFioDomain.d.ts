import { SignedTransaction } from './SignedTransaction';
export declare class RegisterFioDomain extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioDomain: string;
    ownerPublicKey: string;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioDomain: string, ownerPublicKey: string | null, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_domain: string;
        owner_fio_public_key: string;
        max_fee: number;
        tpid: string;
        actor: string;
    }>;
}
