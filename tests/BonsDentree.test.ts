import { BonsDentree } from '../src/apiRequests/BonsDentree';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { BonsDentreCreateRequest, BonsDentreUpdateRequest } from '../src/types/BonsDentree';

describe('BonsDentree API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const bonsdentree = new BonsDentree(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(bonsdentree.endpoint).toBe('/api/bons-dentree');
      expect(bonsdentree.endpointSingleton).toBe('/api/bons-dentree');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(bonsdentree.auth).toBe(mockAuth);
      expect(bonsdentree.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Operations', () => {
    it('should get all bons d\'entrée with getBonsDentree method', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonsDentree: [{ id: '1', numero: 'BE001' }] };
      
      jest.spyOn(bonsdentree, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.getBonsDentree(mockMetadatas);
      
      expect(bonsdentree.get).toHaveBeenCalledWith('/api/bons-dentree', mockMetadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should get all bons d\'entrée through getAll method', async () => {
      const mockMetadatas = new Metadatas();
      const mockResponse = { bonsDentree: [{ id: '1', numero: 'BE001' }] };
      
      jest.spyOn(bonsdentree, 'getBonsDentree').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.getAll(mockMetadatas);
      
      expect(bonsdentree.getBonsDentree).toHaveBeenCalledWith(mockMetadatas);
      expect(result).toEqual(mockResponse);
    });

    it('should get bon d\'entrée by ID with getBonDentree method', async () => {
      const mockResponse = { id: '123', numero: 'BE001', statut: 'draft' };
      
      jest.spyOn(bonsdentree, 'get').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.getBonDentree('123');
      
      expect(bonsdentree.get).toHaveBeenCalledWith('/api/bons-dentree/123', expect.any(Metadatas), {});
      expect(result).toEqual(mockResponse);
    });

    it('should get bon d\'entrée by ID through getById method', async () => {
      const mockResponse = { id: '123', numero: 'BE001', statut: 'draft' };
      
      jest.spyOn(bonsdentree, 'getBonDentree').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.getById(123);
      
      expect(bonsdentree.getBonDentree).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockResponse);
    });

    it('should create bons d\'entrée', async () => {
      const mockBonDentree = { numero: 'BE002', statut: 'draft' };
      const mockResponse = { success: true, bonDentree: mockBonDentree };
      
      jest.spyOn(bonsdentree, 'post').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.create(mockBonDentree);
      
      expect(bonsdentree.post).toHaveBeenCalledWith('/api/bons-dentree', { datas: mockBonDentree });
      expect(result).toEqual(mockResponse);
    });

    it('should create array of bons d\'entrée', async () => {
      const mockBonsDentree = [
        { numero: 'BE002', statut: 'draft' },
        { numero: 'BE003', statut: 'draft' }
      ];
      const mockResponse = { success: true, bonsDentree: mockBonsDentree };
      
      jest.spyOn(bonsdentree, 'post').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.create(mockBonsDentree);
      
      expect(bonsdentree.post).toHaveBeenCalledWith('/api/bons-dentree', { datas: mockBonsDentree });
      expect(result).toEqual(mockResponse);
    });

    it('should update a bon d\'entrée', async () => {
      const mockBonDentree = { id: '123', numero: 'BE001', statut: 'validated' };
      const mockResponse = { success: true, bonDentree: mockBonDentree };
      
      jest.spyOn(bonsdentree, 'put').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.update(mockBonDentree);
      
      expect(bonsdentree.put).toHaveBeenCalledWith('/api/bons-dentree/123', { datas: mockBonDentree });
      expect(result).toEqual(mockResponse);
    });

    it('should remove a bon d\'entrée', async () => {
      const mockBonDentree = { id: '123', numero: 'BE001' };
      const mockResponse = { success: true };
      
      jest.spyOn(bonsdentree, 'delete').mockResolvedValue(mockResponse);
      
      const result = await bonsdentree.remove(mockBonDentree);
      
      expect(bonsdentree.delete).toHaveBeenCalledWith('/api/bons-dentree/123');
      expect(result).toEqual(mockResponse);
    });
  });

});
