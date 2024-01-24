declare const AlgorithmLength: {
    ripemd160: 20;
    sha1: 20;
    sha256: 32;
    hash160: 20;
    hash256: 32;
};
declare type AlgorithmName = keyof typeof AlgorithmLength;
export declare type Digest<T extends AlgorithmName = AlgorithmName> = Buffer & {
    length: typeof AlgorithmLength[T];
    preimage: Buffer;
    algorithm: T;
};
export declare type NonDigest = Buffer & Partial<Record<'algorithm' | 'preimage', never>>;
export declare function ripemd160(buffer: Buffer): Digest<'ripemd160'>;
export declare function sha1(buffer: Buffer): Digest<'sha1'>;
export declare function sha256(buffer: Buffer): Digest<'sha256'>;
export declare function hash160(buffer: Buffer): Digest<'hash160'>;
export declare function hash256(buffer: Buffer): Digest<'hash256'>;
export {};
