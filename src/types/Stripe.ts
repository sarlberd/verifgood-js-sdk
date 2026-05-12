/**
 * Service for managing Stripe customer portal and state - Type definitions
 */
export interface Strip {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Request interface for creating Strip
 */
export interface StripCreateRequest {
    name: string;
}

/**
 * Request interface for updating Strip
 */
export interface StripUpdateRequest {
    name?: string;
}
