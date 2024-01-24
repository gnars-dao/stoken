export interface Error {
    success: boolean;
    tag: string;
    e: any;
}
export interface Health {
    online: boolean;
    name: string;
    version: string;
    system: any;
    hostname: string;
    uptime: any;
    loadavg: any;
}
