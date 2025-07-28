import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Stock, StockCreateRequest, StockUpdateRequest } from "../types/Stocks";

/**
 * Stocks API request class
 * Service for managing stocks, depots and fiche demande consommables
 */
export class Stocks extends ApiRequest {
  endpoint: string = '/api/stocks';
  endpointSingleton: string = '/api/fiche-demande-consommables';

  /**
   * Get Depots.
   * 
   * @param metadatas Metadatas for filtering
   * @returns Promise with depots data
   */
  getDepots(metadatas: Metadatas = new Metadatas()): Promise<any> {
    const query = {
      userId: null
    };
    return this.get('/api/depots', metadatas, query);
  }

  /**
   * Get Stocks (overrides parent getAll method)
   * 
   * @param metadatas Metadatas for filtering  
   * @returns Promise with stocks data
   */
  override async getAll(metadatas: Metadatas): Promise<any> {
    const query = {
      userId: null
    };
    return this.get('/api/stocks', metadatas, query);
  }

  /**
   * Get Bon de sortie by id
   * @deprecated Use getById instead - this method does the same as parent getById
   * 
   * @param idFiche ID of the fiche
   * @returns Promise with fiche data
   */
  getFiche(idFiche: string): Promise<any> {
    return this.apiRequest(`/api/fiche-demande-consommables/${idFiche}`, 'GET', null);
  }

  /**
   * Create fiche-demande-consommables (overrides parent create method)
   * 
   * @param stocks Stocks data to create
   * @returns Promise with created data
   */
  override async create(stocks: any): Promise<any> {
    return this.post('/api/fiche-demande-consommables', { datas: stocks });
  }

  /**
   * Update fiche-demande-consommables (overrides parent update method)
   * 
   * @param id ID of the item to update
   * @param bonDeCommande Data to update
   * @returns Promise with updated data
   */
  override async update(id: number, bonDeCommande: any): Promise<any> {
    return this.put(`/api/fiche-demande-consommables/${id}`, { datas: bonDeCommande });
  }

  /**
   * Delete fiche-demande-consommables (overrides parent remove method)
   * 
   * @param id ID of the item to delete
   * @returns Promise with deletion result
   */
  override async remove(id: number): Promise<any> {
    return this.delete(`/api/fiche-demande-consommables/${id}`);
  }
}
