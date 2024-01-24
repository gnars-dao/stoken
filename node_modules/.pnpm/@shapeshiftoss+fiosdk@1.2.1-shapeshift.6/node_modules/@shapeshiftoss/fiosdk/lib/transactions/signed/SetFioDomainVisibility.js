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
exports.SetFioDomainVisibility = void 0;
const SignedTransaction_1 = require("./SignedTransaction");
const validation_1 = require("../../utils/validation");
const constants_1 = require("../../utils/constants");
class SetFioDomainVisibility extends SignedTransaction_1.SignedTransaction {
    constructor(fioDomain, isPublic, maxFee, technologyProviderId = '') {
        super();
        this.ENDPOINT = 'chain/set_fio_domain_public';
        this.ACTION = 'setdomainpub';
        this.ACCOUNT = constants_1.Constants.defaultAccount;
        this.fioDomain = fioDomain;
        this.isPublic = isPublic ? 1 : 0;
        this.maxFee = maxFee;
        this.technologyProviderId = technologyProviderId;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validationData = { fioDomain: this.fioDomain, tpid: this.technologyProviderId || null };
            this.validationRules = validation_1.validationRules.registerFioDomain;
            const actor = this.getActor();
            const data = {
                fio_domain: this.fioDomain,
                is_public: this.isPublic,
                max_fee: this.maxFee,
                tpid: this.technologyProviderId,
                actor,
            };
            return data;
        });
    }
}
exports.SetFioDomainVisibility = SetFioDomainVisibility;
