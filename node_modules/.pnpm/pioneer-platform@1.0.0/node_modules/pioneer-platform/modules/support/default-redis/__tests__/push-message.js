
const {redis,redisQueue,publisher} = require("../index")

let message = {
    queryKey:'adsfgdfgds3sdfsd'
}

publisher.publish('pairings',JSON.stringify(message))
