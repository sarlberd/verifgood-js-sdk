import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { BonDeCommandeItem, BonDeCommandeItemCreateRequest, BonDeCommandeItemUpdateRequest } from "../types/BonDeCommandeItems";

/**
 * BonDeCommandeItems API request class
 * Service for managing purchase order items (bon de commande items)
 */
export class BonDeCommandeItems extends ApiRequest {
  endpoint: string = '/api/items/bons-de-commande';
  endpointSingleton: string = '/api/item';

  /**
   * Override the default getAll to match the mixin behavior
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Override the default create to match the mixin behavior
   * @param bonDeCommandeItems - Array of bon de commande items
   * @returns Promise<any>
   */
  async create(bonDeCommandeItems: any[]): Promise<any> {
    return this.post(this.endpoint, { datas: bonDeCommandeItems });
  }

  /**
   * Override the default update to match the mixin behavior
   * @param bonDeCommandeItem - The bon de commande item to update
   * @returns Promise<any>
   */
  async update(bonDeCommandeItem: any): Promise<any> {
    return this.put(`${this.endpointSingleton}/${bonDeCommandeItem.id}/bon-de-commande`, { datas: bonDeCommandeItem });
  }

  /**
   * Override the default remove to match the mixin behavior
   * @param bonDeCommandeItem - The bon de commande item to delete
   * @returns Promise<any>
   */
  async remove(bonDeCommandeItem: any): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${bonDeCommandeItem.id}/bon-de-commande`);
  }

  /**
   * Get bon de commande items and create clones for new usage
   * @param metadatas - The metadatas object
   * @returns Promise<any[]> - Array of cloned items
   */
  async getClones(metadatas: Metadatas): Promise<any[]> {
    const result = await this.getAll(metadatas);
    const bonDeCommandeItems = result.bonDeCommandeItems || result;
    
    const bonDeCommandeItemsClones = bonDeCommandeItems.map((item: any) => {
      return Object.assign({}, item, {
        quantiteLivree: 0,
        bonDeCommande_id: null,
        id: null,
        uid: null
      });
    });
    
    return bonDeCommandeItemsClones;
  }
}
