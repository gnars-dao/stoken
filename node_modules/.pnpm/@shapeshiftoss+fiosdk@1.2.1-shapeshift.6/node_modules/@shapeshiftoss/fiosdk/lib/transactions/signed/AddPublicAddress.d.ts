import { PublicAddress } from '../../entities/PublicAddress';
import { SignedTransaction } from './SignedTransaction';
export declare class AddPublicAddress extends SignedTransaction {
    ENDPOINT: string;
    ACTION: string;
    ACCOUNT: string;
    fioAddress: string;
    publicAddresses: PublicAddress[];
    maxFee: number;
    technologyProviderId: string;
    constructor(fioAddress: string, publicAddresses: PublicAddress[], maxFee: number, technologyProviderId?: string);
    getData(): Promise<{
        fio_address: string;
        public_addresses: PublicAddress[];
        actor: string;
        tpid: string;
        max_fee: number;
    }>;
}
