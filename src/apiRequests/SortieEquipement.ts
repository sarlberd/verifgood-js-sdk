import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { SortieEquipemen, SortieEquipemenCreateRequest, SortieEquipemenUpdateRequest } from "../types/SortieEquipement";

/**
 * SortieEquipement API request class
 * Service for managing equipment output/exit operations
 */
export class SortieEquipement extends ApiRequest {
  endpoint: string = '/api/sortieequipement';
  endpointSingleton: string = '/api/sortieequipement';

  /**
   * Get equipment output/exit types
   * 
   * @param metadatas Metadatas for filtering and pagination
   * @returns Promise with types data and metadata
   */
  async getTypes(metadatas: Metadatas): Promise<{datas: any[], metadatas: any}> {
    const query = {
      userId: this.getAppUserId(), // @TODO: Implement app context integration - Original: this.$app.appID
    };

    try {
      // Use inherited get method to call /api/sortieequipement/types
      const typesEndpoint = `${this.endpoint}/types`;
      
      // Override the endpoint temporarily to use the types endpoint
      const originalEndpoint = this.endpoint;
      this.endpoint = typesEndpoint;
      
      const response = await this.get(this.endpoint, metadatas, query);
      
      // Restore original endpoint
      this.endpoint = originalEndpoint;
      
      // Return in the same format as original mixin
      return {
        datas: response.data || response,
        metadatas: response.meta || response.metadatas || {}
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user ID from app context
   * @TODO: Implement app context integration
   * Original mixin uses: this.$app.appID
   */
  private getAppUserId(): string | null {
    // @TODO: Need to implement app context access in framework-agnostic way
    return null;
  }
}
