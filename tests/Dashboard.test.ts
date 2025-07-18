import { Dashboard } from '../src/apiRequests/Dashboard';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { DashboarCreateRequest, DashboarUpdateRequest } from '../src/types/Dashboard';

describe('Dashboard API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const dashboard = new Dashboard(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(dashboard.endpoint).toBe('/api/dashboard');
      expect(dashboard.endpointSingleton).toBe('/api/dashboard');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(dashboard.auth).toBe(mockAuth);
      expect(dashboard.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Curatif Dashboard Methods', () => {
    describe('getCuratifTotaux', () => {
      it('should get curatif totaux dashboard data', async () => {
        const mockResponse = { success: true, data: { total: 100 } };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getCuratifTotaux(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/maintenances/totaux',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getCuratifUrgentes', () => {
      it('should get curatif urgentes dashboard data', async () => {
        const mockResponse = { success: true, data: { urgent: 15 } };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getCuratifUrgentes(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/maintenances/urgentes',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getCuratifRepartitionAge', () => {
      it('should get curatif repartition age dashboard data', async () => {
        const mockResponse = { success: true, data: [{ age: '0-30', count: 20 }] };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getCuratifRepartitionAge(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/maintenances/repartition-age',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Preventif Dashboard Methods', () => {
    describe('getPreventifRepartitionNonConformites', () => {
      it('should get preventif non conformites dashboard data', async () => {
        const mockResponse = { success: true, data: [{ type: 'non-conforme', count: 5 }] };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getPreventifRepartitionNonConformites(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/preventif/repartition-non-conformites',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getPreventifReleverCompteur', () => {
      it('should get preventif relever compteur dashboard data', async () => {
        const mockResponse = { success: true, data: [{ compteur: 'C001', value: 1500 }] };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getPreventifReleverCompteur(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/preventif/relever-compteur',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Consommables Dashboard Methods', () => {
    describe('getConsommablesRepartitionEnStock', () => {
      it('should get consommables en stock dashboard data', async () => {
        const mockResponse = { success: true, data: [{ item: 'Item1', stock: 100 }] };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getConsommablesRepartitionEnStock(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/consommables/repartition-en-stock',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getConsommablesRepartitionConsommationsMaintenances', () => {
      it('should get consommables maintenances dashboard data', async () => {
        const mockResponse = { success: true, data: [{ maintenance: 'M001', consumption: 50 }] };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        const result = await dashboard.getConsommablesRepartitionConsommationsMaintenances(metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          '/api/dashboard/consommables/repartition-consommations-maintenances',
          metadatas,
          { sites: null }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Additional Methods Coverage', () => {
    const testMethods = [
      { method: 'getCuratifRepartitionComposants', endpoint: '/api/dashboard/maintenances/repartition-composants' },
      { method: 'getCuratifRepartitionDemandeur', endpoint: '/api/dashboard/maintenances/repartition-demandeur' },
      { method: 'getCuratifRepartitionUserAffecte', endpoint: '/api/dashboard/maintenances/repartition-user-affecte' },
      { method: 'getCuratifRepartitionTiersAffecte', endpoint: '/api/dashboard/maintenances/repartition-tiers-affecte' },
      { method: 'getCuratifRepartitionCategoriesEquipements', endpoint: '/api/dashboard/maintenances/repartition-categories-equipements' },
      { method: 'getCuratifRepartitionCorpsDetat', endpoint: '/api/dashboard/maintenances/repartition-corps-detat' },
      { method: 'getCuratifRepartitionEquipements', endpoint: '/api/dashboard/maintenances/repartition-equipements' },
      { method: 'getCuratifRepartitionEquipementsCouts', endpoint: '/api/dashboard/maintenances/repartition-equipements-couts' },
      { method: 'getCuratifRepartitionPieces', endpoint: '/api/dashboard/maintenances/repartition-pieces' },
      { method: 'getCuratifRepartitionDureeTraitement', endpoint: '/api/dashboard/maintenances/repartition-duree-traitement' },
      { method: 'getPreventifProchainesInterventionsExternes', endpoint: '/api/dashboard/preventif/prochaines-interventions-externes' },
      { method: 'getPreventifProgressionInterne', endpoint: '/api/dashboard/preventif/progression-interne' },
      { method: 'getConsommablesRepartitionConsommationsBonsDeSortie', endpoint: '/api/dashboard/consommables/repartition-consommations-bons-de-sortie' }
    ];

    testMethods.forEach(({ method, endpoint }) => {
      it(`should call correct endpoint for ${method}`, async () => {
        const mockResponse = { success: true, data: {} };
        const metadatas = new Metadatas();
        
        jest.spyOn(dashboard, 'get').mockResolvedValue(mockResponse);

        await (dashboard as any)[method](metadatas);

        expect(dashboard.get).toHaveBeenCalledWith(
          endpoint,
          metadatas,
          { sites: null }
        );
      });
    });
  });

});
