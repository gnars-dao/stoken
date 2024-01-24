declare const TAG = " | terra-tx-builder | ";
declare const EnigmaUtils: any, SigningCosmWasmClient: any, Secp256k1Pen: any, pubkeyToAddress: any, encodeSecp256k1Pubkey: any;
declare const log: any;
/**********************************
 // Lib
 //**********************************/
declare let sign_transaction: (to: string, from: string, amount: number, memo: string, seed: string) => Promise<any>;
