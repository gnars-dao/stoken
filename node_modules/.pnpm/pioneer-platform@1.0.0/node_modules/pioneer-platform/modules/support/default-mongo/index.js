
/*
    Mongo
 */

let TAG = ' | monk | '
const monk = require('monk')

let connection

if(!process.env['MONGO_CONNECTION']) {
    console.log("Looking for mongo on: 127.0.0.1:27017/pioneer")
    process.env.MONGO_CONNECTION = "127.0.0.1:27017/pioneer"
}

try{
    connection	= monk(process.env['MONGO_CONNECTION'])
}catch(e){
    console.error("error: ",e)
}

module.exports = exports = connection
