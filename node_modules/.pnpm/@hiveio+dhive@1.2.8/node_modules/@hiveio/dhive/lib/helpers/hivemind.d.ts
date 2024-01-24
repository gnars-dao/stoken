/**
 * Hivemind database query wrapper
 */
import { Account } from '../chain/account';
import { Discussion } from '../chain/comment';
import { CommunityDetail, Notifications } from '../chain/hivemind';
import { Client } from './../client';
interface PostsQuery {
    /**
     * Number of posts to fetch
     */
    limit?: number;
    /**
     * Sorting posts
     */
    sort: 'trending' | 'hot' | 'created' | 'promoted' | 'payout' | 'payout_comments' | 'muted';
    /**
     * Filtering with tags
     */
    tag?: string[] | string;
    /**
     * Observer account
     */
    observer?: string;
    /**
     * Paginating last post author
     */
    start_author?: string;
    /**
     * Paginating last post permlink
     */
    start_permlink?: string;
}
/**
 * Omitting sort extended from BridgeParam
 */
interface AccountPostsQuery extends Omit<PostsQuery, 'sort'> {
    account: string;
    sort: 'posts';
}
interface CommunityQuery {
    name: string;
    observer: string;
}
interface AccountNotifsQuery {
    account: Account['name'];
    limit: number;
    type?: 'new_community' | 'pin_post';
}
interface ListCommunitiesQuery {
    /**
     * Paginating last
     */
    last?: string;
    /**
     * Number of communities to fetch
     */
    limit: number;
    /**
     * To be developed, not ready yet
     */
    query?: string | any;
    /**
     * Observer account
     */
    observer?: Account['name'];
}
export declare class HivemindAPI {
    readonly client: Client;
    constructor(client: Client);
    /**
     * Convenience of calling hivemind api
     * @param method
     * @param params
     */
    call(method: string, params?: any): Promise<any>;
    /**
     * Get trending, hot, recent community posts from Hivemind
     * @param options
     */
    getRankedPosts(options: PostsQuery): Promise<Discussion[]>;
    /**
     * Get posts by particular account from Hivemind
     * @param options
     */
    getAccountPosts(options: AccountPostsQuery): Promise<Discussion[]>;
    /**
     * Get community details such as who are the admin,
     * moderators, how many subscribers, etc..
     * @param options
     */
    getCommunity(options: CommunityQuery): Promise<CommunityDetail[]>;
    /**
     * List all subscriptions by particular account
     * @param account the account you want to query
     * @returns {Array} return role, what community the account joined
     */
    listAllSubscriptions(account: Account['name'] | object): Promise<Discussion[]>;
    /**
     * Get particular account notifications feed
     * @param options
     */
    getAccountNotifications(options?: AccountNotifsQuery): Promise<Notifications[]>;
    /**
     * List all available communities on hivemind
     * @param options
     */
    listCommunities(options: ListCommunitiesQuery): Promise<CommunityDetail[]>;
}
export {};
