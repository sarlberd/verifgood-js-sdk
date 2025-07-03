import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { ContratEcheancie, ContratEcheancieCreateRequest, ContratEcheancieUpdateRequest } from "../types/ContratEcheancier";

/**
 * ContratEcheancier API request class
 * Service for managing contract payment schedules (echeances)
 */
export class ContratEcheancier extends ApiRequest {
  endpoint: string = '/api/contrats/echeances';
  endpointSingleton: string = '/api/contrat/echeance';

  /**
   * Get echeances for a specific contract
   * @param contratId - The contract ID
   * @returns Promise<any>
   */
  async getContratEcheances(contratId: string): Promise<any> {
    const metadatas = new Metadatas();
    metadatas.setDirectives([]);
    
    return this.get(`/api/contrat/${contratId}/echeances`, metadatas, {});
  }

  /**
   * Create contract echeances with userId
   * @param data - The contract echeances data
   * @returns Promise<any>
   */
  async create(data: ContratEcheancieCreateRequest): Promise<any> {
    return this.post(`${this.endpoint}`, data);
  }

  /**
   * Update contract echeance with userId
   * @param id - The echeance ID
   * @param data - The update data
   * @returns Promise<any>
   */
  async updateContratEcheance(id: string, data: ContratEcheancieUpdateRequest): Promise<any> {
    return this.put(`${this.endpointSingleton}/${id}`, data);
  }

  /**
   * Delete contract echeance with userId
   * @param id - The echeance ID
   * @returns Promise<any>
   */
  async deleteContratEcheance(id: string): Promise<any> {
    return super.delete(`${this.endpointSingleton}/${id}`);
  }
}
