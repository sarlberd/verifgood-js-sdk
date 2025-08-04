import { Tiers } from '../src/apiRequests/Tiers';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { TierCreateRequest, TierUpdateRequest } from '../src/types/Tiers';

describe('Tiers API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const tiers = new Tiers(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('../src/core/ApiRequest').ApiRequest.prototype, 'apiRequest').mockImplementation(jest.fn(() => Promise.resolve({})));
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(tiers.endpoint).toBe('/api/tiers');
      expect(tiers.endpointSingleton).toBe('/api/tiers');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(tiers.auth).toBe(mockAuth);
      expect(tiers.apiBaseUrl).toBe('https://api.example.com');
    });
  });
});
