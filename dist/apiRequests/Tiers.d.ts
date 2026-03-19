import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Tier, TierCreateRequest } from "../types/Tiers";
/**
 * Tiers API request class
 * Service for managing tiers
 */
export declare class Tiers extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get tiers with optional filtering
     * @param metadatas - The metadatas object for filtering
     * @param options - Options object with sites and userId
     * @returns Promise<any>
     */
    getTiers(metadatas: Metadatas, options?: {
        sites?: any;
        userId?: string;
    }): Promise<any>;
    /**
     * Get a single tier by ID
     * @param id - The tier ID
     * @returns Promise<any>
     */
    getTiersById(id: number): Promise<any>;
    /**
     * Update a tier
     * @param tier - The tier object with id and data to update
     * @returns Promise<any>
     */
    updateTier(tier: Tier & {
        id: number;
    }): Promise<any>;
    /**
     * Create a new tier
     * @param tier - The tier data to create
     * @returns Promise<any>
     */
    createTier(tier: TierCreateRequest): Promise<any>;
    /**
     * Delete a tier
     * @param tier - The tier object with id
     * @param userId - Optional user ID
     * @returns Promise<any>
     */
    deleteTier(tier: {
        id: number;
    }, userId?: string): Promise<any>;
    /**
     * Archive a tier (set isArchived to "1")
     * @param tier - The tier object with id
     * @returns Promise<any>
     */
    archive(tier: {
        id: number;
    }): Promise<any>;
    /**
     * Unarchive a tier (set isArchived to "0")
     * @param tier - The tier object with id
     * @returns Promise<any>
     */
    unarchive(tier: {
        id: number;
    }): Promise<any>;
}
