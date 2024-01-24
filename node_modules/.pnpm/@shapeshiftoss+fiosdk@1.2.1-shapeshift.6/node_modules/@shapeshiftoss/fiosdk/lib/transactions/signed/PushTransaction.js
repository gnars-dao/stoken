"use strict";
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
exports.PushTransaction = void 0;
const SignedTransaction_1 = require("./SignedTransaction");
const constants_1 = require("../../utils/constants");
class PushTransaction extends SignedTransaction_1.SignedTransaction {
    constructor(action, account, data) {
        super();
        this.ENDPOINT = 'chain/push_transaction';
        this.ACTION = '';
        this.ACCOUNT = constants_1.Constants.defaultAccount;
        this.ACTION = action;
        if (account)
            this.ACCOUNT = account;
        this.data = data;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            let actor = this.getActor();
            let data = Object.assign(Object.assign({}, this.data), { actor: actor });
            return data;
        });
    }
}
exports.PushTransaction = PushTransaction;
