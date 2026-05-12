import { SyntheseMaintenance } from '../src/apiRequests/SyntheseMaintenance';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

describe('SyntheseMaintenance', () => {
  let syntheseMaintenance: SyntheseMaintenance;
  let mockAuth: Auth;

  beforeEach(() => {
    mockAuth = new Auth({
      apiBaseUrl: 'https://api.example.com',
      apiKey: 'test-api-key'
    });
    syntheseMaintenance = new SyntheseMaintenance(mockAuth, 'https://api.example.com');
  });

  describe('getSummary', () => {
    it('should fetch preventive maintenance summary data', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-12-31';
      const metadatas = new Metadatas();
      
      const mockResponse = { 
        success: true,
        data: [
          { 
            period: '2024-Q1',
            preventive_count: 25,
            completion_rate: 0.96 
          }
        ]
      };

      jest.spyOn(syntheseMaintenance, 'get').mockResolvedValue(mockResponse);

      const result = await syntheseMaintenance.getSummary(startDate, endDate, metadatas);

      expect(syntheseMaintenance.get).toHaveBeenCalledWith(
        '/api/gamme/maintenance/preventive',
        metadatas,
        {
          userId: null,
          sites: null,
          startDate: startDate,
          endDate: endDate
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('inherited CRUD methods', () => {
    it('should call getAll with correct endpoint', async () => {
      const metadatas = new Metadatas();
      const mockResponse = { success: true };

      jest.spyOn(syntheseMaintenance, 'get').mockResolvedValue(mockResponse);

      const result = await syntheseMaintenance.getAll(metadatas);

      expect(syntheseMaintenance.get).toHaveBeenCalledWith(
        '/api/gamme/maintenance/preventive',
        metadatas,
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call getById with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { success: true };

      jest.spyOn(syntheseMaintenance, 'apiRequest').mockResolvedValue(mockResponse);

      const result = await syntheseMaintenance.getById(id);

      expect(syntheseMaintenance.apiRequest).toHaveBeenCalledWith(
        '/api/gamme/maintenance/preventive/123',
        'GET',
        null
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call create with correct endpoint', async () => {
      const data = { name: 'Test Summary' };
      const mockResponse = { success: true };

      jest.spyOn(syntheseMaintenance, 'post').mockResolvedValue(mockResponse);

      const result = await syntheseMaintenance.create(data);

      expect(syntheseMaintenance.post).toHaveBeenCalledWith(
        '/api/gamme/maintenance/preventive',
        { datas: data }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call update with correct endpoint', async () => {
      const id = 123;
      const data = { name: 'Updated Summary' };
      const mockResponse = { success: true };

      jest.spyOn(syntheseMaintenance, 'put').mockResolvedValue(mockResponse);

      const result = await syntheseMaintenance.update(id, data);

      expect(syntheseMaintenance.put).toHaveBeenCalledWith(
        '/api/gamme/maintenance/preventive/123',
        { datas: data }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call remove with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { success: true };

      jest.spyOn(syntheseMaintenance, 'delete').mockResolvedValue(mockResponse);

      const result = await syntheseMaintenance.remove(id);

      expect(syntheseMaintenance.delete).toHaveBeenCalledWith(
        '/api/gamme/maintenance/preventive/123'
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
