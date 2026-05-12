"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
class Auth {
    constructor(config) {
        this.config = {
            apiKey: ''
        };
        this.apiKey = '';
        this.appContext = {};
        this.config = config;
        this.apiKey = config.apiKey;
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    getApiKey() {
        return this.apiKey;
    }
    /**
     * Replace the current app context (tenant + user metadata). Service
     * methods read fresh on every request via getAppContext().
     */
    setAppContext(context) {
        this.appContext = { ...context };
    }
    getAppContext() {
        return this.appContext;
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map