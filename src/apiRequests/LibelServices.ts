import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { LibelService, LibelServiceCreateRequest, LibelServiceUpdateRequest } from "../types/LibelServices";

/**
 * LibelServices API request class
 * 
 */
export class LibelServices extends ApiRequest {
  endpoint: string = '/api/libel-services';
  endpointSingleton: string = '/api/libel-service';

  /**
   * Get all libel services with custom options
   * Overrides the base getAll method to handle metadatas and site restriction
   * 
   * @param metadatas - Metadatas object
   * @param options - Options for the request
   * @returns Promise with libel services data
   */
  async getAll(metadatas: Metadatas, options: { _stored?: boolean; _restrictionSite?: boolean; _all?: boolean } = {}): Promise<any> {
    const { _stored = true, _restrictionSite = false, _all = false } = options;
    
    const query: any = {
      userId: null, // this.$app.appID equivalent
      metadatas: metadatas.get()
    };
    
    if (_restrictionSite && !_all) {
      query.site = null; // this.$app.restrictionsite equivalent
    }
    
    return this.get(this.endpoint, metadatas, query);
  }

  /**
   * Create libel services
   * Overrides the base create method to handle the "datas" wrapper
   * 
   * @param libelServices - Array of libel services to create
   * @returns Promise with created libel services
   */
  async create(libelServices: LibelServiceCreateRequest[]): Promise<any> {
    const payload = { datas: libelServices };
    return this.post(this.endpoint, payload);
  }

  /**
   * Delete a libel service
   * Custom method to handle libel service deletion with object parameter
   * 
   * @param libelService - The libel service to delete
   * @returns Promise with deletion result
   */
  async deleteLibelService(libelService: LibelService): Promise<any> {
    if (!libelService.id) {
      throw new Error('LibelService ID is required for deletion');
    }
    return this.delete(`${this.endpointSingleton}/${libelService.id}`);
  }
}
