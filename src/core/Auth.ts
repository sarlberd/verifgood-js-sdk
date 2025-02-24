import {SdkConfiguration} from "./sdkConfiguration";

export class Auth {
  config : any = {
    apiKey: ''
  };
  apiKey : string = '';
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
}
