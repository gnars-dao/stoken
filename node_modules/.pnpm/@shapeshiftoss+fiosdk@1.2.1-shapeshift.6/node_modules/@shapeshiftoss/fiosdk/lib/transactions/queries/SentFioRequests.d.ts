import { SentFioRequestResponse } from '../../entities/SentFioRequestsResponse';
import { Query } from './Query';
export declare class SentFioRequests extends Query<SentFioRequestResponse> {
    ENDPOINT: string;
    fioPublicKey: string;
    limit: number | null;
    offset: number | null;
    isEncrypted: boolean;
    constructor(fioPublicKey: string, limit?: number | null, offset?: number | null);
    getData(): Promise<{
        fio_public_key: string;
        limit: number | null;
        offset: number | null;
    }>;
    decrypt(result: any): Promise<any>;
}
