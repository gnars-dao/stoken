"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var dog = require("./modules/datadog");
var clc = require('cli-color');
var LOG_LEVELS = {
    EMERG: { val: 0, label: 'EMERG', color: clc.magentaBright },
    ALERT: { val: 1, label: 'ALERT', color: clc.magentaBright },
    CRIT: { val: 2, label: 'CRIT', color: clc.redBright },
    ERROR: { val: 3, label: 'ERROR', color: clc.redBright },
    WARN: { val: 4, label: 'WARN', color: clc.xterm(208) },
    NOTICE: { val: 5, label: 'NOTICE', color: clc.yellowBright },
    VERBOSE: { val: 6, label: 'VERBOSE', color: clc.cyanBright },
    INFO: { val: 6, label: 'INFO', color: clc.cyanBright },
    DEBUG: { val: 7, label: 'DEBUG', color: clc.greenBright },
    DEBUGV: { val: 8, label: 'DEBUG', color: clc.greenBright },
    DEBUGVV: { val: 9, label: 'DEBUG', color: clc.greenBright }
};
var DEFAULT_LOG_LEVEL = process.env['DEFAULT_LOG_LEVEL'] || 'INFO';
function _extractContext(stack, depth) {
    try {
        var arr = stack.split('\n');
        var chunks = arr[depth].split('/');
        var business = chunks[chunks.length - 1]; // ha ha!
        var matches = business.match(/^([^:]+):(\d+):(\d+)/i) || "";
        var filename = matches[1];
        var line = matches[2];
        var pos = matches[3];
        return { filename: filename, line: line, pos: pos };
    }
    catch (ex) {
        console.error("WARNING: unable to extract logging context", { ex: ex.toString() });
        return { filename: 'unknown' };
    }
}
function _getContextString() {
    var stack = new Error().stack || "";
    // console.log(`stack`, stack)
    var _a = _extractContext(stack, 3), filename = _a.filename, line = _a.line, pos = _a.pos;
    return "[" + filename + ":" + line + ":" + pos + "]";
}
var Logger = /** @class */ (function () {
    function Logger() {
        var stack = new Error().stack || "";
        // console.log(`stack`, stack)
        var ctx = _extractContext(stack, 3);
        this._tag = ctx.filename || "";
        for (var lvl in LOG_LEVELS) {
            // @ts-ignore
            this[lvl.toLowerCase()] = this._log.bind(this, lvl);
        }
        this._setLogLevel();
    }
    Logger.prototype._setLogLevel = function () {
        var tag = this._tag.split('.')[0]; // strip out suffix
        tag = tag.toUpperCase().replace('-', '_'); // CAPITALS_AND_UNDERSCORES
        var level = process.env['LOG_LEVEL_' + tag];
        //console.log("level: ",level)
        // @ts-ignore
        if (level && LOG_LEVELS[level] !== undefined) {
            // @ts-ignore
            this._level = LOG_LEVELS[level].val;
        }
        else {
            // @ts-ignore
            this._level = LOG_LEVELS[DEFAULT_LOG_LEVEL].val;
        }
    };
    Logger.prototype._log = function (level) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log('level: ', level);
        console.log('this._level: ', this._level);
        console.log('LOG_LEVELS[level].val: ', LOG_LEVELS[level].val);
        if (this._level >= LOG_LEVELS[level].val) {
            var dt = new Date().toISOString().replace('T', ' ');
            var ctx = _getContextString();
            var label = LOG_LEVELS[level].label;
            var color = LOG_LEVELS[level].color;
            var message = void 0;
            if (process.env['STRUCTURED_LOGGING']) {
                message = {};
                //console.log(args)
                var tag = args[0];
                var param = args[1];
                var value = args[2];
                if (typeof (args) === 'object') {
                    message.loggerdog = true;
                    message.label = label;
                    message.param = param;
                    message.value = value;
                    message.ctx = ctx;
                    message.dt = dt;
                    message.tag = tag.toString();
                    message.raw = args.toString();
                }
                else {
                    message.raw = args;
                }
                console.log(dt, color(label), ctx, message);
            }
            else {
                console.log.apply(console, __spreadArrays([dt, color(label), ctx], args));
            }
            if (process.env['DATADOG_REST_INTAKE']) {
                if (!process.env['DATADOG_API_KEY'])
                    throw Error("102: cant intake without api key! DATADOG_API_KEY");
                if (level <= 3) {
                    //Error
                    dog.error(args[0], args[1], args[2]);
                }
                else {
                    //info
                    dog.debug(args[0], args[1], args[2]);
                }
            }
            else {
                //datadog API not enabled
            }
        }
    };
    return Logger;
}());
module.exports = function () {
    return new Logger();
};
