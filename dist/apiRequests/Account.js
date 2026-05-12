"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Account API request class
 * Service for managing user accounts
 */
class Account extends ApiRequest_1.ApiRequest {
    constructor(auth, apiBaseUrl) {
        super(auth, apiBaseUrl);
        this.endpoint = '/api/account';
        this.endpointSingleton = '/api/account';
    }
    /**
     * Updates account information
     * @param data Account data to update
     * @returns Promise with updated account data
     */
    async updateAccount(data) {
        const response = await this.apiRequest(this.endpoint, 'PUT', { datas: data });
        return response;
    }
    /**
     * Fetches account data
     * @returns Promise with account data
     */
    async fetchAccount() {
        const response = await this.apiRequest(this.endpoint, 'GET', null);
        return response;
    }
    /**
     * Creates a new account
     * @param account Account data for creation
     * @returns Promise with the created account data
     */
    async createAccount(account) {
        const lang = typeof navigator !== 'undefined' ? navigator.language : 'en';
        // @TODO: The URL contains a hardcoded UUID that should be configured
        const url = `/cfae5733-8860-48d6-8346-693a93816c6e/account/${lang}`;
        const response = await this.apiRequest(url, 'POST', { datas: account });
        return response;
    }
    // Implement required abstract methods from ApiRequest
    async getAll(metadatas) {
        const response = await super.getAll(metadatas);
        return response;
    }
    async getById(id) {
        const response = await super.getById(id);
        return response;
    }
    async create(data) {
        const response = await super.create(data);
        return response;
    }
    async update(id, data) {
        const response = await super.update(id, data);
        return response;
    }
    async remove(id) {
        await super.remove(id);
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map