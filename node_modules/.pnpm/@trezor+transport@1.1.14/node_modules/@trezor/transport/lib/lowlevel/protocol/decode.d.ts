import ByteBuffer from 'bytebuffer';
export declare const decode: (byteBuffer: ByteBuffer) => {
    typeId: number;
    buffer: ByteBuffer;
};
export declare const decodeChunked: (bytes: ArrayBuffer) => {
    length: number;
    typeId: number;
    restBuffer: ByteBuffer;
};
//# sourceMappingURL=decode.d.ts.map