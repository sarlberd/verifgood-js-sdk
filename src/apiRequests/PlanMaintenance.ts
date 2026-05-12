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
export class PlanMaintenance extends ApiRequest {
    
    public get endpoint(): string {
        return '/api/plan/maintenance';
    }
    
    public get endpointSingleton(): string {
        return '/api/plan/maintenance';
    }

    /**
     * Get preventive maintenance plan data
     * @param {string} focusedDate - The focused date for maintenance planning
     * @param {any} metadatas - Metadata object with get() method
     * @param {string} userId - User ID (replaces this.$app.appID)
     * @param {string} sites - Site restrictions (replaces this.$app.restrictionsite)
     * @returns {Promise<any>} Promise resolving to maintenance plan data with tasks, contracts, and metadata
     */
    getPrevventiveMaintenance(focusedDate: string, metadatas: any, userId: string, sites: string): Promise<any> {
        // TODO: Preserve original Vue2 logic for preventive maintenance plan retrieval
        // Original: this.$rc.get("/api/plan/maintenance/preventive", query, callback)
        return new Promise((resolve, reject) => {
            const query = {
                userId: userId, // Was this.$app.appID in original
                sites: sites, // Was this.$app.restrictionsite in original
                focusedDate: focusedDate,
                metadatas: metadatas.get()
            };
            
            this.get("/api/plan/maintenance/preventive", metadatas, query)
                .then((datas: any) => {
                    resolve({
                        taches: datas.taches, 
                        contrats: datas.contrats, 
                        metadatas: datas.metadatas
                    });
                })
                .catch(reject);
        });
    }
}
