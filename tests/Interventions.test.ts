import { Interventions } from '../src/apiRequests/Interventions';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { InterventionCreateRequest, InterventionUpdateRequest } from '../src/types/Interventions';

describe('Interventions API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const interventions = new Interventions(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(interventions.endpoint).toBe('/api/interventions');
      expect(interventions.endpointSingleton).toBe('/api/intervention');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(interventions.auth).toBe(mockAuth);
      expect(interventions.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getPdfFile', () => {
    it('should call GET /api/intervention/export/{id}/S', async () => {
      const mockResponse = { success: true };
      const idIntervention = '123';
      
      jest.spyOn(interventions, 'get').mockResolvedValue(mockResponse);
      
      const result = await interventions.getPdfFile(idIntervention);
      
      expect(interventions.get).toHaveBeenCalledWith(`/api/intervention/export/${idIntervention}/S`, expect.any(Metadatas), {});
      expect(result).toBe(mockResponse);
    });
  });

  describe('formatToCalendarEvents', () => {
    it('should format intervention-prevue correctly', () => {
      const mockInterventions = [
        {
          status: 'intervention-prevue',
          datePrevisionnelleDebut: '2023-01-01T09:00:00',
          datePrevisionnelleFin: '2023-01-01T10:00:00'
        }
      ];
      
      const result = interventions.formatToCalendarEvents(mockInterventions);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 0,
        calendarId: 'intervention-previsionnelle',
        start: '2023-01-01T09:00:00',
        end: '2023-01-01T10:00:00',
        isAllDay: false,
        category: 'time',
        raw: mockInterventions[0]
      });
    });

    it('should format intervention-realisee with fichesav_id correctly', () => {
      const mockInterventions = [
        {
          status: 'intervention-realisee',
          fichesav_id: 'fiche123',
          dateEffectiveDebut: '2023-01-01T09:00:00',
          dateEffectiveFin: '2023-01-01T10:00:00'
        }
      ];
      
      const result = interventions.formatToCalendarEvents(mockInterventions);
      
      expect(result).toHaveLength(1);
      expect(result[0].calendarId).toBe('intervention-ponctuelle');
    });
  });

  describe('getCalendarEvents', () => {
    it('should get interventions and format them to calendar events', async () => {
      const mockInterventions = {
        datas: [
          {
            status: 'intervention-prevue',
            datePrevisionnelleDebut: '2023-01-01T09:00:00',
            datePrevisionnelleFin: '2023-01-01T10:00:00'
          }
        ]
      };
      const mockMetadatas = new Metadatas();
      
      jest.spyOn(interventions, 'getAll').mockResolvedValue(mockInterventions);
      
      const result = await interventions.getCalendarEvents(mockMetadatas);
      
      expect(interventions.getAll).toHaveBeenCalledWith(mockMetadatas);
      expect(result).toHaveLength(1);
      expect(result[0].calendarId).toBe('intervention-previsionnelle');
    });
  });

  describe('createInterventionsEquipements', () => {
    it('should call POST /api/interventionsequipements/{id}', async () => {
      const mockResponse = { success: true };
      const idIntervention = '123';
      const mockEquipements = [{ id: 1, name: 'Equipment 1' }];
      
      jest.spyOn(interventions, 'post').mockResolvedValue(mockResponse);
      
      const result = await interventions.createInterventionsEquipements(idIntervention, mockEquipements);
      
      expect(interventions.post).toHaveBeenCalledWith(`/api/interventionsequipements/${idIntervention}?userId=null`, { datas: mockEquipements });
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteInterventionEquipement', () => {
    it('should call DELETE /api/interventionsequipements/{id}', async () => {
      const mockResponse = { success: true };
      const mockEquipement = { id: '123' };
      
      jest.spyOn(interventions, 'delete').mockResolvedValue(mockResponse);
      
      const result = await interventions.deleteInterventionEquipement(mockEquipement);
      
      expect(interventions.delete).toHaveBeenCalledWith(`/api/interventionsequipements/${mockEquipement.id}?userId=null`);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteInterventionsEquipements', () => {
    it('should call DELETE /api/interventionsequipements', async () => {
      const mockResponse = { success: true };
      const mockEquipements = [{ id: '123' }, { id: '456' }];
      
      jest.spyOn(interventions, 'delete').mockResolvedValue(mockResponse);
      
      const result = await interventions.deleteInterventionsEquipements(mockEquipements);
      
      expect(interventions.delete).toHaveBeenCalledWith(`/api/interventionsequipements?userId=null`);
      expect(result).toBe(mockResponse);
    });
  });

});
