/// <reference types="node" />
import Transport from "@ledgerhq/hw-transport";
export declare type AppAndVersion = {
    name: string;
    version: string;
    flags: number | Buffer;
};
export declare const getAppAndVersion: (transport: Transport) => Promise<AppAndVersion>;
//# sourceMappingURL=getAppAndVersion.d.ts.map