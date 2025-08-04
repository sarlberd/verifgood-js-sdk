import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Strip, StripCreateRequest, StripUpdateRequest } from "../types/Stripe";

/**
 * Stripe API request class
 * Service for managing Stripe customer portal and state
 */
export class Stripe extends ApiRequest {
  endpoint: string = '/api/stripe';
  endpointSingleton: string = '/api/stripe';

  /**
   * Open customer portal
   * Gets portal URL from API and opens it in a new tab (browser environment only)
   * 
   * @returns Promise with portal payload
   */
  openCustomerPortal(): Promise<any> {
    const query = {};
    return this.get('/api/stripe/customer/portal', new Metadatas(), query).then((portalPayload) => {
      // Only try to open window in browser environment
      if (typeof window !== 'undefined' && window.open && portalPayload.url) {
        window.open(portalPayload.url, '_blank');
      }
      return portalPayload;
    });
  }

  /**
   * Get customer state
   * Retrieves the current Stripe customer state
   * 
   * @returns Promise with customer state
   */
  getCustomerState(): Promise<any> {
    const query = {};
    return this.get('/api/stripe/customer', new Metadatas(), query);
  }
}
