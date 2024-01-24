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
exports.RenewFioAddress = void 0;
const SignedTransaction_1 = require("./SignedTransaction");
const constants_1 = require("../../utils/constants");
const validation_1 = require("../../utils/validation");
class RenewFioAddress extends SignedTransaction_1.SignedTransaction {
    constructor(fioAddress, maxFee, technologyProviderId = '') {
        super();
        this.ENDPOINT = 'chain/renew_fio_address';
        this.ACTION = 'renewaddress';
        this.ACCOUNT = constants_1.Constants.defaultAccount;
        this.fioAddress = fioAddress;
        this.maxFee = maxFee;
        this.technologyProviderId = technologyProviderId;
        this.validationData = { fioAddress: fioAddress, tpid: technologyProviderId || null };
        this.validationRules = validation_1.validationRules.renewFioAddress;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            let actor = this.getActor();
            let data = {
                fio_address: this.fioAddress,
                max_fee: this.maxFee,
                tpid: this.technologyProviderId,
                actor: actor
            };
            return data;
        });
    }
}
exports.RenewFioAddress = RenewFioAddress;
