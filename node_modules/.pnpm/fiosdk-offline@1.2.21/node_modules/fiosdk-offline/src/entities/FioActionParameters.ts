import { PublicAddress } from './PublicAddress';

export type FioFeeRatio = {
    end_point: string;
    value: number;
};

export type FioRequestContent = {
    payee_public_address: string;
    amount: string;
    chain_code: string;
    token_code: string;
    memo: string;
    hash: string;
    offline_url: string;
}

export type FioObtDataContent = {
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
}

export const FioAddPubAddressActionAccount = 'fio.address';
export const FioAddPubAddressActionName = 'addaddress';

/**
 * This call allows a public address of the specific blockchain type to be added to the FIO Address, so that it can be returned using /pub_address_lookup
 */
export type FioAddPubAddressActionData = {
    fio_address: string;
    public_addresses: Array<PublicAddress>;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioBurnExpiredActionAccount = 'fio.address';
export const FioBurnExpiredActionName = 'burnexpired';
/**
 * This is a maintenance call and is intended to burn FIO Addresses and Domains which have passed their expiration date and need to be removed from state. It is envisioned that this call will be made by BPs as good stewards of the blockchain and to free-up state file. This is a signed call, but is free to make.
 */
export type FioBurnExpiredActionData = {};

export const FioClaimBPRewardsActionAccount = 'fio.treasury';
export const FioClaimBPRewardsActionName = 'bpclaim';
/**
 * This is a maintenance call and is intended to pay the calling BP. This call can only be made by BPs once every 24 hours. This is a signed call, but is free to make.
 */
export type FioClaimBPRewardsActionData = {
    fio_address: string;
    actor?: string;
};

export const FioNewFundsRequestActionAccount = 'fio.reqobt';
export const FioNewFundsRequestActionName = 'newfundsreq';
/**
 * This api method will create a new funds request on the FIO chain.
 */
export type FioNewFundsRequestActionData = {
    payer_fio_address: string;
    payee_fio_address: string;
    content: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioPayTpidRewardsActionAccount = 'fio.treasury';
export const FioPayTpidRewardsActionName = 'tpidclaim';
/**
 * This is a maintenance call and is intended to pay TPIDs. It is envisioned that this call will be made by BPs as good stewards of the blockchain and to free-up state file. This is a signed call, but is free to make.
 */
export type FioPayTpidRewardsActionData = {
    actor?: string;
};

export const FioProxyVoteActionAccount = 'eosio';
export const FioProxyVoteActionName = 'voteproxy';
/**
 * This call proxies votes of caller to a designated proxy.
 */
export type FioProxyVoteActionData = {
    proxy: string;
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioRecordObtDataActionAccount = 'fio.reqobt';
export const FioRecordObtDataActionName = 'recordobt';
/**
 * This call is made to record Other Blockchain Transaction (OBT) data on the FIO blockchain, e.g. 1 BTC was sent on Bitcoin Blockchain, and both sender and receiver have FIO Addresses.
 */
export type FioRecordObtDataActionData = {
    payer_fio_address: string;
    payee_fio_address: string;
    content: FioObtDataContent;
    fio_request_id: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRegisterFioAddressActionAccount = 'fio.address';
export const FioRegisterFioAddressActionName = 'regaddress';
/**
 * Registers a FIO Address on the FIO blockchain.
 */
export type FioRegisterFioAddressActionData = {
    fio_address: string;
    owner_fio_public_key: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRegisterFioDomainActionAccount = 'fio.address';
export const FioRegisterFioDomainActionName = 'regdomain';
/**
 * Registers a FIO Domain on the FIO blockchain.
 */
export type FioRegisterFioDomainActionData = {
    fio_domain: string;
    owner_fio_public_key: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRegisterProducerActionAccount = 'eosio';
export const FioRegisterProducerActionName = 'regproducer';
/**
 * This call registers an entity as a block producer, so that they can be voted on.
 */
export type FioRegisterProducerActionData = {
    fio_address: string;
    fio_pub_key: string;
    url: string;
    location: number;
    actor?: string;
    max_fee?: number;
};

export const FioRegisterProxyActionAccount = 'eosio';
export const FioRegisterProxyActionName = 'regproxy';
/**
 * This call registers an entity as a proxy.
 */
export type FioRegisterProxyActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioRejectFundsRequestActionAccount = 'fio.reqobt';
export const FioRejectFundsRequestActionName = 'rejectfndreq';
/**
 * Reject funds request.
 */
export type FioRejectFundsRequestActionData = {
    fio_request_id: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRenewFioAddressActionAccount = 'fio.address';
export const FioRenewFioAddressActionName = 'renewaddress';
/**
 * When a domain is renewed:
 * 365 days are added to the current expiration date (not date when renewal is ran)
 * New bundle of transactions is added to the existing count.
 * Example:
 * Bundled transaction before renewal: 20
 * Assuming every address gets 500 bundled transactions
 * Bundled transaction after renewal: 20
 */
export type FioRenewFioAddressActionData = {
    fio_address: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRenewFioDomainActionAccount = 'fio.address';
export const FioRenewFioDomainActionName = 'renewdomain';
/**
 * When a domain is renewed 365 days are added to its expiration date.
 */
export type FioRenewFioDomainActionData = {
    fio_address: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioSetFioDomainPublicActionAccount = 'fio.address';
export const FioSetFioDomainPublicActionName = 'setdomainpub';
/**
 * By default all FIO Domains are non-public, meaning only the owner can register FIO Addresses on that domain. Setting them to public allows anyone to register a FIO Address on that domain.
 */
export type FioSetFioDomainPublicActionData = {
    fio_domain: string;
    is_public: number;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioSubmitBundledTransactionActionAccount = 'fio.fee';
export const FioSubmitBundledTransactionActionName = 'bundlevote';
/**
 * This call is only allowed to be made by active BPs and is designed to submit bundled transaction amount which should be allocated to new FIO Address registrations. It has no fee.
 */
export type FioSubmitBundledTransactionActionData = {
    bundled_transactions: number;
    actor?: string;
};

export const FioSubmitFeeMultiplierActionAccount = 'fio.fee';
export const FioSubmitFeeMultiplierActionName = 'setfeemult';
/**
 * This call is only allowed to be made by active BPs and is designed to submit fee multiplier. It has no fee.
 */
export type FioSubmitFeeMultiplierActionData = {
    multiplier: number;
    actor?: string;
};

export const FioSubmitFeeRatiosActionAccount = 'fio.fee';
export const FioSubmitFeeRatiosActionName = 'setfeevote';
/**
 * This call is only allowed to be made by active BPs and is designed to submit fee ratios. It has no fee.
 */
export type FioSubmitFeeRatiosActionData = {
    fee_ratios: Array<FioFeeRatio>;
    actor?: string;
};

export const FioTransferTokensPubKeyActionAccount = 'fio.token';
export const FioTransferTokensPubKeyActionName = 'trnsfiopubky';
/**
 * This call transfers FIO tokens using FIO public key
 */
export type FioTransferTokensPubKeyActionData = {
    payee_public_key: string;
    amount: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioUnregisterProducerActionAccount = 'eosio';
export const FioUnregisterProducerActionName = 'unregprod';
/**
 * This call unregisters an entity as a block producer.
 */
export type FioUnregisterProducerActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioUnregisterProxyActionAccount = 'eosio';
export const FioUnregisterProxyActionName = 'unregproxy';
/**
 * This call unregisters an entity as a proxy.
 */
export type FioUnregisterProxyActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioVoteProducerActionAccount = 'eosio';
export const FioVoteProducerActionName = 'voteproducer';
/**
 * This call submits votes on block producers.
 */
export type FioVoteProducerActionData = {
    producers: Array<String>;
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export type FioActionData =
    | FioAddPubAddressActionData
    | FioBurnExpiredActionData
    | FioClaimBPRewardsActionData
    | FioNewFundsRequestActionData
    | FioPayTpidRewardsActionData
    | FioProxyVoteActionData
    | FioRecordObtDataActionData
    | FioRegisterFioAddressActionData
    | FioRegisterFioDomainActionData
    | FioRegisterProducerActionData
    | FioRegisterProxyActionData
    | FioRejectFundsRequestActionData
    | FioRenewFioAddressActionData
    | FioRenewFioDomainActionData
    | FioSetFioDomainPublicActionData
    | FioSubmitBundledTransactionActionData
    | FioSubmitFeeMultiplierActionData
    | FioSubmitFeeRatiosActionData
    | FioTransferTokensPubKeyActionData
    | FioUnregisterProducerActionData
    | FioUnregisterProxyActionData
    | FioVoteProducerActionData;

export type FioActionAccount =
    | 'fio.address'
    | 'fio.reqobt'
    | 'fio.token'
    | 'eosio';

export type FioActionName =
    | 'addaddress'
    | 'burnexpired'
    | 'bpclaim'
    | 'newfundsreq'
    | 'tpidclaim'
    | 'voteproxy'
    | 'recordobt'
    | 'regaddress'
    | 'regdomain'
    | 'regproducer'
    | 'regproxy'
    | 'rejectfndreq'
    | 'renewaddress'
    | 'renewdomain'
    | 'setdomainpub'
    | 'bundlevote'
    | 'setfeemult'
    | 'setfeevote'
    | 'trnsfiopubky'
    | 'unregprod'
    | 'unregproxy'
    | 'voteproducer';
