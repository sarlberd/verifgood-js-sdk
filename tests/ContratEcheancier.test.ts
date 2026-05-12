import { ContratEcheancier } from '../src/apiRequests/ContratEcheancier';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { ContratEcheancieCreateRequest, ContratEcheancieUpdateRequest } from '../src/types/ContratEcheancier';

describe('ContratEcheancier API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const contratecheancier = new ContratEcheancier(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(contratecheancier.endpoint).toBe('/api/contrats/echeances');
      expect(contratecheancier.endpointSingleton).toBe('/api/contrat/echeance');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(contratecheancier.auth).toBe(mockAuth);
      expect(contratecheancier.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    describe('getContratEcheances', () => {
      it('should get echeances for a specific contract', async () => {
        const mockResponse = { success: true, data: [] };
        const contratId = '123';
        
        jest.spyOn(contratecheancier, 'get').mockResolvedValue(mockResponse);

        const result = await contratecheancier.getContratEcheances(contratId);

        expect(contratecheancier.get).toHaveBeenCalledWith(
          `/api/contrat/${contratId}/echeances`,
          expect.any(Metadatas),
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('create', () => {
      it('should create contract echeances with userId parameter', async () => {
        const mockResponse = { success: true };
        const mockData: ContratEcheancieCreateRequest = {
          contratId: '123',
          dateEcheance: '2025-01-01',
          montant: 1000
        };
        
        jest.spyOn(contratecheancier, 'post').mockResolvedValue(mockResponse);

        const result = await contratecheancier.create(mockData);

        expect(contratecheancier.post).toHaveBeenCalledWith(
          '/api/contrats/echeances',
          mockData
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateContratEcheance', () => {
      it('should update contract echeance with userId parameter', async () => {
        const mockResponse = { success: true };
        const echeanceId = '456';
        const mockData: ContratEcheancieUpdateRequest = {
          montant: 1200,
          statut: 'updated'
        };
        
        jest.spyOn(contratecheancier, 'put').mockResolvedValue(mockResponse);

        const result = await contratecheancier.updateContratEcheance(echeanceId, mockData);

        expect(contratecheancier.put).toHaveBeenCalledWith(
          `/api/contrat/echeance/${echeanceId}`,
          mockData
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteContratEcheance', () => {
      it('should delete contract echeance with userId parameter', async () => {
        const mockResponse = { success: true };
        const echeanceId = '789';
        
        // Mock the parent delete method
        jest.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(contratecheancier)), 'delete').mockResolvedValue(mockResponse);

        const result = await contratecheancier.deleteContratEcheance(echeanceId);

        expect(Object.getPrototypeOf(Object.getPrototypeOf(contratecheancier)).delete).toHaveBeenCalledWith(
          `/api/contrat/echeance/${echeanceId}`
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

});
