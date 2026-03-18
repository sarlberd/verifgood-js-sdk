import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Tier, TierCreateRequest, TierUpdateRequest } from "../types/Tiers";

/**
 * Tiers API request class
 * Service for managing tiers
 */
export class Tiers extends ApiRequest {
  endpoint: string = '/api/tiers';
  endpointSingleton: string = '/api/tiers';

  /**
   * Get tiers with optional filtering
   * @param metadatas - The metadatas object for filtering
   * @param options - Options object with sites and userId
   * @returns Promise<any>
   */
  async getTiers(metadatas: Metadatas, options: { sites?: any; userId?: string } = {}): Promise<any> {
    const query = {
      sites: options.sites || null,
      userId: options.userId || null
    };

    return this.get(this.endpoint, metadatas, query);
  }

  /**
   * Get a single tier by ID
   * @param id - The tier ID
   * @returns Promise<any>
   */
  async getTiersById(id: number): Promise<any> {
    return this.get(`${this.endpoint}/${id}`, new Metadatas(), {});
  }

  /**
   * Update a tier
   * @param tier - The tier object with id and data to update
   * @returns Promise<any>
   */
  async updateTier(tier: Tier & { id: number }): Promise<any> {
    return this.put(`${this.endpoint}/${tier.id}`, { datas: tier });
  }

  /**
   * Create a new tier
   * @param tier - The tier data to create
   * @returns Promise<any>
   */
  async createTier(tier: TierCreateRequest): Promise<any> {
    return this.post(this.endpoint, { datas: [tier] });
  }

  /**
   * Delete a tier
   * @param tier - The tier object with id
   * @param userId - Optional user ID
   * @returns Promise<any>
   */
  async deleteTier(tier: { id: number }, userId?: string): Promise<any> {
    const url = userId
      ? `${this.endpoint}/${tier.id}?userId=${userId}`
      : `${this.endpoint}/${tier.id}`;
    return this.delete(url);
  }

  /**
   * Archive a tier (set isArchived to "1")
   * @param tier - The tier object with id
   * @returns Promise<any>
   */
  async archive(tier: { id: number }): Promise<any> {
    const tierArchived = {
      id: tier.id,
      isArchived: "1"
    };

    return this.put(`${this.endpoint}/${tier.id}`, { datas: tierArchived });
  }

  /**
   * Unarchive a tier (set isArchived to "0")
   * @param tier - The tier object with id
   * @returns Promise<any>
   */
  async unarchive(tier: { id: number }): Promise<any> {
    const tierUnarchived = {
      id: tier.id,
      isArchived: "0"
    };

    return this.put(`${this.endpoint}/${tier.id}`, { datas: tierUnarchived });
  }
}
