import { Lieux } from '../src/apiRequests/Lieux';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { Lieu, LieuCreateRequest, LieuUpdateRequest } from '../src/types/Lieux';

describe('Lieux API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const lieux = new Lieux(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(lieux.endpoint).toBe('/api/lieux');
      expect(lieux.endpointSingleton).toBe('/api/lieu');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(lieux.auth).toBe(mockAuth);
      expect(lieux.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getInitiales', () => {
    it('should return initiales from lieu path', () => {
      const lieu = { path: 'org/building/floor/room' };
      const result = lieux.getInitiales(lieu);
      expect(result).toBe('BUI-');
    });

    it('should handle different levels', () => {
      const lieu = { path: 'org/building/floor/room' };
      const result = lieux.getInitiales(lieu, 2);
      expect(result).toBe('FLO-');
    });

    it('should handle empty or missing path', () => {
      const lieu = {};
      const result = lieux.getInitiales(lieu);
      expect(result).toBe('');
    });
  });

  describe('getOrganisations', () => {
    it('should call GET with Organisation filter', async () => {
      const mockResponse = { success: true, data: [] };
      jest.spyOn(lieux, 'get').mockResolvedValue(mockResponse);

      const result = await lieux.getOrganisations();

      expect(lieux.get).toHaveBeenCalledWith('/api/lieux', expect.any(Metadatas), {
        userId: null,
        metadatas: expect.objectContaining({
          filters: expect.arrayContaining([
            { attr: 'type_lieu', value: 'Organisation', action: 'equals' }
          ])
        })
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('getSites', () => {
    it('should call GET with Site filter', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      jest.spyOn(lieux, 'get').mockResolvedValue(mockResponse);
      jest.spyOn(mockMetadatas, 'filterExist').mockImplementation();
      jest.spyOn(mockMetadatas, 'setFilter').mockImplementation();

      const result = await lieux.getSites(mockMetadatas);

      expect(mockMetadatas.filterExist).toHaveBeenCalledWith('type_lieu');
      expect(mockMetadatas.setFilter).toHaveBeenCalledWith('type_lieu', 'Site');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getLieux', () => {
    it('should call GET with metadatas and options', async () => {
      const mockResponse = { success: true, data: [] };
      const mockMetadatas = new Metadatas();
      jest.spyOn(lieux, 'get').mockResolvedValue(mockResponse);

      const result = await lieux.getLieux(mockMetadatas, { _isOrderedBySiteAsc: true });

      expect(lieux.get).toHaveBeenCalledWith('/api/lieux', mockMetadatas, {
        userId: null,
        metadatas: mockMetadatas.get(),
        sites: null,
        isOrderedBySiteAsc: true
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('getLieu', () => {
    it('should call GET with lieu ID', async () => {
      const mockResponse = { success: true, data: {} };
      jest.spyOn(lieux, 'get').mockResolvedValue(mockResponse);

      const result = await lieux.getLieu(123);

      expect(lieux.get).toHaveBeenCalledWith('/api/lieu/123', expect.any(Metadatas), {
        userId: null
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('create (overridden)', () => {
    it('should call POST with datas wrapper', async () => {
      const mockLieux = [{ libelle: 'Test Lieu' }];
      const mockResponse = { success: true, data: mockLieux };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.create(mockLieux);

      expect(lieux.post).toHaveBeenCalledWith('/api/lieux?userId=null', { datas: mockLieux });
      expect(result).toBe(mockResponse);
    });

    it('should handle dernierNumeroPiece option', async () => {
      const mockLieux = [{ libelle: 'Test Lieu' }];
      const mockResponse = { success: true, data: mockLieux };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.create(mockLieux, { dernierNumeroPiece: 'TEST123' });

      expect(lieux.post).toHaveBeenCalledWith('/api/lieux?userId=null', { 
        datas: mockLieux, 
        dernierNumeroPiece: 'TEST123' 
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('importPieces', () => {
    it('should call POST with CSV data', async () => {
      const csvData = 'libelle,type\\nTest,Piece';
      const mockResponse = { success: true, data: [] };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.importPieces(csvData);

      expect(lieux.post).toHaveBeenCalledWith('/api/integration/pieces', `csv=${csvData}`);
      expect(result).toBe(mockResponse);
    });
  });

  describe('createPiecesGeneriques', () => {
    it('should call POST with site ID and pieces data', async () => {
      const siteId = 123;
      const piecesData = [{ libel_lieu: 'Test Piece' }];
      const mockResponse = { success: true, data: piecesData };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.createPiecesGeneriques(siteId, piecesData);

      expect(lieux.post).toHaveBeenCalledWith('/api/site/123/pieces/generiques?userId=null', piecesData);
      expect(result).toBe(mockResponse);
    });
  });

  describe('createPiecesGeneriquesFamilleSite', () => {
    it('should call POST with famille and pieces data', async () => {
      const famille = 'TestFamille';
      const piecesData = [{ libel_lieu: 'Test Piece' }];
      const mockResponse = { success: true, data: piecesData };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.createPiecesGeneriquesFamilleSite(famille, piecesData);

      expect(lieux.post).toHaveBeenCalledWith('/api/sites/TestFamille/pieces/generiques?userId=null', piecesData);
      expect(result).toBe(mockResponse);
    });
  });

  describe('createPieceGenerique', () => {
    it('should call POST with site ID', async () => {
      const siteId = 123;
      const mockResponse = { success: true, data: {} };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.createPieceGenerique(siteId);

      expect(lieux.post).toHaveBeenCalledWith('/api/site/123/piece/generique?userId=null', {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateLieu', () => {
    it('should call PUT with lieu ID and data', async () => {
      const lieuData = { id: 123, libelle: 'Updated Lieu' };
      const mockResponse = { success: true, data: lieuData };
      jest.spyOn(lieux, 'put').mockResolvedValue(mockResponse);

      const result = await lieux.updateLieu(lieuData);

      expect(lieux.put).toHaveBeenCalledWith('/api/lieu/123?userId=null', lieuData);
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateLieux', () => {
    it('should call PUT with multiple lieux data', async () => {
      const lieuxData = [
        { id: 123, libelle: 'Updated Lieu 1' },
        { id: 456, libelle: 'Updated Lieu 2' }
      ];
      const mockResponse = { success: true, data: lieuxData };
      jest.spyOn(lieux, 'put').mockResolvedValue(mockResponse);

      const result = await lieux.updateLieux(lieuxData);

      expect(lieux.put).toHaveBeenCalledWith('/api/lieux', lieuxData);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteLieu', () => {
    it('should call DELETE with lieu ID', async () => {
      const lieu = { id: 123, libelle: 'Test Lieu' };
      const mockResponse = { success: true };
      jest.spyOn(lieux, 'delete').mockResolvedValue(mockResponse);

      const result = await lieux.deleteLieu(lieu);

      expect(lieux.delete).toHaveBeenCalledWith('/api/null/lieux/123');
      expect(result).toBe(mockResponse);
    });

    it('should throw error when lieu ID is missing', async () => {
      const lieu = { libelle: 'Test Lieu' };

      await expect(lieux.deleteLieu(lieu)).rejects.toThrow('Lieu ID is required for deletion');
    });
  });

  describe('getExcelFile', () => {
    it('should prepare export query for xlsx', async () => {
      const mockMetadatas = new Metadatas();
      jest.spyOn(mockMetadatas, 'setDirectives').mockImplementation();

      const result = await lieux.getExcelFile(mockMetadatas, 'test-file');

      expect(mockMetadatas.setDirectives).toHaveBeenCalledWith([]);
      expect(result).toEqual({
        endpoint: '/api/lieux/export/excel/test-file',
        query: {
          userId: null,
          sites: null,
          metadatas: mockMetadatas.get(),
          isUserTypeAsDemandeur: 0
        }
      });
    });

    it('should prepare export query for csv', async () => {
      const mockMetadatas = new Metadatas();
      jest.spyOn(mockMetadatas, 'setDirectives').mockImplementation();

      const result = await lieux.getExcelFile(mockMetadatas, 'test-file', 'csv');

      expect(result).toEqual({
        endpoint: '/api/lieux/export/csv/test-file',
        query: {
          userId: null,
          sites: null,
          metadatas: mockMetadatas.get(),
          isUserTypeAsDemandeur: 0
        }
      });
    });
  });

  describe('saveRestrictionSiteForUser', () => {
    it('should call POST with collection data', async () => {
      const collection = { userId: 123, sites: [1, 2, 3] };
      const mockResponse = { success: true };
      jest.spyOn(lieux, 'post').mockResolvedValue(mockResponse);

      const result = await lieux.saveRestrictionSiteForUser(collection);

      expect(lieux.post).toHaveBeenCalledWith('/api/V2.0/collection/lieuxuser', collection);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getFamilleBackgroundColor', () => {
    it('should return array of famille colors', () => {
      const familles = ['Famille1', 'Famille2', 'Famille3'];
      const result = lieux.getFamilleBackgroundColor(familles);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ label: 'Famille1', color: '#f59c29ff' });
      expect(result[1]).toEqual({ label: 'Famille2', color: '#02a7f0ff' });
      expect(result[2]).toEqual({ label: 'Famille3', color: '#63a103ff' });
    });

    it('should handle empty array', () => {
      const result = lieux.getFamilleBackgroundColor([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('getFamilles', () => {
    it('should extract unique familles from sites and return colors', () => {
      const sites = [
        { id: 1, libelle: 'Site 1', famille: 'Famille1' },
        { id: 2, libelle: 'Site 2', famille: 'Famille2' },
        { id: 3, libelle: 'Site 3', famille: 'Famille1' }, // duplicate
        { id: 4, libelle: 'Site 4', famille: '' }, // empty
        { id: 5, libelle: 'Site 5' } // no famille property
      ];

      const result = lieux.getFamilles(sites);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ label: 'Famille1', color: '#f59c29ff' });
      expect(result[1]).toEqual({ label: 'Famille2', color: '#02a7f0ff' });
    });

    it('should handle empty sites array', () => {
      const result = lieux.getFamilles([]);
      expect(result).toHaveLength(0);
    });
  });

});
