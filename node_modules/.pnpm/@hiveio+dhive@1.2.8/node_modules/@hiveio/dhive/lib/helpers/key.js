"use strict";
/**
 * @file Account by key API helpers.
 * @author Bartłomiej (@engrave) Górnicki
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AccountByKeyAPI {
    constructor(client) {
        this.client = client;
    }
    /**
     * Convenience for calling `account_by_key_api`.
     */
    call(method, params) {
        return this.client.call('account_by_key_api', method, params);
    }
    /**
     * Returns all accounts that have the key associated with their owner or active authorities.
     */
    getKeyReferences(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('get_key_references', { keys: keys.map(key => key.toString()) });
        });
    }
}
exports.AccountByKeyAPI = AccountByKeyAPI;
