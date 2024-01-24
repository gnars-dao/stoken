export declare type ErrObj = {
    field: string;
    message: string;
};
export declare class ValidationError extends Error {
    list: ErrObj[];
    constructor(list: ErrObj[], ...params: any);
}
