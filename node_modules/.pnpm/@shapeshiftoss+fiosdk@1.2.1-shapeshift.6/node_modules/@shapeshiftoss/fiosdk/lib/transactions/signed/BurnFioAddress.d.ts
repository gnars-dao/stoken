import { SignedTransaction } from './SignedTransaction';
export declare class BurnFioAddress extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioAddress: string;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioAddress: string, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_address: string;
        actor: string;
        tpid: string;
        max_fee: number;
    }>;
}
