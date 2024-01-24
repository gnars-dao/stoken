/*
            Logger-dog
        A data-dog logger system

    Set DEBUG log level
        SET ENV

            ***** NOTE *****

         DEFAULT_LOG_LEVEL=DEBUG

      ******************************

    Notes:
       Defaults to a basic logger if no ENV found

       Publish to datadog if DATADOG_API_KEY found

       Publish to redis if REDIS_CONNECTION found



    *** PRODUCTION NOTES ****

    STRUCTURED_LOGGING=true

    *************************

        Structured logging guarantees logs do not have line breaks in datadog intake

    Turn on Datadog logs:
        * DATADOG_REST_INTAKE = true
        * DATADOG_API_KEY = "key**"

    Note:
    TODO
        Log batching ?

 */

let dog = require("./modules/datadog")
const clc = require('cli-color')

const LOG_LEVELS:any = {
    EMERG: { val: 0, label: 'EMERG', color: clc.magentaBright },
    ALERT: { val: 1, label: 'ALERT', color: clc.magentaBright },
    CRIT: { val:  2, label: 'CRIT', color: clc.redBright },
    ERROR: { val: 3, label: 'ERROR', color: clc.redBright },
    WARN: { val:  4, label: 'WARN', color: clc.xterm(208) }, // orange
    NOTICE: { val: 5, label: 'NOTICE', color: clc.yellowBright },
    VERBOSE: { val: 6, label: 'VERBOSE', color: clc.cyanBright },
    INFO: { val: 6, label: 'INFO', color: clc.cyanBright },
    DEBUG: { val: 7, label: 'DEBUG', color: clc.greenBright },
    DEBUGV: { val: 8, label: 'DEBUG', color: clc.greenBright },
    DEBUGVV: { val: 9, label: 'DEBUG', color: clc.greenBright }
}

const DEFAULT_LOG_LEVEL = process.env['DEFAULT_LOG_LEVEL'] || 'INFO'

function _extractContext(stack: string, depth: number) {
    try {
        let arr = stack.split('\n')
        let chunks = arr[depth].split('/')
        let business = chunks[chunks.length - 1] // ha ha!
        let matches = business.match(/^([^:]+):(\d+):(\d+)/i) || ""

        let filename = matches[1]
        let line = matches[2]
        let pos = matches[3]

        return { filename, line, pos }
    } catch (ex) {
        console.error(`WARNING: unable to extract logging context`, {ex:ex.toString()})
        return { filename: 'unknown' }
    }
}

function _getContextString() {
    let stack = new Error().stack || ""
    // console.log(`stack`, stack)
    let { filename, line, pos } = _extractContext(stack, 3)
    return `[${filename}:${line}:${pos}]`
}

class Logger {
    private _tag: any;
    private _level: any;
    constructor() {
        let stack = new Error().stack || ""
        // console.log(`stack`, stack)
        let ctx = _extractContext(stack, 3)

        this._tag = ctx.filename || ""

        for ( let lvl in LOG_LEVELS ) {
            // @ts-ignore
            this[lvl.toLowerCase()] = this._log.bind(this, lvl)
        }

        this._setLogLevel()
    }

    _setLogLevel() {
        let tag = this._tag.split('.')[0] // strip out suffix
        tag = tag.toUpperCase().replace('-', '_') // CAPITALS_AND_UNDERSCORES

        let level = process.env['LOG_LEVEL_'+tag]
        //console.log("level: ",level)

        // @ts-ignore
        if ( level && LOG_LEVELS[level] !== undefined ) {
            // @ts-ignore
            this._level = LOG_LEVELS[level].val
        } else {
            // @ts-ignore
            this._level = LOG_LEVELS[DEFAULT_LOG_LEVEL].val
        }
    }

    _log(level:any, ...args:any) {
        console.log('level: ',level)
        console.log('this._level: ',this._level)
        console.log('LOG_LEVELS[level].val: ',LOG_LEVELS[level].val)
        if ( this._level >= LOG_LEVELS[level].val ) {
            let dt = new Date().toISOString().replace('T', ' ')
            let ctx = _getContextString()
            let label = LOG_LEVELS[level].label
            let color = LOG_LEVELS[level].color

            let message:any
            if(process.env['STRUCTURED_LOGGING']){
                message = {}
                //console.log(args)
                let tag = args[0]
                let param = args[1]
                let value = args[2]


                if(typeof(args) === 'object'){
                    message.loggerdog = true
                    message.label = label
                    message.param = param
                    message.value = value
                    message.ctx = ctx
                    message.dt = dt
                    message.tag = tag.toString()
                    message.raw = args.toString()
                } else {
                    message.raw = args
                }

                console.log(dt, color(label), ctx, message)
            }else{
                console.log(dt, color(label), ctx, ...args)
            }

            if(process.env['DATADOG_REST_INTAKE']){
                if(!process.env['DATADOG_API_KEY']) throw Error("102: cant intake without api key! DATADOG_API_KEY")
                if(level <= 3 ){
                    //Error
                    dog.error(args[0],args[1],args[2])
                }else{
                    //info
                    dog.debug(args[0],args[1],args[2])
                }
            } else {
                //datadog API not enabled
            }

        }
    }
}

module.exports = function() {
    return new Logger()
}
