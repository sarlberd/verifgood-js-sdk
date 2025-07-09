import { GroupeValidateursUsers } from '../src/apiRequests/GroupeValidateursUsers';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { GroupeValidateursUserCreateRequest, GroupeValidateursUserUpdateRequest } from '../src/types/GroupeValidateursUsers';

describe('GroupeValidateursUsers API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const groupevalidateursusers = new GroupeValidateursUsers(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(groupevalidateursusers.endpoint).toBe('/api/groupe-validateurs-users');
      expect(groupevalidateursusers.endpointSingleton).toBe('/api/groupe-validateur-user');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(groupevalidateursusers.auth).toBe(mockAuth);
      expect(groupevalidateursusers.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
