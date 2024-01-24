
require("dotenv").config()
require("dotenv").config({path:'../../../.env'})

const {redis,redisQueue} = require("../index")

/*
    Status persistence

 */


redis.info()
    .then(function(resp){
        console.log(resp)
    })

let run_test = async function(){
    try{

        let insert = [
            {blal:"pw1"},
            {blal1:"pw1"},
            {blal2:"pw12"},
            {blal3:"pw1asda"},
        ]


        //add to set
        for(let i = 0; i < insert.length; i++){
            await redis.hset("TEST_ACCOUNTS",i)
        }

        let cursor = 0

        let is_killing = true

        let timeStart = new Date().getTime()

        while(is_killing){
            //murder keys marked for death

            //get
            let batch = await redis.scan(cursor)
            console.log("batch: ",batch)

            let keys = batch[1]
            cursor = batch[0]
            console.log(tag,"cursor: ",cursor)

            //check keys
            await check_keys(keys)

            //wait
            await sleep(300)

            //
            if(cursor == 0){
                is_killing = false
            }

        }

        let timeFinish = new Date().getTime()

        let duration = timeFinish - timeStart
        log.info(tag,"duration: ",duration / 1000)

        //get all
        //scan


        //get highest

        //find missing

        //add missing

        //refify

    }catch(e){
        console.error(e)
    }
}
run_test()


// let setReady = async function(){
//     console.log("online!")
//     let result = await redis.setex("ATOM:tx:signer:status",5,'online')
//     console.log("result: ",result)
// }
// setInterval(setReady,5000)








// Use list?
// let run_test = async function(){
//     try{
//
//         let insert = [
//             2,
//             3,
//             5,
//             9
//         ]
//
//
//         //add to set
//         for(let i = 0; i < insert.length; i++){
//             await redis.lpush(SCORED_SET,i)
//         }
//
//         //get all
//         let all = await redis.lrange(SCORED_SET,5,-1)
//         console.log(all)
//
//         //get highest
//
//         //find missing
//
//         //add missing
//
//         //refify
//
//     }catch(e){
//         console.error(e)
//     }
// }
//
//
//
// run_test()

//protect list queue from multi





/*
    Scored Set tools

 */

//consistiancy
// let run_test = async function(){
//     try{
//
//         let SCORED_SET = "ATOM:blocks:scanned"
//
//         // let insert = [
//         //     {height:1,hash:"foohash2"},
//         //     {height:2,hash:"foohash3"},
//         //     {height:3,hash:"foohash4"},
//         //     {height:8,hash:"foohash5"},
//         //     {height:9,hash:"foohash6"},
//         //     {height:11,hash:"foohash7"},
//         // ]
//         //
//         //
//         // //add to set
//         // for(let i = 0; i < insert.length; i++){
//         //     let block = insert[i]
//         //     await redis.zadd(SCORED_SET,block.height,block.hash)
//         // }
//
//         //get all
//         let allValues = await redis.zrangebyscore(SCORED_SET,"-inf","+inf", "WITHSCORES")
//         console.log("allValues: ",allValues)
//
//         //get top highest scores
//         let highBlock = await redis.zrevrange(SCORED_SET,0,0, "WITHSCORES")
//         console.log("highBlock: ",highBlock)
//
//         //get top 3 high scores
//         let topBlocks = await redis.zrevrange(SCORED_SET,0,99999, "WITHSCORES")
//         console.log("topBlocks: ",topBlocks)
//
//
//         let blockHeights = []
//
//         for(let i = 0; i < topBlocks.length; i++){
//             i++
//             //
//             console.log(topBlocks[i])
//             blockHeights.push(parseInt(topBlocks[i]))
//         }
//
//
//
//         blockHeights.reverse()
//         console.log("blockHeights: ",blockHeights)
//
//         var mia = blockHeights.reduce(function(acc, cur, ind, arr) {
//             var diff = cur - arr[ind-1];
//             if (diff > 1) {
//                 var i = 1;
//                 while (i < diff) {
//                     acc.push(arr[ind-1]+i);
//                     i++;
//                 }
//             }
//             return acc;
//         }, []);
//
//         console.log(mia)
//
//
//
//     }catch(e){
//         console.error(e)
//     }
// }
//
//
//
// run_test()



//add block

// let block = {
//     height: 1913963,
//     block:'2E308252FE3CC516FDA8A1C55770E166CA10B452585111D6A24EB5257BBAA468'
// }

//add to set
//redis.zadd()

//get highest
// redis.zrangebyscore("ATOM:blocks:scanned","-inf","+inf", "WITHSCORES","LIMIT",0,1)
//     .then(function(resp){
//         console.log("lowest block: ",resp)
//     })

//get lowest
// redis.zrange("ATOM:blocks:scanned","1","1","WITHSCORES")
//     .then(function(resp){
//         console.log("lowest block: ",resp)
//     })

//get highest
// redis.zrange("ATOM:blocks:scanned","-1","-1","WITHSCORES")
//     .then(function(resp){
//         console.log("highest block: ",resp)
//     })


// redis.zcard("ATOM:blocks:scanned")
//     .then(function(resp){
//         console.log("total blocks scanned resp: ",resp)
//     })
//
// redis.zrevrangebyscore("ATOM:blocks:scanned","+inf","-inf")
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })

// redis.zrangebyscore("citadel:ETH:txs","10012297","10072297")
//     .then(function(resp){
//         console.log("lowest block: ",resp)
//     })

// redis.zrangebyscore("ATOM:blocks:scanned","1914093","(1914094", "WITHSCORES")
//     .then(function(resp){
//         console.log("highest block: ",resp)
//     })

//get at score
// redis.zrange("ATOM:blocks:scanned","1914093","1914094")
//     .then(function(resp){
//         console.log("highest block: ",resp)
//     })

//get x between y
// redis.zrange("ATOM:blocks:scanned","-1","-1","WITHSCORES")
//     .then(function(resp){
//         console.log("highest block: ",resp)
//     })


/*
write
 */

// redis.set("test","foo")
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })


/*
Read
 */

// redis.hgetall("test")
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })



// subscriber.subscribe("ATOM")
// subscriber.on('message', async function (channel, payloadS) {
//     let tag = TAG + ' | events | '
//     try {
//         let payload = JSON.parse(payloadS)
//         console.log("payload: ",payload)
//         //on block ingest block
//
//         //if tx
//         //push to broadcast queue
//
//     }catch(e){
//         log.error(tag,e)
//         throw e
//     }
// })
