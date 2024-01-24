require("dotenv").config({path:'../../../.env'})


//process.env['DEFAULT_LOG_LEVEL'] = 'INFO'
let log = require("../lib/index.js")()

process.env['STRUCTURED_LOGGING'] = true

console.log("structured logging flag: ",process.env['STRUCTURED_LOGGING'])
console.log("DATADOG_API_KEY flag: ",process.env['DATADOG_API_KEY'])
console.log("redis loggin: ",process.env['REDIS_LOGGING'])

log.info(" | test | ","foo","bar")

try{
    throw Error("102: you suck bro! ")
}catch(e){
    log.error(e)
}

//should log
log.debug("DEBUG log IN DEBUG MODE")
