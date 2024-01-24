/*

    Pioneer REST endpoints



 */

let TAG = ' | API | '

const pjson = require('../../package.json');
const log = require('@pioneer-platform/loggerdog')()
const {subscriber, publisher, redis, redisQueue} = require('@pioneer-platform/default-redis')
let connection  = require("@pioneer-platform/default-mongo")
let queue = require("@pioneer-platform/redis-queue")
const short = require('short-uuid');

let usersDB = connection.get('users')
let pubkeysDB = connection.get('pubkeys')
let txsDB = connection.get('transactions')
let utxosDB = connection.get('utxo')
let invocationsDB = connection.get('invocations')

invocationsDB.createIndex({invocationId: 1}, {unique: true})
usersDB.createIndex({id: 1}, {unique: true})
txsDB.createIndex({txid: 1}, {unique: true})
utxosDB.createIndex({txid: 1}, {unique: true})

//globals
let BLOCKING_TIMEOUT_INVOCATION = process.env['BLOCKING_TIMEOUT_INVOCATION'] || 60

//rest-ts
import { Body, Controller, Get, Post, Route, Tags, SuccessResponse, Query, Request, Response, Header } from 'tsoa';
import * as express from 'express';

//TODO enum for supported types
//TODO typed payloads
interface Invocation {
    type:string
    sender:string
    recipient:string
    asset:string
    payload:any
}



//types
interface Error{
    success:boolean
    tag:string
    e:any
}

export class ApiError extends Error {
    private statusCode: number;
    constructor(name: string, statusCode: number, message?: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

//route
@Tags('Invocation (Payment Requests) Endpoint ')

/**
 *  Test
 */

@Route('')
export class pioneerInvocationController extends Controller {

    /**
     *  Wallet events
     *      invocations
     *      * Payment requests (pay x address)
     *      * sign contract action
     *      * Request to install app
     *
     *
     */

    @Post('/invocation')
    public async invocation(@Header('Authorization') authorization: string, @Body() body: any): Promise<any> {
        let tag = TAG + " | invocation | "
        try{
            let output:any = {}
            log.info(tag,"body: ",body)
            //verify auth

            //verify user settings

            //is user online?
            let onlineUsers = await redis.smembers("online")
            log.info(tag,"onlineUsers: ",onlineUsers)
            log.info(tag,"username: ",body.username)

            //else
            //does user exist?
                //does user exist on fio?

            // invocationId
            let invocationId = "pioneer:invocation:v0.01:"+body.invocation.coin+":"+short.generate()

            //origin
            //TODO signed by?
            body.invocationId = invocationId
            let entry = {
                invocationId,
                invocation:body
            }

            //TODO sequence
            //only accept 1 per username

            //save to mongo
            let mongoSave = await invocationsDB.insert(entry)
            log.info(tag,"mongoSave: ",mongoSave)
            if(onlineUsers.indexOf(body.username) >= 0){
                body.invocationId = invocationId
                //auth (app needs to verify!)
                body.auth = authorization
                //send
                publisher.publish("invocations",JSON.stringify(body))

                //block till confirmation
                log.info(tag," STARTING BLOCKING INVOKE id: ",invocationId)
                let timeStart = new Date().getTime()

                let txid = await redisQueue.blpop(invocationId,BLOCKING_TIMEOUT_INVOCATION)
                let timeEnd = new Date().getTime()
                log.info(tag," END BLOCKING INVOKE T: ",(timeEnd - timeStart)/1000)

                //if
                if(!txid[1]) throw Error("Failed to broadcast! timeout!")
                //TODO if timeout return invocationId
                output.success = true
                output.txid = txid[1]
                output.ttr = (timeEnd - timeStart)/1000
                if(body.invocation.noBroadcast) output.broadcast = false
                return output
            } else {
                output.invocationId = invocationId
                output.msg = "User is offline! username:"+body.invocation.username
                return output
            }

        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }
}
