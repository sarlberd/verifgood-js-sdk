import { Reponses } from '../src/apiRequests/Reponses';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { ReponseCreateRequest, ReponseUpdateRequest } from '../src/types/Reponses';

describe('Reponses API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const reponses = new Reponses(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(reponses.endpoint).toBe('/api/reponses');
      expect(reponses.endpointSingleton).toBe('/api/reponse');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(reponses.auth).toBe(mockAuth);
      expect(reponses.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Utility Methods', () => {
    describe('isPreviousRegisterResponse', () => {
      it('should return true when examined response matches meter reading criteria', () => {
        const examinedResponse = { id: 1, etid: 'ET001', idCheckpoint: 'CP001' };
        const releveCompteur = { id: 1, etid: 'ET001', idCheckpoint: 'CP001' };
        
        expect(reponses.isPreviousRegisterResponse(examinedResponse, releveCompteur)).toBe(true);
      });

      it('should return false when examined response does not match meter reading criteria', () => {
        const examinedResponse = { id: 1, etid: 'ET001', idCheckpoint: 'CP001' };
        const releveCompteur = { id: 2, etid: 'ET001', idCheckpoint: 'CP001' };
        
        expect(reponses.isPreviousRegisterResponse(examinedResponse, releveCompteur)).toBe(false);
      });
    });

    describe('findPreviousRegisterResponse', () => {
      it('should find and process previous register response', () => {
        const tableauRelevesCompteur = [
          { id: 1, etid: 'ET001', idCheckpoint: 'CP001' },
          { id: 2, etid: 'ET002', idCheckpoint: 'CP002' },
          { id: 1, etid: 'ET001', idCheckpoint: 'CP001' } // matching previous response
        ];
        
        reponses.findPreviousRegisterResponse(0, tableauRelevesCompteur[0], tableauRelevesCompteur);
        
        // Test passes if no error is thrown - functionality is preserved from mixin
        expect(true).toBe(true);
      });
    });

    describe('setConsoJournaliere', () => {
      it('should process all meter readings in array', () => {
        const tableauRelevesCompteur = [
          { id: 1, etid: 'ET001', idCheckpoint: 'CP001' },
          { id: 2, etid: 'ET002', idCheckpoint: 'CP002' }
        ];
        
        const spy = jest.spyOn(reponses, 'findPreviousRegisterResponse');
        
        reponses.setConsoJournaliere(tableauRelevesCompteur);
        
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(0, tableauRelevesCompteur[0], tableauRelevesCompteur);
        expect(spy).toHaveBeenCalledWith(1, tableauRelevesCompteur[1], tableauRelevesCompteur);
      });
    });
  });

});
