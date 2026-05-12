import { Affectations } from '../src/apiRequests/Affectations';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { AffectationCreateRequest, AffectationUpdateRequest } from '../src/types/Affectations';

describe('Affectations API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const affectations = new Affectations(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(affectations.endpoint).toBe('/api/affectation');
      expect(affectations.endpointSingleton).toBe('/api/affectation');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(affectations.auth).toBe(mockAuth);
      expect(affectations.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Affectation Task Methods', () => {
    it('should copy affectation tache', async () => {
      const mockAffectation = { id: '123', name: 'Test Affectation' };
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'post').mockResolvedValue(mockResponse);
      
      const result = await affectations.copieAffectationTache(mockAffectation, '2025-01-01', '2025-01-02', []);
      
      expect(affectations.post).toHaveBeenCalledWith(
        '/api/affectation/tache/123/copie',
        expect.objectContaining({
          affectation: mockAffectation,
          affectes: [],
          start: '2025-01-01',
          end: '2025-01-02'
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should create affectations users taches', async () => {
      const mockAffectes = [{ user_id: '1', tache_id: '123' }];
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'post').mockResolvedValue(mockResponse);
      
      const result = await affectations.createAffectationsUsersTaches(mockAffectes);
      
      expect(affectations.post).toHaveBeenCalledWith('/api/affectationsuserstaches', { datas: mockAffectes });
      expect(result).toEqual(mockResponse);
    });

    it('should delete affectations users taches', async () => {
      const mockAffecte = {
        affectationusertache_id: '456',
        affectationusertache_user_id: '1',
        affectationusertache_affectation_id: '123',
        affectationusertache_tache_id: '789'
      };
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'delete').mockResolvedValue(mockResponse);
      
      const result = await affectations.deleteAffectationsUsersTaches(mockAffecte);
      
      expect(affectations.delete).toHaveBeenCalledWith('/api/affectationsuserstaches/456');
      expect(result).toEqual(mockResponse);
    });

    it('should delete affectation', async () => {
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'delete').mockResolvedValue(mockResponse);
      
      const result = await affectations.deleteAffectation('123');
      
      expect(affectations.delete).toHaveBeenCalledWith('/api/affectation/123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Schedule Methods', () => {
    it('should save schedule', async () => {
      const mockSchedule = { date: '2025-01-01', time: '10:00' };
      const mockMaintenance = { id: '123', name: 'Test Maintenance' };
      const mockEmailDatas = { subject: 'Test Email' };
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'post').mockResolvedValue(mockResponse);
      
      const result = await affectations.saveSchedule(mockSchedule, mockMaintenance, mockEmailDatas);
      
      expect(affectations.post).toHaveBeenCalledWith(
        '/api/affectation/maintenance/123',
        expect.objectContaining({
          datas: mockSchedule,
          maintenance: mockMaintenance
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should save schedules for multiple maintenances', async () => {
      const mockSchedule = { date: '2025-01-01', time: '10:00' };
      const mockMaintenances = [{ id: '123' }, { id: '456' }];
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'post').mockResolvedValue(mockResponse);
      
      const result = await affectations.saveSchedules(mockSchedule, mockMaintenances);
      
      expect(affectations.post).toHaveBeenCalledWith(
        '/api/affectation/maintenances',
        expect.objectContaining({
          datas: mockSchedule,
          maintenances: mockMaintenances
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should update schedule', async () => {
      const mockSchedule = { id: '123', date: '2025-01-01' };
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'post').mockResolvedValue(mockResponse);
      
      const result = await affectations.updateSchedule(mockSchedule);
      
      expect(affectations.post).toHaveBeenCalledWith('/api/update/affectation', mockSchedule);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Programmation Contrat Intervention Methods', () => {
    it('should fetch programmation contrat intervention', async () => {
      const mockResponse = { success: true, data: [] };
      
      jest.spyOn(affectations, 'get').mockResolvedValue(mockResponse);
      
      const result = await affectations.fetchProgrammationContratIntervention('123');
      
      expect(affectations.get).toHaveBeenCalledWith(
        '/api/affectation/contrat/123/programmation/interventions',
        expect.any(Metadatas),
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should create programmation contrat intervention', async () => {
      const mockProgrammation = { date: '2025-01-01', type: 'maintenance' };
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'post').mockResolvedValue(mockResponse);
      
      const result = await affectations.createProgrammationContratIntervention(mockProgrammation, '123');
      
      expect(affectations.post).toHaveBeenCalledWith(
        '/api/affectation/contrat/123/programmation/interventions',
        mockProgrammation
      );
      expect(result).toEqual(mockResponse);
    });

    it('should update programmation contrat intervention', async () => {
      const mockProgrammation = { id: '456', date: '2025-01-01', type: 'maintenance' };
      const mockResponse = { success: true };
      
      jest.spyOn(affectations, 'put').mockResolvedValue(mockResponse);
      
      const result = await affectations.updateProgrammationContratIntervention(mockProgrammation, '123');
      
      expect(affectations.put).toHaveBeenCalledWith(
        '/api/affectation/contrat/123/programmation/interventions',
        mockProgrammation
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Utility Methods', () => {
    it('should convert item to calendar format', () => {
      const mockUser = { uid: '123', nom: 'Doe', prenom: 'John' };
      const result = affectations.toCalendar(mockUser, 'user', '#FF0000');
      
      expect(result).toEqual({
        id: '123',
        type: 'user',
        name: 'Doe John',
        checked: true,
        color: '#fff',
        bgColor: '#FF0000',
        dragBgColor: '#FF0000',
        borderColor: '#FF0000',
        datas: mockUser
      });
    });

    it('should convert tiers to calendar format', () => {
      const mockTiers = { uid: '456', name: 'Company ABC' };
      const result = affectations.toCalendar(mockTiers, 'tiers', '#00FF00');
      
      expect(result).toEqual({
        id: '456',
        type: 'tiers',
        name: 'Company ABC',
        checked: true,
        color: '#fff',
        bgColor: '#00FF00',
        dragBgColor: '#00FF00',
        borderColor: '#00FF00',
        datas: mockTiers
      });
    });

    it('should format calendars from affectables', () => {
      const mockAffectables = {
        users: [
          { uid: '1', nom: 'Doe', prenom: 'John' },
          { uid: '2', nom: 'Smith', prenom: 'Jane' }
        ],
        tiers: [
          { uid: '3', name: 'Company A' },
          { uid: '4', name: 'Company B' }
        ]
      };
      
      const result = affectations.formatCalendars(mockAffectables);
      
      expect(result).toHaveLength(4);
      expect(result[0].type).toBe('user');
      expect(result[0].name).toBe('Doe John');
      expect(result[2].type).toBe('tiers');
      expect(result[2].name).toBe('Company A');
    });
  });

});
