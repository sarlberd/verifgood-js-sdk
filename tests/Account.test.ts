import { Account } from '../src/apiRequests/Account';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { Accoun, AccounCreateRequest, AccounUpdateRequest } from '../src/types/Account';

describe('Account API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  let account: Account;
  let mockApiRequest: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    account = new Account(mockAuth, 'https://api.example.com');
    mockApiRequest = jest.spyOn(account as any, 'apiRequest');
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(account.endpoint).toBe('/api/account');
      expect(account.endpointSingleton).toBe('/api/account');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(account.auth).toBe(mockAuth);
      expect(account['apiBaseUrl']).toBe('https://api.example.com');
    });
  });

  describe('updateAccount', () => {
    it('should update account information', async () => {
      const updateData: AccounUpdateRequest = {
        address: '123 Test St',
        immatriculation: 'TEST123'
      };
      
      const mockResponse: Accoun = {
        id: '1',
        ...updateData
      };

      mockApiRequest.mockResolvedValueOnce(mockResponse);

      const result = await account.updateAccount(updateData);

      expect(mockApiRequest).toHaveBeenCalledWith(
        '/api/account',
        'PUT',
        { datas: updateData }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchAccount', () => {
    it('should fetch account information', async () => {
      const mockResponse: Accoun = {
        id: '1',
        address: '123 Test St',
        immatriculation: 'TEST123'
      };

      mockApiRequest.mockResolvedValueOnce(mockResponse);

      const result = await account.fetchAccount();

      expect(mockApiRequest).toHaveBeenCalledWith(
        '/api/account',
        'GET',
        null
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createAccount', () => {
    it('should create a new account', async () => {
      const createData: AccounCreateRequest = {
        address: '123 Test St',
        immatriculation: 'TEST123'
      };
      
      const mockResponse: Accoun = {
        id: '1',
        ...createData
      };

      // Mock navigator.language
      Object.defineProperty(global, 'navigator', {
        value: { language: 'en' },
        writable: true
      });

      mockApiRequest.mockResolvedValueOnce(mockResponse);

      const result = await account.createAccount(createData);

      expect(mockApiRequest).toHaveBeenCalledWith(
        '/cfae5733-8860-48d6-8346-693a93816c6e/account/en',
        'POST',
        { datas: createData }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  // Test CRUD methods from base class
  describe('CRUD Operations', () => {
    it('should get all accounts', async () => {
      const mockResponse: Accoun[] = [
        { id: '1', address: '123 Test St', immatriculation: 'TEST123' },
        { id: '2', address: '456 Test Ave', immatriculation: 'TEST456' }
      ];

      const mockGetAll = jest.spyOn(account as any, 'getAll');
      mockGetAll.mockResolvedValueOnce(mockResponse);

      const result = await account.getAll(new Metadatas());

      expect(mockGetAll).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should get account by id', async () => {
      const accountId = 1;
      const mockResponse: Accoun = {
        id: accountId.toString(),
        address: '123 Test St',
        immatriculation: 'TEST123'
      };

      const mockGetById = jest.spyOn(account as any, 'getById');
      mockGetById.mockResolvedValueOnce(mockResponse);

      const result = await account.getById(accountId);

      expect(mockGetById).toHaveBeenCalledWith(accountId);
      expect(result).toEqual(mockResponse);
    });

    it('should remove an account', async () => {
      const accountId = 1;
      const mockRemove = jest.spyOn(account as any, 'remove');
      mockRemove.mockResolvedValueOnce(undefined);

      await account.remove(accountId);

      expect(mockRemove).toHaveBeenCalledWith(accountId);
    });
  });
});
