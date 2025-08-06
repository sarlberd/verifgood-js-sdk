"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntheseMaintenance = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * SyntheseMaintenance API request class
 * Handles preventive maintenance summary operations
 */
class SyntheseMaintenance extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/gamme/maintenance/preventive';
        this.endpointSingleton = '/api/gamme/maintenance/preventive';
    }
    /**
     * Get preventive maintenance summary data
     * @param startDate string - Start date for the summary period
     * @param endDate string - End date for the summary period
     * @param metadatas Metadatas - Metadatas object for query options
     * @returns Promise<any> - Preventive maintenance summary data
     */
    getSummary(startDate, endDate, metadatas) {
        const query = {
            userId: null, // Will be set by SDK context
            sites: null, // Will be set by SDK context
            startDate: startDate,
            endDate: endDate
        };
        return this.get(this.endpoint, metadatas, query);
    }
}
exports.SyntheseMaintenance = SyntheseMaintenance;
//# sourceMappingURL=SyntheseMaintenance.js.map