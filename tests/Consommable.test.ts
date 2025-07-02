import { Consommable } from '../src/apiRequests/Consommable';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { ConsommablCreateRequest, ConsommablUpdateRequest } from '../src/types/Consommable';

describe('Consommable API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const consommable = new Consommable(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CRUD Operations', () => {
    describe('getAll', () => {
      it('should get all consommables', async () => {
        const mockResponse = [{ id: 1, name: 'Test Consommable' }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getAll(metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getById', () => {
      it('should get a consommable by id', async () => {
        const mockResponse = { id: 123, name: 'Test Consommable' };
        
        // Mock the apiRequest method instead of get, since getById calls apiRequest directly
        jest.spyOn(consommable, 'apiRequest').mockResolvedValue(mockResponse);

        const result = await consommable.getById(123);

        expect(consommable.apiRequest).toHaveBeenCalledWith('/api/consommable/123', 'GET', null);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('create', () => {
      it('should create a new consommable', async () => {
        const mockResponse = { id: 1, name: 'New Consommable' };
        const consommableData: ConsommablCreateRequest = {
          name: 'New Consommable',
          quantite: 10,
          quantiteMin: 5
        };
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.create(consommableData);

        expect(consommable.post).toHaveBeenCalledWith('/api/consommables', { datas: consommableData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('update', () => {
      it('should update a consommable', async () => {
        const mockResponse = { id: 123, name: 'Updated Consommable' };
        const consommableData: ConsommablUpdateRequest = {
          name: 'Updated Consommable'
        };
        
        jest.spyOn(consommable, 'put').mockResolvedValue(mockResponse);

        const result = await consommable.update(123, consommableData);

        expect(consommable.put).toHaveBeenCalledWith('/api/consommable/123', { datas: consommableData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('delete', () => {
      it('should delete a consommable', async () => {
        const mockResponse = { success: true };
        
        jest.spyOn(consommable, 'delete').mockResolvedValue(mockResponse);

        const result = await consommable.delete('123');

        expect(consommable.delete).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Enhanced Methods', () => {
    describe('getConsommables', () => {
      it('should get consommables with storage options', async () => {
        const mockResponse = [{ id: 1, name: 'Test Consommable' }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getConsommables(metadatas, { _stored: true });

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getConsommablesEtiquettes', () => {
      it('should get consommables etiquettes', async () => {
        const mockResponse = [{ id: 1, label: 'Test Label' }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getConsommablesEtiquettes(metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables/etiquettes', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getConsommablesEnStock', () => {
      it('should get consommables en stock', async () => {
        const mockResponse = [{ id: 1, name: 'In Stock Consommable' }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getConsommablesEnStock(metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables/en-stock', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getEquipements', () => {
      it('should get equipements for a consommable', async () => {
        const mockResponse = [{ id: 1, name: 'Test Equipment' }];
        const consommableObj = { id: 123 };
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getEquipements(consommableObj, metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommable/123/equipements', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Equipment and Association Methods', () => {
    describe('getConsommablesForEquipement', () => {
      it('should get consommables for an equipement', async () => {
        const mockResponse = [{ id: 1, name: 'Consommable for equipment' }];
        const idEquipement = 456;
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getConsommablesForEquipement(idEquipement);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables/equipement/456', expect.any(Object), {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getEquipementConsommables', () => {
      it('should get equipement consommables', async () => {
        const mockResponse = [{ id: 1, name: 'Equipment Consommable' }];
        const equipement = { id: 456 };
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getEquipementConsommables(equipement, metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/equipement/456/consommables', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createConsommablesEquipements', () => {
      it('should create consommables equipements association', async () => {
        const mockResponse = { success: true };
        const associationData = [{ consommable_id: 1, equipement_id: 2 }];
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.createConsommablesEquipements(associationData);

        expect(consommable.post).toHaveBeenCalledWith('/api/consommables/equipements', associationData);
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Stock Management Methods', () => {
    describe('updateStock', () => {
      it('should update stock for a consommable', async () => {
        const mockResponse = { success: true };
        const consommableData = { id: 1 };
        const stockData = { id: 123, quantite: 50 };
        
        jest.spyOn(consommable, 'put').mockResolvedValue(mockResponse);

        const result = await consommable.updateStock(consommableData, stockData);

        expect(consommable.put).toHaveBeenCalledWith('/api/consommable/1/stock/123', { datas: stockData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateConsommables', () => {
      it('should update multiple consommables', async () => {
        const mockResponse = [{ id: 1, name: 'Updated Consommable 1' }];
        const consommablesData = [{ id: 1, name: 'Updated Consommable 1' }];
        
        jest.spyOn(consommable, 'put').mockResolvedValue(mockResponse);

        const result = await consommable.updateConsommables(consommablesData);

        expect(consommable.put).toHaveBeenCalledWith('/api/consommables', { datas: consommablesData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteMultiple', () => {
      it('should delete multiple consommables', async () => {
        const mockResponse = { success: true };
        const consommablesData = [{ id: 1 }, { id: 2 }];
        
        jest.spyOn(consommable, 'put').mockResolvedValue(mockResponse);

        const result = await consommable.deleteMultiple(consommablesData);

        expect(consommable.put).toHaveBeenCalledWith('/api/delete/consommables', { datas: consommablesData });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('removeConsommable', () => {
      it('should remove/delete a consommable', async () => {
        const mockResponse = { success: true };
        const consommableData = { id: 123 };
        
        jest.spyOn(consommable, 'delete').mockResolvedValue(mockResponse);

        const result = await consommable.removeConsommable(consommableData);

        expect(consommable.delete).toHaveBeenCalledWith('/api/consommable/123');
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Consumption and Movement Methods', () => {
    describe('getConsommations', () => {
      it('should get consommations', async () => {
        const mockResponse = [{ id: 1, quantite: 10 }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getConsommations(metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommable/mouvements', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createConsommableMouvement', () => {
      it('should create a consommable mouvement', async () => {
        const mockResponse = { id: 1, success: true };
        const mouvement = { quantite: 10, type: 'entree' };
        const idConsommable = 1;
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.createConsommableMouvement(mouvement, idConsommable);

        expect(consommable.post).toHaveBeenCalledWith('/api/consommables/mouvement', [{ ...mouvement, consommable_id: idConsommable }]);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteConsommableMouvement', () => {
      it('should delete a consommable mouvement', async () => {
        const mockResponse = { success: true };
        
        jest.spyOn(consommable, 'delete').mockResolvedValue(mockResponse);

        const result = await consommable.deleteConsommableMouvement(1);

        expect(consommable.delete).toHaveBeenCalledWith('/api/consommable/mouvement/1');
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createConsommations', () => {
      it('should create consommations', async () => {
        const mockResponse = { success: true };
        const consommations = [{ quantite: 5, consommable_id: 1 }];
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.createConsommations(consommations);

        expect(consommable.post).toHaveBeenCalledWith('/api/consommations', { datas: consommations });
        expect(result).toEqual(mockResponse);
      });

      it('should create consommations with maintenance ID', async () => {
        const mockResponse = { success: true };
        const consommations = [{ quantite: 5, consommable_id: 1 }];
        const idMaintenance = 123;
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.createConsommations(consommations, idMaintenance);

        expect(consommable.post).toHaveBeenCalledWith('/api/maintenance/123/consommations', consommations);
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Export and Reporting Methods', () => {
    describe('getFile', () => {
      it('should export consommables file', async () => {
        const mockResponse = 'file data';
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getFile(metadatas, 'test-file', 'xlsx');

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables/export/excel', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getRepartitionQuantites', () => {
      it('should get repartition quantites', async () => {
        const mockResponse = [{ quantite: 100, type: 'entree' }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getRepartitionQuantites(metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommable/mouvements/repartition-quantites', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getConsommableMouvementsDemandeurs', () => {
      it('should get consommable mouvements demandeurs', async () => {
        const mockResponse = [{ demandeur: 'User 1' }];
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getConsommableMouvementsDemandeurs(metadatas);

        expect(consommable.get).toHaveBeenCalledWith('/api/consommable/mouvements/demandeurs', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });

    describe('exportConsommables', () => {
      it('should export consommables to file', async () => {
        const mockResponse = 'export data';
        const metadatas = new Metadatas();
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.exportConsommables(metadatas, 'test-export', 'xlsx');

        expect(consommable.get).toHaveBeenCalledWith('/api/consommable/mouvements/export/excel', metadatas, {});
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Supplier and Integration Methods', () => {
    describe('createConsommableFournisseurs', () => {
      it('should create consommable fournisseurs association', async () => {
        const mockResponse = { success: true };
        const consommableId = 1;
        const fournisseurs = [{ id: 123, name: 'Supplier 1' }];
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.createConsommableFournisseurs(consommableId, fournisseurs);

        expect(consommable.post).toHaveBeenCalledWith('/api/consommable/1/fournisseurs', fournisseurs);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('removeConsommableFournisseurs', () => {
      it('should remove consommable fournisseurs association', async () => {
        const mockResponse = { success: true };
        const consommableId = 1;
        const fournisseur = { id: 123 };
        
        jest.spyOn(consommable, 'delete').mockResolvedValue(mockResponse);

        const result = await consommable.removeConsommableFournisseurs(consommableId, fournisseur);

        expect(consommable.delete).toHaveBeenCalledWith('/api/consommable/1/fournisseur/123');
        expect(result).toEqual(mockResponse);
      });
    });

    describe('importModelConsommablesExcel', () => {
      it('should import consommables from Excel model', async () => {
        const mockResponse = { success: true };
        const consommables = [{ name: 'Imported Consommable' }];
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.importModelConsommablesExcel(consommables);

        expect(consommable.post).toHaveBeenCalledWith('/api/consommables/integration/model', consommables);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getExcelFileModeleIntegration', () => {
      it('should get Excel file model for integration', async () => {
        const mockResponse = 'excel file data';
        
        jest.spyOn(consommable, 'get').mockResolvedValue(mockResponse);

        const result = await consommable.getExcelFileModeleIntegration('custom-filename');

        expect(consommable.get).toHaveBeenCalledWith('/api/consommables/integration/model', expect.any(Object), {});
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Additional Methods', () => {
    describe('createOperationsConsommations', () => {
      it('should create operations consommations for maintenance', async () => {
        const mockResponse = { success: true };
        const consommations = [{ quantite: 5, date_mouvement: '2024-01-01' }];
        const idMaintenance = 123;
        
        jest.spyOn(consommable, 'post').mockResolvedValue(mockResponse);

        const result = await consommable.createOperationsConsommations(consommations, idMaintenance);

        expect(consommable.post).toHaveBeenCalledWith('/api/maintenance/123/operations', { datas: consommations });
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
