const LOG_LEVELS:any = {
    TEST: { val: 0, label: 'TEST', color: 'color: cyan' },
    EMERG: { val: 0, label: 'EMERG', color: 'color: magenta' },
    ALERT: { val: 1, label: 'ALERT', color: 'color: magenta' },
    CRIT: { val:  2, label: 'CRIT', color: 'color: red' },
    ERROR: { val: 3, label: 'ERROR', color: 'color: red' },
    WARN: { val:  4, label: 'WARN', color: 'color: orange' },
    NOTICE: { val: 5, label: 'NOTICE', color: 'color: yellow' },
    VERBOSE: { val: 6, label: 'VERBOSE', color: 'color: cyan' },
    INFO: { val: 6, label: 'INFO', color: 'color: cyan' },
    DEBUG: { val: 7, label: 'DEBUG', color: 'color: green' },
    DEBUGV: { val: 8, label: 'DEBUG', color: 'color: green' },
    DEBUGVV: { val: 9, label: 'DEBUG', color: 'color: green' }
}

const DEFAULT_LOG_LEVEL = typeof process !== 'undefined' ? (process.env['DEFAULT_LOG_LEVEL'] || 'INFO') : 'INFO';

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

        let level = typeof process !== 'undefined' ? (process.env['LOG_LEVEL_'+tag] || null) : null;
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
        //console.log('level: ',level)
        //console.log('this._level: ',this._level)
        //console.log('LOG_LEVELS[level].val: ',LOG_LEVELS[level].val)
        if ( this._level >= LOG_LEVELS[level].val ) {
            let dt = new Date().toISOString().replace('T', ' ')
            let ctx = _getContextString()
            let label = LOG_LEVELS[level].label
            let color = LOG_LEVELS[level].color

            let message:any
            if(typeof process !== 'undefined' && process.env['STRUCTURED_LOGGING']){
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

                console.log('%c ' + dt, color, label, ctx, message)
            }else{
                console.log('%c ' + dt, color, label, ctx, ...args)
            }
        }
    }
}

const getLogger = function() {
    return new Logger();
}

exports.default = getLogger; // ES6 default export
module.exports = getLogger;  // CommonJS
