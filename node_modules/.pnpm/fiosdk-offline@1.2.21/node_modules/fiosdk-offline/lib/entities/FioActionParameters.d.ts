import { PublicAddress } from './PublicAddress';
export declare type FioFeeRatio = {
    end_point: string;
    value: number;
};
export declare type FioRequestContent = {
    payee_public_address: string;
    amount: string;
    chain_code: string;
    token_code: string;
    memo: string;
    hash: string;
    offline_url: string;
};
export declare type FioObtDataContent = {
    payer_public_address: string;
    payee_public_address: string;
    amount: string;
    chain_code: string;
    token_code: string;
    status: string;
    obt_id: string;
    memo: string;
    hash: string;
    offline_url: string;
};
export declare const FioAddPubAddressActionAccount = "fio.address";
export declare const FioAddPubAddressActionName = "addaddress";
/**
 * This call allows a public address of the specific blockchain type to be added to the FIO Address, so that it can be returned using /pub_address_lookup
 */
export declare type FioAddPubAddressActionData = {
    fio_address: string;
    public_addresses: Array<PublicAddress>;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioBurnExpiredActionAccount = "fio.address";
export declare const FioBurnExpiredActionName = "burnexpired";
/**
 * This is a maintenance call and is intended to burn FIO Addresses and Domains which have passed their expiration date and need to be removed from state. It is envisioned that this call will be made by BPs as good stewards of the blockchain and to free-up state file. This is a signed call, but is free to make.
 */
export declare type FioBurnExpiredActionData = {};
export declare const FioClaimBPRewardsActionAccount = "fio.treasury";
export declare const FioClaimBPRewardsActionName = "bpclaim";
/**
 * This is a maintenance call and is intended to pay the calling BP. This call can only be made by BPs once every 24 hours. This is a signed call, but is free to make.
 */
export declare type FioClaimBPRewardsActionData = {
    fio_address: string;
    actor?: string;
};
export declare const FioNewFundsRequestActionAccount = "fio.reqobt";
export declare const FioNewFundsRequestActionName = "newfundsreq";
/**
 * This api method will create a new funds request on the FIO chain.
 */
export declare type FioNewFundsRequestActionData = {
    payer_fio_address: string;
    payee_fio_address: string;
    content: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioPayTpidRewardsActionAccount = "fio.treasury";
export declare const FioPayTpidRewardsActionName = "tpidclaim";
/**
 * This is a maintenance call and is intended to pay TPIDs. It is envisioned that this call will be made by BPs as good stewards of the blockchain and to free-up state file. This is a signed call, but is free to make.
 */
export declare type FioPayTpidRewardsActionData = {
    actor?: string;
};
export declare const FioProxyVoteActionAccount = "eosio";
export declare const FioProxyVoteActionName = "voteproxy";
/**
 * This call proxies votes of caller to a designated proxy.
 */
export declare type FioProxyVoteActionData = {
    proxy: string;
    fio_address: string;
    actor?: string;
    max_fee?: number;
};
export declare const FioRecordObtDataActionAccount = "fio.reqobt";
export declare const FioRecordObtDataActionName = "recordobt";
/**
 * This call is made to record Other Blockchain Transaction (OBT) data on the FIO blockchain, e.g. 1 BTC was sent on Bitcoin Blockchain, and both sender and receiver have FIO Addresses.
 */
export declare type FioRecordObtDataActionData = {
    payer_fio_address: string;
    payee_fio_address: string;
    content: FioObtDataContent;
    fio_request_id: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioRegisterFioAddressActionAccount = "fio.address";
export declare const FioRegisterFioAddressActionName = "regaddress";
/**
 * Registers a FIO Address on the FIO blockchain.
 */
export declare type FioRegisterFioAddressActionData = {
    fio_address: string;
    owner_fio_public_key: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioRegisterFioDomainActionAccount = "fio.address";
export declare const FioRegisterFioDomainActionName = "regdomain";
/**
 * Registers a FIO Domain on the FIO blockchain.
 */
export declare type FioRegisterFioDomainActionData = {
    fio_domain: string;
    owner_fio_public_key: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioRegisterProducerActionAccount = "eosio";
export declare const FioRegisterProducerActionName = "regproducer";
/**
 * This call registers an entity as a block producer, so that they can be voted on.
 */
export declare type FioRegisterProducerActionData = {
    fio_address: string;
    fio_pub_key: string;
    url: string;
    location: number;
    actor?: string;
    max_fee?: number;
};
export declare const FioRegisterProxyActionAccount = "eosio";
export declare const FioRegisterProxyActionName = "regproxy";
/**
 * This call registers an entity as a proxy.
 */
export declare type FioRegisterProxyActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};
export declare const FioRejectFundsRequestActionAccount = "fio.reqobt";
export declare const FioRejectFundsRequestActionName = "rejectfndreq";
/**
 * Reject funds request.
 */
export declare type FioRejectFundsRequestActionData = {
    fio_request_id: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioRenewFioAddressActionAccount = "fio.address";
export declare const FioRenewFioAddressActionName = "renewaddress";
/**
 * When a domain is renewed:
 * 365 days are added to the current expiration date (not date when renewal is ran)
 * New bundle of transactions is added to the existing count.
 * Example:
 * Bundled transaction before renewal: 20
 * Assuming every address gets 500 bundled transactions
 * Bundled transaction after renewal: 20
 */
export declare type FioRenewFioAddressActionData = {
    fio_address: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioRenewFioDomainActionAccount = "fio.address";
export declare const FioRenewFioDomainActionName = "renewdomain";
/**
 * When a domain is renewed 365 days are added to its expiration date.
 */
export declare type FioRenewFioDomainActionData = {
    fio_address: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioSetFioDomainPublicActionAccount = "fio.address";
export declare const FioSetFioDomainPublicActionName = "setdomainpub";
/**
 * By default all FIO Domains are non-public, meaning only the owner can register FIO Addresses on that domain. Setting them to public allows anyone to register a FIO Address on that domain.
 */
export declare type FioSetFioDomainPublicActionData = {
    fio_domain: string;
    is_public: number;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioSubmitBundledTransactionActionAccount = "fio.fee";
export declare const FioSubmitBundledTransactionActionName = "bundlevote";
/**
 * This call is only allowed to be made by active BPs and is designed to submit bundled transaction amount which should be allocated to new FIO Address registrations. It has no fee.
 */
export declare type FioSubmitBundledTransactionActionData = {
    bundled_transactions: number;
    actor?: string;
};
export declare const FioSubmitFeeMultiplierActionAccount = "fio.fee";
export declare const FioSubmitFeeMultiplierActionName = "setfeemult";
/**
 * This call is only allowed to be made by active BPs and is designed to submit fee multiplier. It has no fee.
 */
export declare type FioSubmitFeeMultiplierActionData = {
    multiplier: number;
    actor?: string;
};
export declare const FioSubmitFeeRatiosActionAccount = "fio.fee";
export declare const FioSubmitFeeRatiosActionName = "setfeevote";
/**
 * This call is only allowed to be made by active BPs and is designed to submit fee ratios. It has no fee.
 */
export declare type FioSubmitFeeRatiosActionData = {
    fee_ratios: Array<FioFeeRatio>;
    actor?: string;
};
export declare const FioTransferTokensPubKeyActionAccount = "fio.token";
export declare const FioTransferTokensPubKeyActionName = "trnsfiopubky";
/**
 * This call transfers FIO tokens using FIO public key
 */
export declare type FioTransferTokensPubKeyActionData = {
    payee_public_key: string;
    amount: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};
export declare const FioUnregisterProducerActionAccount = "eosio";
export declare const FioUnregisterProducerActionName = "unregprod";
/**
 * This call unregisters an entity as a block producer.
 */
export declare type FioUnregisterProducerActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};
export declare const FioUnregisterProxyActionAccount = "eosio";
export declare const FioUnregisterProxyActionName = "unregproxy";
/**
 * This call unregisters an entity as a proxy.
 */
export declare type FioUnregisterProxyActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};
export declare const FioVoteProducerActionAccount = "eosio";
export declare const FioVoteProducerActionName = "voteproducer";
/**
 * This call submits votes on block producers.
 */
export declare type FioVoteProducerActionData = {
    producers: Array<String>;
    fio_address: string;
    actor?: string;
    max_fee?: number;
};
export declare type FioActionData = FioAddPubAddressActionData | FioBurnExpiredActionData | FioClaimBPRewardsActionData | FioNewFundsRequestActionData | FioPayTpidRewardsActionData | FioProxyVoteActionData | FioRecordObtDataActionData | FioRegisterFioAddressActionData | FioRegisterFioDomainActionData | FioRegisterProducerActionData | FioRegisterProxyActionData | FioRejectFundsRequestActionData | FioRenewFioAddressActionData | FioRenewFioDomainActionData | FioSetFioDomainPublicActionData | FioSubmitBundledTransactionActionData | FioSubmitFeeMultiplierActionData | FioSubmitFeeRatiosActionData | FioTransferTokensPubKeyActionData | FioUnregisterProducerActionData | FioUnregisterProxyActionData | FioVoteProducerActionData;
export declare type FioActionAccount = 'fio.address' | 'fio.reqobt' | 'fio.token' | 'eosio';
export declare type FioActionName = 'addaddress' | 'burnexpired' | 'bpclaim' | 'newfundsreq' | 'tpidclaim' | 'voteproxy' | 'recordobt' | 'regaddress' | 'regdomain' | 'regproducer' | 'regproxy' | 'rejectfndreq' | 'renewaddress' | 'renewdomain' | 'setdomainpub' | 'bundlevote' | 'setfeemult' | 'setfeevote' | 'trnsfiopubky' | 'unregprod' | 'unregproxy' | 'voteproducer';
