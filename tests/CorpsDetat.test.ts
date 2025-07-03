import { CorpsDetat } from '../src/apiRequests/CorpsDetat';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { CorpsDetat as CorpsDetatType } from '../src/types/CorpsDetat';

describe('CorpsDetat API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const corpsdetat = new CorpsDetat(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(corpsdetat.endpoint).toBe('/api/corps-detats');
      expect(corpsdetat.endpointSingleton).toBe('/api/corps-detat');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(corpsdetat.auth).toBe(mockAuth);
      expect(corpsdetat.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    describe('getCorpsDetats', () => {
      it('should get corps d\'etat list', async () => {
        const mockResponse = { success: true, data: [] };
        const metadatas = new Metadatas();
        
        jest.spyOn(corpsdetat, 'get').mockResolvedValue(mockResponse);

        const result = await corpsdetat.getCorpsDetats(metadatas);

        expect(corpsdetat.get).toHaveBeenCalledWith(
          '/api/corps-detats',
          metadatas,
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('create', () => {
      it('should create corps d\'etat with datas wrapper', async () => {
        const mockResponse = { success: true };
        const mockData: CorpsDetatType[] = [
          { name: 'Electricien' },
          { name: 'Plombier' }
        ];
        
        jest.spyOn(corpsdetat, 'post').mockResolvedValue(mockResponse);

        const result = await corpsdetat.create(mockData);

        expect(corpsdetat.post).toHaveBeenCalledWith(
          '/api/corps-detats',
          { datas: mockData }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateCorpsDetat', () => {
      it('should update corps d\'etat with datas wrapper', async () => {
        const mockResponse = { success: true };
        const mockCorpsDetat = {
          id: '123',
          name: 'Electricien Updated'
        };
        
        jest.spyOn(corpsdetat, 'put').mockResolvedValue(mockResponse);

        const result = await corpsdetat.updateCorpsDetat(mockCorpsDetat);

        expect(corpsdetat.put).toHaveBeenCalledWith(
          '/api/corps-detat/123',
          { datas: mockCorpsDetat }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteCorpsDetat', () => {
      it('should delete corps d\'etat', async () => {
        const mockResponse = { success: true };
        const mockCorpsDetat = { id: '123' };
        
        // Mock the parent delete method
        jest.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(corpsdetat)), 'delete').mockResolvedValue(mockResponse);

        const result = await corpsdetat.deleteCorpsDetat(mockCorpsDetat);

        expect(Object.getPrototypeOf(Object.getPrototypeOf(corpsdetat)).delete).toHaveBeenCalledWith(
          '/api/corps-detat/123'
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

});
