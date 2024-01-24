"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLY = void 0;
exports.POLY = {
    metaData: {
        contractAddress: "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec",
        BASE: 1000000000000000000,
        accountsList: "POLY_accounts",
        from: "from",
        to: "to",
        value: "value"
    },
    ABI: [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "transferFrom",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }],
            "name": "decreaseApproval",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimalFactor",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "balance", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "transfer",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }],
            "name": "increaseApproval",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }],
            "name": "allowance",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{ "name": "_polyDistributionContractAddress", "type": "address" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "from", "type": "address" }, {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                }, { "indexed": false, "name": "value", "type": "uint256" }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                }, { "indexed": false, "name": "value", "type": "uint256" }],
            "name": "Approval",
            "type": "event"
        }]
};
