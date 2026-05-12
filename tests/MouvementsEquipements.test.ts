import { MouvementsEquipements } from '../src/apiRequests/MouvementsEquipements';
import { Metadatas } from '../src/core/Metadatas';
import { Auth } from '../src/core/Auth';

describe('MouvementsEquipements API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const mouvementsEquipements = new MouvementsEquipements(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(mouvementsEquipements.endpoint).toBe('/api/mouvements');
      expect(mouvementsEquipements.endpointSingleton).toBe('/api/mouvements');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(mouvementsEquipements.auth).toBe(mockAuth);
      expect(mouvementsEquipements.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    beforeEach(() => {
      jest.spyOn(mouvementsEquipements, 'get').mockResolvedValue({ datas: [], metadatas: {} });
      jest.spyOn(mouvementsEquipements, 'post').mockResolvedValue({});
      jest.spyOn(mouvementsEquipements, 'put').mockResolvedValue({});
      jest.spyOn(mouvementsEquipements, 'delete').mockResolvedValue({});
      jest.spyOn(mouvementsEquipements, 'apiRequest').mockResolvedValue({});
    });
    it('should call getMovements with correct parameters', async () => {
      const metadatas = new Metadatas();
      
      await mouvementsEquipements.getMovements(metadatas);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements', metadatas, { metadatas: metadatas.get() });
    });

    it('should call getMovementById with correct parameters', async () => {
      const id = '123';
      
      await mouvementsEquipements.getMovementById(id);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements/123', expect.any(Metadatas), {});
    });

    it('should call updateMovement with correct parameters', async () => {
      const movement = { id: '123', type: 'transfer', description: 'Test movement' };
      
      await mouvementsEquipements.updateMovement(movement);
      
      expect(mouvementsEquipements.apiRequest).toHaveBeenCalledWith('PUT', '/api/mouvements/123', movement);
    });

    it('should throw error when updating movement without ID', async () => {
      const movement = { type: 'transfer' };
      
      await expect(mouvementsEquipements.updateMovement(movement)).rejects.toThrow('Mouvement equipement ID is required for update');
    });

    it('should call createMovement with correct parameters', async () => {
      const movement = { type: 'transfer', description: 'Test movement' };
      const type = 'transfer';
      
      await mouvementsEquipements.createMovement(movement, type);
      
      expect(mouvementsEquipements.apiRequest).toHaveBeenCalledWith('POST', '/api/mouvements/transfer', movement);
    });

    it('should throw error when creating movement without type', async () => {
      const movement = { description: 'Test movement' };
      
      await expect(mouvementsEquipements.createMovement(movement, '')).rejects.toThrow('Movement type is required for creation');
    });

    it('should call deleteMovement with correct parameters', async () => {
      const movement = { id: '123', type: 'transfer' };
      
      await mouvementsEquipements.deleteMovement(movement);
      
      expect(mouvementsEquipements.apiRequest).toHaveBeenCalledWith('DELETE', '/api/mouvements/123', movement);
    });

    it('should throw error when deleting movement without ID', async () => {
      const movement = { type: 'transfer' };
      
      await expect(mouvementsEquipements.deleteMovement(movement)).rejects.toThrow('Mouvement equipement ID is required for deletion');
    });

    it('should call getMouvementsSignataires with default type', async () => {
      const metadatas = new Metadatas();
      
      await mouvementsEquipements.getMouvementsSignataires(metadatas);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements/receveurs', metadatas, { metadatas: metadatas.get() });
    });

    it('should call getMouvementsSignataires with custom type', async () => {
      const metadatas = new Metadatas();
      const type = 'donneurs';
      
      await mouvementsEquipements.getMouvementsSignataires(metadatas, type);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements/donneurs', metadatas, { metadatas: metadatas.get() });
    });

    it('should call exportMovements with default parameters', async () => {
      const metadatas = new Metadatas();
      
      await mouvementsEquipements.exportMovements(metadatas);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements/export/excel', expect.any(Metadatas), expect.any(Object));
    });

    it('should call exportMovements with CSV format', async () => {
      const metadatas = new Metadatas();
      const filename = 'test_export';
      const fileExtension = 'csv';
      
      await mouvementsEquipements.exportMovements(metadatas, filename, fileExtension);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements/export/csv', expect.any(Metadatas), expect.any(Object));
    });

    it('should call exportMovements with Excel format', async () => {
      const metadatas = new Metadatas();
      const filename = 'test_export';
      const fileExtension = 'xlsx';
      
      await mouvementsEquipements.exportMovements(metadatas, filename, fileExtension);
      
      expect(mouvementsEquipements.get).toHaveBeenCalledWith('/api/mouvements/export/excel', expect.any(Metadatas), expect.any(Object));
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const error = new Error('API Error');
      jest.spyOn(mouvementsEquipements, 'get').mockRejectedValueOnce(error);
      
      await expect(mouvementsEquipements.getMovements(new Metadatas())).rejects.toThrow('API Error');
    });

    it('should validate required parameters', async () => {
      await expect(mouvementsEquipements.updateMovement({})).rejects.toThrow('Mouvement equipement ID is required for update');
      await expect(mouvementsEquipements.createMovement({}, '')).rejects.toThrow('Movement type is required for creation');
      await expect(mouvementsEquipements.deleteMovement({})).rejects.toThrow('Mouvement equipement ID is required for deletion');
    });
  });
});
