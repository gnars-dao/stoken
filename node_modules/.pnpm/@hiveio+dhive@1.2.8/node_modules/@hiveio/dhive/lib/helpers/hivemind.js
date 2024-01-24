"use strict";
/**
 * Hivemind database query wrapper
 */
Object.defineProperty(exports, "__esModule", { value: true });
class HivemindAPI {
    constructor(client) {
        this.client = client;
    }
    /**
     * Convenience of calling hivemind api
     * @param method
     * @param params
     */
    call(method, params) {
        return this.client.call('bridge', method, params);
    }
    /**
     * Get trending, hot, recent community posts from Hivemind
     * @param options
     */
    getRankedPosts(options) {
        return this.call('get_ranked_posts', options);
    }
    /**
     * Get posts by particular account from Hivemind
     * @param options
     */
    getAccountPosts(options) {
        return this.call('get_account_posts', options);
    }
    /**
     * Get community details such as who are the admin,
     * moderators, how many subscribers, etc..
     * @param options
     */
    getCommunity(options) {
        return this.call('get_community', options);
    }
    /**
     * List all subscriptions by particular account
     * @param account the account you want to query
     * @returns {Array} return role, what community the account joined
     */
    listAllSubscriptions(account) {
        return this.call('list_all_subscriptions', account);
    }
    /**
     * Get particular account notifications feed
     * @param options
     */
    getAccountNotifications(options) {
        return this.call('account_notifications', options);
    }
    /**
     * List all available communities on hivemind
     * @param options
     */
    listCommunities(options) {
        return this.call('list_communities', options);
    }
}
exports.HivemindAPI = HivemindAPI;
