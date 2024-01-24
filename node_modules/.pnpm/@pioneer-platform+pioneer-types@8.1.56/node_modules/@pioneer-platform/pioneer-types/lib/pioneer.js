"use strict";
/*
    Pioneer Types

 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HDWALLETS = void 0;
var HDWALLETS;
(function (HDWALLETS) {
    HDWALLETS[HDWALLETS["pioneer"] = 0] = "pioneer";
    HDWALLETS[HDWALLETS["trezor"] = 1] = "trezor";
    HDWALLETS[HDWALLETS["keepkey"] = 2] = "keepkey";
    HDWALLETS[HDWALLETS["ledger"] = 3] = "ledger";
    HDWALLETS[HDWALLETS["metamask"] = 4] = "metamask";
})(HDWALLETS || (exports.HDWALLETS = HDWALLETS = {}));
