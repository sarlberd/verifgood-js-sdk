import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Contra, ContraCreateRequest, ContraUpdateRequest } from "../types/Contrat";

/**
 * Contrat API request class
 * Service for managing contracts
 */
export class Contrat extends ApiRequest {
  endpoint: string = '/api/contrats';
  endpointSingleton: string = '/api/contrat';

  /**
   * Get contracts with site restrictions
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   */
  async getContrats(metadatas: Metadatas): Promise<any> {
    const query = {
      sites: null //@TODO: Extract site restrictions from app context - this will be handled manually by devs
    };
    
    return this.get(this.endpoint, metadatas, query);
  }

  /**
   * Fetch contracts (deprecated - use getContrats instead)
   * @param metadatas - The metadatas object
   * @returns Promise<any>
   * @deprecated
   */
  async fetchContrats(metadatas: any = {"directives":[],"filters":[]}): Promise<any> {
    const query = {
      sites: null, //@TODO: Extract site restrictions from app context - this will be handled manually by devs
      metadatas: metadatas
    };
    
    return this.get(this.endpoint, new Metadatas(), query);
  }

  /**
   * Fetch single contract by ID (deprecated - use get instead)
   * @param idContrat - The contract ID
   * @param options - Options object
   * @returns Promise<any>
   * @deprecated
   */
  async fetchContrat(idContrat: string, options: any = {skipVueXStorage: false}): Promise<any> {
    return this.get(`${this.endpointSingleton}/${idContrat}`, new Metadatas(), {});
  }

  /**
   * Create a contract
   * @param data - The contract data
   * @returns Promise<any>
   */
  async create(data: ContraCreateRequest): Promise<any> {
    const payload = {
      datas: [data]
    };
    
    return this.post(this.endpoint, payload);
  }

  /**
   * Update a contract
   * @param contrat - The contract object
   * @param options - Options object
   * @returns Promise<any>
   */
  async updateContrat(contrat: any, options: any = {skipVueXStorage: false}): Promise<any> {
    // Remove fields that shouldn't be updated
    const contractToUpdate = { ...contrat };
    delete contractToUpdate.tiers_name;
    delete contractToUpdate.tiers_uid;
    
    return this.put(`${this.endpointSingleton}/${contrat.id}`, contractToUpdate);
  }

  /**
   * Archive a contract
   * @param contrat - The contract object
   * @param options - Options object
   * @returns Promise<any>
   */
  async archive(contrat: any, options: any = {skipVueXStorage: false}): Promise<any> {
    const contractArchived = {
      id: contrat.id,
      isArchived: "1"
    };
    
    return this.put(`${this.endpointSingleton}/${contractArchived.id}`, contractArchived);
  }

  /**
   * Delete a contract (deprecated)
   * @param contrat - The contract object
   * @returns Promise<any>
   * @deprecated
   */
  async deleteContrat(contrat: any): Promise<any> {
    return super.delete(`${this.endpointSingleton}/${contrat.id}`);
  }

  /**
   * Attach categories to a contract (deprecated)
   * @param categoriesContrat - Array of categories
   * @returns Promise<any>
   * @deprecated
   */
  async attachCategoriesToContrat(categoriesContrat: any[]): Promise<any> {
    //@TODO: This method uses a different host (v2) - needs manual review
    return this.post('/api/tier/contrat/categories', categoriesContrat);
  }

  /**
   * Format contract status (deprecated - should be moved to client-side utility)
   * @param contrat - The contract object
   * @returns string
   * @deprecated
   */
  formatStatus(contrat: any): string {
    //@TODO: This utility method should be moved to client-side utilities - this will be handled manually by devs
    // For now, return a placeholder
    return "Status formatting not implemented - move to client utilities";
  }
}
