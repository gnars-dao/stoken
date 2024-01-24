export declare const SNGLS: {
    metaData: {
        contractAddress: string;
        BASE: number;
        accountsList: string;
        from: string;
        to: string;
        value: string;
    };
    ABI: ({
        inputs: {
            type: string;
            name: string;
        }[];
        constant: boolean;
        type: string;
        name: string;
        outputs: {
            type: string;
            name: string;
        }[];
        anonymous?: undefined;
    } | {
        inputs: never[];
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
    } | {
        inputs: {
            indexed: boolean;
            type: string;
            name: string;
        }[];
        type: string;
        name: string;
        anonymous: boolean;
        constant?: undefined;
        outputs?: undefined;
    })[];
};
