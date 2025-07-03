"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonDeCommandeItems = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * BonDeCommandeItems API request class
 * Service for managing purchase order items (bon de commande items)
 */
class BonDeCommandeItems extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/items/bons-de-commande';
        this.endpointSingleton = '/api/item';
    }
    /**
     * Override the default getAll to match the mixin behavior
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getAll(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Override the default create to match the mixin behavior
     * @param bonDeCommandeItems - Array of bon de commande items
     * @returns Promise<any>
     */
    async create(bonDeCommandeItems) {
        return this.post(this.endpoint, { datas: bonDeCommandeItems });
    }
    /**
     * Override the default update to match the mixin behavior
     * @param bonDeCommandeItem - The bon de commande item to update
     * @returns Promise<any>
     */
    async update(bonDeCommandeItem) {
        return this.put(`${this.endpointSingleton}/${bonDeCommandeItem.id}/bon-de-commande`, { datas: bonDeCommandeItem });
    }
    /**
     * Override the default remove to match the mixin behavior
     * @param bonDeCommandeItem - The bon de commande item to delete
     * @returns Promise<any>
     */
    async remove(bonDeCommandeItem) {
        return this.delete(`${this.endpointSingleton}/${bonDeCommandeItem.id}/bon-de-commande`);
    }
    /**
     * Get bon de commande items and create clones for new usage
     * @param metadatas - The metadatas object
     * @returns Promise<any[]> - Array of cloned items
     */
    async getClones(metadatas) {
        const result = await this.getAll(metadatas);
        const bonDeCommandeItems = result.bonDeCommandeItems || result;
        const bonDeCommandeItemsClones = bonDeCommandeItems.map((item) => {
            return Object.assign({}, item, {
                quantiteLivree: 0,
                bonDeCommande_id: null,
                id: null,
                uid: null
            });
        });
        return bonDeCommandeItemsClones;
    }
}
exports.BonDeCommandeItems = BonDeCommandeItems;
//# sourceMappingURL=BonDeCommandeItems.js.map