/*
	Default redis tool
				- Highlander

 */

const TAG = " | REDIS-CONNECTION-MODULE | "
//const log = require("@pioneer-platform/loggerdog")()

//mock in tests
let Redis
if(process.env.NODE_ENV === 'test'){
	Redis = require('ioredis-mock');
}else{
	Redis = require("ioredis");
}


let redis
let redisQueue
let publisher
let subscriber


if(!process.env.REDIS_CONNECTION) {
	console.log("Looking for redis on: redis://127.0.0.1:6379")
	process.env.REDIS_CONNECTION = "redis://127.0.0.1:6379"
}

redis = new Redis(process.env.REDIS_CONNECTION)
publisher = new Redis(process.env.REDIS_CONNECTION)
subscriber = new Redis(process.env.REDIS_CONNECTION)
redisQueue = new Redis(process.env.REDIS_CONNECTION)

module.exports = {redis, publisher, subscriber, redisQueue}
