import { AppContext } from "./AppContext";
import { SdkConfiguration } from "./sdkConfiguration";
export declare class Auth {
    config: any;
    apiKey: string;
    appContext: AppContext;
    constructor(config: SdkConfiguration);
    setApiKey(apiKey: string): void;
    getApiKey(): string;
    /**
     * Replace the current app context (tenant + user metadata). Service
     * methods read fresh on every request via getAppContext().
     */
    setAppContext(context: AppContext): void;
    getAppContext(): AppContext;
}
