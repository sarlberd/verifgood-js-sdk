import { Contrat } from '../src/apiRequests/Contrat';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { ContraCreateRequest, ContraUpdateRequest } from '../src/types/Contrat';

describe('Contrat API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const contrat = new Contrat(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(contrat.endpoint).toBe('/api/contrats');
      expect(contrat.endpointSingleton).toBe('/api/contrat');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(contrat.auth).toBe(mockAuth);
      expect(contrat.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    describe('getContrats', () => {
      it('should get contracts with site restrictions', async () => {
        const mockResponse = { success: true, data: [] };
        const metadatas = new Metadatas();
        
        jest.spyOn(contrat, 'get').mockResolvedValue(mockResponse);

        const result = await contrat.getContrats(metadatas);

        expect(contrat.get).toHaveBeenCalledWith(
          '/api/contrats',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('fetchContrats (deprecated)', () => {
      it('should fetch contracts with metadatas', async () => {
        const mockResponse = { success: true, data: [] };
        const metadatas = {"directives":[],"filters":[]};
        
        jest.spyOn(contrat, 'get').mockResolvedValue(mockResponse);

        const result = await contrat.fetchContrats(metadatas);

        expect(contrat.get).toHaveBeenCalledWith(
          '/api/contrats',
          expect.any(Metadatas),
          { sites: null, metadatas: metadatas }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('fetchContrat (deprecated)', () => {
      it('should fetch single contract by ID', async () => {
        const mockResponse = { success: true, data: {} };
        const contractId = '123';
        
        jest.spyOn(contrat, 'get').mockResolvedValue(mockResponse);

        const result = await contrat.fetchContrat(contractId);

        expect(contrat.get).toHaveBeenCalledWith(
          `/api/contrat/${contractId}`,
          expect.any(Metadatas),
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('create', () => {
      it('should create contract with datas array wrapper', async () => {
        const mockResponse = { success: true };
        const mockData: ContraCreateRequest = {
          startDate: '2025-01-01',
          endDate: '2025-12-31'
        };
        
        jest.spyOn(contrat, 'post').mockResolvedValue(mockResponse);

        const result = await contrat.create(mockData);

        expect(contrat.post).toHaveBeenCalledWith(
          '/api/contrats',
          { datas: [mockData] }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateContrat', () => {
      it('should update contract removing tiers fields', async () => {
        const mockResponse = { success: true };
        const mockContrat = {
          id: '123',
          startDate: '2025-01-01',
          tiers_name: 'test',
          tiers_uid: 'test-uid'
        };
        
        jest.spyOn(contrat, 'put').mockResolvedValue(mockResponse);

        const result = await contrat.updateContrat(mockContrat);

        expect(contrat.put).toHaveBeenCalledWith(
          '/api/contrat/123',
          {
            id: '123',
            startDate: '2025-01-01'
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('archive', () => {
      it('should archive contract', async () => {
        const mockResponse = { success: true };
        const mockContrat = { id: '123' };
        
        jest.spyOn(contrat, 'put').mockResolvedValue(mockResponse);

        const result = await contrat.archive(mockContrat);

        expect(contrat.put).toHaveBeenCalledWith(
          '/api/contrat/123',
          {
            id: '123',
            isArchived: '1'
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteContrat (deprecated)', () => {
      it('should delete contract', async () => {
        const mockResponse = { success: true };
        const mockContrat = { id: '123' };
        
        // Mock the parent delete method
        jest.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(contrat)), 'delete').mockResolvedValue(mockResponse);

        const result = await contrat.deleteContrat(mockContrat);

        expect(Object.getPrototypeOf(Object.getPrototypeOf(contrat)).delete).toHaveBeenCalledWith(
          '/api/contrat/123'
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('attachCategoriesToContrat (deprecated)', () => {
      it('should attach categories to contract', async () => {
        const mockResponse = { success: true };
        const mockCategories = [{ id: 1, name: 'Category 1' }];
        
        jest.spyOn(contrat, 'post').mockResolvedValue(mockResponse);

        const result = await contrat.attachCategoriesToContrat(mockCategories);

        expect(contrat.post).toHaveBeenCalledWith(
          '/api/tier/contrat/categories',
          mockCategories
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('formatStatus (deprecated)', () => {
      it('should return placeholder message for status formatting', () => {
        const mockContrat = { id: '123', startDate: '2025-01-01', endDate: '2025-12-31' };
        
        const result = contrat.formatStatus(mockContrat);

        expect(result).toBe('Status formatting not implemented - move to client utilities');
      });
    });
  });

});
