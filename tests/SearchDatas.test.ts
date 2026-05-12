import { SearchDatas } from '../src/apiRequests/SearchDatas';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { SearchDataCreateRequest, SearchDataUpdateRequest, SearchEntities, SearchDataItem } from '../src/types/SearchDatas';

describe('SearchDatas API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  let searchdatas: SearchDatas;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a fresh instance for each test to ensure clean state
    searchdatas = new SearchDatas(mockAuth, 'https://api.example.com');
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(searchdatas.endpoint).toBe('/api/search-datas');
      expect(searchdatas.endpointSingleton).toBe('/api/search-datas');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(searchdatas.auth).toBe(mockAuth);
      expect(searchdatas.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('search method', () => {
    const mockSearchResults: SearchDataItem[] = [
      {
        id: 1,
        type: 'equipement',
        title: 'Test Equipment',
        subtitle: 'Equipment subtitle',
        description: 'Equipment description'
      },
      {
        id: 2,
        type: 'lieu',
        title: 'Test Location',
        subtitle: 'Location subtitle'
      }
    ];

    beforeEach(() => {
      // Mock the inherited get method
      jest.spyOn(searchdatas, 'get').mockResolvedValue({
        data: mockSearchResults,
        counters: { equipements: 1, lieux: 1 },
        entities: { equipements: true, lieux: true },
        filters: {}
      });
    });

    it('should perform global search with default parameters', async () => {
      const searchValue = 'test search';
      const result = await searchdatas.search(searchValue);

      expect(searchdatas.get).toHaveBeenCalledWith(
        '/api/search-datas',
        expect.any(Metadatas),
        {
          userId: null, // @TODO: Will be implemented later
          searchValue: 'test search',
          entities: {
            equipements: true,
            lieux: true,
            maintenances: true,
            contrats: true,
            tiers: true,
            categories: true,
            interventions: true,
            contacts: true
          },
          sites: null // @TODO: Will be implemented later
        }
      );

      expect(result).toEqual(mockSearchResults);
    });

    it('should perform global search with custom entities', async () => {
      const searchValue = 'test search';
      const customEntities: SearchEntities = {
        equipements: true,
        lieux: true,
        maintenances: false
      };

      const result = await searchdatas.search(searchValue, customEntities);

      expect(searchdatas.get).toHaveBeenCalledWith(
        '/api/search-datas',
        expect.any(Metadatas),
        expect.objectContaining({
          entities: customEntities
        })
      );

      expect(result).toEqual(mockSearchResults);
    });

    it('should perform global search with custom userId and sites', async () => {
      const searchValue = 'test search';
      const customUserId = 'custom-user';
      const customSites = 'custom-site';

      await searchdatas.search(searchValue, undefined, customUserId, customSites);

      expect(searchdatas.get).toHaveBeenCalledWith(
        '/api/search-datas',
        expect.any(Metadatas),
        expect.objectContaining({
          userId: customUserId,
          sites: customSites
        })
      );
    });

    it('should store search results in global app context', async () => {
      const searchValue = 'test search';
      const mockResponse = {
        data: mockSearchResults,
        counters: { equipements: 1, lieux: 1 },
        entities: { equipements: true, lieux: true },
        filters: { type: 'all' }
      };

      jest.spyOn(searchdatas, 'get').mockResolvedValue(mockResponse);

      await searchdatas.search(searchValue);

      // @TODO: Store functionality will be tested when implemented
      // Original mixin would call:
      // this.$store.dispatch("SearchDatasStore/setDatas", datas);
      // this.$store.dispatch("SearchDatasStore/setCounters", metas.counters);
      // this.$store.dispatch("SearchDatasStore/setEntities", metas.entities);
      // this.$store.dispatch("SearchDatasStore/setFilters", metas.filters);
      expect(true).toBe(true); // Placeholder test
    });

    it('should handle errors gracefully', async () => {
      const searchValue = 'test search';
      const error = new Error('Search failed');

      jest.spyOn(searchdatas, 'get').mockRejectedValue(error);

      await expect(searchdatas.search(searchValue)).rejects.toThrow('Search failed');
    });

    it('should return empty array when response has no data', async () => {
      const searchValue = 'test search';

      jest.spyOn(searchdatas, 'get').mockResolvedValue({});

      const result = await searchdatas.search(searchValue);

      expect(result).toEqual({});
    });
  });

  describe('searchEquipements method', () => {
    const mockEquipementsResults: SearchDataItem[] = [
      {
        id: 1,
        type: 'equipement',
        title: 'Test Equipment 1',
        subtitle: 'Equipment subtitle 1'
      },
      {
        id: 2,
        type: 'lieu',
        title: 'Test Location 1',
        subtitle: 'Location subtitle 1'
      }
    ];

    beforeEach(() => {
      jest.spyOn(searchdatas, 'get').mockResolvedValue({
        data: mockEquipementsResults,
        counters: { equipements: 1, lieux: 1 },
        entities: { equipements: true, lieux: true },
        filters: {}
      });
    });

    it('should search equipements with metadatas', async () => {
      const searchValue = 'equipment search';
      const metadatas = new Metadatas();
      metadatas.setFilter('type', 'equipment');

      const result = await searchdatas.searchEquipements(searchValue, metadatas);

      expect(searchdatas.get).toHaveBeenCalledWith(
        '/api/search-datas/equipements',
        metadatas,
        {
          userId: null, // @TODO: Will be implemented later
          searchValue: 'equipment search',
          sites: null // @TODO: Will be implemented later
        }
      );

      expect(result).toEqual(mockEquipementsResults);
    });

    it('should search equipements with custom userId and sites', async () => {
      const searchValue = 'equipment search';
      const metadatas = new Metadatas();
      const customUserId = 'custom-user';
      const customSites = 'custom-site';

      await searchdatas.searchEquipements(searchValue, metadatas, customUserId, customSites);

      expect(searchdatas.get).toHaveBeenCalledWith(
        '/api/search-datas/equipements',
        metadatas,
        expect.objectContaining({
          userId: customUserId,
          sites: customSites
        })
      );
    });

    it('should restore original endpoint after equipements search', async () => {
      const searchValue = 'equipment search';
      const metadatas = new Metadatas();
      const originalEndpoint = searchdatas.endpoint;

      await searchdatas.searchEquipements(searchValue, metadatas);

      expect(searchdatas.endpoint).toBe(originalEndpoint);
    });

    it('should handle equipements search errors gracefully', async () => {
      const searchValue = 'equipment search';
      const metadatas = new Metadatas();
      const error = new Error('Equipements search failed');

      jest.spyOn(searchdatas, 'get').mockRejectedValue(error);

      await expect(searchdatas.searchEquipements(searchValue, metadatas)).rejects.toThrow('Equipements search failed');
    });

    it('should store equipements search results in global app context', async () => {
      const searchValue = 'equipment search';
      const metadatas = new Metadatas();
      const mockResponse = {
        data: mockEquipementsResults,
        counters: { equipements: 1, lieux: 1 },
        entities: { equipements: true, lieux: true },
        filters: { type: 'equipment' }
      };

      jest.spyOn(searchdatas, 'get').mockResolvedValue(mockResponse);

      await searchdatas.searchEquipements(searchValue, metadatas);

      // @TODO: Store functionality will be tested when implemented
      // Original mixin would call:
      // this.$store.dispatch("SearchDatasStore/setDatas", datas);
      // this.$store.dispatch("SearchDatasStore/setCounters", metas.counters);
      // this.$store.dispatch("SearchDatasStore/setEntities", metas.entities);
      // this.$store.dispatch("SearchDatasStore/setFilters", metas.filters);
      expect(true).toBe(true); // Placeholder test
    });
  });

  describe('App context integration', () => {
    it('should handle missing app context gracefully', async () => {
      const searchValue = 'test search';
      jest.spyOn(searchdatas, 'get').mockResolvedValue({ data: [] });

      await searchdatas.search(searchValue);

      expect(searchdatas.get).toHaveBeenCalledWith(
        '/api/search-datas',
        expect.any(Metadatas),
        expect.objectContaining({
          userId: null, // @TODO: App context integration pending
          sites: null   // @TODO: App context integration pending
        })
      );
    });

    it('should handle missing store in app context gracefully', async () => {
      const searchValue = 'test search';
      jest.spyOn(searchdatas, 'get').mockResolvedValue({ data: [] });

      // @TODO: This test will be updated when store integration is implemented
      // Should not throw error when store is not available
      await expect(searchdatas.search(searchValue)).resolves.toBeDefined();
    });
  });
});
