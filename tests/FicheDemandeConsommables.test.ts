import { FicheDemandeConsommables } from '../src/apiRequests/FicheDemandeConsommables';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { FicheDemandeConsommableCreateRequest, FicheDemandeConsommableUpdateRequest } from '../src/types/FicheDemandeConsommables';

describe('FicheDemandeConsommables API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const fichedemandeconsommables = new FicheDemandeConsommables(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(fichedemandeconsommables.endpoint).toBe('/api/fiche-demande-consommables');
      expect(fichedemandeconsommables.endpointSingleton).toBe('/api/fiche-demande-consommables');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(fichedemandeconsommables.auth).toBe(mockAuth);
      expect(fichedemandeconsommables.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
