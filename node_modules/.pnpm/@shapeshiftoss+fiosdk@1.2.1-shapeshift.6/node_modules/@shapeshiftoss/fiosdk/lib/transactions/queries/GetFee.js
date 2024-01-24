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
exports.GetFee = void 0;
const constants_1 = require("../../utils/constants");
const Query_1 = require("./Query");
const validation_1 = require("../../utils/validation");
class GetFee extends Query_1.Query {
    constructor(endPoint, fioAddress = '') {
        super();
        this.ENDPOINT = 'chain/get_fee';
        this.endPoint = endPoint;
        this.fioAddress = fioAddress;
        if (constants_1.Constants.feeNoAddressOperation.findIndex((element) => element === endPoint) > -1 && fioAddress.length > 0) {
            throw new Error('End point ' + endPoint + ' should not have any fio address, when requesting fee');
        }
        if (fioAddress) {
            this.validationData = { fioAddress };
            this.validationRules = validation_1.validationRules.getFee;
        }
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { end_point: this.endPoint, fio_address: this.fioAddress || null };
            return data;
        });
    }
}
exports.GetFee = GetFee;
