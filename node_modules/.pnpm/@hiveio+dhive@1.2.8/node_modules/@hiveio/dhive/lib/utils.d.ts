/**
 * @file Misc utility functions.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * Return a promise that will resove when a specific event is emitted.
 */
export declare function waitForEvent<T>(emitter: EventEmitter, eventName: string | symbol): Promise<T>;
/**
 * Sleep for N milliseconds.
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Return a stream that emits iterator values.
 */
export declare function iteratorStream<T>(iterator: AsyncIterableIterator<T>): NodeJS.ReadableStream;
/**
 * Return a deep copy of a JSON-serializable object.
 */
export declare function copy<T>(object: T): T;
/**
 * Fetch API wrapper that retries until timeout is reached.
 */
export declare function retryingFetch(currentAddress: string, allAddresses: string | string[], opts: any, timeout: number, failoverThreshold: number, consoleOnFailover: boolean, backoff: (tries: number) => number, fetchTimeout?: (tries: number) => number): Promise<{
    response: any;
    currentAddress: string;
}>;
import { Asset, PriceType } from './chain/asset';
import { WitnessSetPropertiesOperation } from './chain/operation';
import { PublicKey } from './crypto';
export interface WitnessProps {
    account_creation_fee?: string | Asset;
    account_subsidy_budget?: number;
    account_subsidy_decay?: number;
    key: PublicKey | string;
    maximum_block_size?: number;
    new_signing_key?: PublicKey | string | null;
    hbd_exchange_rate?: PriceType;
    hbd_interest_rate?: number;
    url?: string;
}
export declare const buildWitnessUpdateOp: (owner: string, props: WitnessProps) => WitnessSetPropertiesOperation;
export declare const operationOrders: {
    vote: number;
    comment: number;
    transfer: number;
    transfer_to_vesting: number;
    withdraw_vesting: number;
    limit_order_create: number;
    limit_order_cancel: number;
    feed_publish: number;
    convert: number;
    account_create: number;
    account_update: number;
    witness_update: number;
    account_witness_vote: number;
    account_witness_proxy: number;
    pow: number;
    custom: number;
    report_over_production: number;
    delete_comment: number;
    custom_json: number;
    comment_options: number;
    set_withdraw_vesting_route: number;
    limit_order_create2: number;
    claim_account: number;
    create_claimed_account: number;
    request_account_recovery: number;
    recover_account: number;
    change_recovery_account: number;
    escrow_transfer: number;
    escrow_dispute: number;
    escrow_release: number;
    pow2: number;
    escrow_approve: number;
    transfer_to_savings: number;
    transfer_from_savings: number;
    cancel_transfer_from_savings: number;
    custom_binary: number;
    decline_voting_rights: number;
    reset_account: number;
    set_reset_account: number;
    claim_reward_balance: number;
    delegate_vesting_shares: number;
    account_create_with_delegation: number;
    witness_set_properties: number;
    account_update2: number;
    create_proposal: number;
    update_proposal_votes: number;
    remove_proposal: number;
    update_proposal: number;
    collateralized_convert: number;
    recurrent_transfer: number;
    fill_convert_request: number;
    author_reward: number;
    curation_reward: number;
    comment_reward: number;
    liquidity_reward: number;
    interest: number;
    fill_vesting_withdraw: number;
    fill_order: number;
    shutdown_witness: number;
    fill_transfer_from_savings: number;
    hardfork: number;
    comment_payout_update: number;
    return_vesting_delegation: number;
    comment_benefactor_reward: number;
    producer_reward: number;
    clear_null_account_balance: number;
    proposal_pay: number;
    sps_fund: number;
    hardfork_hive: number;
    hardfork_hive_restore: number;
    delayed_voting: number;
    consolidate_treasury_balance: number;
    effective_comment_vote: number;
    ineffective_delete_comment: number;
    sps_convert: number;
    expired_account_notification: number;
    changed_recovery_account: number;
    transfer_to_vesting_completed: number;
    pow_reward: number;
    vesting_shares_split: number;
    account_created: number;
    fill_collateralized_convert_request: number;
    system_warning: number;
    fill_recurrent_transfer: number;
    failed_recurrent_transfer: number;
};
/**
 * Make bitmask filter to be used with getAccountHistory call
 * @param allowedOperations Array of operations index numbers
 */
export declare function makeBitMaskFilter(allowedOperations: number[]): any[];
