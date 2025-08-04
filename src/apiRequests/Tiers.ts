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
}
