"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNC = void 0;
exports.KNC = {
    metaData: {
        contractAddress: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
        BASE: 1000000000000000000,
        accountsList: "KNC_accounts",
        from: "_from",
        to: "_to",
        value: "_value"
    },
    ABI: [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "approve",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "transferFrom",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "version",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "balance", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "transfer",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }],
            "name": "allowance",
            "outputs": [{ "name": "remaining", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, { "inputs": [], "payable": false, "type": "constructor" }, {
            "payable": false,
            "type": "fallback"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                }, { "indexed": false, "name": "_value", "type": "uint256" }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, {
                    "indexed": true,
                    "name": "_spender",
                    "type": "address"
                }, { "indexed": false, "name": "_value", "type": "uint256" }],
            "name": "Approval",
            "type": "event"
        }]
};
