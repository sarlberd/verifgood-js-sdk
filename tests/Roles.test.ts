import { Roles } from '../src/apiRequests/Roles';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { RoleCreateRequest, RoleUpdateRequest } from '../src/types/Roles';

describe('Roles Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const roles = new Roles(mockAuth, 'https://api.example.com');

  // Mock sessionStorage for Node.js environment
  const mockSessionStorage = {
    clear: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    length: 0,
    key: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup sessionStorage mock
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });
    // Clear sessionStorage mock
    mockSessionStorage.clear();
    mockSessionStorage.getItem.mockReturnValue(null);
    // Clear global app context
    delete (globalThis as any).$app;
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(roles.endpoint).toBe('/api/roles');
      expect(roles.endpointSingleton).toBe('/api/role');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(roles.auth).toBe(mockAuth);
      expect(roles.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Role Permission Methods', () => {
    describe('can', () => {
      it('should return true when user has permission (global app context)', () => {
        // Mock global app context
        (globalThis as any).$app = { role: 'ROLE_ADMIN' };
        
        expect(roles.can('READ')).toBe(true);
        expect(roles.can('EQUIPEMENT.CREATE')).toBe(true);
        expect(roles.can('PARAMETRES.UPDATE_PASSWORD')).toBe(true);
      });

      it('should return false when user does not have permission (global app context)', () => {
        // Mock global app context
        (globalThis as any).$app = { role: 'ROLE_FEMME_CHAMBRE' };
        
        expect(roles.can('READ')).toBe(false);
        expect(roles.can('EQUIPEMENT.CREATE')).toBe(false);
      });

      it('should return true when user has permission (sessionStorage fallback)', () => {
        mockSessionStorage.getItem.mockReturnValue(JSON.stringify({ role: 'ROLE_ADMIN' }));
        
        expect(roles.can('READ')).toBe(true);
        expect(roles.can('EQUIPEMENT.CREATE')).toBe(true);
      });

      it('should return false and show alert when user does not have permission (sessionStorage)', () => {
        // Mock alert globally
        const alertSpy = jest.fn();
        Object.defineProperty(globalThis, 'alert', {
          value: alertSpy,
          writable: true
        });
        mockSessionStorage.getItem.mockReturnValue(JSON.stringify({ role: 'ROLE_FEMME_CHAMBRE' }));
        
        expect(roles.can('READ')).toBe(false);
        expect(alertSpy).toHaveBeenCalled();
      });

      it('should return true when no user in sessionStorage', () => {
        mockSessionStorage.getItem.mockReturnValue(null);
        expect(roles.can('READ')).toBe(true);
      });

      it('should handle invalid JSON in sessionStorage', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockSessionStorage.getItem.mockReturnValue('invalid json');
        
        expect(roles.can('READ')).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error parsing user from sessionStorage:', expect.any(Error));
        
        consoleSpy.mockRestore();
      });

      it('should handle non-existent rules', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        (globalThis as any).$app = { role: 'ROLE_ADMIN' };
        
        expect(roles.can('NON_EXISTENT.RULE')).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith("-----------------------------> ! RULE EXIST", ["NON_EXISTENT", "RULE"]);
        
        consoleSpy.mockRestore();
      });
    });

    describe('getRoleRules', () => {
      it('should return empty object (placeholder implementation)', () => {
        expect(roles.getRoleRules('ROLE_ADMIN')).toEqual({});
      });
    });

    describe('getRoleFromStorage', () => {
      it('should return null (placeholder implementation)', () => {
        expect(roles.getRoleFromStorage()).toBe(null);
      });
    });
  });

});
