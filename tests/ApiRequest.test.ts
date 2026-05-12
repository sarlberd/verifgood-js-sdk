import { ApiRequest } from '../src/core/ApiRequest';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

class TestApiRequest extends ApiRequest {
  endpoint = 'test-endpoint';
  endpointSingleton = 'test-endpoint-singleton';
}

describe('ApiRequest Class', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const apiRequest = new TestApiRequest(mockAuth, 'https://api.example.com');

  describe('Constructor', () => {
    it('should initialize auth and apiBaseUrl properties correctly', () => {
      expect(apiRequest.auth).toBe(mockAuth);
      expect(apiRequest.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Methods', () => {
    it('should call getAll with the correct endpoint and metadata', async () => {
      const mockMetadatas = new Metadatas();
      const getSpy = jest.spyOn(apiRequest, 'get').mockResolvedValue('mockResponse');

      const response = await apiRequest.getAll(mockMetadatas);

      expect(getSpy).toHaveBeenCalledWith('test-endpoint', mockMetadatas, {});
      expect(response).toBe('mockResponse');
    });

    it('should call getById with the correct endpoint and HTTP method', async () => {
      const apiRequestSpy = jest.spyOn(apiRequest, 'apiRequest').mockResolvedValue('mockResponse');

      const response = await apiRequest.getById(1);

      expect(apiRequestSpy).toHaveBeenCalledWith('test-endpoint-singleton/1', 'GET', null);
      expect(response).toBe('mockResponse');
    });

    it('should call create with the correct endpoint and data', async () => {
      const postSpy = jest.spyOn(apiRequest, 'post').mockResolvedValue('mockResponse');

      const response = await apiRequest.create({ key: 'value' });

      expect(postSpy).toHaveBeenCalledWith('test-endpoint', { datas: { key: 'value' } });
      expect(response).toBe('mockResponse');
    });

    it('should call update with the correct endpoint and data', async () => {
      const putSpy = jest.spyOn(apiRequest, 'put').mockResolvedValue('mockResponse');

      const response = await apiRequest.update(1, { key: 'value' });

      expect(putSpy).toHaveBeenCalledWith('test-endpoint-singleton/1', { datas: { key: 'value' } });
      expect(response).toBe('mockResponse');
    });

    it('should call remove with the correct endpoint', async () => {
      const deleteSpy = jest.spyOn(apiRequest, 'delete').mockResolvedValue('mockResponse');

      const response = await apiRequest.remove(1);

      expect(deleteSpy).toHaveBeenCalledWith('test-endpoint-singleton/1');
      expect(response).toBe('mockResponse');
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid data gracefully', async () => {
      const postSpy = jest.spyOn(apiRequest, 'post').mockRejectedValue(new Error('Invalid data'));

      await expect(apiRequest.create(null)).rejects.toThrow('Invalid data');
      expect(postSpy).toHaveBeenCalledWith('test-endpoint', { datas: null });
    });

    it('should handle API errors gracefully', async () => {
      const getSpy = jest.spyOn(apiRequest, 'get').mockRejectedValue(new Error('API Error'));

      await expect(apiRequest.getAll(new Metadatas())).rejects.toThrow('API Error');
      expect(getSpy).toHaveBeenCalledWith('test-endpoint', expect.any(Metadatas), {});
    });
  });
});