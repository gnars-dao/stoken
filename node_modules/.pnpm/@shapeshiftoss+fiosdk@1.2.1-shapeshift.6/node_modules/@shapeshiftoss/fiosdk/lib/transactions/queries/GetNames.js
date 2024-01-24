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
exports.GetNames = void 0;
const Query_1 = require("./Query");
class GetNames extends Query_1.Query {
    constructor(fioPublicKey) {
        super();
        this.ENDPOINT = 'chain/get_fio_names';
        this.fioPublicKey = fioPublicKey;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return { fio_public_key: this.fioPublicKey };
        });
    }
}
exports.GetNames = GetNames;
