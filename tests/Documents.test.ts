import { Documents } from '../src/apiRequests/Documents';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { DocumentCreateRequest, DocumentUpdateRequest } from '../src/types/Documents';

describe('Documents API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const documents = new Documents(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(documents.endpoint).toBe('/api/documents');
      expect(documents.endpointSingleton).toBe('/api/document');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(documents.auth).toBe(mockAuth);
      expect(documents.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Custom Methods', () => {
    it('should get documents with metadata filters', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { success: true };
      jest.spyOn(documents, 'get').mockResolvedValue(mockResponse);

      const result = await documents.getAll(mockMetadatas);

      expect(documents.get).toHaveBeenCalledWith('/api/documents', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should get document plans with site restrictions', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { plans: [], counters: {} };
      jest.spyOn(documents, 'get').mockResolvedValue(mockResponse);

      const result = await documents.getPlans(mockMetadatas, 'site1');

      expect(documents.get).toHaveBeenCalledWith('/api/document/plans', mockMetadatas, { 
        sites: 'site1' 
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create documents', async () => {
      const mockDocuments = [{ name: 'doc1' }, { name: 'doc2' }];
      const mockResponse = { success: true };
      jest.spyOn(documents, 'post').mockResolvedValue(mockResponse);

      const result = await documents.create(mockDocuments);

      expect(documents.post).toHaveBeenCalledWith('/api/documents', { datas: mockDocuments });
      expect(result).toEqual(mockResponse);
    });

    it('should update document with custom data structure', async () => {
      const mockDocument = { id: '123', name: 'updated doc' };
      const mockResponse = { success: true };
      jest.spyOn(documents, 'put').mockResolvedValue(mockResponse);

      const result = await documents.update(mockDocument);

      expect(documents.put).toHaveBeenCalledWith('/api/document/123', { datas: [mockDocument] });
      expect(result).toEqual(mockResponse);
    });

    it('should remove document', async () => {
      const mockDocument = { id: '123', name: 'doc to delete' };
      const mockResponse = { success: true };
      jest.spyOn(documents, 'delete').mockResolvedValue(mockResponse);

      const result = await documents.remove(mockDocument);

      expect(documents.delete).toHaveBeenCalledWith('/api/document/123');
      expect(result).toEqual(mockResponse);
    });
  });

});
