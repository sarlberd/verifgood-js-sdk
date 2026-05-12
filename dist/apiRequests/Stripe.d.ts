import { ApiRequest } from "../core/ApiRequest";
/**
 * Stripe API request class
 * Service for managing Stripe customer portal and state
 */
export declare class Stripe extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Open customer portal
     * Gets portal URL from API and opens it in a new tab (browser environment only)
     *
     * @returns Promise with portal payload
     */
    openCustomerPortal(): Promise<any>;
    /**
     * Get customer state
     * Retrieves the current Stripe customer state
     *
     * @returns Promise with customer state
     */
    getCustomerState(): Promise<any>;
}
