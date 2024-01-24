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
exports.GetObtData = void 0;
const Query_1 = require("./Query");
class GetObtData extends Query_1.Query {
    constructor(fioPublicKey, limit = 0, offset = 0, tokenCode = '') {
        super();
        this.ENDPOINT = 'chain/get_obt_data';
        this.isEncrypted = true;
        this.fio_public_key = fioPublicKey;
        this.limit = limit;
        this.offset = offset;
        this.tokenCode = tokenCode;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return { fio_public_key: this.fio_public_key, limit: this.limit || null, offset: this.offset || null };
        });
    }
    decrypt(result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (result.obt_data_records && result.obt_data_records.length > 0) {
                const obtDataRecords = [];
                for (const obtDataRecord of result.obt_data_records) {
                    let content;
                    const contentType = 'record_obt_data_content';
                    try {
                        if (obtDataRecord.payer_fio_public_key === this.publicKey) {
                            content = yield this.getUnCipherContent(contentType, obtDataRecord.content, this.privateKey, obtDataRecord.payee_fio_public_key);
                        }
                        else {
                            content = yield this.getUnCipherContent(contentType, obtDataRecord.content, this.privateKey, obtDataRecord.payer_fio_public_key);
                        }
                    }
                    catch (e) {
                        // UnCipherContent error
                        // console.log(e)
                    }
                    if (content) {
                        if (this.tokenCode && content.token_code && content.token_code !== this.tokenCode)
                            return;
                        obtDataRecord.content = content;
                    }
                    obtDataRecords.push(obtDataRecord);
                }
                return { obt_data_records: obtDataRecords, more: result.more };
            }
            else {
                return result;
            }
        });
    }
}
exports.GetObtData = GetObtData;
