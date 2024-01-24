import { SignedTransaction } from './SignedTransaction';
export declare class RenewFioAddress extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioAddress: string;
    maxFee: number;
    technologyProviderId: String;
    constructor(fioAddress: string, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_address: string;
        max_fee: number;
        tpid: String;
        actor: string;
    }>;
}
