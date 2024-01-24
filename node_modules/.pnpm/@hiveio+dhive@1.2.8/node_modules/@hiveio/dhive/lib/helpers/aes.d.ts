/// <reference types="node" />
import { PrivateKey, PublicKey } from '../crypto';
export declare const encrypt: (private_key: PrivateKey, public_key: PublicKey, message: Buffer, nonce?: string) => any;
export declare const decrypt: (private_key: PrivateKey, public_key: PublicKey, nonce: any, message: any, checksum: number) => any;
/**
 * This method does not use a checksum, the returned data must be validated some other way.
 * @arg {string|Buffer} ciphertext - binary format
 * @return {Buffer} the decrypted message
 */
export declare const cryptoJsDecrypt: (message: Buffer, tag: any, iv: any) => Buffer;
/**
 * This method does not use a checksum, the returned data must be validated some other way.
 * @arg {string|Buffer} plaintext - binary format
 * @return {Buffer} binary
 */
export declare const cryptoJsEncrypt: (message: Buffer, tag: any, iv: any) => Buffer;
