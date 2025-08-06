"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Stripe API request class
 * Service for managing Stripe customer portal and state
 */
class Stripe extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/stripe';
        this.endpointSingleton = '/api/stripe';
    }
    /**
     * Open customer portal
     * Gets portal URL from API and opens it in a new tab (browser environment only)
     *
     * @returns Promise with portal payload
     */
    openCustomerPortal() {
        const query = {};
        return this.get('/api/stripe/customer/portal', new Metadatas_1.Metadatas(), query).then((portalPayload) => {
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
    getCustomerState() {
        const query = {};
        return this.get('/api/stripe/customer', new Metadatas_1.Metadatas(), query);
    }
}
exports.Stripe = Stripe;
//# sourceMappingURL=Stripe.js.map