import { BonsDeCommande } from '../src/apiRequests/BonsDeCommande';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { BonsDeCommandCreateRequest, BonsDeCommandUpdateRequest, BonsDeCommand } from '../src/types/BonsDeCommande';

describe('BonsDeCommande API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const bonsdecommande = new BonsDeCommande(mockAuth, 'https://api.example.com');
  const mockMetadatas = new Metadatas();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch
    global.fetch = jest.fn();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(bonsdecommande.endpoint).toBe('/api/bons-de-commande');
      expect(bonsdecommande.endpointSingleton).toBe('/api/bon-de-commande');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(bonsdecommande.auth).toBe(mockAuth);
      expect(bonsdecommande.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    const mockBonDeCommande: BonsDeCommand = {
      id: '123',
      numero: 'BC001',
      statut: 'draft'
    };

    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue('{"success": true}')
      });
    });

    describe('cancel', () => {
      it('should cancel a bon de commande', async () => {
        const result = await bonsdecommande.cancel(mockBonDeCommande);
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/cancel',
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ datas: mockBonDeCommande })
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('skipSending', () => {
      it('should skip sending a bon de commande', async () => {
        const result = await bonsdecommande.skipSending(mockBonDeCommande);
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/skip-sending',
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ datas: mockBonDeCommande })
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('demandeValidation', () => {
      it('should request validation for a bon de commande', async () => {
        const result = await bonsdecommande.demandeValidation(mockBonDeCommande);
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/demande-validation',
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ datas: mockBonDeCommande })
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('livraison', () => {
      it('should handle delivery for a bon de commande', async () => {
        const itemsLivraison = [{ id: 1, quantity: 5 }];
        const depot = { id: 'depot1' };
        
        const result = await bonsdecommande.livraison(mockBonDeCommande, itemsLivraison, depot);
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/livraison',
          expect.objectContaining({
            method: 'PUT',
            body: expect.stringContaining('"depot_id":"depot1"')
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('livraisonTotale', () => {
      it('should handle complete delivery for a bon de commande', async () => {
        const depot = { id: 'depot1' };
        
        const result = await bonsdecommande.livraisonTotale(mockBonDeCommande, depot);
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/livraison-totale',
          expect.objectContaining({
            method: 'PUT',
            body: expect.stringContaining('"depot_id":"depot1"')
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('nonLivre', () => {
      it('should mark bon de commande as not delivered', async () => {
        const result = await bonsdecommande.nonLivre(mockBonDeCommande);
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/non-livre',
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ datas: mockBonDeCommande })
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('clone', () => {
      it('should clone a bon de commande', () => {
        const cloned = bonsdecommande.clone(mockBonDeCommande);
        
        expect(cloned.id).toBeUndefined();
        expect(cloned.numero).toBeUndefined();
        expect(cloned.statut).toBe('draft');
        expect(cloned.statutLivraison).toBeUndefined();
        expect(cloned.statutPaiement).toBeUndefined();
        expect(cloned.dateCreation).toBeDefined();
      });
    });

    describe('getHistorique', () => {
      it('should get historical data for a bon de commande', async () => {
        const result = await bonsdecommande.getHistorique('123', mockMetadatas);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/bon-de-commande/123/historique'),
          expect.objectContaining({
            method: 'GET'
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('getPDF', () => {
      it('should get PDF export of bon de commande', async () => {
        // Mock URL.createObjectURL
        global.URL.createObjectURL = jest.fn().mockReturnValue('blob:mock-url');
        
        const result = await bonsdecommande.getPDF('123', {});
        
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.example.com/api/bon-de-commande/123/export/pdf/S',
          expect.objectContaining({
            method: 'POST'
          })
        );
        expect(result.fileURL).toBe('blob:mock-url');
        expect(result.blob).toBeInstanceOf(Blob);
      });
    });

    describe('getRepartitionMontantHt', () => {
      it('should get amount distribution for dashboard', async () => {
        const result = await bonsdecommande.getRepartitionMontantHt(mockMetadatas);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/dashboard/bons-de-commande/repartition-montant-ht'),
          expect.objectContaining({
            method: 'GET'
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('export', () => {
      it('should export bons de commande', async () => {
        const result = await bonsdecommande.export(mockMetadatas, 'test-export', 'xlsx');
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/bons-de-commande/export/excel'),
          expect.objectContaining({
            method: 'GET'
          })
        );
        expect(result).toBeInstanceOf(Blob); // Method returns Blob
      });
    });

    describe('getCreateurs', () => {
      it('should get creators of bons de commande', async () => {
        const result = await bonsdecommande.getCreateurs(mockMetadatas);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/bons-de-commande/createurs'),
          expect.objectContaining({
            method: 'GET'
          })
        );
        expect(result.success).toBe(true);
      });
    });

    describe('getValidateurs', () => {
      it('should get validators of bons de commande', async () => {
        const result = await bonsdecommande.getValidateurs(mockMetadatas);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/bons-de-commande/validateurs'),
          expect.objectContaining({
            method: 'GET'
          })
        );
        expect(result.success).toBe(true);
      });
    });
  });

});
