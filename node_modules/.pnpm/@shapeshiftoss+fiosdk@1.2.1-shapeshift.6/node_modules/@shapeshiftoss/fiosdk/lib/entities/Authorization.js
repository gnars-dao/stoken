"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
class Authorization {
    constructor(actor, permission = 'active') {
        this.actor = actor;
        this.permission = permission;
    }
}
exports.Authorization = Authorization;
