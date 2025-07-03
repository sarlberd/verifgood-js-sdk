import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { CorpsDetat as CorpsDetatType } from "../types/CorpsDetat";

/**
 * CorpsDetat API request class
 * Service for managing corps d&#39;etat (trades/professions)
 */
export class CorpsDetat extends ApiRequest {
  endpoint: string = '/api/corps-detats';
  endpointSingleton: string = '/api/corps-detat';

  /**
   * Get corps d'etat list
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getCorpsDetats(metadatas: Metadatas): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Create corps d'etat
   * @param data - The corps d'etat data array
   * @returns Promise<any>
   */
  async create(data: CorpsDetatType[]): Promise<any> {
    const payload = {
      datas: data
    };
    
    return this.post(this.endpoint, payload);
  }

  /**
   * Update corps d'etat
   * @param corpsdetat - The corps d'etat object
   * @returns Promise<any>
   */
  async updateCorpsDetat(corpsdetat: any): Promise<any> {
    const payload = {
      datas: corpsdetat
    };
    
    return this.put(`${this.endpointSingleton}/${corpsdetat.id}`, payload);
  }

  /**
   * Delete corps d'etat
   * @param corpsdetat - The corps d'etat object
   * @returns Promise<any>
   */
  async deleteCorpsDetat(corpsdetat: any): Promise<any> {
    return super.delete(`${this.endpointSingleton}/${corpsdetat.id}`);
  }
}
