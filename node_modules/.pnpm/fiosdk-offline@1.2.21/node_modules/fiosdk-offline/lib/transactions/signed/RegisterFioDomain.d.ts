import { SignedTransaction } from './SignedTransaction';
export declare class RegisterFioDomain extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioDomain: string;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioDomain: string, maxFee: number, technologyProviderId?: string);
    getData(): any;
}
