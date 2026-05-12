---
to: tests/<%= name %>.test.ts
---
import { <%= name %> } from '<%= importPath %>';
<% if (testType === 'api-service') { -%>
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
<% } -%>

describe('<%= name %> Class', () => {
<% if (testType === 'api-service') { -%>
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const <%= name.toLowerCase() %> = new <%= name %>(mockAuth, 'https://api.example.com');
<% } else { -%>
  let <%= name.toLowerCase() %>: <%= name %>;
<% } -%>

<% if (needsMocks) { -%>
  beforeEach(() => {
    jest.clearAllMocks();
<% if (testType !== 'api-service') { -%>
    // Initialize your class instance here
    // <%= name.toLowerCase() %> = new <%= name %>();
<% } -%>
  });

<% } -%>
  describe('Constructor', () => {
    it('should initialize correctly', () => {
<% if (testType === 'api-service') { -%>
      expect(<%= name.toLowerCase() %>.auth).toBe(mockAuth);
      expect(<%= name.toLowerCase() %>.apiBaseUrl).toBe('https://api.example.com');
<% } else { -%>
      // Add constructor tests here
      expect(<%= name.toLowerCase() %>).toBeDefined();
<% } -%>
    });
  });

<% if (methods && methods.length > 0) { -%>
  describe('Methods', () => {
<% methods.forEach(function(method) { -%>
    describe('<%= method %>', () => {
      it('should <%= method %> correctly', async () => {
        // TODO: Implement test for <%= method %>
<% if (testType === 'api-service') { -%>
        const mockMetadatas = new Metadatas();
        const mockSpy = jest.spyOn(<%= name.toLowerCase() %>, 'apiRequest').mockResolvedValue('mockResponse');

        const response = await <%= name.toLowerCase() %>.<%= method %>(mockMetadatas);

        expect(mockSpy).toHaveBeenCalled();
        expect(response).toBe('mockResponse');
<% } else { -%>
        // Add your test implementation here
        expect(true).toBe(true); // Placeholder
<% } -%>
      });

      it('should handle errors in <%= method %>', async () => {
        // TODO: Implement error handling test for <%= method %>
<% if (testType === 'api-service') { -%>
        const mockError = new Error('Test error');
        jest.spyOn(<%= name.toLowerCase() %>, 'apiRequest').mockRejectedValue(mockError);

        await expect(<%= name.toLowerCase() %>.<%= method %>(new Metadatas())).rejects.toThrow('Test error');
<% } else { -%>
        // Add your error test implementation here
        expect(true).toBe(true); // Placeholder
<% } -%>
      });
    });

<% }); -%>
  });
<% } else { -%>
  describe('Methods', () => {
    it('should have required methods', () => {
      // TODO: Add method tests
      expect(<%= name.toLowerCase() %>).toBeDefined();
    });
  });
<% } -%>
});
