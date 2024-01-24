"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var LOG_LEVELS = {
    TEST: { val: 0, label: 'TEST', color: 'color: cyan' },
    EMERG: { val: 0, label: 'EMERG', color: 'color: magenta' },
    ALERT: { val: 1, label: 'ALERT', color: 'color: magenta' },
    CRIT: { val: 2, label: 'CRIT', color: 'color: red' },
    ERROR: { val: 3, label: 'ERROR', color: 'color: red' },
    WARN: { val: 4, label: 'WARN', color: 'color: orange' },
    NOTICE: { val: 5, label: 'NOTICE', color: 'color: yellow' },
    VERBOSE: { val: 6, label: 'VERBOSE', color: 'color: cyan' },
    INFO: { val: 6, label: 'INFO', color: 'color: cyan' },
    DEBUG: { val: 7, label: 'DEBUG', color: 'color: green' },
    DEBUGV: { val: 8, label: 'DEBUG', color: 'color: green' },
    DEBUGVV: { val: 9, label: 'DEBUG', color: 'color: green' }
};
var DEFAULT_LOG_LEVEL = typeof process !== 'undefined' ? (process.env['DEFAULT_LOG_LEVEL'] || 'INFO') : 'INFO';
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
        return { filename: 'unknown' };
    }
}
function _getContextString() {
    var stack = new Error().stack || "";
    // console.log(`stack`, stack)
    var _a = _extractContext(stack, 3), filename = _a.filename, line = _a.line, pos = _a.pos;
    return "[".concat(filename, ":").concat(line, ":").concat(pos, "]");
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
        var level = typeof process !== 'undefined' ? (process.env['LOG_LEVEL_' + tag] || null) : null;
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
        //console.log('level: ',level)
        //console.log('this._level: ',this._level)
        //console.log('LOG_LEVELS[level].val: ',LOG_LEVELS[level].val)
        if (this._level >= LOG_LEVELS[level].val) {
            var dt = new Date().toISOString().replace('T', ' ');
            var ctx = _getContextString();
            var label = LOG_LEVELS[level].label;
            var color = LOG_LEVELS[level].color;
            var message = void 0;
            if (typeof process !== 'undefined' && process.env['STRUCTURED_LOGGING']) {
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
                console.log('%c ' + dt, color, label, ctx, message);
            }
            else {
                console.log.apply(console, __spreadArray(['%c ' + dt, color, label, ctx], args, false));
            }
        }
    };
    return Logger;
}());
var getLogger = function () {
    return new Logger();
};
exports.default = getLogger; // ES6 default export
module.exports = getLogger; // CommonJS
