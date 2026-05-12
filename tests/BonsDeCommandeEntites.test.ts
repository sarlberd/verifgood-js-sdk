import { BonsDeCommandeEntites } from '../src/apiRequests/BonsDeCommandeEntites';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { BonsDeCommandeEntiteCreateRequest, BonsDeCommandeEntiteUpdateRequest } from '../src/types/BonsDeCommandeEntites';

describe('BonsDeCommandeEntites API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const bonsdecommandeentites = new BonsDeCommandeEntites(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(bonsdecommandeentites.endpoint).toBe('/api/bons-de-commande-entites');
      expect(bonsdecommandeentites.endpointSingleton).toBe('/api/bons-de-commande-entite');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(bonsdecommandeentites.auth).toBe(mockAuth);
      expect(bonsdecommandeentites.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Operations', () => {
    it('should get all bons de commande entites with getEntites method', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonsDeCommandeEntites: [{ id: '1', name: 'Entite 1' }] };
      
      jest.spyOn(bonsdecommandeentites, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdecommandeentites.getEntites(mockMetadatas);
      
      expect(bonsdecommandeentites.get).toHaveBeenCalledWith('/api/bons-de-commande-entites', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should get all bons de commande entites through getAll method', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonsDeCommandeEntites: [{ id: '1', name: 'Entite 1' }] };
      
      jest.spyOn(bonsdecommandeentites, 'getEntites').mockResolvedValue(mockResponse);
      
      const result = await bonsdecommandeentites.getAll(mockMetadatas);
      
      expect(bonsdecommandeentites.getEntites).toHaveBeenCalledWith(mockMetadatas);
      expect(result).toEqual(mockResponse);
    });

    it('should create bons de commande entites array', async () => {
      const mockEntites = [
        { entite_id: 'ent1', bon_de_commande_id: 'bc1' },
        { entite_id: 'ent2', bon_de_commande_id: 'bc1' }
      ];
      const mockResponse = { success: true, entites: mockEntites };
      
      jest.spyOn(bonsdecommandeentites, 'post').mockResolvedValue(mockResponse);
      
      const result = await bonsdecommandeentites.create(mockEntites);
      
      expect(bonsdecommandeentites.post).toHaveBeenCalledWith('/api/bons-de-commande-entites', { datas: mockEntites });
      expect(result).toEqual(mockResponse);
    });

    it('should update a bon de commande entite', async () => {
      const mockEntite = { id: '123', entite_id: 'ent1', bon_de_commande_id: 'bc1' };
      const mockResponse = { success: true, entite: mockEntite };
      
      jest.spyOn(bonsdecommandeentites, 'put').mockResolvedValue(mockResponse);
      
      const result = await bonsdecommandeentites.update(mockEntite);
      
      expect(bonsdecommandeentites.put).toHaveBeenCalledWith('/api/bons-de-commande-entite/123', { datas: mockEntite });
      expect(result).toEqual(mockResponse);
    });

    it('should remove a bon de commande entite', async () => {
      const mockEntite = { id: '123', entite_id: 'ent1' };
      const mockResponse = { success: true };
      
      jest.spyOn(bonsdecommandeentites, 'delete').mockResolvedValue(mockResponse);
      
      const result = await bonsdecommandeentites.remove(mockEntite);
      
      expect(bonsdecommandeentites.delete).toHaveBeenCalledWith('/api/bons-de-commande-entite/123');
      expect(result).toEqual(mockResponse);
    });
  });

});
