import { Taches } from '../src/apiRequests/Taches';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

describe('Taches', () => {
  let taches: Taches;
  let mockAuth: Auth;

  beforeEach(() => {
    mockAuth = new Auth({
      apiBaseUrl: 'https://api.example.com',
      apiKey: 'test-api-key'
    });
    taches = new Taches(mockAuth, 'https://api.example.com');
  });

  describe('getTaches', () => {
    it('should fetch all taches without site restrictions', async () => {
      const metadatas = new Metadatas();
      const mockResponse = { 
        success: true,
        data: [
          { id: 1, title: 'Task 1', status: 'pending' },
          { id: 2, title: 'Task 2', status: 'completed' }
        ]
      };

      jest.spyOn(taches, 'get').mockResolvedValue(mockResponse);

      const result = await taches.getTaches(metadatas);

      expect(taches.get).toHaveBeenCalledWith(
        '/api/taches',
        metadatas,
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch taches with site restrictions', async () => {
      const metadatas = new Metadatas();
      const options = { restrictionSites: 'site1,site2' };
      const mockResponse = { success: true, data: [] };

      jest.spyOn(taches, 'get').mockResolvedValue(mockResponse);

      const result = await taches.getTaches(metadatas, options);

      expect(taches.get).toHaveBeenCalledWith(
        '/api/taches',
        metadatas,
        { sites: 'site1,site2' }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTache', () => {
    it('should fetch a single tache by ID', async () => {
      const id = 123;
      const mockResponse = { 
        success: true,
        data: { id: 123, title: 'Task Details', status: 'pending' }
      };

      jest.spyOn(taches, 'get').mockResolvedValue(mockResponse);

      const result = await taches.getTache(id);

      expect(taches.get).toHaveBeenCalledWith(
        '/api/tache/123',
        expect.any(Metadatas),
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createTaches', () => {
    it('should create multiple taches without site restrictions', async () => {
      const tachesData = [
        { title: 'New Task 1', status: 'pending' },
        { title: 'New Task 2', status: 'pending' }
      ];
      const mockResponse = { success: true, data: tachesData };

      jest.spyOn(taches, 'post').mockResolvedValue(mockResponse);

      const result = await taches.createTaches(tachesData);

      expect(taches.post).toHaveBeenCalledWith(
        '/api/taches',
        { datas: tachesData }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should create taches with site restrictions', async () => {
      const tachesData = [{ title: 'New Task', status: 'pending' }];
      const restrictionSites = 'site1,site2';
      const mockResponse = { success: true, data: tachesData };

      jest.spyOn(taches, 'post').mockResolvedValue(mockResponse);

      const result = await taches.createTaches(tachesData, restrictionSites);

      expect(taches.post).toHaveBeenCalledWith(
        '/api/taches',
        { datas: tachesData, restrictionSites: 'site1,site2' }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateTache', () => {
    it('should update a tache without tache sites', async () => {
      const tache = { 
        id: 123, 
        title: 'Updated Task', 
        status: 'completed',
        checkpoints: ['checkpoint1', 'checkpoint2'] // Should be removed
      };
      const mockResponse = { success: true, data: tache };

      jest.spyOn(taches, 'put').mockResolvedValue(mockResponse);

      const result = await taches.updateTache(tache);

      expect(taches.put).toHaveBeenCalledWith(
        '/api/tache/123',
        { 
          datas: { 
            id: 123, 
            title: 'Updated Task', 
            status: 'completed'
            // checkpoints should be removed
          }
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should update a tache with updated tache sites', async () => {
      const tache = { id: 123, title: 'Updated Task', checkpoints: [] };
      const updatedTacheSites = ['site1', 'site2'];
      const mockResponse = { success: true, data: tache };

      jest.spyOn(taches, 'put').mockResolvedValue(mockResponse);

      const result = await taches.updateTache(tache, updatedTacheSites);

      expect(taches.put).toHaveBeenCalledWith(
        '/api/tache/123',
        { 
          datas: { 
            id: 123, 
            title: 'Updated Task',
            tacheSites: ['site1', 'site2']
          }
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteTache', () => {
    it('should delete a tache', async () => {
      const tache = { id: 123, title: 'Task to Delete' };
      const mockResponse = { success: true };

      jest.spyOn(taches, 'delete').mockResolvedValue(mockResponse);

      const result = await taches.deleteTache(tache);

      expect(taches.delete).toHaveBeenCalledWith('/api/tache/123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getExcelFile', () => {
    it('should export taches to Excel in Node.js environment', async () => {
      const metadatas = new Metadatas();
      const filename = 'taches_export';
      const mockResponse = { success: true, data: 'export_data' };

      jest.spyOn(taches, 'get').mockResolvedValue(mockResponse);

      const result = await taches.getExcelFile(metadatas, filename, 'xlsx');

      expect(taches.get).toHaveBeenCalledWith(
        '/api/taches/export/excel',
        metadatas,
        { userId: null }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should export taches to CSV in Node.js environment', async () => {
      const metadatas = new Metadatas();
      const filename = 'taches_export';
      const mockResponse = { success: true, data: 'csv_data' };

      jest.spyOn(taches, 'get').mockResolvedValue(mockResponse);

      const result = await taches.getExcelFile(metadatas, filename, 'csv');

      expect(taches.get).toHaveBeenCalledWith(
        '/api/taches/export/csv',
        metadatas,
        { userId: null }
      );
      expect(result).toEqual(mockResponse);
    });

    // TODO: Browser environment test commented out until rich browser functionality is implemented
    /*
    it('should handle browser environment for Excel export', async () => {
      // Mock browser environment
      const originalWindow = global.window;
      const originalDocument = global.document;
      
      (global as any).window = { URL: { createObjectURL: jest.fn() } };
      (global as any).document = { createElement: jest.fn(), body: { appendChild: jest.fn(), removeChild: jest.fn() } };

      const metadatas = new Metadatas();
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      const result = await taches.getExcelFile(metadatas, 'test', 'xlsx');

      expect(consoleLogSpy).toHaveBeenCalledWith('Would download excel file from /api/taches/export/excel');
      expect(result).toEqual({ success: true, message: 'Download initiated' });

      // Restore original globals
      global.window = originalWindow;
      global.document = originalDocument;
      consoleLogSpy.mockRestore();
    });
    */
  });

  describe('inherited CRUD methods', () => {
    it('should call getAll with correct endpoint', async () => {
      const metadatas = new Metadatas();
      const mockResponse = { success: true };

      jest.spyOn(taches, 'get').mockResolvedValue(mockResponse);

      const result = await taches.getAll(metadatas);

      expect(taches.get).toHaveBeenCalledWith('/api/taches', metadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should call getById with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { success: true };

      jest.spyOn(taches, 'apiRequest').mockResolvedValue(mockResponse);

      const result = await taches.getById(id);

      expect(taches.apiRequest).toHaveBeenCalledWith('/api/tache/123', 'GET', null);
      expect(result).toEqual(mockResponse);
    });

    it('should call create with correct endpoint', async () => {
      const data = { title: 'New Task' };
      const mockResponse = { success: true };

      jest.spyOn(taches, 'post').mockResolvedValue(mockResponse);

      const result = await taches.create(data);

      expect(taches.post).toHaveBeenCalledWith('/api/taches', { datas: data });
      expect(result).toEqual(mockResponse);
    });

    it('should call update with correct endpoint', async () => {
      const id = 123;
      const data = { title: 'Updated Task' };
      const mockResponse = { success: true };

      jest.spyOn(taches, 'put').mockResolvedValue(mockResponse);

      const result = await taches.update(id, data);

      expect(taches.put).toHaveBeenCalledWith('/api/tache/123', { datas: data });
      expect(result).toEqual(mockResponse);
    });

    it('should call remove with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { success: true };

      jest.spyOn(taches, 'delete').mockResolvedValue(mockResponse);

      const result = await taches.remove(id);

      expect(taches.delete).toHaveBeenCalledWith('/api/tache/123');
      expect(result).toEqual(mockResponse);
    });
  });
});
