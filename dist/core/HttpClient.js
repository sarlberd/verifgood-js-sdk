"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    get(endpoint, metadatas, query) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    post(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiRequest(endpoint, "POST", data);
        });
    }
    put(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiRequest(endpoint, "PUT", data);
        });
    }
    delete(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiRequest(endpoint, "DELETE", null);
        });
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
    apiRequest(endpoint, method, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = yield this.auth.getApiKey();
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
                const response = yield fetch(`${this.apiBaseUrl}${endpoint}`, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = yield response.json();
                Logger_1.default.logResponse(responseData);
                return responseData;
            }
            catch (error) {
                Logger_1.default.logError(error);
                throw error;
            }
        });
    }
}
exports.HttpClient = HttpClient;
