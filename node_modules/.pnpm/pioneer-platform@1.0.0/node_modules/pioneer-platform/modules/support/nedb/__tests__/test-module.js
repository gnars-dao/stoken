
/*
    Load db from local

    get index of tx's

    get index of pubkeys

    //get remote account index numbers

    //if diff

    //request diff

    //store in db

    //mark synced
 */

let nedb = require("../lib/index.js")


let run_test = async function(){
    try{
        //
        let dbs = await nedb.init()

        //count
        console.log(dbs)

        let countTxs = await dbs.txs.count()
        let countPubkeys = await dbs.pubkeys.count()
        console.log("countTxs: ",countTxs)
        console.log("countPubkeys: ",countPubkeys)

        //insert

        //delete

    }catch(e){
        console.error(e)
    }
}
run_test()


//
// let schema = {
//  COLLECTIONS:[
//      'cosmos-transactions',
//  ],
//  INDEXES:{
//      'cosmos-transfers':'txid',
//  }
// }
//
//  nedb.init(schema,'/home/highlander/.fox')
//
// let tx = {"type":"transfer","events":[{"account":"citadel","address":"cosmos1qjwdyn56ecagk8rjf7crrzwcyz6775cj89njn3","type":"send","amount":-10000}],"xpub":"xpub6DW8dyzip1P1HK1ZRQJwYzLFJrd11eX2nMgaXQtWJoP2mwUpzUMfzR9cUZsvPELJhyuPyL8Addfo9AhpQMqp4CrFynuqAf3yRcbEA1AggZe","date":1570992791565,"network":"ATOM","height":1776686,"txid":"BF375079D902D5EE5F64D024796039E3B7DF57DE642D30D9FD37D0A54774AEE5","status":"confirmed","event":"transaction","_id":"IkzRbACklilsuM5Y"}
//
//  //save tx
//
//  let dbs = nedb.db()
//  console.log(dbs)
//
//  let txDB = dbs['cosmos-transactions']
//  console.log(txDB)
//
//
//  txDB.insert(tx)
//      .then(function(resp){
//          console.log(resp)
//          txDB.find()
//              .then(function(resp){
//                 console.log(resp)
//             })
//      })
//
//  //read tx
//
// // datastore['cosmos-transactions'].find()
// //     .then(function(resp){
// //     console.log(resp)
// //     })


