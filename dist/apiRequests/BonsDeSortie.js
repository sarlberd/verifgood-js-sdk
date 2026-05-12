"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonsDeSortie = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * BonsDeSortie API request class
 * Service for managing outbound orders/goods issue (bons de sortie)
 */
class BonsDeSortie extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/bons-de-sortie';
        this.endpointSingleton = '/api/bon-de-sortie';
    }
    /**
     * Get all bons de sortie (override base method to match mixin behavior)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getBonsDeSortie(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Override the default getAll to use getBonsDeSortie method
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getAll(metadatas) {
        return this.getBonsDeSortie(metadatas);
    }
    /**
     * Get bon de sortie by ID (override base method to match mixin behavior)
     * @param idBonDeSortie - The bon de sortie ID
     * @returns Promise<any>
     */
    async getBonDeSortie(idBonDeSortie) {
        return this.get(`${this.endpoint}/${idBonDeSortie}`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * Override the default getById to use getBonDeSortie method
     * @param id - The bon de sortie ID
     * @returns Promise<any>
     */
    async getById(id) {
        return this.getBonDeSortie(id.toString());
    }
    /**
     * Override the default create to match the mixin behavior
     * @param bonsDeSortie - The bon de sortie data
     * @param ficheDemandeConsommable - Optional fiche demande consommable
     * @returns Promise<any>
     */
    async create(bonsDeSortie, ficheDemandeConsommable = null) {
        return this.post(this.endpoint, {
            datas: bonsDeSortie,
            ficheDemandeConsommable: ficheDemandeConsommable
        });
    }
    /**
     * Override the default update to match the mixin behavior
     * @param bonDeSortie - The bon de sortie to update
     * @returns Promise<any>
     */
    async update(bonDeSortie) {
        return this.put(`${this.endpointSingleton}/${bonDeSortie.id}`, { datas: bonDeSortie });
    }
    /**
     * Override the default remove to match the mixin behavior
     * @param bonDeSortie - The bon de sortie to delete
     * @returns Promise<any>
     */
    async remove(bonDeSortie) {
        return this.delete(`${this.endpoint}/${bonDeSortie.id}`);
    }
    /**
     * Get signataires (signers) for bons de sortie
     * @param metadatas - The metadatas object
     * @param type - Type of signataires: "receveurs" or "donneurs"
     * @returns Promise<any>
     */
    async getSignataires(metadatas, type = "receveurs") {
        return this.get(`${this.endpoint}/${type}`, metadatas, {});
    }
}
exports.BonsDeSortie = BonsDeSortie;
//# sourceMappingURL=BonsDeSortie.js.map