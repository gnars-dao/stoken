"use strict";
/**
 * @file Transaction status API helpers.
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
class TransactionStatusAPI {
    constructor(client) {
        this.client = client;
    }
    /**
     * Convenience for calling `transaction_status_api`.
     */
    call(method, params) {
        return this.client.call('transaction_status_api', method, params);
    }
    /**
     * Returns the status of a given transaction id
     */
    findTransaction(transaction_id, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                transaction_id
            };
            if (expiration) {
                params.expiration = expiration;
            }
            return this.call('find_transaction', params);
        });
    }
}
exports.TransactionStatusAPI = TransactionStatusAPI;
