"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
class Categories extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/categories';
        this.endpointSingleton = '/api/categorie';
    }
    async associateComposant(categorie_id, composant) {
        return this.post(`${this.endpointSingleton}/${categorie_id}/composants`, { datas: [composant] });
    }
    async desassociateComposant(composant_categorie_id) {
        return this.delete(`/api/composant-categorie/${composant_categorie_id}`);
    }
    /**
     * Update multiple categories at once
     * @param categories Array of categories to update
     * @returns Promise
     */
    async updateCollection(categories) {
        return this.put(this.endpoint, { datas: categories });
    }
    /**
     * @deprecated - Use associateComposant and desassociateComposant separately
     * Associate/disassociate composants with a category
     * @param idCategorie Category ID
     * @param composants Object with toAssociate and toDesassociate arrays
     * @returns Promise
     */
    async associate(idCategorie, composants) {
        //@TODO: This method contains complex logic that should be handled manually by devs
        if (composants.toAssociate && composants.toAssociate.length > 0) {
            await this.postAssociatedComposants(idCategorie, composants.toAssociate);
        }
        if (composants.toDesassociate && composants.toDesassociate.length > 0) {
            await this.deleteAssociatedComposants(idCategorie, composants.toDesassociate);
        }
    }
    /**
     * @deprecated - Use associateComposant instead
     * Post associated composants to a category
     * @param idCategorie Category ID
     * @param composantsToAssociate Array of composants to associate
     * @returns Promise
     */
    async postAssociatedComposants(idCategorie, composantsToAssociate) {
        return this.post(`${this.endpointSingleton}/${idCategorie}/composants`, { datas: composantsToAssociate });
    }
    /**
     * Export categories file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param typeCategorie Type of category (default: "lieux")
     * @param filename Custom filename
     * @param fileExtension File extension ("xlsx" or "csv")
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    async exportFile(metadatas, typeCategorie = "lieux", filename, fileExtension = "xlsx") {
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
        // Get raw response data
        const response = await this.get(`/api/categories/export/${typeCategorie}/${fileType}`, metadatas, {});
        // Create blob with proper encoding
        let blob;
        if (fileExtension === "csv") {
            // Add BOM for UTF-8 encoding
            const BOM = "\uFEFF";
            blob = new Blob([BOM + response], { type: contentType });
        }
        else {
            blob = new Blob([response], { type: contentType });
        }
        return blob;
    }
    /**
     * @deprecated - Use desassociateComposant instead
     * Delete associated composants from a category
     * @param idCategorie Category ID
     * @param composantsToDesassociate Array of composants to disassociate
     * @returns Promise
     */
    async deleteAssociatedComposants(idCategorie, composantsToDesassociate) {
        return this.apiRequest(`/api/categorie/${idCategorie}/composants`, 'DELETE', { datas: composantsToDesassociate });
    }
    /**
     * @deprecated
     * Fetch categories lieux
     * @returns Promise
     */
    async fetchCategoriesLieux() {
        //@TODO: This method needs review - unclear endpoint structure
        return this.get(`/api/categorieslieux`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * @deprecated - Use getAll instead
     * Get categories with details
     * @param metadatas Optional metadatas
     * @returns Promise
     */
    async getCategoriesWithDetails(metadatas) {
        if (!metadatas)
            metadatas = new Metadatas_1.Metadatas();
        return this.getAll(metadatas);
    }
    /**
     * Add corps d'etat to category association
     * @param categorieId Category ID
     * @param corpsDetatId Corps d'etat ID
     * @returns Promise
     */
    async addCorpsDetat(categorieId, corpsDetatId) {
        const data = {
            datas: [{
                    categorie_id: categorieId,
                    corpsDetat_id: corpsDetatId
                }]
        };
        return this.post('/api/corps-detats-categories', data);
    }
}
exports.Categories = Categories;
//# sourceMappingURL=Categories.js.map