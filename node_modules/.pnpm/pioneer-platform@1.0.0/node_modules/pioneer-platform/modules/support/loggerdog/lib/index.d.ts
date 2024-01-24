declare let dog: any;
declare const clc: any;
declare const LOG_LEVELS: any;
declare const DEFAULT_LOG_LEVEL: string;
declare function _extractContext(stack: string, depth: number): {
    filename: string;
    line: string;
    pos: string;
} | {
    filename: string;
    line?: undefined;
    pos?: undefined;
};
declare function _getContextString(): string;
declare class Logger {
    private _tag;
    private _level;
    constructor();
    _setLogLevel(): void;
    _log(level: any, ...args: any): void;
}
