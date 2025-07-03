"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeplacementsEquipements = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * DeplacementsEquipements API request class
 * Service for managing equipment displacements
 */
class DeplacementsEquipements extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/deplacements/equipements';
        this.endpointSingleton = '/api/deplacements/equipements';
    }
    /**
     * Create multiple deplacements for equipements
     * @param deplacements Array of deplacements to create
     * @returns Promise<any>
     */
    createDeplacementsEquipements(deplacements) {
        return this.post(this.endpoint, deplacements);
    }
}
exports.DeplacementsEquipements = DeplacementsEquipements;
//# sourceMappingURL=DeplacementsEquipements.js.map