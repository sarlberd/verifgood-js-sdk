import { BonsDeSortie } from '../src/apiRequests/BonsDeSortie';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { BonsDeSortiCreateRequest, BonsDeSortiUpdateRequest } from '../src/types/BonsDeSortie';

describe('BonsDeSortie API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const bonsdesortie = new BonsDeSortie(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(bonsdesortie.endpoint).toBe('/api/bons-de-sortie');
      expect(bonsdesortie.endpointSingleton).toBe('/api/bon-de-sortie');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(bonsdesortie.auth).toBe(mockAuth);
      expect(bonsdesortie.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Operations', () => {
    it('should get all bons de sortie with getBonsDeSortie method', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonsDeSortie: [{ id: '1', numero: 'BS001' }] };
      
      jest.spyOn(bonsdesortie, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getBonsDeSortie(mockMetadatas);
      
      expect(bonsdesortie.get).toHaveBeenCalledWith('/api/bons-de-sortie', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should get all bons de sortie through getAll method', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonsDeSortie: [{ id: '1', numero: 'BS001' }] };
      
      jest.spyOn(bonsdesortie, 'getBonsDeSortie').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getAll(mockMetadatas);
      
      expect(bonsdesortie.getBonsDeSortie).toHaveBeenCalledWith(mockMetadatas);
      expect(result).toEqual(mockResponse);
    });

    it('should get bon de sortie by ID with getBonDeSortie method', async () => {
      const mockResponse = { id: '123', numero: 'BS001', statut: 'draft' };
      
      jest.spyOn(bonsdesortie, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getBonDeSortie('123');
      
      expect(bonsdesortie.get).toHaveBeenCalledWith('/api/bons-de-sortie/123', expect.any(Metadatas), {});
      expect(result).toEqual(mockResponse);
    });

    it('should get bon de sortie by ID through getById method', async () => {
      const mockResponse = { id: '123', numero: 'BS001', statut: 'draft' };
      
      jest.spyOn(bonsdesortie, 'getBonDeSortie').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getById(123);
      
      expect(bonsdesortie.getBonDeSortie).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockResponse);
    });

    it('should create bons de sortie without fiche demande consommable', async () => {
      const mockBonDeSortie = { numero: 'BS002', statut: 'draft' };
      const mockResponse = { success: true, bonDeSortie: mockBonDeSortie };
      
      jest.spyOn(bonsdesortie, 'post').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.create(mockBonDeSortie);
      
      expect(bonsdesortie.post).toHaveBeenCalledWith('/api/bons-de-sortie', { 
        datas: mockBonDeSortie, 
        ficheDemandeConsommable: null 
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create bons de sortie with fiche demande consommable', async () => {
      const mockBonDeSortie = { numero: 'BS002', statut: 'draft' };
      const mockFiche = { id: 'fiche123', type: 'consommable' };
      const mockResponse = { success: true, bonDeSortie: mockBonDeSortie };
      
      jest.spyOn(bonsdesortie, 'post').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.create(mockBonDeSortie, mockFiche);
      
      expect(bonsdesortie.post).toHaveBeenCalledWith('/api/bons-de-sortie', { 
        datas: mockBonDeSortie, 
        ficheDemandeConsommable: mockFiche 
      });
      expect(result).toEqual(mockResponse);
    });

    it('should update a bon de sortie', async () => {
      const mockBonDeSortie = { id: '123', numero: 'BS001', statut: 'validated' };
      const mockResponse = { success: true, bonDeSortie: mockBonDeSortie };
      
      jest.spyOn(bonsdesortie, 'put').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.update(mockBonDeSortie);
      
      expect(bonsdesortie.put).toHaveBeenCalledWith('/api/bon-de-sortie/123', { datas: mockBonDeSortie });
      expect(result).toEqual(mockResponse);
    });

    it('should remove a bon de sortie', async () => {
      const mockBonDeSortie = { id: '123', numero: 'BS001' };
      const mockResponse = { success: true };
      
      jest.spyOn(bonsdesortie, 'delete').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.remove(mockBonDeSortie);
      
      expect(bonsdesortie.delete).toHaveBeenCalledWith('/api/bons-de-sortie/123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Signataires Methods', () => {
    it('should get receveurs signataires by default', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { signataires: [{ id: '1', nom: 'Receveur 1' }] };
      
      jest.spyOn(bonsdesortie, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getSignataires(mockMetadatas);
      
      expect(bonsdesortie.get).toHaveBeenCalledWith('/api/bons-de-sortie/receveurs', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should get receveurs signataires explicitly', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { signataires: [{ id: '1', nom: 'Receveur 1' }] };
      
      jest.spyOn(bonsdesortie, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getSignataires(mockMetadatas, 'receveurs');
      
      expect(bonsdesortie.get).toHaveBeenCalledWith('/api/bons-de-sortie/receveurs', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should get donneurs signataires', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { signataires: [{ id: '1', nom: 'Donneur 1' }] };
      
      jest.spyOn(bonsdesortie, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdesortie.getSignataires(mockMetadatas, 'donneurs');
      
      expect(bonsdesortie.get).toHaveBeenCalledWith('/api/bons-de-sortie/donneurs', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });
  });

});
