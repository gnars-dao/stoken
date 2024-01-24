"use strict";
/*
       Global Token info

 */
//get all token symbols
var fs = require('fs');
var coins = require('@pioneer-platform/pioneer-eth-token-raw');
var tokenListABI = Object.keys(coins);
var log = require("@pioneer-platform/loggerdog")();
var ABI_GLOBAL = {};
var tokenList = [];
var contracts = [];
var tokenMap = {};
for (var i = 0; i < tokenListABI.length; i++) {
    var token = tokenListABI[i];
    tokenList.push(token);
    ABI_GLOBAL[token] = coins[token];
    tokenMap[ABI_GLOBAL[token].metaData.contractAddress.toLowerCase()] = token;
    contracts.push(ABI_GLOBAL[token].metaData.contractAddress.toLowerCase());
}
// log.debug("tokenList: ",tokenList)
// log.debug("tokenList: ",ABI_GLOBAL)
// log.debug("contracts: ",contracts)
// log.debug("tokenMap: ",tokenMap)
module.exports = {
    ABI: ABI_GLOBAL,
    tokens: tokenList,
    contracts: contracts,
    tokenMap: tokenMap
};
