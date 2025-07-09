import { LibelProblem } from '../src/apiRequests/LibelProblem';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { LibelProbleCreateRequest, LibelProbleUpdateRequest } from '../src/types/LibelProblem';

describe('LibelProblem API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const libelproblem = new LibelProblem(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(libelproblem.endpoint).toBe('/api/libelles-probleme');
      expect(libelproblem.endpointSingleton).toBe('/api/libelle-probleme');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(libelproblem.auth).toBe(mockAuth);
      expect(libelproblem.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getAll (overridden)', () => {
    it('should call GET /api/libelles-probleme with userId and metadatas', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(libelproblem, 'get').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.getAll(mockMetadatas);
      
      expect(libelproblem.get).toHaveBeenCalledWith('/api/libelles-probleme', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get()
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('create (overridden)', () => {
    it('should call POST /api/libelles-probleme with datas wrapper', async () => {
      const mockLibellesProblem = [
        { libelle: 'Problem 1' },
        { libelle: 'Problem 2' }
      ];
      const mockResponse = { success: true, data: mockLibellesProblem };
      
      jest.spyOn(libelproblem, 'post').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.create(mockLibellesProblem);
      
      expect(libelproblem.post).toHaveBeenCalledWith('/api/libelles-probleme', { datas: mockLibellesProblem });
      expect(result).toBe(mockResponse);
    });
  });

  describe('remove (overridden)', () => {
    it('should call DELETE /api/libelle-probleme/{id}', async () => {
      const mockResponse = { success: true };
      const problemId = 123;
      
      jest.spyOn(libelproblem, 'delete').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.remove(problemId);
      
      expect(libelproblem.delete).toHaveBeenCalledWith(`/api/libelle-probleme/${problemId}`);
      expect(result).toBe(mockResponse);
    });
  });

  describe('createComposantProblems', () => {
    it('should call POST /api/composant/{id}/libels-problems', async () => {
      const mockResponse = { success: true };
      const composantId = 'comp123';
      const mockProblems = [{ libelle: 'Problem 1' }, { libelle: 'Problem 2' }];
      
      jest.spyOn(libelproblem, 'post').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.createComposantProblems(composantId, mockProblems);
      
      expect(libelproblem.post).toHaveBeenCalledWith(`/api/composant/${composantId}/libels-problems`, { datas: mockProblems });
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteComposantProblem', () => {
    it('should call DELETE /api/libelle-probleme/{id}', async () => {
      const mockResponse = { success: true };
      const mockProblem = { id: 123, composant: 'comp456' };
      
      jest.spyOn(libelproblem, 'delete').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.deleteComposantProblem(mockProblem);
      
      expect(libelproblem.delete).toHaveBeenCalledWith(`/api/libelle-probleme/${mockProblem.id}`);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getComposantProblems', () => {
    it('should call GET /api/composant/{id}/libelles-probleme', async () => {
      const mockResponse = { problems: [] };
      const composantId = 'comp123';
      
      jest.spyOn(libelproblem, 'get').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.getComposantProblems(composantId);
      
      expect(libelproblem.get).toHaveBeenCalledWith(`/api/composant/${composantId}/libelles-probleme`, expect.any(Metadatas), {
        userId: null
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('getLibellesProblemByCategorie', () => {
    it('should call GET /api/libelles-probleme/categorie/{id}/all', async () => {
      const mockResponse = { problems: [] };
      const mockMetadatas = new Metadatas();
      const categorieId = 'cat456';
      
      jest.spyOn(libelproblem, 'get').mockResolvedValue(mockResponse);
      
      const result = await libelproblem.getLibellesProblemByCategorie(mockMetadatas, categorieId);
      
      expect(libelproblem.get).toHaveBeenCalledWith(`/api/libelles-probleme/categorie/${categorieId}/all`, mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get()
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('getLibelsEquipement', () => {
    it('should return empty array as placeholder', async () => {
      const result = await libelproblem.getLibelsEquipement();
      
      expect(result).toEqual([]);
    });
  });

});
