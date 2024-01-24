/// <reference types="node" />
import ByteBuffer from 'bytebuffer';
type Options<Chunked> = {
    chunked: Chunked;
    addTrezorHeaders: boolean;
    messageType: number;
};
declare function encode(data: ByteBuffer, options: Options<true>): Buffer[];
declare function encode(data: ByteBuffer, options: Options<false>): Buffer;
export { encode };
//# sourceMappingURL=encode.d.ts.map