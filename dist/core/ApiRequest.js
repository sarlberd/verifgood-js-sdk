"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequest = void 0;
const HttpClient_1 = require("./HttpClient");
class ApiRequest extends HttpClient_1.HttpClient {
    constructor(auth, apiBaseUrl) {
        super(auth, apiBaseUrl);
    }
    async getAll(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    async getById(id) {
        return this.apiRequest(`${this.endpointSingleton}/${id}`, 'GET', null);
    }
    async create(datas) {
        return this.post(this.endpoint, { datas });
    }
    async update(id, datas) {
        return this.put(`${this.endpointSingleton}/${id}`, { datas });
    }
    async remove(id) {
        return this.delete(`${this.endpointSingleton}/${id}`);
    }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=ApiRequest.js.map