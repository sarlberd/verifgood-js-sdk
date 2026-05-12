import { Contact } from '../src/apiRequests/Contact';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { ContacCreateRequest, ContacUpdateRequest } from '../src/types/Contact';

describe('Contact API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const contact = new Contact(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(contact.endpoint).toBe('/api/contacts');
      expect(contact.endpointSingleton).toBe('/api/contact');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(contact.auth).toBe(mockAuth);
      expect(contact.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
