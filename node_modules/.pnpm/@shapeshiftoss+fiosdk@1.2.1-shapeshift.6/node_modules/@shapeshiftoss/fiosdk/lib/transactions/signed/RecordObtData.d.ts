import { SignedTransaction } from './SignedTransaction';
export declare class RecordObtData extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    payerFioAddress: string;
    payeeFioPublicKey: string;
    payeeFioAddress: string;
    fioRequestId: number | null;
    maxFee: number;
    technologyProviderId: string;
    payerPublicAddress: string;
    payeePublicAddress: string;
    defaultStatus: string;
    content: any;
    constructor(fioRequestId: number | null, payerFioAddress: string, payeeFioAddress: string, payerPublicAddress: string, payeePublicAddress: string, amount: number, chainCode: string, tokenCode: string, obtID: string, maxFee: number, status: string, technologyProviderId: string | undefined, payeeFioPublicKey: string, memo?: string | null, hash?: string | null, offLineUrl?: string | null);
    getData(): Promise<{
        payer_fio_address: string;
        payee_fio_address: string;
        content: string;
        fio_request_id: string | number;
        max_fee: number;
        actor: string;
        tpid: string;
    }>;
}
