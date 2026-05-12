import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Consommable API request class
 * Service for managing consommables (consumables) inventory and operations
 */
export declare class Consommable extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get consommables with storage options
     * Enhanced version of getAll with storage control
     * @param metadatas Metadatas for filtering
     * @param options Options including _stored flag
     * @returns Promise with consommables and metadatas
     */
    getConsommables(metadatas: Metadatas, options?: {
        _stored?: boolean;
    }): Promise<any>;
    /**
     * Get consommables étiquettes (labels)
     * @param metadatas Metadatas for filtering
     * @returns Promise with etiquettes and metadatas
     */
    getConsommablesEtiquettes(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables conditionnements colisage
     * @param metadatas Metadatas for filtering
     * @returns Promise with conditionnements data
     */
    getConsommablesConditionnementsColisage(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables en stock (in stock)
     * @param metadatas Metadatas for filtering
     * @returns Promise with in-stock consommables
     */
    getConsommablesEnStock(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables non disponibles (not available)
     * @param metadatas Metadatas for filtering
     * @returns Promise with non-available consommables
     */
    getConsommablesNonDisponibles(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables en demande (in demand)
     * @param metadatas Metadatas for filtering
     * @returns Promise with in-demand consommables
     */
    getConsommablesEnDemande(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables à commander (to order)
     * @param metadatas Metadatas for filtering
     * @returns Promise with consommables to order
     */
    getConsommablesACommander(metadatas: Metadatas): Promise<any>;
    /**
     * Get equipements for a consommable
     * @param consommable Consommable object with id
     * @param metadatas Metadatas for filtering
     * @returns Promise with equipements
     */
    getEquipements(consommable: {
        id: number;
    }, metadatas: Metadatas): Promise<any>;
    /**
     * Update multiple consommables at once
     * @param consommables Array of consommables to update
     * @returns Promise
     */
    updateConsommables(consommables: any[]): Promise<any>;
    /**
     * Delete multiple consommables
     * @param consommables Array of consommables to delete
     * @returns Promise
     */
    deleteMultiple(consommables: any[]): Promise<any>;
    /**
     * Update stock for a consommable
     * @param consommable Consommable object with id
     * @param stock Stock object with id and data
     * @returns Promise
     */
    updateStock(consommable: {
        id: number;
    }, stock: any): Promise<any>;
    /**
     * Export consommables file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param filename Custom filename
     * @param fileExtension File extension
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    getFile(metadatas: Metadatas, filename?: string, fileExtension?: string): Promise<Blob>;
    /**
     * Get consommables for a specific equipement (deprecated method)
     * @param idEquipement Equipement ID
     * @returns Promise
     * @deprecated Use getEquipementConsommables instead
     */
    getConsommablesForEquipement(idEquipement: number): Promise<any>;
    /**
     * Get consommables for a specific tiers
     * @param idTiers Tiers ID
     * @returns Promise
     */
    getConsommablesForTiers(idTiers: number): Promise<any>;
    /**
     * Create consommable fournisseurs association
     * @param consommableId Consommable ID
     * @param fournisseurs Array of fournisseurs data
     * @returns Promise
     */
    createConsommableFournisseurs(consommableId: number, fournisseurs: any[]): Promise<any>;
    /**
     * Remove consommable fournisseurs association
     * @param consommableId Consommable ID
     * @param fournisseur Fournisseur object with id
     * @returns Promise
     */
    removeConsommableFournisseurs(consommableId: number, fournisseur: {
        id: number;
    }): Promise<any>;
    /**
     * Create consommations for maintenance
     * @param consommations Array of consommation data
     * @param idMaintenance Maintenance ID (optional)
     * @returns Promise
     */
    createConsommations(consommations: any[], idMaintenance?: number): Promise<any>;
    /**
     * Create consommables equipements association
     * @param consommablesEquipements Array of association data
     * @returns Promise
     */
    createConsommablesEquipements(consommablesEquipements: any[]): Promise<any>;
    /**
     * Remove consommables equipements association
     * @param consommableId Consommable ID
     * @param equipementId Equipement ID
     * @returns Promise
     */
    removeConsommablesEquipements(consommableId: number, equipementId: number): Promise<any>;
    /**
     * Get consommations (consommable movements)
     * @param metadatas Metadatas for filtering
     * @returns Promise
     */
    getConsommations(metadatas: Metadatas): Promise<any>;
    /**
     * Get repartition quantites
     * @param metadatas Metadatas for filtering
     * @returns Promise
     */
    getRepartitionQuantites(metadatas: Metadatas): Promise<any>;
    /**
     * Create consommable mouvement
     * @param mouvement Mouvement data
     * @param idConsommable Consommable ID
     * @returns Promise
     */
    createConsommableMouvement(mouvement: any, idConsommable: number): Promise<any>;
    /**
     * Delete consommable mouvement
     * @param idConsommableMouvement Mouvement ID
     * @returns Promise
     */
    deleteConsommableMouvement(idConsommableMouvement: number): Promise<any>;
    /**
     * Get consommable mouvement demandeurs
     * @param metadatas Metadatas for filtering
     * @returns Promise
     */
    getConsommableMouvementsDemandeurs(metadatas: Metadatas): Promise<any>;
    /**
     * Get equipement consommables (different from getConsommablesForEquipement)
     * @param equipement Equipement object with id
     * @param metadatas Metadatas for filtering
     * @returns Promise with consommables for the equipement
     */
    getEquipementConsommables(equipement: {
        id: number;
    }, metadatas: Metadatas): Promise<any>;
    /**
     * Remove/Delete a consommable (alternative delete method with different endpoint)
     * @param consommable Consommable object with id
     * @returns Promise
     */
    removeConsommable(consommable: {
        id: number;
    }): Promise<any>;
    /**
     * Create operations consommations for maintenance
     * @param consommations Array of consommation data
     * @param idMaintenance Maintenance ID
     * @returns Promise
     */
    createOperationsConsommations(consommations: any[], idMaintenance: number): Promise<any>;
    /**
     * Get Excel file model for integration
     * @param filename Custom filename
     * @returns Promise<Blob> Returns a Blob object for Excel file download
     */
    getExcelFileModeleIntegration(filename?: string): Promise<Blob>;
    /**
     * Import model consommables from Excel
     * @param consommables Array of consommables data from Excel
     * @returns Promise
     */
    importModelConsommablesExcel(consommables: any[]): Promise<any>;
    /**
     * Export consommables to file
     * @param metadatas Metadatas for filtering
     * @param filename Custom filename
     * @param fileExtension File extension (xlsx or csv)
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    exportConsommables(metadatas: Metadatas, filename?: string, fileExtension?: string): Promise<Blob>;
}
