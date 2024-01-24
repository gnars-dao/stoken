export interface Invocation {
    asset: any;
    fee: any;
    network: string;
    context: string;
    username: string;
    addressFrom?: string;
    type?: string;
    noBroadcast?: boolean;
    invocationId?: string;
    inboundAddress?: any;
    address?: string;
    addressTo?: string;
    validator?: string;
    validatorOld?: string;
    poolId?: string;
    shareOutAmount?: string;
    tokenInMaxs?: any;
    memo?: string;
    blockchain?: string;
    routes?: any;
    tokenIn?: any;
    tokenOutMinAmount?: string;
    coin?: string;
    amount?: string;
    token?: any;
    sender?: string;
    receiver?: string;
    source_port?: string;
    source_channel?: string;
    timeout_height?: any;
}
export interface InvocationBody {
    msg?: string;
    context: string;
    network: string;
    type: string;
    username: string;
    invocation: Invocation;
    addressFrom?: string;
    invocationId?: string;
    auth?: string;
    service?: string;
    servicePubkey?: string;
    serviceHash?: string;
    appName?: string;
    mode?: 'sync' | 'async';
}
export interface createAppBody {
    name: string;
    image: string;
    version: string;
    description: string;
}
