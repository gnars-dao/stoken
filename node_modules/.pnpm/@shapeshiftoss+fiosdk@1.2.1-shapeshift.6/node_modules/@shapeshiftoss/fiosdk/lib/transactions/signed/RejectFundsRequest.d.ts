import { SignedTransaction } from './SignedTransaction';
export declare class RejectFundsRequest extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioreqid: number;
    maxFee: number;
    technologyProviderId: string;
    constructor(fioreqid: number, maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_request_id: number;
        max_fee: number;
        tpid: string;
        actor: string;
    }>;
}
