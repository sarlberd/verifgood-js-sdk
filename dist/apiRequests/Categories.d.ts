import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
export declare class Categories extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    associateComposant(categorie_id: number, composant: any): Promise<any>;
    desassociateComposant(composant_categorie_id: number): Promise<any>;
    /**
     * Update multiple categories at once
     * @param categories Array of categories to update
     * @returns Promise
     */
    updateCollection(categories: any[]): Promise<any>;
    /**
     * @deprecated - Use associateComposant and desassociateComposant separately
     * Associate/disassociate composants with a category
     * @param idCategorie Category ID
     * @param composants Object with toAssociate and toDesassociate arrays
     * @returns Promise
     */
    associate(idCategorie: number, composants: {
        toAssociate?: any[];
        toDesassociate?: any[];
    }): Promise<any>;
    /**
     * @deprecated - Use associateComposant instead
     * Post associated composants to a category
     * @param idCategorie Category ID
     * @param composantsToAssociate Array of composants to associate
     * @returns Promise
     */
    postAssociatedComposants(idCategorie: number, composantsToAssociate: any[]): Promise<any>;
    /**
     * Export categories file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param typeCategorie Type of category (default: "lieux")
     * @param filename Custom filename
     * @param fileExtension File extension ("xlsx" or "csv")
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    exportFile(metadatas: Metadatas, typeCategorie?: string, filename?: string, fileExtension?: string): Promise<Blob>;
    /**
     * @deprecated - Use desassociateComposant instead
     * Delete associated composants from a category
     * @param idCategorie Category ID
     * @param composantsToDesassociate Array of composants to disassociate
     * @returns Promise
     */
    deleteAssociatedComposants(idCategorie: number, composantsToDesassociate: any[]): Promise<any>;
    /**
     * @deprecated
     * Fetch categories lieux
     * @returns Promise
     */
    fetchCategoriesLieux(): Promise<any>;
    /**
     * @deprecated - Use getAll instead
     * Get categories with details
     * @param metadatas Optional metadatas
     * @returns Promise
     */
    getCategoriesWithDetails(metadatas?: Metadatas): Promise<any>;
    /**
     * Add corps d'etat to category association
     * @param categorieId Category ID
     * @param corpsDetatId Corps d'etat ID
     * @returns Promise
     */
    addCorpsDetat(categorieId: number, corpsDetatId: number): Promise<any>;
}
