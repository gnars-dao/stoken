declare const TAG = " | kava-tx-builder | ";
declare const cosmosjs: any;
declare const log: any;
/**********************************
 // Lib
 //**********************************/
declare let sign_transaction: (to: string, from: string, amount: number, memo: string, seed: string) => Promise<any>;
