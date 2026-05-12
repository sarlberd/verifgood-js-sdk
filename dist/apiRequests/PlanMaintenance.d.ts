import { ApiRequest } from '../core/ApiRequest';
/**
 * PlanMaintenance API Service
 *
 * Handles maintenance plan operations including preventive maintenance scheduling,
 * task management, contract handling, and metadata processing for maintenance planning.
 *
 * Migrated from: mixins_to_migrate/PlanMaintenanceMixins.js
 * Original methods: 1 method
 */
export declare class PlanMaintenance extends ApiRequest {
    get endpoint(): string;
    get endpointSingleton(): string;
    /**
     * Get preventive maintenance plan data
     * @param {string} focusedDate - The focused date for maintenance planning
     * @param {any} metadatas - Metadata object with get() method
     * @param {string} userId - User ID (replaces this.$app.appID)
     * @param {string} sites - Site restrictions (replaces this.$app.restrictionsite)
     * @returns {Promise<any>} Promise resolving to maintenance plan data with tasks, contracts, and metadata
     */
    getPrevventiveMaintenance(focusedDate: string, metadatas: any, userId: string, sites: string): Promise<any>;
}
