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
const ApiRequest_1 = require("../src/core/ApiRequest");
const Auth_1 = require("../src/core/Auth");
const Metadatas_1 = require("../src/core/Metadatas");
class TestApiRequest extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = 'test-endpoint';
        this.endpointSingleton = 'test-endpoint-singleton';
    }
}
describe('ApiRequest Class', () => {
    const mockAuth = new Auth_1.Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
    const apiRequest = new TestApiRequest(mockAuth, 'https://api.example.com');
    describe('Constructor', () => {
        it('should initialize auth and apiBaseUrl properties correctly', () => {
            expect(apiRequest.auth).toBe(mockAuth);
            expect(apiRequest.apiBaseUrl).toBe('https://api.example.com');
        });
    });
    describe('Methods', () => {
        it('should call getAll with the correct endpoint and metadata', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMetadatas = new Metadatas_1.Metadatas();
            const getSpy = jest.spyOn(apiRequest, 'get').mockResolvedValue('mockResponse');
            const response = yield apiRequest.getAll(mockMetadatas);
            expect(getSpy).toHaveBeenCalledWith('test-endpoint', mockMetadatas, {});
            expect(response).toBe('mockResponse');
        }));
        it('should call getById with the correct endpoint and HTTP method', () => __awaiter(void 0, void 0, void 0, function* () {
            const apiRequestSpy = jest.spyOn(apiRequest, 'apiRequest').mockResolvedValue('mockResponse');
            const response = yield apiRequest.getById(1);
            expect(apiRequestSpy).toHaveBeenCalledWith('test-endpoint-singleton/1', 'GET', null);
            expect(response).toBe('mockResponse');
        }));
        it('should call create with the correct endpoint and data', () => __awaiter(void 0, void 0, void 0, function* () {
            const postSpy = jest.spyOn(apiRequest, 'post').mockResolvedValue('mockResponse');
            const response = yield apiRequest.create({ key: 'value' });
            expect(postSpy).toHaveBeenCalledWith('test-endpoint', { datas: { key: 'value' } });
            expect(response).toBe('mockResponse');
        }));
        it('should call update with the correct endpoint and data', () => __awaiter(void 0, void 0, void 0, function* () {
            const putSpy = jest.spyOn(apiRequest, 'put').mockResolvedValue('mockResponse');
            const response = yield apiRequest.update(1, { key: 'value' });
            expect(putSpy).toHaveBeenCalledWith('test-endpoint-singleton/1', { datas: { key: 'value' } });
            expect(response).toBe('mockResponse');
        }));
        it('should call remove with the correct endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteSpy = jest.spyOn(apiRequest, 'delete').mockResolvedValue('mockResponse');
            const response = yield apiRequest.remove(1);
            expect(deleteSpy).toHaveBeenCalledWith('test-endpoint-singleton/1');
            expect(response).toBe('mockResponse');
        }));
    });
    describe('Edge Cases', () => {
        it('should handle invalid data gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            const postSpy = jest.spyOn(apiRequest, 'post').mockRejectedValue(new Error('Invalid data'));
            yield expect(apiRequest.create(null)).rejects.toThrow('Invalid data');
            expect(postSpy).toHaveBeenCalledWith('test-endpoint', { datas: null });
        }));
        it('should handle API errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            const getSpy = jest.spyOn(apiRequest, 'get').mockRejectedValue(new Error('API Error'));
            yield expect(apiRequest.getAll(new Metadatas_1.Metadatas())).rejects.toThrow('API Error');
            expect(getSpy).toHaveBeenCalledWith('test-endpoint', expect.any(Metadatas_1.Metadatas), {});
        }));
    });
});
