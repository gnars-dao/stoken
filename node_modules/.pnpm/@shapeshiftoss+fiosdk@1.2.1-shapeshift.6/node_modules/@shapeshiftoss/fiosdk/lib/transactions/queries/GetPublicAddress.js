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
exports.GetPublicAddress = void 0;
const Query_1 = require("./Query");
class GetPublicAddress extends Query_1.Query {
    constructor(fioAddress, chainCode, tokenCode) {
        super();
        this.ENDPOINT = 'chain/get_pub_address';
        this.fioAddress = fioAddress;
        this.chainCode = chainCode;
        this.tokenCode = tokenCode;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                fio_address: this.fioAddress,
                chain_code: this.chainCode,
                token_code: this.tokenCode
            };
        });
    }
}
exports.GetPublicAddress = GetPublicAddress;
