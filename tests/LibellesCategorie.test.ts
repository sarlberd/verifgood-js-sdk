import { LibellesCategorie } from '../src/apiRequests/LibellesCategorie';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { libellesCategorie } from '../src/types/libellesCategorie';

describe('LibellesCategorie API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const libellescategorie = new LibellesCategorie(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(libellescategorie.endpoint).toBe('/api/libelles-categorie');
      expect(libellescategorie.endpointSingleton).toBe('/api/libelle-categorie');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(libellescategorie.auth).toBe(mockAuth);
      expect(libellescategorie.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getAll (overridden)', () => {
    it('should call GET /api/libelles-categorie with userId and metadatas', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(libellescategorie, 'get').mockResolvedValue(mockResponse);
      
      const result = await libellescategorie.getAll(mockMetadatas);
      
      expect(libellescategorie.get).toHaveBeenCalledWith('/api/libelles-categorie', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get()
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('create (overridden)', () => {
    it('should call POST /api/libelles-categories with datas wrapper', async () => {
      const mockLibellesCategories = [
        { libelle: 'Categorie 1' },
        { libelle: 'Categorie 2' }
      ];
      const mockResponse = { datas: mockLibellesCategories };
      
      jest.spyOn(libellescategorie, 'post').mockResolvedValue(mockResponse);
      
      const result = await libellescategorie.create(mockLibellesCategories);
      
      expect(libellescategorie.post).toHaveBeenCalledWith('/api/libelles-categories', { datas: mockLibellesCategories });
      expect(result).toBe(mockLibellesCategories);
    });

    it('should handle custom options parameter', async () => {
      const mockLibellesCategories = [{ libelle: 'Test' }];
      const mockResponse = { datas: mockLibellesCategories };
      const customOptions = { _stored: false };
      
      jest.spyOn(libellescategorie, 'post').mockResolvedValue(mockResponse);
      
      const result = await libellescategorie.create(mockLibellesCategories, customOptions);
      
      expect(result).toBe(mockLibellesCategories);
    });
  });

  describe('remove (overridden)', () => {
    it('should call DELETE /api/libelle-categorie/{id} and wrap response', async () => {
      const mockResponse = { success: true };
      const libelleId = 123;
      
      jest.spyOn(libellescategorie, 'delete').mockResolvedValue(mockResponse);
      
      const result = await libellescategorie.remove(libelleId);
      
      expect(libellescategorie.delete).toHaveBeenCalledWith(`/api/libelle-categorie/${libelleId}`);
      expect(result).toEqual({ libelleCategorie: mockResponse });
    });
  });

});
