import { ApiRequest } from '../core/ApiRequest';
import { Metadatas } from '../core/Metadatas';

/**
 * MouvementsEquipements API Service
 * Handles equipment movements operations including CRUD operations and specialized methods.
 */
export class MouvementsEquipements extends ApiRequest {
  endpoint: string = '/api/mouvements';
  endpointSingleton: string = '/api/mouvements';

  /**
   * Get all mouvements equipements with optional metadatas filtering
   * @param metadatas - Metadata object for filtering and pagination
   * @returns Promise with mouvements data and metadata
   */
  async getMovements(metadatas: Metadatas): Promise<any> {
    // TODO: Implement store dispatch - needs manual review
    // Original implementation:
    // this.$store.dispatch("MouvementsEquipementsStore/set", datas);
    // this.$store.dispatch("MouvementsEquipementsStore/setCounters", meta.counters);
    // Returns: {"datas":datas,"metadatas":meta}
    
    const query = {
      metadatas: metadatas.get()
    };
    return this.get('/api/mouvements', metadatas, query);
  }

  /**
   * Get specific mouvement equipement by ID
   * @param id - The mouvement equipement ID
   * @returns Promise with mouvement equipement data
   */
  async getMovementById(id: string | number): Promise<any> {
    // TODO: Implement store dispatch - needs manual review
    // Original implementation:
    // this.$store.dispatch("MouvementsEquipementsStore/setSelectedItem", mouvementsEquipements);
    // Returns: mouvementsEquipements (single object)
    
    const metadatas = new Metadatas();
    return this.get(`/api/mouvements/${id}`, metadatas, {});
  }

  /**
   * Update an existing mouvement equipement
   * @param mouvementEquipement - The mouvement equipement object to update
   * @returns Promise with updated mouvement equipement data
   */
  async updateMovement(mouvementEquipement: any): Promise<any> {
    if (!mouvementEquipement?.id) {
      throw new Error('Mouvement equipement ID is required for update');
    }
    
    // TODO: Implement store dispatch - needs manual review
    // Original implementation:
    // this.$store.dispatch("MouvementsEquipementsStore/setSelectedItem", mouvementsEquipements);
    // this.$store.dispatch("MouvementsEquipementsStore/updateItem", mouvementsEquipements);
    // Comment: "gérer l'update dans la collection courante"
    // Returns: mouvementsEquipements (updated object)
    
    return this.apiRequest('PUT', `/api/mouvements/${mouvementEquipement.id}`, mouvementEquipement);
  }

  /**
   * Create a new mouvement equipement
   * @param mouvementEquipement - The mouvement equipement object to create
   * @param type - The type of movement
   * @returns Promise with created mouvement equipement data
   */
  async createMovement(mouvementEquipement: any, type: string): Promise<any> {
    if (!type) {
      throw new Error('Movement type is required for creation');
    }
    
    // TODO: Implement store dispatch - needs manual review
    // Original implementation:
    // this.$store.dispatch("MouvementsEquipementsStore/setSelectedItem", mouvementsEquipements);
    // Returns: mouvementsEquipements (created object)
    
    return this.apiRequest('POST', `/api/mouvements/${type}`, mouvementEquipement);
  }

  /**
   * Delete a mouvement equipement
   * @param mouvementEquipement - The mouvement equipement object to delete
   * @returns Promise with deletion result
   */
  async deleteMovement(mouvementEquipement: any): Promise<any> {
    if (!mouvementEquipement?.id) {
      throw new Error('Mouvement equipement ID is required for deletion');
    }
    
    // TODO: Implement store dispatch - needs manual review
    // Original implementation:
    // this.$store.dispatch("MouvementsEquipementsStore/deleteItem", mouvementsEquipements["id"]);
    // Returns: datas (deletion result)
    
    return this.apiRequest('DELETE', `/api/mouvements/${mouvementEquipement.id}`, mouvementEquipement);
  }

  /**
   * Get mouvements signataires (receivers or givers)
   * @param metadatas - Metadata object for filtering
   * @param type - Type of signataires ('receveurs' or 'donneurs')
   * @returns Promise with signataires data
   */
  async getMouvementsSignataires(metadatas: Metadatas, type: string = 'receveurs'): Promise<any> {
    // TODO: Implement app context access - needs manual review
    // Original implementation requires: this.$app.appID
    const query: any = {
      // userId: this.$app.appID,
      metadatas: metadatas.get()
    };
    
    // TODO: Implement store dispatch - needs manual review
    // Original implementation:
    // console.log("Mouvements "+type, datas);
    // if(type=="receveurs") this.$store.dispatch("MouvementsEquipementsStore/setReceveurs", datas);
    // else if(type=="donneurs") this.$store.dispatch("MouvementsEquipementsStore/setDonneurs", datas);
    // Returns: {"signataires":datas,"metadatas":meta}
    
    return this.get(`/api/mouvements/${type}`, metadatas, query);
  }

  /**
   * Export mouvements to Excel or CSV file
   * @param metadatas - Metadata object for filtering
   * @param filename - Optional filename for export
   * @param fileExtension - File extension ('xlsx' or 'csv')
   * @returns Promise with export result
   */
  async exportMovements(metadatas: Metadatas, filename: string | null = null, fileExtension: string = 'xlsx'): Promise<any> {
    // TODO: Implement app context access and file download - needs manual review
    // Original implementation requires: this.$app.restrictionsite, moment(), window.URL, document
    
    // Clear directives for export
    const exportMetadatas = new Metadatas();
    exportMetadatas.setDirectives([]);
    
    const query: any = {
      // sites: this.$app.restrictionsite || '',
      metadatas: exportMetadatas.get()
    };
    
    const fileType = fileExtension !== "csv" ? "excel" : "csv";
    const contentType = fileExtension !== "csv" 
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
      : "text/csv";
    const responseType = fileExtension !== "csv" ? "blob" : "text";
    
    // TODO: Implement HTTP client options setting - needs manual review
    // Original: rc.setOptions({ 'responseType': responseType, 'Content-Type': contentType });
    
    // TODO: Implement file download logic - needs manual review
    // Original implementation includes:
    // - Blob creation with BOM for CSV: const BOM = "\uFEFF"; blob = new Blob([BOM + response], { type: contentType });
    // - URL.createObjectURL() for blob download
    // - Document link creation and click for automatic download
    // - Filename with moment().format("DD-MM-YYYY") timestamp
    // - Cleanup: document.body.removeChild(link)
    
    return this.get(`/api/mouvements/export/${fileType}`, exportMetadatas, query);
  }
}
