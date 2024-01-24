import { PrivateKey, PublicKey } from './crypto';
export declare const Memo: {
    decode: (private_key: string | PrivateKey, memo: string) => string;
    encode: (private_key: string | PrivateKey, public_key: string | PublicKey, memo: string, testNonce?: string | undefined) => string;
};
