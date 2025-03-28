import { SdkConfiguration } from "./sdkConfiguration";
export declare class Auth {
    config: any;
    apiKey: string;
    constructor(config: SdkConfiguration);
    setApiKey(apiKey: string): void;
    getApiKey(): string;
}
