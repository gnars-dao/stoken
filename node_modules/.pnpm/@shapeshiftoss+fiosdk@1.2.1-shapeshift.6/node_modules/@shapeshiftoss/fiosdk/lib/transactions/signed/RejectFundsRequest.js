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
exports.RejectFundsRequest = void 0;
const SignedTransaction_1 = require("./SignedTransaction");
const validation_1 = require("../../utils/validation");
class RejectFundsRequest extends SignedTransaction_1.SignedTransaction {
    constructor(fioreqid, maxFee, technologyProviderId = '') {
        super();
        this.ENDPOINT = 'chain/reject_funds_request';
        this.ACTION = 'rejectfndreq';
        this.ACCOUNT = 'fio.reqobt';
        this.fioreqid = fioreqid;
        this.maxFee = maxFee;
        this.technologyProviderId = technologyProviderId;
        this.validationData = { tpid: technologyProviderId || null };
        this.validationRules = validation_1.validationRules.rejectFunds;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            let actor = this.getActor();
            let data = {
                fio_request_id: this.fioreqid,
                max_fee: this.maxFee,
                tpid: this.technologyProviderId,
                actor: actor
            };
            return data;
        });
    }
}
exports.RejectFundsRequest = RejectFundsRequest;
