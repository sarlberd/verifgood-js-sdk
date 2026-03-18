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

  describe('Non-CRUD Methods', () => {
    describe('getTiers', () => {
      it('should get tiers with metadatas and options', async () => {
        const mockResponse = { success: true, data: [] };
        const metadatas = new Metadatas();

        jest.spyOn(tiers, 'get').mockResolvedValue(mockResponse);

        const result = await tiers.getTiers(metadatas, { sites: 'test-site', userId: 'user-123' });

        expect(tiers.get).toHaveBeenCalledWith(
          '/api/tiers',
          metadatas,
          { sites: 'test-site', userId: 'user-123' }
        );
        expect(result).toEqual(mockResponse);
      });

      it('should get tiers with default options', async () => {
        const mockResponse = { success: true, data: [] };
        const metadatas = new Metadatas();

        jest.spyOn(tiers, 'get').mockResolvedValue(mockResponse);

        const result = await tiers.getTiers(metadatas);

        expect(tiers.get).toHaveBeenCalledWith(
          '/api/tiers',
          metadatas,
          { sites: null, userId: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getTiersById', () => {
      it('should get single tier by ID', async () => {
        const mockResponse = { success: true, data: {} };
        const tierId = 123;

        jest.spyOn(tiers, 'get').mockResolvedValue(mockResponse);

        const result = await tiers.getTiersById(tierId);

        expect(tiers.get).toHaveBeenCalledWith(
          '/api/tiers/123',
          expect.any(Metadatas),
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateTier', () => {
      it('should update tier with datas wrapper', async () => {
        const mockResponse = { success: true };
        const mockTier = {
          id: 123,
          name: 'Updated Tier',
          isArchived: '0'
        };

        jest.spyOn(tiers, 'put').mockResolvedValue(mockResponse);

        const result = await tiers.updateTier(mockTier);

        expect(tiers.put).toHaveBeenCalledWith(
          '/api/tiers/123',
          { datas: mockTier }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createTier', () => {
      it('should create tier with datas array wrapper', async () => {
        const mockResponse = { success: true };
        const mockData: TierCreateRequest = {
          name: 'New Tier',
          isArchived: '0'
        };

        jest.spyOn(tiers, 'post').mockResolvedValue(mockResponse);

        const result = await tiers.createTier(mockData);

        expect(tiers.post).toHaveBeenCalledWith(
          '/api/tiers',
          { datas: [mockData] }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteTier', () => {
      it('should delete tier without userId', async () => {
        const mockResponse = { success: true };
        const mockTier = { id: 123 };

        jest.spyOn(tiers, 'delete').mockResolvedValue(mockResponse);

        const result = await tiers.deleteTier(mockTier);

        expect(tiers.delete).toHaveBeenCalledWith('/api/tiers/123');
        expect(result).toEqual(mockResponse);
      });

      it('should delete tier with userId', async () => {
        const mockResponse = { success: true };
        const mockTier = { id: 123 };

        jest.spyOn(tiers, 'delete').mockResolvedValue(mockResponse);

        const result = await tiers.deleteTier(mockTier, 'user-456');

        expect(tiers.delete).toHaveBeenCalledWith('/api/tiers/123?userId=user-456');
        expect(result).toEqual(mockResponse);
      });
    });

    describe('archive', () => {
      it('should archive tier by setting isArchived to 1', async () => {
        const mockResponse = { success: true };
        const mockTier = { id: 123 };

        jest.spyOn(tiers, 'put').mockResolvedValue(mockResponse);

        const result = await tiers.archive(mockTier);

        expect(tiers.put).toHaveBeenCalledWith(
          '/api/tiers/123',
          {
            datas: {
              id: 123,
              isArchived: '1'
            }
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('unarchive', () => {
      it('should unarchive tier by setting isArchived to 0', async () => {
        const mockResponse = { success: true };
        const mockTier = { id: 123 };

        jest.spyOn(tiers, 'put').mockResolvedValue(mockResponse);

        const result = await tiers.unarchive(mockTier);

        expect(tiers.put).toHaveBeenCalledWith(
          '/api/tiers/123',
          {
            datas: {
              id: 123,
              isArchived: '0'
            }
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
