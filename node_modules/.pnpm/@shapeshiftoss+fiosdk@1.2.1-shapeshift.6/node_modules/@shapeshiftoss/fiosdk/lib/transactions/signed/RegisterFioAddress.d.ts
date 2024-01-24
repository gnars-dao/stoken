import { SignedTransaction } from './SignedTransaction';
export declare class RegisterFioAddress extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioAddress: string;
    ownerPublicKey: string;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioAddress: string, ownerPublicKey: string | null, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_address: string;
        owner_fio_public_key: string;
        max_fee: number;
        tpid: string;
        actor: string;
    }>;
}
