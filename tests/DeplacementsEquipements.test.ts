import { DeplacementsEquipements } from '../src/apiRequests/DeplacementsEquipements';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { DeplacementsEquipementCreateRequest, DeplacementsEquipementUpdateRequest } from '../src/types/DeplacementsEquipements';

describe('DeplacementsEquipements API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const deplacementsequipements = new DeplacementsEquipements(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(deplacementsequipements.endpoint).toBe('/api/deplacements/equipements');
      expect(deplacementsequipements.endpointSingleton).toBe('/api/deplacements/equipements');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(deplacementsequipements.auth).toBe(mockAuth);
      expect(deplacementsequipements.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    it('should create multiple deplacements equipements', async () => {
      const mockDeplacements = [
        { equipementId: 1, fromLocation: 'A', toLocation: 'B' },
        { equipementId: 2, fromLocation: 'C', toLocation: 'D' }
      ];
      
      const mockResponse = { success: true };
      jest.spyOn(deplacementsequipements, 'post').mockResolvedValue(mockResponse);

      const result = await deplacementsequipements.createDeplacementsEquipements(mockDeplacements);

      expect(deplacementsequipements.post).toHaveBeenCalledWith('/api/deplacements/equipements', mockDeplacements);
      expect(result).toEqual(mockResponse);
    });
  });

});
