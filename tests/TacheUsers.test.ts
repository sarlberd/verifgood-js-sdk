import { TacheUsers } from '../src/apiRequests/TacheUsers';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';

describe('TacheUsers', () => {
  let tacheUsers: TacheUsers;
  let mockAuth: Auth;

  beforeEach(() => {
    mockAuth = new Auth({
      apiBaseUrl: 'https://api.example.com',
      apiKey: 'test-api-key'
    });
    tacheUsers = new TacheUsers(mockAuth, 'https://api.example.com');
  });

  describe('createTacheUsers', () => {
    it('should create tache user assignments without userId', async () => {
      const tacheUsersData = [
        { user_id: 1, role: 'assignee' },
        { user_id: 2, role: 'reviewer' }
      ];
      const tacheId = 123;
      const mockResponse = { 
        success: true,
        data: tacheUsersData
      };

      jest.spyOn(tacheUsers, 'post').mockResolvedValue(mockResponse);

      const result = await tacheUsers.createTacheUsers(tacheUsersData, tacheId);

      expect(tacheUsers.post).toHaveBeenCalledWith(
        '/api/tache/123/users',
        { datas: tacheUsersData }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should create tache user assignments with userId', async () => {
      const tacheUsersData = [
        { user_id: 1, role: 'assignee' },
        { user_id: 2, role: 'reviewer' }
      ];
      const tacheId = 123;
      const userId = 456;
      const mockResponse = { 
        success: true,
        data: tacheUsersData
      };

      jest.spyOn(tacheUsers, 'post').mockResolvedValue(mockResponse);

      const result = await tacheUsers.createTacheUsers(tacheUsersData, tacheId, userId);

      expect(tacheUsers.post).toHaveBeenCalledWith(
        '/api/tache/123/users?userId=456',
        { datas: tacheUsersData }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty tache users array', async () => {
      const tacheUsersData: any[] = [];
      const tacheId = 123;
      const mockResponse = { 
        success: true,
        data: []
      };

      jest.spyOn(tacheUsers, 'post').mockResolvedValue(mockResponse);

      const result = await tacheUsers.createTacheUsers(tacheUsersData, tacheId);

      expect(tacheUsers.post).toHaveBeenCalledWith(
        '/api/tache/123/users',
        { datas: [] }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle multiple user assignments with different roles', async () => {
      const tacheUsersData = [
        { user_id: 1, role: 'assignee', priority: 'high' },
        { user_id: 2, role: 'reviewer', priority: 'medium' },
        { user_id: 3, role: 'observer', priority: 'low' }
      ];
      const tacheId = 456;
      const userId = 789;
      const mockResponse = { 
        success: true,
        data: tacheUsersData
      };

      jest.spyOn(tacheUsers, 'post').mockResolvedValue(mockResponse);

      const result = await tacheUsers.createTacheUsers(tacheUsersData, tacheId, userId);

      expect(tacheUsers.post).toHaveBeenCalledWith(
        '/api/tache/456/users?userId=789',
        { datas: tacheUsersData }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('inherited CRUD methods', () => {
    it('should call getAll with correct endpoint', async () => {
      const metadatas = new Metadatas();
      const mockResponse = { success: true };

      jest.spyOn(tacheUsers, 'get').mockResolvedValue(mockResponse);

      const result = await tacheUsers.getAll(metadatas);

      expect(tacheUsers.get).toHaveBeenCalledWith('/api/tache', metadatas, {});
      expect(result).toEqual(mockResponse);
    });

    it('should call getById with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { success: true };

      jest.spyOn(tacheUsers, 'apiRequest').mockResolvedValue(mockResponse);

      const result = await tacheUsers.getById(id);

      expect(tacheUsers.apiRequest).toHaveBeenCalledWith('/api/tache/123', 'GET', null);
      expect(result).toEqual(mockResponse);
    });

    it('should call create with correct endpoint', async () => {
      const data = { user_id: 1, role: 'assignee' };
      const mockResponse = { success: true };

      jest.spyOn(tacheUsers, 'post').mockResolvedValue(mockResponse);

      const result = await tacheUsers.create(data);

      expect(tacheUsers.post).toHaveBeenCalledWith('/api/tache', { datas: data });
      expect(result).toEqual(mockResponse);
    });

    it('should call update with correct endpoint', async () => {
      const id = 123;
      const data = { role: 'reviewer' };
      const mockResponse = { success: true };

      jest.spyOn(tacheUsers, 'put').mockResolvedValue(mockResponse);

      const result = await tacheUsers.update(id, data);

      expect(tacheUsers.put).toHaveBeenCalledWith('/api/tache/123', { datas: data });
      expect(result).toEqual(mockResponse);
    });

    it('should call remove with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { success: true };

      jest.spyOn(tacheUsers, 'delete').mockResolvedValue(mockResponse);

      const result = await tacheUsers.remove(id);

      expect(tacheUsers.delete).toHaveBeenCalledWith('/api/tache/123');
      expect(result).toEqual(mockResponse);
    });
  });
});
