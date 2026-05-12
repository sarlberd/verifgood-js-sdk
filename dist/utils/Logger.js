"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static logRequest(endpoint, method, data) {
        console.log(`[Request] ${method} ${endpoint}`, data);
    }
    static logResponse(data) {
        console.log(`[Response]`, data);
    }
    static logError(error) {
        console.error(`[Error]`, error);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map