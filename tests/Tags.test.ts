import { Tags } from '../src/apiRequests/Tags';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { TagCreateRequest, TagUpdateRequest } from '../src/types/Tags';

describe('Tags API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const tags = new Tags(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('../src/core/ApiRequest').ApiRequest.prototype, 'apiRequest').mockImplementation(jest.fn(() => Promise.resolve({})));
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(tags.endpoint).toBe('/api/tags');
      expect(tags.endpointSingleton).toBe('/api/tags');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(tags.auth).toBe(mockAuth);
      expect(tags.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
