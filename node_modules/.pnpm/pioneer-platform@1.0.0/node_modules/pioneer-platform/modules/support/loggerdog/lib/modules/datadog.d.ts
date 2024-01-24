declare let TAG: string;
declare let os: any;
declare const rp: any;
declare const DATADOG_API_KEY: string | undefined;
declare let send_log_info: (tag: any, message: any, object: any) => Promise<any>;
declare let send_log_warn: (tag: any, message: any, object: any) => Promise<any>;
declare let send_log_error: (tag: any, message: any, object: any) => Promise<any>;
declare let sendPostRequest: (url: any, body: any) => Promise<any>;
