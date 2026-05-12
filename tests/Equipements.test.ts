import { Equipements } from '../src/apiRequests/Equipements';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { EquipementCreateRequest, EquipementUpdateRequest } from '../src/types/Equipements';

describe('Equipements API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const equipements = new Equipements(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(equipements.endpoint).toBe('/api/equipements');
      expect(equipements.endpointSingleton).toBe('/api/equipement');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(equipements.auth).toBe(mockAuth);
      expect(equipements.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
