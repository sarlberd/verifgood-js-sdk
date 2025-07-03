import { BonDeCommandeItems } from '../src/apiRequests/BonDeCommandeItems';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { BonDeCommandeItemCreateRequest, BonDeCommandeItemUpdateRequest } from '../src/types/BonDeCommandeItems';

describe('BonDeCommandeItems API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const bondecommandeitems = new BonDeCommandeItems(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(bondecommandeitems.endpoint).toBe('/api/items/bons-de-commande');
      expect(bondecommandeitems.endpointSingleton).toBe('/api/item');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(bondecommandeitems.auth).toBe(mockAuth);
      expect(bondecommandeitems.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Operations', () => {
    it('should get all bon de commande items with metadatas', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonDeCommandeItems: [{ id: '1', name: 'Item 1' }] };
      
      jest.spyOn(bondecommandeitems, 'get').mockResolvedValue(mockResponse);
      
      const result = await bondecommandeitems.getAll(mockMetadatas);
      
      expect(bondecommandeitems.get).toHaveBeenCalledWith('/api/items/bons-de-commande', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should create bon de commande items array', async () => {
      const mockItems = [
        { name: 'Item 1', quantity: 10 },
        { name: 'Item 2', quantity: 5 }
      ];
      const mockResponse = { success: true, items: mockItems };
      
      jest.spyOn(bondecommandeitems, 'post').mockResolvedValue(mockResponse);
      
      const result = await bondecommandeitems.create(mockItems);
      
      expect(bondecommandeitems.post).toHaveBeenCalledWith('/api/items/bons-de-commande', { datas: mockItems });
      expect(result).toEqual(mockResponse);
    });

    it('should update a bon de commande item', async () => {
      const mockItem = { id: '123', name: 'Updated Item', quantity: 15 };
      const mockResponse = { success: true, item: mockItem };
      
      jest.spyOn(bondecommandeitems, 'put').mockResolvedValue(mockResponse);
      
      const result = await bondecommandeitems.update(mockItem);
      
      expect(bondecommandeitems.put).toHaveBeenCalledWith('/api/item/123/bon-de-commande', { datas: mockItem });
      expect(result).toEqual(mockResponse);
    });

    it('should remove a bon de commande item', async () => {
      const mockItem = { id: '123', name: 'Item to delete' };
      const mockResponse = { success: true };
      
      jest.spyOn(bondecommandeitems, 'delete').mockResolvedValue(mockResponse);
      
      const result = await bondecommandeitems.remove(mockItem);
      
      expect(bondecommandeitems.delete).toHaveBeenCalledWith('/api/item/123/bon-de-commande');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Utility Methods', () => {
    it('should get clones of bon de commande items', async () => {
      const mockMetadatas = new Metadatas();
      const mockItems = [
        { id: '1', uid: 'uid-1', name: 'Item 1', bonDeCommande_id: 'bc-1', quantiteLivree: 10 },
        { id: '2', uid: 'uid-2', name: 'Item 2', bonDeCommande_id: 'bc-1', quantiteLivree: 5 }
      ];
      const mockResponse = { bonDeCommandeItems: mockItems };
      
      jest.spyOn(bondecommandeitems, 'getAll').mockResolvedValue(mockResponse);
      
      const result = await bondecommandeitems.getClones(mockMetadatas);
      
      expect(bondecommandeitems.getAll).toHaveBeenCalledWith(mockMetadatas);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: null,
        uid: null,
        name: 'Item 1',
        bonDeCommande_id: null,
        quantiteLivree: 0
      });
      expect(result[1]).toEqual({
        id: null,
        uid: null,
        name: 'Item 2',
        bonDeCommande_id: null,
        quantiteLivree: 0
      });
    });

    it('should handle getClones when response is direct array', async () => {
      const mockMetadatas = new Metadatas();
      const mockItems = [
        { id: '1', uid: 'uid-1', name: 'Item 1', bonDeCommande_id: 'bc-1', quantiteLivree: 10 }
      ];
      
      jest.spyOn(bondecommandeitems, 'getAll').mockResolvedValue(mockItems);
      
      const result = await bondecommandeitems.getClones(mockMetadatas);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: null,
        uid: null,
        name: 'Item 1',
        bonDeCommande_id: null,
        quantiteLivree: 0
      });
    });
  });

});
