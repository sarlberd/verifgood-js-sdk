import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { IntegrationsDonnee, IntegrationsDonneeCreateRequest, IntegrationsDonneeUpdateRequest } from "../types/IntegrationsDonnees";

/**
 * IntegrationsDonnees API request class
 * Service for managing data integrations
 */
export class IntegrationsDonnees extends ApiRequest {
  endpoint: string = '/api/integration/categories/lieux';
  endpointSingleton: string = '/api/integration/categories/lieux';

  /**
   * Integration method for categories lieux from CSV data
   * @param composants CSV data for categories lieux
   * @returns Promise with the integration result
   */
  async categoriesLieux(composants: any): Promise<any> {
    //@TODO: need review - specific types not provided in mixin
    const payload = {
      csv: composants
    };
    return this.post('/api/integration/categories/lieux/json', payload);
  }
}
