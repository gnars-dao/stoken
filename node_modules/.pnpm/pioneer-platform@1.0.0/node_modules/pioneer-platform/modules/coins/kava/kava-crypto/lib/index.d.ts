declare const bip39: any;
declare const bech32: any;
declare const sha256: any;
declare const ripemd160: any;
declare const CryptoJS: any;
declare const HDKey: any;
declare const hdPath = "m/44'/459'/0'/0/0";
declare let bitcoin: any;
declare const log: any;
/**********************************
 // Module
 //**********************************/
declare function createAddress(publicKey: string, prefix: string): any;
declare function bech32ify(address: string, prefix: string): any;
/**********************************
 // Lib
 //**********************************/
declare function standardRandomBytesFunc(size: any): any;
