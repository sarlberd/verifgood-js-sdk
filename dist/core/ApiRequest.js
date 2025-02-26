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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequest = void 0;
const HttpClient_1 = require("./HttpClient");
class ApiRequest extends HttpClient_1.HttpClient {
    constructor(auth, apiBaseUrl) {
        super(auth, apiBaseUrl);
    }
    getAll(metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(this.endpoint, metadatas, {});
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiRequest(`${this.endpointSingleton}/${id}`, 'GET', null);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(this.endpoint, { data });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.put(`${this.endpointSingleton}/${id}`, data);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(`${this.endpointSingleton}/${id}`);
        });
    }
}
exports.ApiRequest = ApiRequest;
