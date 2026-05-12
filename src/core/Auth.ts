import {AppContext} from "./AppContext";
import {SdkConfiguration} from "./sdkConfiguration";

export class Auth {
  config : any = {
    apiKey: ''
  };
  apiKey : string = '';
  appContext: AppContext = {};
  constructor(config: SdkConfiguration) {
    this.config = config;
    this.apiKey = config.apiKey;
  }
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
  getApiKey() {
    return this.apiKey;
  }
  /**
   * Replace the current app context (tenant + user metadata). Service
   * methods read fresh on every request via getAppContext().
   */
  setAppContext(context: AppContext) {
    this.appContext = { ...context };
  }
  getAppContext(): AppContext {
    return this.appContext;
  }
}
