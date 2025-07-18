import { IntegrationsDonnees } from '../src/apiRequests/IntegrationsDonnees';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { IntegrationsDonneeCreateRequest, IntegrationsDonneeUpdateRequest } from '../src/types/IntegrationsDonnees';

describe('IntegrationsDonnees API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const integrationsdonnees = new IntegrationsDonnees(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(integrationsdonnees.endpoint).toBe('/api/integration/categories/lieux');
      expect(integrationsdonnees.endpointSingleton).toBe('/api/integration/categories/lieux');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(integrationsdonnees.auth).toBe(mockAuth);
      expect(integrationsdonnees.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('categoriesLieux', () => {
    it('should call POST /api/integration/categories/lieux/json with csv payload', async () => {
      const mockComposants = ['test', 'data'];
      const mockResponse = { success: true };
      
      jest.spyOn(integrationsdonnees, 'post').mockResolvedValue(mockResponse);
      
      const result = await integrationsdonnees.categoriesLieux(mockComposants);
      
      expect(integrationsdonnees.post).toHaveBeenCalledWith('/api/integration/categories/lieux/json', {
        csv: mockComposants
      });
      expect(result).toBe(mockResponse);
    });
  });

});
