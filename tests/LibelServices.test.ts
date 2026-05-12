import { LibelServices } from '../src/apiRequests/LibelServices';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { LibelService, LibelServiceCreateRequest, LibelServiceUpdateRequest } from '../src/types/LibelServices';

describe('LibelServices API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const libelservices = new LibelServices(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(libelservices.endpoint).toBe('/api/libel-services');
      expect(libelservices.endpointSingleton).toBe('/api/libel-service');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(libelservices.auth).toBe(mockAuth);
      expect(libelservices.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getAll (overridden)', () => {
    it('should call GET with metadatas and userId', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(libelservices, 'get').mockResolvedValue(mockResponse);
      
      const result = await libelservices.getAll(mockMetadatas);
      
      expect(libelservices.get).toHaveBeenCalledWith('/api/libel-services', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get()
      });
      expect(result).toBe(mockResponse);
    });

    it('should handle _restrictionSite option', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(libelservices, 'get').mockResolvedValue(mockResponse);
      
      const result = await libelservices.getAll(mockMetadatas, { _restrictionSite: true });
      
      expect(libelservices.get).toHaveBeenCalledWith('/api/libel-services', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get(),
        site: null
      });
      expect(result).toBe(mockResponse);
    });

    it('should not add site restriction when _all is true', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(libelservices, 'get').mockResolvedValue(mockResponse);
      
      const result = await libelservices.getAll(mockMetadatas, { _restrictionSite: true, _all: true });
      
      expect(libelservices.get).toHaveBeenCalledWith('/api/libel-services', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get()
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('create (overridden)', () => {
    it('should call POST with datas wrapper', async () => {
      const mockLibelServices = [
        { libelle: 'Service 1' },
        { libelle: 'Service 2' }
      ];
      const mockResponse = { success: true, data: mockLibelServices };
      
      jest.spyOn(libelservices, 'post').mockResolvedValue(mockResponse);
      
      const result = await libelservices.create(mockLibelServices);
      
      expect(libelservices.post).toHaveBeenCalledWith('/api/libel-services', { datas: mockLibelServices });
      expect(result).toBe(mockResponse);
    });

    it('should handle empty array', async () => {
      const mockLibelServices: LibelServiceCreateRequest[] = [];
      const mockResponse = { success: true, data: [] };
      
      jest.spyOn(libelservices, 'post').mockResolvedValue(mockResponse);
      
      const result = await libelservices.create(mockLibelServices);
      
      expect(libelservices.post).toHaveBeenCalledWith('/api/libel-services', { datas: [] });
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteLibelService', () => {
    it('should call DELETE with singular endpoint and service ID', async () => {
      const mockLibelService = { id: 123, libelle: 'Test Service' };
      const mockResponse = { success: true };
      
      jest.spyOn(libelservices, 'delete').mockResolvedValue(mockResponse);
      
      const result = await libelservices.deleteLibelService(mockLibelService);
      
      expect(libelservices.delete).toHaveBeenCalledWith('/api/libel-service/123');
      expect(result).toBe(mockResponse);
    });

    it('should throw error when service ID is missing', async () => {
      const mockLibelService = { libelle: 'Test Service' };
      
      await expect(libelservices.deleteLibelService(mockLibelService)).rejects.toThrow(
        'LibelService ID is required for deletion'
      );
    });

    it('should throw error when service ID is undefined', async () => {
      const mockLibelService = { id: undefined, libelle: 'Test Service' };
      
      await expect(libelservices.deleteLibelService(mockLibelService)).rejects.toThrow(
        'LibelService ID is required for deletion'
      );
    });
  });

});
