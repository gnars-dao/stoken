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
exports.GetAddresses = void 0;
const Query_1 = require("./Query");
class GetAddresses extends Query_1.Query {
    constructor(fioPublicKey, limit = null, offset = null) {
        super();
        this.ENDPOINT = 'chain/get_fio_addresses';
        this.fioPublicKey = fioPublicKey;
        this.limit = limit;
        this.offset = offset;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return { fio_public_key: this.fioPublicKey, limit: this.limit || null, offset: this.offset || null };
        });
    }
}
exports.GetAddresses = GetAddresses;
