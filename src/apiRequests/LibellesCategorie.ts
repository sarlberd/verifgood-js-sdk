import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { libellesCategorie } from "../types/libellesCategorie";

/**
 * LibellesCategorie API request class
 * Service for managing libelles categories
 */
export class LibellesCategorie extends ApiRequest {
  endpoint: string = '/api/libelles-categorie';
  endpointSingleton: string = '/api/libelle-categorie';

  /**
   * Override getAll method to get libelles categories with userId
   * @param metadatas Metadatas object
   * @returns Promise with libelles categories data
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    const query = {
      userId: null, // this.$app.appID equivalent
      metadatas: metadatas.get()
    };
    return this.get(this.endpoint, metadatas, query);
  }

  /**
   * Override create method for libelles categories
   * @param libellesCategories Array of libelles categories to create
   * @param options Optional parameters
   * @returns Promise with created libelles categories
   */
  async create(libellesCategories: any[], options: any = { _stored: true }): Promise<any> {
    //@TODO: need review - takes array and has custom options parameter
    const result = await this.post('/api/libelles-categories', { datas: libellesCategories });
    
    // Note: Original method had store dispatch logic for _stored option
    // This would need to be handled by the calling code
    return result.datas;
  }

  /**
   * Override remove method for libelles categories
   * @param id Libelle categorie ID
   * @returns Promise with deletion result
   */
  async remove(id: number): Promise<any> {
    const result = await this.delete(`${this.endpointSingleton}/${id}`);
    return { libelleCategorie: result };
  }
}
