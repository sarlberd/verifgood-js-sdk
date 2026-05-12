import { GroupeValidateurs } from '../src/apiRequests/GroupeValidateurs';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { GroupeValidateurCreateRequest, GroupeValidateurUpdateRequest } from '../src/types/GroupeValidateurs';

describe('GroupeValidateurs API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const groupevalidateurs = new GroupeValidateurs(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(groupevalidateurs.endpoint).toBe('/api/groupe-validateurs');
      expect(groupevalidateurs.endpointSingleton).toBe('/api/groupe-validateur');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(groupevalidateurs.auth).toBe(mockAuth);
      expect(groupevalidateurs.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
