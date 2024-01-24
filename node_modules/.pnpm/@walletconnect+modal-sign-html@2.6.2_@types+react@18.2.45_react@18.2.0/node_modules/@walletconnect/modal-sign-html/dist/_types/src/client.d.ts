import type { WalletConnectModalConfig } from '@walletconnect/modal';
import SignClient from '@walletconnect/sign-client';
export type WalletConnectModalSignSession = SignClient['session']['values'][number];
export interface WalletConnectModalSignOptions {
    projectId: string;
    metadata: SignClient['metadata'];
    relayUrl?: string;
    modalOptions?: Omit<WalletConnectModalConfig, 'projectId' | 'walletConnectVersion'>;
}
export type WalletConnectModalSignConnectArguments = Parameters<SignClient['connect']>[0];
export type WalletConnectModalSignRequestArguments = Parameters<SignClient['request']>[0];
export type WalletConnectModalSignDisconnectArguments = Parameters<SignClient['disconnect']>[0];
export type WalletConnectModalEventCallback = (data: any) => void;
export declare class WalletConnectModalSign {
    #private;
    constructor(options: WalletConnectModalSignOptions);
    connect(args: WalletConnectModalSignConnectArguments): Promise<import("@walletconnect/types").SessionTypes.Struct>;
    disconnect(args: WalletConnectModalSignDisconnectArguments): Promise<void>;
    request<Result>(args: WalletConnectModalSignRequestArguments): Promise<Result>;
    getSessions(): Promise<import("@walletconnect/types").SessionTypes.Struct[]>;
    getSession(): Promise<import("@walletconnect/types").SessionTypes.Struct | undefined>;
    onSessionEvent(callback: WalletConnectModalEventCallback): Promise<void>;
    offSessionEvent(callback: WalletConnectModalEventCallback): Promise<void>;
    onSessionUpdate(callback: WalletConnectModalEventCallback): Promise<void>;
    offSessionUpdate(callback: WalletConnectModalEventCallback): Promise<void>;
    onSessionDelete(callback: WalletConnectModalEventCallback): Promise<void>;
    offSessionDelete(callback: WalletConnectModalEventCallback): Promise<void>;
    onSessionExpire(callback: WalletConnectModalEventCallback): Promise<void>;
    offSessionExpire(callback: WalletConnectModalEventCallback): Promise<void>;
}
