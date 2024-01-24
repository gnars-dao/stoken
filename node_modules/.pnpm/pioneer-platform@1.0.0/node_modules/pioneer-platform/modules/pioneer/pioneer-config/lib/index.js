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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logLevel = exports.updateConfig = exports.setConfig = exports.getConfig = exports.getWalletPublic = exports.getWallet = exports.getWalletsPublic = exports.getWallets = exports.getKeepkeyWatch = exports.checkConfigs = exports.backupWallet = exports.deleteWallet = exports.deleteConfig = exports.initWallet = exports.getApps = exports.initApps = exports.innitConfig = exports.watchOnlyDir = exports.logDir = exports.backupDir = exports.appDir = exports.backtestDir = exports.modelDir = exports.pioneerPath = exports.walletDataDir = exports.seedDir = exports.keepkeyWatchPath = exports.configPath = exports.pioneerConfig = void 0;
var path_1 = __importDefault(require("path"));
var TAG = " | Config | ";
var fs = require("fs-extra");
var homedir = require("os").homedir();
var mkdirp = require("mkdirp");
// @ts-ignore
var uuid_1 = require("uuid");
exports.pioneerConfig = path_1.default.join(homedir, ".pioneer", "pioneer.json");
exports.configPath = path_1.default.join(homedir, ".pioneer", "pioneer.json");
exports.keepkeyWatchPath = path_1.default.join(homedir, ".pioneer", "wallet_data/keepkey.watch.json");
//wallets
exports.seedDir = path_1.default.join(homedir, ".pioneer", "wallets");
//wallet_data Watch dir
exports.walletDataDir = path_1.default.join(homedir, ".pioneer", "wallet_data");
exports.pioneerPath = path_1.default.join(homedir, ".pioneer");
exports.modelDir = path_1.default.join(homedir, ".pioneer", "models");
exports.backtestDir = path_1.default.join(homedir, ".pioneer", "backtest");
exports.appDir = path_1.default.join(homedir, '.pioneer', 'apps');
exports.backupDir = path_1.default.join(homedir, '.pioneer', 'backups');
exports.logDir = path_1.default.join(exports.pioneerPath, "log");
exports.watchOnlyDir = path_1.default.join(exports.pioneerPath, "watch");
function innitConfig(languageSelected) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, isCreated, isCreated2, isCreated3, isCreated4, queryKey, config, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | importConfig | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    output = {};
                    return [4 /*yield*/, mkdirp(exports.pioneerPath)];
                case 2:
                    isCreated = _a.sent();
                    return [4 /*yield*/, mkdirp(exports.logDir)];
                case 3:
                    isCreated2 = _a.sent();
                    return [4 /*yield*/, mkdirp(exports.seedDir)];
                case 4:
                    isCreated3 = _a.sent();
                    return [4 /*yield*/, mkdirp(exports.walletDataDir)];
                case 5:
                    isCreated4 = _a.sent();
                    queryKey = uuid_1.v4();
                    config = {};
                    config.locale = "english";
                    config.localeSelected = true;
                    config.queryKey = queryKey;
                    //config.version = finder.next().value.version;
                    config.isCli = true;
                    fs.writeFileSync(exports.pioneerConfig, JSON.stringify(config));
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.error(tag, "e: ", e_1);
                    return [2 /*return*/, {}];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.innitConfig = innitConfig;
// innit Apps
function initApps() {
    return __awaiter(this, void 0, void 0, function () {
        var tag, apps, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + ' | initApps | ';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    mkdirp.sync(exports.appDir);
                    console.log('appDir: ', exports.appDir);
                    return [4 /*yield*/, fs.readdir(exports.appDir)];
                case 2:
                    apps = _a.sent();
                    return [2 /*return*/, apps];
                case 3:
                    e_2 = _a.sent();
                    console.error(tag, 'e: ', e_2);
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.initApps = initApps;
// getApps
function getApps() {
    return __awaiter(this, void 0, void 0, function () {
        var tag, apps, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + ' | getApps | ';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.readdir(exports.appDir)];
                case 2:
                    apps = _a.sent();
                    return [2 /*return*/, apps];
                case 3:
                    e_3 = _a.sent();
                    console.error(tag, 'e: ', e_3);
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getApps = getApps;
//innit Wallet
function initWallet(wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, isCreated, isCreated2, walletWrite, filename, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | initWallet | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!wallet.filename)
                        throw Error("102: filename required for new wallet!");
                    return [4 /*yield*/, mkdirp(exports.seedDir)];
                case 2:
                    isCreated = _a.sent();
                    return [4 /*yield*/, mkdirp(exports.walletDataDir)];
                case 3:
                    isCreated2 = _a.sent();
                    walletWrite = {};
                    if (wallet.TYPE === 'citadel') {
                        if (!wallet.masterAddress)
                            throw Error("102: masterAddress required for citadel wallets!");
                        if (!wallet.filename)
                            wallet.filename = wallet.masterAddress + ".wallet.json";
                        //if passwordless
                        if (wallet.temp)
                            walletWrite.password = wallet.temp;
                        walletWrite.username = wallet.username;
                        walletWrite.hash = wallet.hash;
                        walletWrite.version = 1;
                        walletWrite.type = "seedwords";
                        walletWrite.vault = wallet.seed_encrypted;
                    }
                    else if (wallet.TYPE === 'keepkey') {
                        if (!wallet.deviceId)
                            throw Error("102: deviceId required for keepkey wallets!");
                        if (!wallet.filename)
                            wallet.filename = wallet.deviceId + ".wallet.json";
                        walletWrite = wallet;
                        walletWrite.username = wallet.deviceId;
                        walletWrite.deviceId = wallet.deviceId;
                    }
                    else {
                        throw Error("wallet format not supported!" + wallet.TYPE);
                    }
                    walletWrite.created = new Date().getTime();
                    filename = wallet.filename;
                    return [4 /*yield*/, fs.writeFile(exports.seedDir + "/" + filename, JSON.stringify(walletWrite))];
                case 4:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 5:
                    e_4 = _a.sent();
                    console.error(tag, "e: ", e_4);
                    throw e_4;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.initWallet = initWallet;
function deleteConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            try {
                result = fs.unlink(exports.configPath);
                return [2 /*return*/, result];
            }
            catch (e) {
                return [2 /*return*/, {}];
            }
            return [2 /*return*/];
        });
    });
}
exports.deleteConfig = deleteConfig;
function deleteWallet(walletName) {
    return __awaiter(this, void 0, void 0, function () {
        var backups, currentWallet, isBackedUp, i, backupName, walletContent, result, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readdir(exports.backupDir)
                        //get current wallet name
                    ];
                case 1:
                    backups = _a.sent();
                    currentWallet = getWallet(exports.seedDir + "/" + walletName);
                    isBackedUp = false;
                    for (i = 0; i < backups.length; i++) {
                        backupName = backups[i];
                        walletContent = getWallet(exports.backupDir + "/" + backupName);
                        //if id === currentWallet.id
                        //TODO stronger verify?
                        //if(walletContent.walletContent)
                    }
                    result = fs.unlink(exports.seedDir + "/" + walletName);
                    return [2 /*return*/, result];
                case 2:
                    e_5 = _a.sent();
                    return [2 /*return*/, {}];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteWallet = deleteWallet;
function backupWallet(walletName, path) {
    return __awaiter(this, void 0, void 0, function () {
        var isCreated, walletBuff, walletString, wallet, backupName, filePath, result, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mkdirp(exports.backupDir)];
                case 1:
                    isCreated = _a.sent();
                    if (!path)
                        path = exports.seedDir + "/" + walletName;
                    walletBuff = fs.readFileSync(path);
                    walletString = walletBuff.toString();
                    wallet = JSON.parse(walletString);
                    backupName = new Date().getTime();
                    filePath = exports.backupDir + "/" + backupName + ".wallet.json";
                    result = fs.writeFileSync(filePath, JSON.stringify(wallet));
                    return [2 /*return*/, result];
                case 2:
                    e_6 = _a.sent();
                    return [2 /*return*/, {}];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.backupWallet = backupWallet;
//check
function checkConfigs(walletName) {
    var output = {};
    output.isConfigured = false;
    output.isWallet = false;
    output.isRegistered = false;
    var fileFound = fs.existsSync(exports.pioneerConfig) ? true : false;
    if (fileFound) {
        output.config = JSON.parse(fs.readFileSync(exports.configPath));
        if (output.config.version)
            output.isConfigured = true;
        if (output.config.username)
            output.isRegistered = true;
    }
    if (output.config && output.config.version)
        output.isConfigured = true;
    //wallet found?
    var walletFound = fs.existsSync(exports.seedDir + "/" + walletName) ? true : false;
    if (walletFound) {
        output.isWallet = true;
    }
    return output;
}
exports.checkConfigs = checkConfigs;
function getKeepkeyWatch(path) {
    try {
        if (!path)
            path = exports.keepkeyWatchPath;
        var walletBuff = fs.readFileSync(path);
        var walletString = walletBuff.toString();
        var wallet = JSON.parse(walletString);
        return wallet;
    }
    catch (e) {
        return {};
    }
}
exports.getKeepkeyWatch = getKeepkeyWatch;
function getWallets() {
    return __awaiter(this, void 0, void 0, function () {
        var wallets, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readdir(exports.seedDir)
                        //TODO filter names for .wallet.
                    ];
                case 1:
                    wallets = _a.sent();
                    //TODO filter names for .wallet.
                    return [2 /*return*/, wallets];
                case 2:
                    e_7 = _a.sent();
                    return [2 /*return*/, {}];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getWallets = getWallets;
function getWalletsPublic() {
    return __awaiter(this, void 0, void 0, function () {
        var walletsPublic, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readdir(exports.walletDataDir)];
                case 1:
                    walletsPublic = _a.sent();
                    return [2 /*return*/, walletsPublic];
                case 2:
                    e_8 = _a.sent();
                    return [2 /*return*/, {}];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getWalletsPublic = getWalletsPublic;
function getWallet(walletName) {
    try {
        if (!walletName)
            throw Error("walletName required");
        var walletBuff = fs.readFileSync(exports.seedDir + "/" + walletName);
        var walletString = walletBuff.toString();
        var wallet = JSON.parse(walletString);
        if (Object.keys(wallet).length === 0)
            wallet = null;
        return wallet;
    }
    catch (e) {
        return null;
    }
}
exports.getWallet = getWallet;
function getWalletPublic(walletName) {
    try {
        if (!walletName)
            throw Error("walletName required");
        var walletBuff = fs.readFileSync(exports.walletDataDir + "/" + walletName);
        var walletString = walletBuff.toString();
        var wallet = JSON.parse(walletString);
        if (Object.keys(wallet).length === 0)
            wallet = null;
        return wallet;
    }
    catch (e) {
        return null;
    }
}
exports.getWalletPublic = getWalletPublic;
function getConfig() {
    try {
        var output = JSON.parse(fs.readFileSync(exports.configPath));
        if (Object.keys(output).length === 0)
            output = null;
        return output;
    }
    catch (e) {
        return null;
    }
}
exports.getConfig = getConfig;
function setConfig(options) {
    return fs.writeFileSync(exports.configPath, JSON.stringify(options));
}
exports.setConfig = setConfig;
function updateConfig(options) {
    var options_ = getConfig();
    for (var key in options) {
        options_[key] = options[key];
    }
    setConfig(options_);
}
exports.updateConfig = updateConfig;
//export const logLevel = getConfig()['debug']?'debug':'info'
exports.logLevel = "debug";
