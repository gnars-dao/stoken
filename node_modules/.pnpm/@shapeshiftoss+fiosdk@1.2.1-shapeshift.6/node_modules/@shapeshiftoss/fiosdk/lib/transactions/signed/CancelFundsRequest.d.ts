import { SignedTransaction } from './SignedTransaction';
export declare class CancelFundsRequest extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioRequestId: number;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioRequestId: number, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_request_id: number;
        actor: string;
        tpid: string;
        max_fee: number;
    }>;
}
