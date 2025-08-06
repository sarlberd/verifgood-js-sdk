import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * FicheDemandeConsommables API request class
 * Service for managing fiche demande consommables
 */
export declare class FicheDemandeConsommables extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    appID: string;
    restrictionsite: string;
    /**
     * Get all fiches demande consommables
     * @param metadatas Metadatas for filtering
     * @returns Promise<any>
     * @deprecated Use getAll() instead - this method is provided by the parent ApiRequest class
     */
    getFiches(metadatas: Metadatas): Promise<any>;
    /**
     * Get fiche demande consommable by id
     * @param idFiche The ID of the fiche
     * @returns Promise<any>
     * @deprecated Use getById() instead - this method is provided by the parent ApiRequest class
     */
    getFiche(idFiche: string): Promise<any>;
    /**
     * Create fiche demande consommables
     * @param ficheDemandeConsommables Array of fiche demande consommables to create
     * @returns Promise<any>
     */
    create(ficheDemandeConsommables: any[]): Promise<any>;
    /**
     * Update fiche demande consommable
     * @param fiche The fiche to update
     * @returns Promise<any>
     */
    update(fiche: any): Promise<any>;
    /**
     * Close fiche demande consommable
     * @param fiche The fiche to close
     * @returns Promise<any>
     */
    close(fiche: any): Promise<any>;
    /**
     * Mark fiche demande consommable as prise en compte
     * @param fiche The fiche to mark as prise en compte
     * @returns Promise<any>
     */
    priseEnCompte(fiche: any): Promise<any>;
    /**
     * Mark fiche demande consommable as en attente
     * @param fiche The fiche to mark as en attente
     * @returns Promise<any>
     */
    enAttente(fiche: any): Promise<any>;
    /**
     * Delete fiche demande consommable
     * @param fiche The fiche to delete
     * @returns Promise<any>
     * @deprecated Use remove() instead - this method is provided by the parent ApiRequest class
     */
    remove(fiche: any): Promise<any>;
    /**
     * Get signataires for fiche demande consommables
     * @param metadatas Metadatas for filtering
     * @returns Promise<any>
     */
    getSignataires(metadatas: Metadatas): Promise<any>;
    /**
     * Export fiche demande consommables file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param filename Custom filename
     * @param fileExtension File extension (xlsx or csv)
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    export(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<Blob>;
}
