/*


	Mongo



 */

require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})

console.log(process.env['MONGO_CONNECTION'])
let connection = require('../index')

//let usersDB = connection.get('users')
let txsDB = connection.get('transactions')
let conduit = connection.get('conduit')
let usersDB = connection.get('users')
let pubkeysDB = connection.get('pubkeys')


//usersDB.createIndex({id: 1}, {unique: true})
//txsDB.createIndex({txid: 1}, {unique: true})


/*
read
 */

//remove duplicates

// console.log(conduit)

// console.log(txsDB)

let run_test = async function(){
    try{
        console.log("test")
        // let resp = await conduit.findOne()
        // console.log("resp: ",resp)

        // let resp = await txsDB.findOne()
        // console.log(resp)

        // let resp = await usersDB.findOne()
        // console.log(resp)

        //push second wallet
        //make sure eunique
        // let respPush = await usersDB.update({},{ $addToSet: { "wallets": "0xc3affff54122658b89c31183cec4f15514f34624.wallet.json" } })
        // console.log(respPush)


        let walletId = '0x33b35c665496ba8e71b22373843376740401f106.wallet.json'
        let walletId2 = '0xc3affff54122658b89c31183cec4f15514f34624.wallet.json'

        //get pubkeys by user
        let resp = await pubkeysDB.find({tags:{$all:[walletId]}})
        for(let i = 0; i < resp.length; i++){
            let pubkey = resp[i]
            console.log("pubkey: ",pubkey.network)
        }

        // let resp2 = await pubkeysDB.find({tags:{$all:[walletId2]}})
        // console.log(resp2.length)
        // for(let i = 0; i < resp2.length; i++){
        //     let pubkey = resp2[i]
        //     console.log("pubkey: ",pubkey.network)
        // }


        //get pubkeys by wallet

        //get pubkeys by user by network

        //get pubkeys by wallet by network


        //
        // let tx = { asset: 'ETH',
        //     txid:
        //         '0x1f0cdd506bdb47394a5df38f5bb65e22f1638bbd3b19a8d14a02dc26c751f9e5',
        //     addresses: [Array],
        //     events: [Array],
        //     type: 'transfer',
        //     time: '1508444910',
        //     height: 4391505,
        //     accounts: ['testaccount'] }
        //
        //
        // let resp = await txsDB.findOne({txid:tx.txid})
        // console.log("resp: ",resp)
        //
        // // let updateSuccess = txsDB.update({txid:entry.txid},{ $addToSet: { accounts: "testaccount" }})
        // // console.log("updateSuccess: ",resp)
        //
        // let saveActions = []
        //
        // saveActions.push({insertOne: tx})
        //
        // saveActions.push({updateOne: {
        //         "filter": {txid: tx.txid},
        //         "update": {$addToSet: { accounts: 'testAccount24' }}
        //     }})
        //
        // console.log("saveActions: ",saveActions)
        //
        // let result = await txsDB.bulkWrite(saveActions,{ordered:false})
        // console.log("result: ",result)


        // let query = {"$and":[{"asset":"ETH"},{"height":{"$gt":0}},{"accounts":"citadel-stage-1"}]}
        // let resp = await txsDB.find(query)
        // console.log("resp: ",resp)

        var duplicates = [];

        // let resp = await pubkeysDB.aggregate([
        //         {
        //             $unwind:{path:"$pubkey"},
        //         },
        //         {
        //             $group: {
        //                 _id: "$name",
        //                 nodes: {
        //                     $addToSet: "$nodes"
        //                 }
        //             },
        //         },
        //         {
        //             $project:{
        //                 _id:0,
        //                 name:"$_id.name",
        //                 nodes:1
        //             }
        //         },
        //         {
        //             $out:"collectionNameWithoutDuplicates"
        //         }
        //     ],
        //     {allowDiskUse: true}       // For faster processing if set is larger
        // )
        //
        // // console.log(resp)
        //
        // resp = resp.dups
        // console.log(resp)

        //{"asset":"ETH","txid":"0x00a0d8c2f70486cb16b13ba6eae3999c542c9720525e90851cf7b30c676d2fc9","addresses":["0x33b35c665496ba8e71b22373843376740401f106","0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"],"events":[{"type":"credit","address":"0x33b35c665496ba8e71b22373843376740401f106","amount":0.045,"asset":"ETH"},{"type":"debit","address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98","amount":-0.045,"asset":"ETH"}],"type":"transfer","time":"1502228587","height":4133732,"accounts":["highlander"]}

        // let resp = await pubkeysDB.aggregate([
        //         { $match: {
        //                 pubkey: { "$ne": '' }  // discard selection criteria
        //             }},
        //         { "$group": {
        //                 "_id": "$asin",
        //                 "doc": { "$first": "$$ROOT" }
        //             }},
        //         { "$replaceRoot": { "newRoot": "$doc" } },
        //         { "$out": "transactions" }
        //     ],
        //     {allowDiskUse: true}       // For faster processing if set is larger
        // )
        //
        // console.log(resp)
        //
        // let dups = resp.dups

        // let resp = await txsDB.distinct('txid',{limit:1000})
        // console.log(resp)


        // let dups = [
        //     '5ef2c421b044dc0019ced4eb',
        //     '5ef2c3e5836af60019d80660',
        // ]
        //
        // for(let i = 0; i < dups.length; i++){
        //     let dup = dups[i]
        //     console.log(dup)
        //
        //     // let result = await txsDB.remove({_id: ObjectId(dup)}, { justOne: true })
        //     // console.log(result)
        // }
        //
        // let result = await txsDB.distinct('txid')
        // console.log(result)

        //Remove all duplicates in one go
        // db.collectionName.remove({_id:{$in:duplicates}})


        // txsDB.distinct("pubkey").forEach((num)=>{
        //     var i = 0;
        //     db.collection.find({key: num}).forEach((doc)=>{
        //         if (i) console.log(num)
        //         //if (i)   db.collection.remove({key: num}, { justOne: true })
        //         i++
        //     })
        // });

    }catch(e){
        console.error(e)
    }
}
run_test()



/*

var duplicates = [];

db.collectionName.aggregate([
  { $match: {
    name: { "$ne": '' }  // discard selection criteria
  }},
  { $group: {
    _id: { name: "$name"}, // can be grouped on multiple properties
    dups: { "$addToSet": "$_id" },
    count: { "$sum": 1 }
  }},
  { $match: {
    count: { "$gt": 1 }    // Duplicates considered as count greater than one
  }}
],
{allowDiskUse: true}       // For faster processing if set is larger
)               // You can display result until this and check duplicates
.forEach(function(doc) {
    doc.dups.shift();      // First element skipped for deleting
    doc.dups.forEach( function(dupId){
        duplicates.push(dupId);   // Getting all duplicate ids
        }
    )
})

 */


//
//
// txsDB.find()
//     .then(function(resp){
//         console.log(resp)
//     })


// txsDB.find({}, {txid:1}).sort({_id:1}).forEach(function(doc){
//     console.log(doc)
//     //txsDB.remove({_id:{$gt:doc._id}, txid:doc.asin});
// })

//let block = 0
// let query = {$and:[{height:{ $gt: block }},{asset:"ATOM"},{accounts:"citadel"}]}
//let query = {}
//let txs = await txsDB.find()
//let txs = await txsDB.find({height: { $gt: block }})
//let txs = await txsDB.find()


// txsDB.serverStatus()
// 	.then(function(resp){
// 		console.log("resp: ",resp)
// 	})

// let TXID_SEARCH = "B8F35785644FB0B11A20C25468EC71F465F710F6EC6F8F86E98ED356A1ABEF89"
//
// txsDB.find(query)
//     .then(function(resp){
//         console.log("resp: ",resp.length)
//
//         for(let i = 0; i < resp.length; i++){
//             let entry = resp[i]
//             if(entry.txid === TXID_SEARCH){
//                 console.log("WINNING! ",entry)
//             }
//             //
//         }
//     })

// txsDB.insert({txid:"foo"})
// 	.then(function(resp){
// 		console.log("resp: ",resp)
// 	})
// txsDB.find({txid:"255F467297E3B6B5ACEA89228D7AF489A31F1FF01D092E0165F38257D7AE9642"})
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })


/*
write
 */
// txsDB.remove({txid:"255F467297E3B6B5ACEA89228D7AF489A31F1FF01D092E0165F38257D7AE9642"})
// 	.then(function(resp){
// 		console.log("resp: ",resp)
// 	})
