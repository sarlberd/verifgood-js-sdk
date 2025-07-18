---
to: tests/<%= name %>.test.ts
---
import { <%= name %> } from '../src/apiRequests/<%= name %>';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { <%= name.slice(0, -1) %>CreateRequest, <%= name.slice(0, -1) %>UpdateRequest } from '../src/types/<%= name %>';

describe('<%= name %> API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const <%= name.toLowerCase() %> = new <%= name %>(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(<%= name.toLowerCase() %>.endpoint).toBe('<%= endpoint %>');
      expect(<%= name.toLowerCase() %>.endpointSingleton).toBe('<%= endpointSingleton %>');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(<%= name.toLowerCase() %>.auth).toBe(mockAuth);
      expect(<%= name.toLowerCase() %>.apiBaseUrl).toBe('https://api.example.com');
    });
  });

});
