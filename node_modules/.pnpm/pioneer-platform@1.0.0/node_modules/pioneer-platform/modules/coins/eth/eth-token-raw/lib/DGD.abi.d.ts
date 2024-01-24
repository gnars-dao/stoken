export declare const DGD: {
    metaData: {
        contractAddress: string;
        BASE: number;
        accountsList: string;
        from: string;
        to: string;
        value: string;
    };
    ABI: ({
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        type: string;
        anonymous?: undefined;
    } | {
        inputs: never[];
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
    })[];
};
