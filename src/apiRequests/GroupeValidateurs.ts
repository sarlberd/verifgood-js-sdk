import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { GroupeValidateur, GroupeValidateurCreateRequest, GroupeValidateurUpdateRequest } from "../types/GroupeValidateurs";

/**
 * GroupeValidateurs API request class
 * Service for managing groupe validateurs
 */
export class GroupeValidateurs extends ApiRequest {
  endpoint: string = '/api/groupe-validateurs';
  endpointSingleton: string = '/api/groupe-validateur';

  /**
   * Get all groupe validateurs
   * @param metadatas Metadatas for filtering
   * @returns Promise<any>
   * @deprecated Use getAll() instead - this method is provided by the parent ApiRequest class
   */
  async getGroupeValidateurs(metadatas: Metadatas): Promise<any> {
    const query = {
      metadatas: metadatas.get()
    };
    const response = await this.get(this.endpoint, metadatas, query);
    return { groupeValidateurs: response.datas, metadatas: response.metadatas };
  }
}
