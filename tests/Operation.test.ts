import { Operation } from '../src/apiRequests/Operation';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { OperationCreateRequest, OperationUpdateRequest, createDefaultOperation } from '../src/types/Operation';

describe('Operation API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const operation = new Operation(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(operation.endpoint).toBe('/api/operations');
      expect(operation.endpointSingleton).toBe('/api/operation');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(operation.auth).toBe(mockAuth);
      expect(operation.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Factory Functions', () => {
    describe('createDefaultOperation', () => {
      it('should create operation with default values', () => {
        const newOperation = createDefaultOperation();
        
        expect(newOperation).toEqual({
          operation: "",
          retourClient: "",
          dateOperation: "",
          ficheSav: null,
          __uploadedFile: null,
          __action: undefined,
          idUser: undefined,
          userId: undefined,
          tiers: null
        });
      });

      it('should create operation with provided user values', () => {
        const newOperation = createDefaultOperation('user-123', 'app-456');
        
        expect(newOperation.idUser).toBe('user-123');
        expect(newOperation.userId).toBe('app-456');
      });
    });

    describe('createNew', () => {
      it('should create new operation using service method', () => {
        const newOperation = operation.createNew('user-123', 'app-456');
        
        expect(newOperation).toEqual({
          operation: "",
          retourClient: "",
          dateOperation: "",
          ficheSav: null,
          __uploadedFile: null,
          __action: undefined,
          idUser: 'user-123',
          userId: 'app-456',
          tiers: null
        });
      });
    });
  });

  describe('Non-CRUD Methods', () => {
    beforeEach(() => {
      jest.spyOn(operation, 'post').mockResolvedValue({ success: true });
      jest.spyOn(operation, 'put').mockResolvedValue({ success: true });
      jest.spyOn(operation, 'get').mockResolvedValue({ success: true });
    });

    describe('createBIOperation', () => {
      it('should create BI operation with correct payload', async () => {
        const data = {
          ficheSav: 'test-fiche',
          tiers: { id: 1 },
          __uploadedFile: { id: 'file-id' },
          __action: 'test-action'
        };
        const idUser = 'user-123';
        const userId = 'app-456';

        await operation.createBIOperation(data, idUser, userId);

        expect(operation.post).toHaveBeenCalledWith('/api/V2.0/Operation', expect.objectContaining({
          operation: "Bon Intervention",
          ficheSav: 'test-fiche',
          tiers: { id: 1 },
          __uploadedFile: 'file-id',
          __action: 'test-action',
          idUser: 'user-123',
          userId: 'app-456',
          dateOperation: expect.any(String)
        }));
      });
    });

    describe('createPhotoOperation', () => {
      it('should create photo operation with correct payload', async () => {
        const idFM = 'fiche-123';
        const file = { id: 'photo-file-id' };
        const idUser = 'user-123';
        const userId = 'app-456';

        await operation.createPhotoOperation(idFM, file, idUser, userId);

        expect(operation.post).toHaveBeenCalledWith('/api/V2.0/Operation', expect.objectContaining({
          __action: "photo",
          __uploadedFile: 'photo-file-id',
          ficheSav: 'fiche-123',
          idUser: 'user-123',
          userId: 'app-456',
          dateOperation: expect.any(String)
        }));
      });
    });

    describe('updateOperation', () => {
      it('should update operation using V2.0 endpoint', async () => {
        const data = { id: 1, operation: 'Updated operation' };

        await operation.updateOperation(data);

        expect(operation.put).toHaveBeenCalledWith('/api/V2.0/Put/Operation', data);
      });
    });

    describe('getFile', () => {
      it('should export operations to CSV file', async () => {
        const metadatas = new Metadatas();
        const userId = 'user-123';
        const sites = 'site1,site2';

        jest.spyOn(metadatas, 'setDirectives').mockReturnValue(metadatas);

        await operation.getFile(metadatas, 'csv', userId, sites);

        expect(metadatas.setDirectives).toHaveBeenCalledWith([]);
        expect(operation.get).toHaveBeenCalledWith('/api/operations/export/csv', metadatas, {
          userId: 'user-123',
          sites: 'site1,site2'
        });
      });

      it('should export operations to Excel file', async () => {
        const metadatas = new Metadatas();
        const userId = 'user-123';
        const sites = '';

        jest.spyOn(metadatas, 'setDirectives').mockReturnValue(metadatas);

        await operation.getFile(metadatas, 'excel', userId, sites);

        expect(operation.get).toHaveBeenCalledWith('/api/operations/export/excel', metadatas, {
          userId: 'user-123',
          sites: ''
        });
      });
    });
  });

});
