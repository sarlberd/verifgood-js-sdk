---
to: tests/<%= name %>.test.ts
---
import { <%= name %> } from '../src/apiRequests/<%= name %>';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

describe('<%= name %> Class', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const <%= name.toLowerCase() %> = new <%= name %>(mockAuth, 'https://api.example.com');

  describe('Constructor', () => {
    it('should initialize endpoint and endpointSingleton correctly', () => {
      expect(<%= name.toLowerCase() %>.endpoint).toBe('<%= endpoint %>');
      expect(<%= name.toLowerCase() %>.endpointSingleton).toBe('<%= endpointSingleton %>');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(<%= name.toLowerCase() %>.auth).toBe(mockAuth);
      expect(<%= name.toLowerCase() %>.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Methods', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call getAll with correct parameters', async () => {
      const mockMetadatas = new Metadatas();
      const getSpy = jest.spyOn(<%= name.toLowerCase() %>, 'get').mockResolvedValue('mockResponse');

      const response = await <%= name.toLowerCase() %>.getAll(mockMetadatas);

      expect(getSpy).toHaveBeenCalledWith('<%= endpoint %>', mockMetadatas, {});
      expect(response).toBe('mockResponse');
    });

    it('should call getById with correct parameters', async () => {
      const mockId = 123;
      const apiRequestSpy = jest.spyOn(<%= name.toLowerCase() %>, 'apiRequest').mockResolvedValue('mockResponse');

      const response = await <%= name.toLowerCase() %>.getById(mockId);

      expect(apiRequestSpy).toHaveBeenCalledWith('<%= endpointSingleton %>/123', 'GET', null);
      expect(response).toBe('mockResponse');
    });

    it('should call create with correct parameters', async () => {
      const mockData = { name: 'Test <%= name %>' };
      const postSpy = jest.spyOn(<%= name.toLowerCase() %>, 'post').mockResolvedValue('mockResponse');

      const response = await <%= name.toLowerCase() %>.create(mockData);

      expect(postSpy).toHaveBeenCalledWith('<%= endpoint %>', { datas: mockData });
      expect(response).toBe('mockResponse');
    });

    it('should call update with correct parameters', async () => {
      const mockId = 123;
      const mockData = { name: 'Updated <%= name %>' };
      const putSpy = jest.spyOn(<%= name.toLowerCase() %>, 'put').mockResolvedValue('mockResponse');

      const response = await <%= name.toLowerCase() %>.update(mockId, mockData);

      expect(putSpy).toHaveBeenCalledWith('<%= endpointSingleton %>/123', { datas: mockData });
      expect(response).toBe('mockResponse');
    });

    it('should call remove with correct parameters', async () => {
      const mockId = 123;
      const deleteSpy = jest.spyOn(<%= name.toLowerCase() %>, 'delete').mockResolvedValue('mockResponse');

      const response = await <%= name.toLowerCase() %>.remove(mockId);

      expect(deleteSpy).toHaveBeenCalledWith('<%= endpointSingleton %>/123');
      expect(response).toBe('mockResponse');
    });
  });

<% if (hasCustomMethods && customMethods && customMethods.length > 0) { -%>
  describe('Custom Methods', () => {
<% customMethods.forEach(function(method) { -%>
    it('should call <%= method %> with correct parameters', async () => {
      const mockMetadatas = new Metadatas();
      const getSpy = jest.spyOn(<%= name.toLowerCase() %>, 'get').mockResolvedValue('mockResponse');

      const response = await <%= name.toLowerCase() %>.<%= method %>(mockMetadatas);

      expect(getSpy).toHaveBeenCalledWith('<%= endpoint %>/<%= method.toLowerCase().replace(/([A-Z])/g, '-$1') %>', mockMetadatas, {});
      expect(response).toBe('mockResponse');
    });

<% }); -%>
  });
<% } -%>
});
