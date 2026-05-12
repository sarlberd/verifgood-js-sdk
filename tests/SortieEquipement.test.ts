import { SortieEquipement } from '../src/apiRequests/SortieEquipement';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { SortieEquipemenCreateRequest, SortieEquipemenUpdateRequest } from '../src/types/SortieEquipement';

describe('SortieEquipement API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  let sortieequipement: SortieEquipement;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a fresh instance for each test to ensure clean state
    sortieequipement = new SortieEquipement(mockAuth, 'https://api.example.com');
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(sortieequipement.endpoint).toBe('/api/sortieequipement');
      expect(sortieequipement.endpointSingleton).toBe('/api/sortieequipement');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(sortieequipement.auth).toBe(mockAuth);
      expect(sortieequipement.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getTypes method', () => {
    const mockTypesData = [
      { id: 1, name: 'Maintenance Exit', code: 'MAINT_EXIT' },
      { id: 2, name: 'Repair Exit', code: 'REPAIR_EXIT' },
      { id: 3, name: 'Disposal Exit', code: 'DISPOSAL_EXIT' }
    ];

    const mockMetadata = {
      total: 3,
      page: 1,
      limit: 10
    };

    beforeEach(() => {
      // Mock the inherited get method
      jest.spyOn(sortieequipement, 'get').mockResolvedValue({
        data: mockTypesData,
        meta: mockMetadata
      });
    });

    it('should get equipment output types with metadatas', async () => {
      const metadatas = new Metadatas();
      metadatas.setFilter('active', 1);

      const result = await sortieequipement.getTypes(metadatas);

      expect(sortieequipement.get).toHaveBeenCalledWith(
        '/api/sortieequipement/types',
        metadatas,
        {
          userId: null // @TODO: Will be implemented when app context is ready
        }
      );

      expect(result).toEqual({
        datas: mockTypesData,
        metadatas: mockMetadata
      });
    });

    it('should restore original endpoint after getTypes call', async () => {
      const metadatas = new Metadatas();
      const originalEndpoint = sortieequipement.endpoint;

      await sortieequipement.getTypes(metadatas);

      expect(sortieequipement.endpoint).toBe(originalEndpoint);
    });

    it('should handle response with different data structure', async () => {
      const metadatas = new Metadatas();
      const mockDirectResponse = mockTypesData;

      jest.spyOn(sortieequipement, 'get').mockResolvedValue(mockDirectResponse);

      const result = await sortieequipement.getTypes(metadatas);

      expect(result).toEqual({
        datas: mockDirectResponse,
        metadatas: {}
      });
    });

    it('should handle errors gracefully', async () => {
      const metadatas = new Metadatas();
      const error = new Error('Failed to fetch types');

      jest.spyOn(sortieequipement, 'get').mockRejectedValue(error);

      await expect(sortieequipement.getTypes(metadatas)).rejects.toThrow('Failed to fetch types');
    });

    it('should handle response with metadatas instead of meta', async () => {
      const metadatas = new Metadatas();
      const mockResponseWithMetadatas = {
        data: mockTypesData,
        metadatas: mockMetadata
      };

      jest.spyOn(sortieequipement, 'get').mockResolvedValue(mockResponseWithMetadatas);

      const result = await sortieequipement.getTypes(metadatas);

      expect(result).toEqual({
        datas: mockTypesData,
        metadatas: mockMetadata
      });
    });

    it('should work with empty metadatas', async () => {
      const metadatas = new Metadatas();

      await sortieequipement.getTypes(metadatas);

      expect(sortieequipement.get).toHaveBeenCalledWith(
        '/api/sortieequipement/types',
        metadatas,
        {
          userId: null
        }
      );
    });

    it('should call types endpoint correctly', async () => {
      const metadatas = new Metadatas();
      
      await sortieequipement.getTypes(metadatas);

      // Verify the endpoint was temporarily changed to types endpoint
      expect(sortieequipement.get).toHaveBeenCalledWith(
        '/api/sortieequipement/types',
        expect.any(Metadatas),
        expect.any(Object)
      );
    });
  });

  describe('App context integration', () => {
    it('should handle missing app context gracefully', async () => {
      const metadatas = new Metadatas();
      jest.spyOn(sortieequipement, 'get').mockResolvedValue({ data: [] });

      await sortieequipement.getTypes(metadatas);

      expect(sortieequipement.get).toHaveBeenCalledWith(
        '/api/sortieequipement/types',
        metadatas,
        expect.objectContaining({
          userId: null // @TODO: App context integration pending
        })
      );
    });
  });
});
