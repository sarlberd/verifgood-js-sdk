import { Stocks } from '../src/apiRequests/Stocks';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { StockCreateRequest, StockUpdateRequest } from '../src/types/Stocks';

describe('Stocks API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const stocks = new Stocks(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(stocks.endpoint).toBe('/api/stocks');
      expect(stocks.endpointSingleton).toBe('/api/fiche-demande-consommables');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(stocks.auth).toBe(mockAuth);
      expect(stocks.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Custom Methods', () => {
    beforeEach(() => {
      jest.spyOn(stocks, 'get').mockResolvedValue({ success: true });
      jest.spyOn(stocks, 'post').mockResolvedValue({ success: true });
      jest.spyOn(stocks, 'put').mockResolvedValue({ success: true });
      jest.spyOn(stocks, 'delete').mockResolvedValue({ success: true });
      jest.spyOn(stocks, 'apiRequest').mockResolvedValue({ success: true });
    });

    describe('getDepots', () => {
      it('should fetch depots with metadatas', async () => {
        const metadatas = new Metadatas();
        await stocks.getDepots(metadatas);

        expect(stocks.get).toHaveBeenCalledWith(
          '/api/depots',
          metadatas,
          { userId: null }
        );
      });

      it('should fetch depots with default metadatas', async () => {
        await stocks.getDepots();

        expect(stocks.get).toHaveBeenCalledWith(
          '/api/depots',
          expect.any(Metadatas),
          { userId: null }
        );
      });
    });

    describe('getAll (overridden)', () => {
      it('should fetch stocks using overridden getAll method', async () => {
        const metadatas = new Metadatas();
        await stocks.getAll(metadatas);

        expect(stocks.get).toHaveBeenCalledWith(
          '/api/stocks',
          metadatas,
          { userId: null }
        );
      });
    });

    describe('getFiche (deprecated)', () => {
      it('should fetch fiche by id', async () => {
        const ficheId = '123';
        await stocks.getFiche(ficheId);

        expect(stocks.apiRequest).toHaveBeenCalledWith(
          '/api/fiche-demande-consommables/123',
          'GET',
          null
        );
      });
    });

    describe('create (overridden)', () => {
      it('should create fiche-demande-consommables', async () => {
        const stocksData = { name: 'Test Stock', quantity: 10 };
        await stocks.create(stocksData);

        expect(stocks.post).toHaveBeenCalledWith(
          '/api/fiche-demande-consommables',
          { datas: stocksData }
        );
      });
    });

    describe('update (overridden)', () => {
      it('should update fiche-demande-consommables', async () => {
        const bonDeCommande = { id: 123, name: 'Updated Stock', quantity: 15 };
        await stocks.update(123, bonDeCommande);

        expect(stocks.put).toHaveBeenCalledWith(
          '/api/fiche-demande-consommables/123',
          { datas: bonDeCommande }
        );
      });
    });

    describe('remove (overridden)', () => {
      it('should delete fiche-demande-consommables', async () => {
        await stocks.remove(123);

        expect(stocks.delete).toHaveBeenCalledWith(
          '/api/fiche-demande-consommables/123'
        );
      });
    });
  });

});
