import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { BonsDeCommandeEntite, BonsDeCommandeEntiteCreateRequest, BonsDeCommandeEntiteUpdateRequest } from "../types/BonsDeCommandeEntites";

/**
 * BonsDeCommandeEntites API request class
 * Service for managing purchase order entities (bons de commande entites)
 */
export class BonsDeCommandeEntites extends ApiRequest {
  endpoint: string = '/api/bons-de-commande-entites';
  endpointSingleton: string = '/api/bons-de-commande-entite';

  /**
   * Get all bons de commande entites (override base method to match mixin behavior)
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getEntites(metadatas: Metadatas): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Override the default getAll to use getEntites method
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    return this.getEntites(metadatas);
  }

  /**
   * Override the default create to match the mixin behavior
   * @param bonsDeCommandeEntites - Array of bons de commande entites
   * @returns Promise<any>
   */
  async create(bonsDeCommandeEntites: any[]): Promise<any> {
    return this.post(this.endpoint, { datas: bonsDeCommandeEntites });
  }

  /**
   * Override the default update to match the mixin behavior
   * @param bonsDeCommandeEntite - The bon de commande entite to update
   * @returns Promise<any>
   */
  async update(bonsDeCommandeEntite: any): Promise<any> {
    return this.put(`${this.endpointSingleton}/${bonsDeCommandeEntite.id}`, { datas: bonsDeCommandeEntite });
  }

  /**
   * Override the default remove to match the mixin behavior
   * @param bonsDeCommandeEntite - The bon de commande entite to delete
   * @returns Promise<any>
   */
  async remove(bonsDeCommandeEntite: any): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${bonsDeCommandeEntite.id}`);
  }
}
