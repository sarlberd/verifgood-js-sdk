import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Consommabl, ConsommablCreateRequest, ConsommablUpdateRequest } from "../types/Consommable";

/**
 * Consommable API request class
 * Service for managing consommables (consumables) inventory and operations
 */
export class Consommable extends ApiRequest {
  endpoint: string = '/api/consommables';
  endpointSingleton: string = '/api/consommable';

  /**
   * Get consommables with storage options
   * Enhanced version of getAll with storage control
   * @param metadatas Metadatas for filtering
   * @param options Options including _stored flag
   * @returns Promise with consommables and metadatas
   */
  async getConsommables(metadatas: Metadatas, options: { _stored?: boolean } = { _stored: true }): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Get consommables étiquettes (labels)
   * @param metadatas Metadatas for filtering
   * @returns Promise with etiquettes and metadatas
   */
  async getConsommablesEtiquettes(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommables/etiquettes', metadatas, {});
  }

  /**
   * Get consommables conditionnements colisage
   * @param metadatas Metadatas for filtering
   * @returns Promise with conditionnements data
   */
  async getConsommablesConditionnementsColisage(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommables/conditionnements-colisage', metadatas, {});
  }

  /**
   * Get consommables en stock (in stock)
   * @param metadatas Metadatas for filtering
   * @returns Promise with in-stock consommables
   */
  async getConsommablesEnStock(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommables/en-stock', metadatas, {});
  }

  /**
   * Get consommables non disponibles (not available)
   * @param metadatas Metadatas for filtering
   * @returns Promise with non-available consommables
   */
  async getConsommablesNonDisponibles(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommables/non-disponibles', metadatas, {});
  }

  /**
   * Get consommables en demande (in demand)
   * @param metadatas Metadatas for filtering
   * @returns Promise with in-demand consommables
   */
  async getConsommablesEnDemande(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommables/en-demande', metadatas, {});
  }

  /**
   * Get consommables à commander (to order)
   * @param metadatas Metadatas for filtering
   * @returns Promise with consommables to order
   */
  async getConsommablesACommander(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommables/a-commander', metadatas, {});
  }

  /**
   * Get equipements for a consommable
   * @param consommable Consommable object with id
   * @param metadatas Metadatas for filtering
   * @returns Promise with equipements
   */
  async getEquipements(consommable: { id: number }, metadatas: Metadatas): Promise<any> {
    return this.get(`${this.endpointSingleton}/${consommable.id}/equipements`, metadatas, {});
  }

  /**
   * Update multiple consommables at once
   * @param consommables Array of consommables to update
   * @returns Promise
   */
  async updateConsommables(consommables: any[]): Promise<any> {
    //@TODO: This method needs endpoint verification
    return this.put(this.endpoint, { datas: consommables });
  }

  /**
   * Delete multiple consommables
   * @param consommables Array of consommables to delete
   * @returns Promise
   */
  async deleteMultiple(consommables: any[]): Promise<any> {
    return this.put('/api/delete/consommables', { datas: consommables });
  }

  /**
   * Update stock for a consommable
   * @param consommable Consommable object with id
   * @param stock Stock object with id and data
   * @returns Promise
   */
  async updateStock(consommable: { id: number }, stock: any): Promise<any> {
    return this.put(`${this.endpointSingleton}/${consommable.id}/stock/${stock.id}`, { datas: stock });
  }

  /**
   * Export consommables file (CSV or Excel)
   * @param metadatas Metadatas for filtering
   * @param filename Custom filename
   * @param fileExtension File extension
   * @returns Promise
   */
  async getFile(metadatas: Metadatas, filename?: string, fileExtension: string = "xlsx"): Promise<any> {
    //@TODO: This method contains custom file download logic that should be handled manually by devs
    const fileType = fileExtension !== "csv" ? "excel" : "csv";
    return this.get(`/api/consommables/export/${fileType}`, metadatas, {});
  }

  /**
   * Get consommables for a specific equipement (deprecated method)
   * @param idEquipement Equipement ID
   * @returns Promise
   * @deprecated Use getEquipementConsommables instead
   */
  async getConsommablesForEquipement(idEquipement: number): Promise<any> {
    return this.get(`/api/consommables/equipement/${idEquipement}`, new Metadatas(), {});
  }

  /**
   * Get consommables for a specific tiers
   * @param idTiers Tiers ID
   * @returns Promise
   */
  async getConsommablesForTiers(idTiers: number): Promise<any> {
    return this.get(`/api/consommables/equipement/tiers/${idTiers}`, new Metadatas(), {});
  }

  /**
   * Create consommable fournisseurs association
   * @param consommableId Consommable ID
   * @param fournisseurs Array of fournisseurs data
   * @returns Promise
   */
  async createConsommableFournisseurs(consommableId: number, fournisseurs: any[]): Promise<any> {
    return this.post(`${this.endpointSingleton}/${consommableId}/fournisseurs`, fournisseurs);
  }

  /**
   * Remove consommable fournisseurs association
   * @param consommableId Consommable ID
   * @param fournisseur Fournisseur object with id
   * @returns Promise
   */
  async removeConsommableFournisseurs(consommableId: number, fournisseur: { id: number }): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${consommableId}/fournisseur/${fournisseur.id}`);
  }

  /**
   * Create consommations for maintenance
   * @param consommations Array of consommation data
   * @param idMaintenance Maintenance ID (optional)
   * @returns Promise
   */
  async createConsommations(consommations: any[], idMaintenance?: number): Promise<any> {
    if (idMaintenance) {
      return this.post(`/api/maintenance/${idMaintenance}/consommations`, consommations);
    }
    return this.post('/api/consommations', { datas: consommations });
  }

  /**
   * Create consommables equipements association
   * @param consommablesEquipements Array of association data
   * @returns Promise
   */
  async createConsommablesEquipements(consommablesEquipements: any[]): Promise<any> {
    return this.post('/api/consommables/equipements', consommablesEquipements);
  }

  /**
   * Remove consommables equipements association
   * @param consommableId Consommable ID
   * @param equipementId Equipement ID
   * @returns Promise
   */
  async removeConsommablesEquipements(consommableId: number, equipementId: number): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${consommableId}/equipement/${equipementId}`);
  }

  /**
   * Get consommations (consommable movements)
   * @param metadatas Metadatas for filtering
   * @returns Promise
   */
  async getConsommations(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommable/mouvements', metadatas, {});
  }

  /**
   * Get repartition quantites
   * @param metadatas Metadatas for filtering
   * @returns Promise
   */
  async getRepartitionQuantites(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommable/mouvements/repartition-quantites', metadatas, {});
  }

  /**
   * Create consommable mouvement
   * @param mouvement Mouvement data
   * @param idConsommable Consommable ID
   * @returns Promise
   */
  async createConsommableMouvement(mouvement: any, idConsommable: number): Promise<any> {
    const mouvementData = { ...mouvement, consommable_id: idConsommable };
    return this.post('/api/consommables/mouvement', [mouvementData]);
  }

  /**
   * Delete consommable mouvement
   * @param idConsommableMouvement Mouvement ID
   * @returns Promise
   */
  async deleteConsommableMouvement(idConsommableMouvement: number): Promise<any> {
    return this.delete(`/api/consommable/mouvement/${idConsommableMouvement}`);
  }

  /**
   * Get consommable mouvement demandeurs
   * @param metadatas Metadatas for filtering
   * @returns Promise
   */
  async getConsommableMouvementsDemandeurs(metadatas: Metadatas): Promise<any> {
    return this.get('/api/consommable/mouvements/demandeurs', metadatas, {});
  }

  /**
   * Get equipement consommables (different from getConsommablesForEquipement)
   * @param equipement Equipement object with id
   * @param metadatas Metadatas for filtering
   * @returns Promise with consommables for the equipement
   */
  async getEquipementConsommables(equipement: { id: number }, metadatas: Metadatas): Promise<any> {
    return this.get(`/api/equipement/${equipement.id}/consommables`, metadatas, {});
  }

  /**
   * Remove/Delete a consommable (alternative delete method with different endpoint)
   * @param consommable Consommable object with id
   * @returns Promise
   */
  async removeConsommable(consommable: { id: number }): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${consommable.id}`);
  }

  /**
   * Create operations consommations for maintenance
   * @param consommations Array of consommation data
   * @param idMaintenance Maintenance ID
   * @returns Promise
   */
  async createOperationsConsommations(consommations: any[], idMaintenance: number): Promise<any> {
    return this.post(`/api/maintenance/${idMaintenance}/operations`, { datas: consommations });
  }

  /**
   * Get Excel file model for integration
   * @param filename Custom filename
   * @returns Promise
   */
  async getExcelFileModeleIntegration(filename: string = "VG_modèle_importation_consommables"): Promise<any> {
    // Note: This method requires custom file download handling on client side
    return this.get('/api/consommables/integration/model', new Metadatas(), {});
  }

  /**
   * Import model consommables from Excel
   * @param consommables Array of consommables data from Excel
   * @returns Promise
   */
  async importModelConsommablesExcel(consommables: any[]): Promise<any> {
    return this.post('/api/consommables/integration/model', consommables);
  }

  /**
   * Export consommables to file
   * @param metadatas Metadatas for filtering
   * @param filename Custom filename
   * @param fileExtension File extension (xlsx or csv)
   * @returns Promise
   */
  async exportConsommables(metadatas: Metadatas, filename?: string, fileExtension: string = "xlsx"): Promise<any> {
    const fileType = fileExtension !== "csv" ? "excel" : "csv";
    // Note: This method requires custom file download handling on client side
    return this.get(`/api/consommable/mouvements/export/${fileType}`, metadatas, {});
  }
}
