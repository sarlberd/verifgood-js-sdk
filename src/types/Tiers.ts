/**
 * Service for managing tiers - Type definitions
 */
export interface Tier {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Request interface for creating Tier
 */
export interface TierCreateRequest {
    name: string;
}

/**
 * Request interface for updating Tier
 */
export interface TierUpdateRequest {
    name?: string;
}
