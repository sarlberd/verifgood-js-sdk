import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { BonsDeSorti, BonsDeSortiCreateRequest, BonsDeSortiUpdateRequest } from "../types/BonsDeSortie";

/**
 * BonsDeSortie API request class
 * Service for managing outbound orders/goods issue (bons de sortie)
 */
export class BonsDeSortie extends ApiRequest {
  endpoint: string = '/api/bons-de-sortie';
  endpointSingleton: string = '/api/bon-de-sortie';

  /**
   * Get all bons de sortie (override base method to match mixin behavior)
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getBonsDeSortie(metadatas: Metadatas): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Override the default getAll to use getBonsDeSortie method
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    return this.getBonsDeSortie(metadatas);
  }

  /**
   * Get bon de sortie by ID (override base method to match mixin behavior)
   * @param idBonDeSortie - The bon de sortie ID
   * @returns Promise<any>
   */
  async getBonDeSortie(idBonDeSortie: string): Promise<any> {
    return this.get(`${this.endpoint}/${idBonDeSortie}`, new Metadatas(), {});
  }

  /**
   * Override the default getById to use getBonDeSortie method
   * @param id - The bon de sortie ID
   * @returns Promise<any>
   */
  async getById(id: number): Promise<any> {
    return this.getBonDeSortie(id.toString());
  }

  /**
   * Override the default create to match the mixin behavior
   * @param bonsDeSortie - The bon de sortie data
   * @param ficheDemandeConsommable - Optional fiche demande consommable
   * @returns Promise<any>
   */
  async create(bonsDeSortie: any, ficheDemandeConsommable: any = null): Promise<any> {
    return this.post(this.endpoint, { 
      datas: bonsDeSortie, 
      ficheDemandeConsommable: ficheDemandeConsommable 
    });
  }

  /**
   * Override the default update to match the mixin behavior
   * @param bonDeSortie - The bon de sortie to update
   * @returns Promise<any>
   */
  async update(bonDeSortie: any): Promise<any> {
    return this.put(`${this.endpointSingleton}/${bonDeSortie.id}`, { datas: bonDeSortie });
  }

  /**
   * Override the default remove to match the mixin behavior
   * @param bonDeSortie - The bon de sortie to delete
   * @returns Promise<any>
   */
  async remove(bonDeSortie: any): Promise<any> {
    return this.delete(`${this.endpoint}/${bonDeSortie.id}`);
  }

  /**
   * Get signataires (signers) for bons de sortie
   * @param metadatas - The metadatas object
   * @param type - Type of signataires: "receveurs" or "donneurs"
   * @returns Promise<any>
   */
  async getSignataires(metadatas: Metadatas, type: string = "receveurs"): Promise<any> {
    return this.get(`${this.endpoint}/${type}`, metadatas, {});
  }
}
