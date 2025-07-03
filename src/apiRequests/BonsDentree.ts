import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { BonsDentre, BonsDentreCreateRequest, BonsDentreUpdateRequest } from "../types/BonsDentree";

/**
 * BonsDentree API request class
 * Service for managing goods receipt/inbound orders (bons d&#39;entrée)
 */
export class BonsDentree extends ApiRequest {
  endpoint: string = '/api/bons-dentree';
  endpointSingleton: string = '/api/bons-dentree';

  /**
   * Get all bons d'entrée (override base method to match mixin behavior)
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getBonsDentree(metadatas: Metadatas): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Override the default getAll to use getBonsDentree method
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    return this.getBonsDentree(metadatas);
  }

  /**
   * Get bon d'entrée by ID (override base method to match mixin behavior)
   * @param idBonDentree - The bon d'entrée ID
   * @returns Promise<any>
   */
  async getBonDentree(idBonDentree: string): Promise<any> {
    return this.get(`${this.endpointSingleton}/${idBonDentree}`, new Metadatas(), {});
  }

  /**
   * Override the default getById to use getBonDentree method
   * @param id - The bon d'entrée ID
   * @returns Promise<any>
   */
  async getById(id: number): Promise<any> {
    return this.getBonDentree(id.toString());
  }

  /**
   * Override the default create to match the mixin behavior
   * @param bonsDentree - Array of bons d'entrée or single bon d'entrée
   * @returns Promise<any>
   */
  async create(bonsDentree: any): Promise<any> {
    return this.post(this.endpoint, { datas: bonsDentree });
  }

  /**
   * Override the default update to match the mixin behavior
   * @param bonDentree - The bon d'entrée to update
   * @returns Promise<any>
   */
  async update(bonDentree: any): Promise<any> {
    return this.put(`${this.endpointSingleton}/${bonDentree.id}`, { datas: bonDentree });
  }

  /**
   * Override the default remove to match the mixin behavior
   * @param bonDentree - The bon d'entrée to delete
   * @returns Promise<any>
   */
  async remove(bonDentree: any): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${bonDentree.id}`);
  }
}
