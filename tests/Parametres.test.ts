import { Parametres } from '../src/apiRequests/Parametres';
import { Metadatas } from '../src/core/Metadatas';
import { Auth } from '../src/core/Auth';

describe('Parametres API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const parametres = new Parametres(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(parametres.endpoint).toBe('/api/parameters');
      expect(parametres.endpointSingleton).toBe('/api/parameter');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(parametres.auth).toBe(mockAuth);
      expect(parametres.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    beforeEach(() => {
      jest.spyOn(parametres, 'get').mockResolvedValue({ datas: [], metadatas: {} });
      jest.spyOn(parametres, 'post').mockResolvedValue({});
      jest.spyOn(parametres, 'put').mockResolvedValue({});
      jest.spyOn(parametres, 'delete').mockResolvedValue({});
      jest.spyOn(parametres, 'apiRequest').mockResolvedValue({});
    });

    it('should call getParameters with correct parameters', async () => {
      await parametres.getParameters();
      
      expect(parametres.get).toHaveBeenCalledWith('/api/parameters', expect.any(Metadatas), {});
    });

    it('should call updateParameter with correct parameters', async () => {
      const datas = { key: 'test_param', value: 'test_value' };
      
      await parametres.updateParameter(datas);
      
      expect(parametres.apiRequest).toHaveBeenCalledWith('PUT', '/api/parameter', { 
        datas: { key: 'test_param', value: 'test_value' } 
      });
    });

    it('should call deleteDemoAccount with default entities', async () => {
      await parametres.deleteDemoAccount();
      
      const expectedQueryString = 'entitiesToRemove=' + JSON.stringify({
        "maintenances": true,
        "equipements": true,
        "lieux": true,
        "contrats": true,
        "tiers": true,
        "contacts": true,
        "taches": false,
        "consommables": false,
        "categories": true
      });
      
      expect(parametres.apiRequest).toHaveBeenCalledWith(
        'DELETE', 
        `/api/account/demo/datas?${expectedQueryString}`,
        { datas: { id: null } }
      );
    });

    it('should call deleteDemoAccount with custom entities', async () => {
      const customEntities = {
        "maintenances": false,
        "equipements": true,
        "lieux": false
      };
      
      await parametres.deleteDemoAccount(customEntities);
      
      const expectedQueryString = 'entitiesToRemove=' + JSON.stringify(customEntities);
      
      expect(parametres.apiRequest).toHaveBeenCalledWith(
        'DELETE', 
        `/api/account/demo/datas?${expectedQueryString}`,
        { datas: { id: null } }
      );
    });

    it('should handle updateParameter with additional properties', async () => {
      const datas = { 
        key: 'notification_settings', 
        value: { email: true, sms: false },
        type: 'json',
        description: 'User notification preferences'
      };
      
      await parametres.updateParameter(datas);
      
      expect(parametres.apiRequest).toHaveBeenCalledWith('PUT', '/api/parameter', { 
        datas: datas
      });
    });

    it('should preserve original parameter structure in updateParameter', async () => {
      const originalDatas = { 
        id: 123,
        key: 'theme', 
        value: 'dark',
        existingProperty: 'should_be_preserved'
      };
      
      await parametres.updateParameter(originalDatas);
      
      expect(parametres.apiRequest).toHaveBeenCalledWith('PUT', '/api/parameter', { 
        datas: originalDatas
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully in getParameters', async () => {
      const error = new Error('API Error');
      jest.spyOn(parametres, 'get').mockRejectedValueOnce(error);
      
      await expect(parametres.getParameters()).rejects.toThrow('API Error');
    });

    it('should handle API errors gracefully in updateParameter', async () => {
      const error = new Error('Update Error');
      jest.spyOn(parametres, 'apiRequest').mockRejectedValueOnce(error);
      
      await expect(parametres.updateParameter({})).rejects.toThrow('Update Error');
    });

    it('should handle API errors gracefully in deleteDemoAccount', async () => {
      const error = new Error('Delete Error');
      jest.spyOn(parametres, 'apiRequest').mockRejectedValueOnce(error);
      
      await expect(parametres.deleteDemoAccount()).rejects.toThrow('Delete Error');
    });
  });

  describe('Method Signatures', () => {
    beforeEach(() => {
      jest.spyOn(parametres, 'get').mockResolvedValue({});
      jest.spyOn(parametres, 'apiRequest').mockResolvedValue({});
    });

    it('should accept no parameters for getParameters', async () => {
      expect(() => parametres.getParameters()).not.toThrow();
      await parametres.getParameters();
      expect(parametres.get).toHaveBeenCalled();
    });

    it('should require datas parameter for updateParameter', async () => {
      const datas = { key: 'test' };
      await parametres.updateParameter(datas);
      expect(parametres.apiRequest).toHaveBeenCalledWith('PUT', '/api/parameter', { datas });
    });

    it('should accept optional entitiesToRemove for deleteDemoAccount', async () => {
      await parametres.deleteDemoAccount();
      expect(parametres.apiRequest).toHaveBeenCalled();
      
      await parametres.deleteDemoAccount({ maintenances: false });
      expect(parametres.apiRequest).toHaveBeenCalledTimes(2);
    });
  });
});
