"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const Logger_1 = __importDefault(require("../utils/Logger"));
class HttpClient {
    constructor(auth, apiBaseUrl) {
        this.auth = auth;
        this.apiBaseUrl = apiBaseUrl;
    }
    async get(endpoint, metadatas, query) {
        // parse query object for url queries
        let filters = "";
        if (query) {
            const queryKeys = Object.keys(query);
            queryKeys.forEach((key, index) => {
                if (index === 0) {
                    filters += `?${key}=${query[key]}`;
                }
                else {
                    filters += `&${key}=${query[key]}`;
                }
            });
        }
        if (filters == "") {
            filters = `?${this.parseMetadata(metadatas)}`;
        }
        else {
            filters += `&${this.parseMetadata(metadatas)}`;
        }
        return this.apiRequest(`${endpoint}${filters}`, "GET", null);
    }
    async post(endpoint, data) {
        return this.apiRequest(endpoint, "POST", data);
    }
    async put(endpoint, data) {
        return this.apiRequest(endpoint, "PUT", data);
    }
    async delete(endpoint) {
        return this.apiRequest(endpoint, "DELETE", null);
    }
    /**
     *
     * @param Metadatas metadatas
     * @returns string query
     */
    parseMetadata(metadatas) {
        let query = '{""}';
        if (metadatas) {
            query = `metadatas=${JSON.stringify(metadatas.get())}`;
        }
        return query;
    }
    async apiRequest(endpoint, method, data) {
        try {
            const apiKey = await this.auth.getApiKey();
            Logger_1.default.logRequest(endpoint, method, data);
            const headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
            const options = {
                method,
                headers,
            };
            if (data) {
                options.body = JSON.stringify(data);
            }
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, options);
            const responseText = await response.text();
            if (!response.ok) {
                const error = {
                    status: response.status,
                    statusText: response.statusText,
                    message: responseText
                };
                Logger_1.default.logError(error);
                throw error; // Throw the error object directly
            }
            const responseData = responseText ? JSON.parse(responseText) : {};
            Logger_1.default.logResponse(responseData);
            return responseData;
        }
        catch (error) {
            Logger_1.default.logError(error);
            throw error;
        }
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map