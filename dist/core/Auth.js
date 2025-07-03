"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
class Auth {
    constructor(config) {
        this.config = {
            apiKey: ''
        };
        this.apiKey = '';
        this.config = config;
        this.apiKey = config.apiKey;
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    getApiKey() {
        return this.apiKey;
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map