import { Checkpoints } from '../src/apiRequests/Checkpoints';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

describe('Checkpoints API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const checkpoints = new Checkpoints(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(checkpoints.endpoint).toBe('/api/checkpoints');
      expect(checkpoints.endpointSingleton).toBe('/api/checkpoints');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(checkpoints.auth).toBe(mockAuth);
      expect(checkpoints.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('CRUD Operations', () => {
    describe('getAll (checkpointsMixins_getCheckpoint equivalent)', () => {
      it('should get all checkpoints with metadatas', async () => {
        const mockResponse = [
          { id: 1, name: 'Checkpoint 1', description: 'Test checkpoint' },
          { id: 2, name: 'Checkpoint 2', description: 'Another checkpoint' }
        ];
        const metadatas = new Metadatas();
        
        jest.spyOn(checkpoints, 'get').mockResolvedValue(mockResponse);

        const result = await checkpoints.getAll(metadatas);

        expect(checkpoints.get).toHaveBeenCalledWith('/api/checkpoints', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('create (checkpointsMixins_createCheckpoints equivalent)', () => {
      it('should create multiple checkpoints', async () => {
        const mockResponse = { success: true, ids: [1, 2] };
        const checkpointsData = [
          { name: 'Checkpoint 1', description: 'Test checkpoint' },
          { name: 'Checkpoint 2', description: 'Another checkpoint' }
        ];
        
        jest.spyOn(checkpoints, 'post').mockResolvedValue(mockResponse);

        const result = await checkpoints.create(checkpointsData);

        expect(checkpoints.post).toHaveBeenCalledWith('/api/checkpoints', { datas: checkpointsData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('update (checkpointsMixins_updateCheckpoint equivalent)', () => {
      it('should update a checkpoint', async () => {
        const mockResponse = { success: true };
        const checkpointData = { 
          id: 1, 
          name: 'Updated Checkpoint', 
          description: 'Updated description' 
        };
        
        jest.spyOn(checkpoints, 'put').mockResolvedValue(mockResponse);

        const result = await checkpoints.update(1, checkpointData);

        expect(checkpoints.put).toHaveBeenCalledWith('/api/checkpoints/1', { datas: checkpointData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('remove (checkpointsMixins_deleteCheckpoint equivalent)', () => {
      it('should delete a checkpoint', async () => {
        const mockResponse = { success: true };
        
        jest.spyOn(checkpoints, 'delete').mockResolvedValue(mockResponse);

        const result = await checkpoints.remove(1);

        expect(checkpoints.delete).toHaveBeenCalledWith('/api/checkpoints/1');
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getById', () => {
      it('should get a checkpoint by id', async () => {
        const mockResponse = { id: 1, name: 'Checkpoint 1', description: 'Test checkpoint' };
        
        jest.spyOn(checkpoints, 'apiRequest').mockResolvedValue(mockResponse);

        const result = await checkpoints.getById(1);

        expect(checkpoints.apiRequest).toHaveBeenCalledWith('/api/checkpoints/1', 'GET', null);
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Integration with CheckpointMixins patterns', () => {
    it('should handle the same data flow as checkpointsMixins_getCheckpoint', async () => {
      // This test verifies the equivalent behavior to the original mixin
      const metadatas = new Metadatas();
      const mockCheckpoints = [
        { id: 1, name: 'Checkpoint 1' },
        { id: 2, name: 'Checkpoint 2' }
      ];
      
      jest.spyOn(checkpoints, 'get').mockResolvedValue(mockCheckpoints);

      const result = await checkpoints.getAll(metadatas);

      // Verify same API call pattern as original mixin
      expect(checkpoints.get).toHaveBeenCalledWith('/api/checkpoints', metadatas, {});
      expect(result).toEqual(mockCheckpoints);
    });

    it('should handle the same data flow as checkpointsMixins_createCheckpoints', async () => {
      // This test verifies the equivalent behavior to the original mixin
      const checkpointsToCreate = [
        { name: 'New Checkpoint 1' },
        { name: 'New Checkpoint 2' }
      ];
      const mockResponse = { success: true };
      
      jest.spyOn(checkpoints, 'post').mockResolvedValue(mockResponse);

      const result = await checkpoints.create(checkpointsToCreate);

      // Verify same API call pattern as original mixin
      expect(checkpoints.post).toHaveBeenCalledWith('/api/checkpoints', { datas: checkpointsToCreate });
      expect(result).toEqual(mockResponse);
    });
  });
});
