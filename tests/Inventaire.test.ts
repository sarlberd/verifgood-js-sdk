import { Inventaire } from '../src/apiRequests/Inventaire';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { InventairCreateRequest, InventairUpdateRequest } from '../src/types/Inventaire';

describe('Inventaire API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const inventaire = new Inventaire(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(inventaire.endpoint).toBe('/api/inventaires');
      expect(inventaire.endpointSingleton).toBe('/api/inventaire');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(inventaire.auth).toBe(mockAuth);
      expect(inventaire.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('fetch (deprecated)', () => {
    it('should call GET /api/{userId}/inventaire with metadatas', async () => {
      const mockResponse = { success: true };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(inventaire, 'get').mockResolvedValue(mockResponse);
      
      const result = await inventaire.fetch(mockMetadatas);
      
      expect(inventaire.get).toHaveBeenCalledWith('/api/null/inventaire', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get()
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchEnCoursInventory', () => {
    it('should fetch all inventaires and get the last one by ID', async () => {
      const mockInventaires = {
        inventaires: [
          { inventaire_id: 1 },
          { inventaire_id: 2 }
        ]
      };
      const mockInventaire = { id: 2, data: 'test' };
      
      jest.spyOn(inventaire, 'getAll').mockResolvedValue(mockInventaires);
      jest.spyOn(inventaire, 'getById').mockResolvedValue(mockInventaire);
      
      const result = await inventaire.fetchEnCoursInventory();
      
      expect(inventaire.getAll).toHaveBeenCalled();
      expect(inventaire.getById).toHaveBeenCalledWith(2);
      expect(result).toBe(mockInventaire);
    });

    it('should throw error when no inventaires found', async () => {
      jest.spyOn(inventaire, 'getAll').mockResolvedValue({ inventaires: [] });
      
      await expect(inventaire.fetchEnCoursInventory()).rejects.toThrow('No inventaires found');
    });
  });

  describe('fetchOperationsByInventaireId', () => {
    it('should call GET /api/{userId}/inventaire/{id}/operations', async () => {
      const mockResponse = { operations: [] };
      const inventaireId = 123;
      
      jest.spyOn(inventaire, 'get').mockResolvedValue(mockResponse);
      
      const result = await inventaire.fetchOperationsByInventaireId(inventaireId);
      
      expect(inventaire.get).toHaveBeenCalledWith(`/api/null/inventaire/${inventaireId}/operations`, expect.any(Metadatas), {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('fetchOperationsByInventaireIdOnLieu', () => {
    it('should call GET /api/{userId}/inventaire/{id}/operations/lieu/{lieuId}', async () => {
      const mockResponse = { operations: [] };
      const inventaireId = 123;
      const lieuId = 456;
      
      jest.spyOn(inventaire, 'get').mockResolvedValue(mockResponse);
      
      const result = await inventaire.fetchOperationsByInventaireIdOnLieu(inventaireId, lieuId);
      
      expect(inventaire.get).toHaveBeenCalledWith(`/api/null/inventaire/${inventaireId}/operations/lieu/${lieuId}`, expect.any(Metadatas), {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('finalizeInventaireOnLieu (deprecated)', () => {
    it('should call POST /api/{userId}/inventaire/{id}/operations/lieu/{lieuId}/finalize', async () => {
      const mockResponse = { success: true };
      const inventaireId = 123;
      const lieuId = 456;
      
      jest.spyOn(inventaire, 'post').mockResolvedValue(mockResponse);
      
      const result = await inventaire.finalizeInventaireOnLieu(inventaireId, lieuId);
      
      expect(inventaire.post).toHaveBeenCalledWith(`/api/null/inventaire/${inventaireId}/operations/lieu/${lieuId}/finalize`, {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('createOperation', () => {
    it('should create operation and refresh operations list', async () => {
      const mockOperation = { equipement_id: 1, quantity: 5 };
      const mockResponse = { success: true, operation: mockOperation };
      const inventaireId = 123;
      const lieuId = 456;
      
      jest.spyOn(inventaire, 'post').mockResolvedValue(mockResponse);
      jest.spyOn(inventaire, 'fetchOperationsByInventaireIdOnLieu').mockResolvedValue({ operations: [] });
      
      const result = await inventaire.createOperation(mockOperation, inventaireId, lieuId);
      
      expect(inventaire.post).toHaveBeenCalledWith(`/api/null/inventaire/${inventaireId}/operations/lieu/${lieuId}`, mockOperation);
      expect(inventaire.fetchOperationsByInventaireIdOnLieu).toHaveBeenCalledWith(inventaireId, lieuId);
      expect(result).toBe(mockResponse);
    });
  });

  describe('removeOperationInventaire', () => {
    it('should remove operation and refresh operations list', async () => {
      const mockOperation = { 
        id: 1, 
        inventaire_id: 123, 
        lieuInventorier_id: 456 
      };
      const mockResponse = { success: true };
      
      jest.spyOn(inventaire, 'delete').mockResolvedValue(mockResponse);
      jest.spyOn(inventaire, 'fetchOperationsByInventaireIdOnLieu').mockResolvedValue({ operations: [] });
      
      const result = await inventaire.removeOperationInventaire(mockOperation);
      
      expect(inventaire.delete).toHaveBeenCalledWith(`/api/null/inventaire/${mockOperation.inventaire_id}/operation/${mockOperation.id}`);
      expect(inventaire.fetchOperationsByInventaireIdOnLieu).toHaveBeenCalledWith(mockOperation.inventaire_id, mockOperation.lieuInventorier_id);
      expect(result).toBe(mockResponse);
    });
  });

});
