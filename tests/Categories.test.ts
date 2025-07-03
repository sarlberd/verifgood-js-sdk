import { Categories } from '../src/apiRequests/Categories';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

describe('Categories API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const categories = new Categories(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(categories.endpoint).toBe('/api/categories');
      expect(categories.endpointSingleton).toBe('/api/categorie');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(categories.auth).toBe(mockAuth);
      expect(categories.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('associateComposant', () => {
    it('should associate a composant with a category', async () => {
      const mockResponse = { success: true };
      const composant = { id: 1, name: 'Test Composant' };
      
      jest.spyOn(categories, 'post').mockResolvedValue(mockResponse);

      const result = await categories.associateComposant(123, composant);

      expect(categories.post).toHaveBeenCalledWith('/api/categorie/123/composants', { datas: [composant] });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('desassociateComposant', () => {
    it('should disassociate a composant from a category', async () => {
      const mockResponse = { success: true };
      
      jest.spyOn(categories, 'delete').mockResolvedValue(mockResponse);

      const result = await categories.desassociateComposant(456);

      expect(categories.delete).toHaveBeenCalledWith('/api/composant-categorie/456');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateCollection', () => {
    it('should update multiple categories', async () => {
      const mockResponse = { success: true };
      const categoriesToUpdate = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' }
      ];
      
      jest.spyOn(categories, 'put').mockResolvedValue(mockResponse);

      const result = await categories.updateCollection(categoriesToUpdate);

      expect(categories.put).toHaveBeenCalledWith('/api/categories', { datas: categoriesToUpdate });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('associate (deprecated)', () => {
    it('should handle association and disassociation of composants', async () => {
      jest.spyOn(categories, 'postAssociatedComposants').mockResolvedValue({ success: true });
      jest.spyOn(categories, 'deleteAssociatedComposants').mockResolvedValue({ success: true });

      const composants = {
        toAssociate: [{ id: 1 }],
        toDesassociate: [{ id: 2 }]
      };

      await categories.associate(123, composants);

      expect(categories.postAssociatedComposants).toHaveBeenCalledWith(123, [{ id: 1 }]);
      expect(categories.deleteAssociatedComposants).toHaveBeenCalledWith(123, [{ id: 2 }]);
    });

    it('should skip empty arrays', async () => {
      jest.spyOn(categories, 'postAssociatedComposants').mockResolvedValue({ success: true });
      jest.spyOn(categories, 'deleteAssociatedComposants').mockResolvedValue({ success: true });

      await categories.associate(123, {});

      expect(categories.postAssociatedComposants).not.toHaveBeenCalled();
      expect(categories.deleteAssociatedComposants).not.toHaveBeenCalled();
    });
  });

  describe('postAssociatedComposants (deprecated)', () => {
    it('should post associated composants', async () => {
      const mockResponse = { success: true };
      const composants = [{ id: 1 }, { id: 2 }];
      
      jest.spyOn(categories, 'post').mockResolvedValue(mockResponse);

      const result = await categories.postAssociatedComposants(123, composants);

      expect(categories.post).toHaveBeenCalledWith('/api/categorie/123/composants', { datas: composants });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('exportFile', () => {
    it('should export categories file with default parameters', async () => {
      const mockResponse = "mock,data";
      const metadatas = new Metadatas();
      
      jest.spyOn(categories, 'get').mockResolvedValue(mockResponse);
      jest.spyOn(metadatas, 'setDirectives').mockReturnValue(metadatas);

      const result = await categories.exportFile(metadatas);

      expect(categories.get).toHaveBeenCalledWith('/api/categories/export/lieux/excel', metadatas, {});
      expect(result).toBeInstanceOf(Blob);
    });

    it('should export categories file with custom parameters', async () => {
      const mockResponse = "mock,data";
      const metadatas = new Metadatas();
      
      jest.spyOn(categories, 'get').mockResolvedValue(mockResponse);
      jest.spyOn(metadatas, 'setDirectives').mockReturnValue(metadatas);

      const result = await categories.exportFile(metadatas, 'equipements', 'custom', 'csv');

      expect(categories.get).toHaveBeenCalledWith('/api/categories/export/equipements/csv', metadatas, {});
      expect(result).toBeInstanceOf(Blob);
    });
  });

  describe('deleteAssociatedComposants (deprecated)', () => {
    it('should delete associated composants', async () => {
      const mockResponse = { success: true };
      const composants = [{ id: 1 }, { id: 2 }];
      
      jest.spyOn(categories, 'apiRequest').mockResolvedValue(mockResponse);

      const result = await categories.deleteAssociatedComposants(123, composants);

      expect(categories.apiRequest).toHaveBeenCalledWith('/api/categorie/123/composants', 'DELETE', { datas: composants });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchCategoriesLieux (deprecated)', () => {
    it('should fetch categories lieux', async () => {
      const mockResponse = { success: true };
      
      jest.spyOn(categories, 'get').mockResolvedValue(mockResponse);

      const result = await categories.fetchCategoriesLieux();

      expect(categories.get).toHaveBeenCalledWith('/api/categorieslieux', expect.any(Metadatas), {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCategoriesWithDetails (deprecated)', () => {
    it('should get categories with details using provided metadatas', async () => {
      const mockResponse = { success: true };
      const metadatas = new Metadatas();
      
      jest.spyOn(categories, 'getAll').mockResolvedValue(mockResponse);

      const result = await categories.getCategoriesWithDetails(metadatas);

      expect(categories.getAll).toHaveBeenCalledWith(metadatas);
      expect(result).toEqual(mockResponse);
    });

    it('should get categories with details using default metadatas', async () => {
      const mockResponse = { success: true };
      
      jest.spyOn(categories, 'getAll').mockResolvedValue(mockResponse);

      const result = await categories.getCategoriesWithDetails();

      expect(categories.getAll).toHaveBeenCalledWith(expect.any(Metadatas));
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addCorpsDetat', () => {
    it('should add corps detat to category association', async () => {
      const mockResponse = { success: true };
      
      jest.spyOn(categories, 'post').mockResolvedValue(mockResponse);

      const result = await categories.addCorpsDetat(123, 456);

      expect(categories.post).toHaveBeenCalledWith('/api/corps-detats-categories', {
        datas: [{
          categorie_id: 123,
          corpsDetat_id: 456
        }]
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
