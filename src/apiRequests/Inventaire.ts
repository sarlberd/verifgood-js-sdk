import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Inventair, InventairCreateRequest, InventairUpdateRequest } from "../types/Inventaire";

/**
 * Inventaire API request class
 * Service for managing inventaires
 */
export class Inventaire extends ApiRequest {
  endpoint: string = '/api/inventaires';
  endpointSingleton: string = '/api/inventaire';

  /**
   * Override getAll method to get all inventaires
   * @param metadatas Metadatas object (optional)
   * @returns Promise with inventaires data
   */
  async getAll(metadatas?: Metadatas): Promise<any> {
    //@TODO: need review - original method name was fetchAll, simplified
    return this.get(this.endpoint, metadatas || new Metadatas(), {});
  }

  /**
   * Override getById method with custom state processing
   * @param id Inventaire ID
   * @returns Promise with inventaire data and processed state
   */
  async getById(id: number): Promise<any> {
    //@TODO: need review - complex state processing logic simplified
    const userId = null; // this.$app.appID equivalent
    return this.get(`/api/${userId}/inventaire/${id}`, new Metadatas(), {});
  }

  /**
   * Override create method
   * @param inventaires Array of inventaires to create
   * @returns Promise with created inventaires
   */
  async create(inventaires: any[]): Promise<any> {
    //@TODO: need review - takes array instead of single object
    return this.post(this.endpoint, inventaires);
  }

  /**
   * Override remove method
   * @param id Inventaire ID
   * @returns Promise with deletion result
   */
  async remove(id: number): Promise<any> {
    //@TODO: need review - uses custom endpoint with userId
    const userId = null; // this.$app.appID equivalent
    return this.delete(`/api/${userId}/inventaire/${id}`);
  }

  /**
   * @deprecated Use getAll instead
   * Fetch all inventaires with metadatas
   * @param metadatas Metadatas object
   * @returns Promise with inventaires data
   */
  async fetch(metadatas: Metadatas): Promise<any> {
    //@TODO: need review - deprecated method, consider removal
    const userId = null; // this.$app.appID equivalent
    const query = {
      userId: userId,
      metadatas: metadatas.get()
    };
    return this.get(`/api/${userId}/inventaire`, metadatas, query);
  }

  /**
   * Fetch inventaire en cours inventory
   * @returns Promise with current inventory data
   */
  async fetchEnCoursInventory(): Promise<any> {
    //@TODO: need review - complex logic simplified, needs proper implementation
    const inventaires = await this.getAll();
    if (inventaires.inventaires && inventaires.inventaires.length > 0) {
      const lastInventaireId = inventaires.inventaires[inventaires.inventaires.length - 1]['inventaire_id'];
      return this.getById(lastInventaireId);
    }
    throw new Error('No inventaires found');
  }

  /**
   * Fetch operations by inventaire ID
   * @param id Inventaire ID
   * @returns Promise with operations data
   */
  async fetchOperationsByInventaireId(id: number): Promise<any> {
    const userId = null; // this.$app.appID equivalent
    return this.get(`/api/${userId}/inventaire/${id}/operations`, new Metadatas(), {});
  }

  /**
   * Fetch operations by inventaire ID on specific lieu
   * @param inventaire_id Inventaire ID
   * @param lieu_id Lieu ID
   * @returns Promise with operations data
   */
  async fetchOperationsByInventaireIdOnLieu(inventaire_id: number, lieu_id: number): Promise<any> {
    const userId = null; // this.$app.appID equivalent
    return this.get(`/api/${userId}/inventaire/${inventaire_id}/operations/lieu/${lieu_id}`, new Metadatas(), {});
  }

  /**
   * @deprecated
   * Finalize inventaire on lieu
   * @param inventaire_id Inventaire ID
   * @param lieu_id Lieu ID
   * @returns Promise with finalization result
   */
  async finalizeInventaireOnLieu(inventaire_id: number, lieu_id: number): Promise<any> {
    //@TODO: need review - deprecated method, consider removal
    const userId = null; // this.$app.appID equivalent
    return this.post(`/api/${userId}/inventaire/${inventaire_id}/operations/lieu/${lieu_id}/finalize`, {});
  }

  /**
   * Create operation for inventaire
   * @param operation Operation object
   * @param inventaire_id Inventaire ID
   * @param lieu_id Lieu ID
   * @returns Promise with created operation
   */
  async createOperation(operation: any, inventaire_id: number, lieu_id: number): Promise<any> {
    //@TODO: need review - complex logic with store updates simplified
    const userId = null; // this.$app.appID equivalent
    const result = await this.post(`/api/${userId}/inventaire/${inventaire_id}/operations/lieu/${lieu_id}`, operation);
    
    // Refresh operations after creation
    await this.fetchOperationsByInventaireIdOnLieu(inventaire_id, lieu_id);
    
    return result;
  }

  /**
   * Remove operation from inventaire
   * @param operation Operation object with id, inventaire_id, and lieuInventorier_id
   * @returns Promise with deletion result
   */
  async removeOperationInventaire(operation: any): Promise<any> {
    //@TODO: need review - complex logic with store updates simplified
    const userId = null; // this.$app.appID equivalent
    const result = await this.delete(`/api/${userId}/inventaire/${operation.inventaire_id}/operation/${operation.id}`);
    
    // Refresh operations after deletion
    await this.fetchOperationsByInventaireIdOnLieu(operation.inventaire_id, operation.lieuInventorier_id);
    
    return result;
  }
}
