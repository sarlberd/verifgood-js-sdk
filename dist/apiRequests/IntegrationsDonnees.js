"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsDonnees = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * IntegrationsDonnees API request class
 * Service for managing data integrations
 */
class IntegrationsDonnees extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/integration/categories/lieux';
        this.endpointSingleton = '/api/integration/categories/lieux';
    }
    /**
     * Integration method for categories lieux from CSV data
     * @param composants CSV data for categories lieux
     * @returns Promise with the integration result
     */
    async categoriesLieux(composants) {
        //@TODO: need review - specific types not provided in mixin
        const payload = {
            csv: composants
        };
        return this.post('/api/integration/categories/lieux/json', payload);
    }
}
exports.IntegrationsDonnees = IntegrationsDonnees;
//# sourceMappingURL=IntegrationsDonnees.js.map