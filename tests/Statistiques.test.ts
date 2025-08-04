import { Statistiques } from '../src/apiRequests/Statistiques';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { StatistiqueCreateRequest, StatistiqueUpdateRequest } from '../src/types/Statistiques';

describe('Statistiques API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const statistiques = new Statistiques(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(statistiques.endpoint).toBe('/api/statistiques');
      expect(statistiques.endpointSingleton).toBe('/api/statistiques');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(statistiques.auth).toBe(mockAuth);
      expect(statistiques.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Custom Methods', () => {
    beforeEach(() => {
      jest.spyOn(statistiques, 'get').mockResolvedValue({ success: true });
    });

    describe('fetchStatistiquesMaintenanceEtat', () => {
      it('should fetch maintenance statistics for a year', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesMaintenanceEtat('2023', null, metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/maintenance/etat/2023',
          metadatas,
          { userId: null, sites: null }
        );
      });

      it('should fetch maintenance statistics for a year and week', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesMaintenanceEtat('2023', '12', metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/maintenance/etat/2023/12',
          metadatas,
          { userId: null, sites: null }
        );
      });
    });

    describe('fetchStatistiquesMaintenanceRepartition', () => {
      it('should fetch maintenance repartition statistics', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesMaintenanceRepartition(metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/maintenance/repartition',
          metadatas,
          { userId: null, sites: null }
        );
      });
    });

    describe('fetchStatistiquesVerificationEtat', () => {
      it('should fetch verification statistics for a year', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesVerificationEtat('2023', null, metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/verification/etat/2023',
          metadatas,
          { userId: null, sites: null }
        );
      });

      it('should fetch verification statistics for a year and week', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesVerificationEtat('2023', '12', metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/verification/etat/2023/12',
          metadatas,
          { userId: null, sites: null }
        );
      });
    });

    describe('fetchStatistiquesVerificationRepartition', () => {
      it('should fetch verification repartition statistics', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesVerificationRepartition(metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/verification/repartition',
          metadatas,
          { userId: null, sites: null }
        );
      });
    });

    describe('fetchStatistiquesVerificationTemps', () => {
      it('should fetch verification time statistics for a year', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesVerificationTemps('2023', null, metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/verification/temps/2023',
          metadatas,
          { userId: null, sites: null }
        );
      });

      it('should fetch verification time statistics for a year and week', async () => {
        const metadatas = new Metadatas();
        await statistiques.fetchStatistiquesVerificationTemps('2023', '12', metadatas);

        expect(statistiques.get).toHaveBeenCalledWith(
          '/api/statistiques/verification/temps/2023/12',
          metadatas,
          { userId: null, sites: null }
        );
      });
    });
  });

});
