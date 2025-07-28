import { Maintenance } from '../src/apiRequests/Maintenance';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { MaintenanceCreateRequest, MaintenanceUpdateRequest } from '../src/types/Maintenance';

describe('Maintenance API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const maintenance = new Maintenance(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(maintenance.endpoint).toBe('/api/maintenances');
      expect(maintenance.endpointSingleton).toBe('/api/maintenance');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(maintenance.auth).toBe(mockAuth);
      expect(maintenance.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('Non-CRUD Methods', () => {
    beforeEach(() => {
      jest.spyOn(maintenance, 'get').mockResolvedValue({ datas: [], metadatas: {} });
      jest.spyOn(maintenance, 'post').mockResolvedValue({});
      jest.spyOn(maintenance, 'put').mockResolvedValue({});
      jest.spyOn(maintenance, 'delete').mockResolvedValue({});
      jest.spyOn(maintenance, 'apiRequest').mockResolvedValue({});
    });

    it('should call getMaintenances with correct parameters', async () => {
      const metadatas = new Metadatas();
      const options = { _stored: true, onlyEncours: false };
      
      await maintenance.getMaintenances(metadatas, options);
      
      expect(maintenance.get).toHaveBeenCalledWith('/api/maintenances', metadatas, { onlyEncours: false });
    });

    it('should call getMesMaintenancesPlanifiees', async () => {
      const metadatas = new Metadatas();
      
      await maintenance.getMesMaintenancesPlanifiees(metadatas);
      
      expect(maintenance.get).toHaveBeenCalledWith('/api/maintenances/mes-planifiees', metadatas, {});
    });

    it('should call getDemandeurs', async () => {
      const metadatas = new Metadatas();
      
      await maintenance.getDemandeurs(metadatas);
      
      expect(maintenance.get).toHaveBeenCalledWith('/api/maintenances/demandeurs', metadatas, {});
    });

    it('should call createMaintenances', async () => {
      const maintenances = [{ statut: 'En cours' }];
      
      await maintenance.createMaintenances(maintenances);
      
      expect(maintenance.post).toHaveBeenCalledWith('/api/maintenances', maintenances);
    });

    it('should call demandeDevis', async () => {
      const maintenanceId = '123';
      const payload = { message: 'Demande de devis' };
      
      await maintenance.demandeDevis(maintenanceId, payload);
      
      expect(maintenance.post).toHaveBeenCalledWith('/api/maintenance/123/demande-devis', payload);
    });

    it('should call deleteMultiple', async () => {
      const maintenances = [{ id: '1' }, { id: '2' }];
      
      await maintenance.deleteMultiple(maintenances);
      
      expect(maintenance.apiRequest).toHaveBeenCalledWith('/api/maintenances/delete-multiple', 'DELETE', maintenances);
    });

    it('should call relancer', async () => {
      const maintenanceObj = { id: '123' };
      const commentaire = 'Test comment';
      
      await maintenance.relancer(maintenanceObj, commentaire);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenance/123/relance', {
        id: '123',
        commentaire: 'Test comment'
      });
    });

    it('should call postMaintenanceOperations', async () => {
      const idMaintenance = '123';
      const operations = [{ type: 'repair' }];
      
      await maintenance.postMaintenanceOperations(idMaintenance, operations);
      
      expect(maintenance.post).toHaveBeenCalledWith('/api/maintenance/123/operations', { datas: operations });
    });

    it('should call postOperations', async () => {
      const operations = [{ type: 'repair' }];
      
      await maintenance.postOperations(operations);
      
      expect(maintenance.post).toHaveBeenCalledWith('/api/operations', { datas: operations });
    });

    it('should call putOperation', async () => {
      const operation = { id: '123', type: 'repair' };
      
      await maintenance.putOperation(operation);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/operation/123', { datas: operation });
    });

    it('should call deleteOperation', async () => {
      const idOperation = '123';
      const operation = { uid: 'uid123' };
      
      await maintenance.deleteOperation(idOperation, operation);
      
      expect(maintenance.delete).toHaveBeenCalledWith('/api/operation/123');
    });

    it('should call prendreEnCompteMaintenances', async () => {
      const maintenances = [{ id: '1' }, { id: '2' }];
      
      await maintenance.prendreEnCompteMaintenances(maintenances);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenances/prendre-en-compte', { datas: maintenances });
    });

    it('should call prendreEnCompteMaintenance', async () => {
      const maintenanceObj = { id: '123' };
      
      await maintenance.prendreEnCompteMaintenance(maintenanceObj);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenance/123/prendre-en-compte', { datas: maintenanceObj });
    });

    it('should call mettreEnAttenteMaintenances', async () => {
      const maintenances = [{ id: '1' }, { id: '2' }];
      
      await maintenance.mettreEnAttenteMaintenances(maintenances);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenances/mettre-en-attente', { datas: maintenances });
    });

    it('should call mettreEnAttenteMaintenance', async () => {
      const maintenanceObj = { id: '123' };
      
      await maintenance.mettreEnAttenteMaintenance(maintenanceObj);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenance/123/mettre-en-attente', { datas: maintenanceObj });
    });

    it('should call resolveMaintenances', async () => {
      const maintenances = [{ id: '1' }, { id: '2' }];
      const rapportCloture = 'Resolved successfully';
      
      await maintenance.resolveMaintenances(maintenances, rapportCloture);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenances/resolve', maintenances);
    });

    it('should call resolveMaintenance', async () => {
      const maintenanceObj = { id: '123' };
      const files = [{ name: 'report.pdf' }];
      
      await maintenance.resolveMaintenance(maintenanceObj, files);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenance/123/resolve', { maintenance: maintenanceObj, files });
    });

    it('should call reopenMaintenances', async () => {
      const maintenanceId = '123';
      
      await maintenance.reopenMaintenances(maintenanceId);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenance/123/reopen', {});
    });

    it('should call setStatusMaintenances', async () => {
      const maintenances = [{ id: '1' }, { id: '2' }];
      const status = 'En cours';
      
      await maintenance.setStatusMaintenances(maintenances, status);
      
      expect(maintenance.put).toHaveBeenCalledWith('/api/maintenances/status/En cours', maintenances);
    });

    it('should call getFile', async () => {
      const metadatas = new Metadatas();
      const filename = 'export';
      const fileExtension = 'xlsx';
      
      await maintenance.getFile(metadatas, filename, fileExtension);
      
      expect(maintenance.get).toHaveBeenCalledWith('/api/maintenances/export/excel', metadatas, {});
    });

    it('should call getFile with CSV extension', async () => {
      const metadatas = new Metadatas();
      const filename = 'export';
      const fileExtension = 'csv';
      
      await maintenance.getFile(metadatas, filename, fileExtension);
      
      expect(maintenance.get).toHaveBeenCalledWith('/api/maintenances/export/csv', metadatas, {});
    });

    it('should call getPdfFile', async () => {
      const idMaintenance = '123';
      const filename = 'maintenance_report';
      
      await maintenance.getPdfFile(idMaintenance, filename);
      
      expect(maintenance.apiRequest).toHaveBeenCalledWith('/api/maintenance/123/export/pdf/S', 'GET', null);
    });
  });

  describe('Utility Methods', () => {
    it('should calculate coutInterne correctly', () => {
      const workingTime = '120'; // 2 hours in minutes
      const result = maintenance.coutInterne(workingTime);
      
      expect(result).toBe('0.00'); // Since tauxHoraire is 0 in the implementation
    });

    it('should return 0 for dureeMiseEnAttente', () => {
      const maintenanceObj = { id: '123' };
      const result = maintenance.dureeMiseEnAttente(maintenanceObj);
      
      expect(result).toBe(0);
    });

    it('should return 0 for dureeFermetureTemporaireHorsWeekend', () => {
      const maintenanceObj = { id: '123' };
      const result = maintenance.dureeFermetureTemporaireHorsWeekend(maintenanceObj);
      
      expect(result).toBe(0);
    });

    it('should return 0 for dureeNetteTraitement', () => {
      const maintenanceObj = { id: '123' };
      const result = maintenance.dureeNetteTraitement(maintenanceObj);
      
      expect(result).toBe(0);
    });

    it('should resolve updateMultipleTypologies', async () => {
      const maintenanceIds = ['1', '2', '3'];
      const typologyName = 'Critical';
      
      const result = await maintenance.updateMultipleTypologies(maintenanceIds, typologyName);
      
      expect(result).toEqual({});
    });

    it('should return empty array for deprecated getCalendarEvents', async () => {
      const metadatas = new Metadatas();
      const result = await maintenance.getCalendarEvents(metadatas);
      
      expect(result).toEqual([]);
    });

    it('should return empty array for deprecated formatToCalendarEvents', () => {
      const maintenances = [{ id: '1' }, { id: '2' }];
      const result = maintenance.formatToCalendarEvents(maintenances);
      
      expect(result).toEqual([]);
    });
  });
});
