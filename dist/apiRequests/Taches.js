"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taches = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
class Taches extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/taches';
        this.endpointSingleton = '/api/tache';
    }
    /**
     * Get all taches with optional site restrictions
     * @param metadatas Metadatas - Metadatas object for query options
     * @param options object - Options for query modification
     * @returns Promise<any> - List of taches
     */
    getTaches(metadatas, options = {}) {
        const query = {};
        if (options.restrictionSites) {
            query.sites = options.restrictionSites;
        }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Get a single tache by ID
     * @param id number - The tache ID
     * @returns Promise<any> - The tache details
     */
    getTache(id) {
        return this.get(`${this.endpointSingleton}/${id}`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * Create multiple taches
     * @param taches any[] - Array of tache objects to create
     * @param restrictionSites string | null - Optional site restrictions
     * @returns Promise<any> - Created taches
     */
    createTaches(taches, restrictionSites = null) {
        const data = { datas: taches };
        if (restrictionSites) {
            data.restrictionSites = restrictionSites;
        }
        return this.post(this.endpoint, data);
    }
    /**
     * Update a tache
     * @param tache any - The tache object to update
     * @param updatedTacheSites any - Optional updated tache sites
     * @returns Promise<any> - Updated tache
     */
    updateTache(tache, updatedTacheSites = null) {
        const datasTache = { ...tache };
        delete datasTache.checkpoints;
        if (updatedTacheSites) {
            datasTache.tacheSites = updatedTacheSites;
        }
        return this.put(`${this.endpointSingleton}/${tache.id}`, { datas: datasTache });
    }
    /**
     * Delete a tache
     * @param tache any - The tache object to delete
     * @returns Promise<any> - Deletion confirmation
     */
    deleteTache(tache) {
        return this.delete(`${this.endpointSingleton}/${tache.id}`);
    }
    /**
     * Export taches to Excel/CSV file
     * Note: Browser-specific functionality - returns download URL in Node.js environments
     * @param metadatas Metadatas - Metadatas for the export
     * @param filename string - Optional filename prefix
     * @param fileExtension string - File extension: 'xlsx' or 'csv'
     * @returns Promise<any> - Export result
     */
    async getExcelFile(metadatas, filename = null, fileExtension = 'xlsx') {
        const query = {
            userId: null, // Will be set by SDK context
        };
        const fileType = fileExtension !== 'csv' ? 'excel' : 'csv';
        const endpoint = `/api/taches/export/${fileType}`;
        // TODO: Implement rich browser download functionality
        // Original implementation included:
        // - Blob creation with proper MIME types
        // - BOM for UTF-8 encoding in CSV
        // - Dynamic link creation and download
        // - File naming with timestamp
        // - Proper cleanup of DOM elements
        // 
        // For now, using simplified approach that works in both environments
        return this.get(endpoint, metadatas, query);
        /* TODO: Rich browser implementation to be reviewed and potentially restored
        // In browser environment, this would trigger a download
        // In Node.js environment, return the response for testing
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            // Browser environment - implement file download
            const contentType = fileExtension !== 'csv'
                ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                : 'text/csv';
            
            // This would require additional HTTP client configuration for blob responses
            // For now, return a promise that would handle the download
            return new Promise((resolve) => {
                // In a real browser environment, this would trigger the download
                console.log(`Would download ${fileType} file from ${endpoint}`);
                resolve({ success: true, message: 'Download initiated' });
            });
        } else {
            // Node.js environment - return response for testing
                    blob = new Blob([response], { type: contentType });
                }
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename + '_' + moment().format("DD-MM-YYYY") + '.' + fileExtension);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve();
            });
        }
        */
    }
}
exports.Taches = Taches;
//# sourceMappingURL=Taches.js.map