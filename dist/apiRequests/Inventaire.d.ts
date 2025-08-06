import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Inventaire API request class
 * Service for managing inventaires
 */
export declare class Inventaire extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Override getAll method to get all inventaires
     * @param metadatas Metadatas object (optional)
     * @returns Promise with inventaires data
     */
    getAll(metadatas?: Metadatas): Promise<any>;
    /**
     * Override getById method with custom state processing
     * @param id Inventaire ID
     * @returns Promise with inventaire data and processed state
     */
    getById(id: number): Promise<any>;
    /**
     * Override create method
     * @param inventaires Array of inventaires to create
     * @returns Promise with created inventaires
     */
    create(inventaires: any[]): Promise<any>;
    /**
     * Override remove method
     * @param id Inventaire ID
     * @returns Promise with deletion result
     */
    remove(id: number): Promise<any>;
    /**
     * @deprecated Use getAll instead
     * Fetch all inventaires with metadatas
     * @param metadatas Metadatas object
     * @returns Promise with inventaires data
     */
    fetch(metadatas: Metadatas): Promise<any>;
    /**
     * Fetch inventaire en cours inventory
     * @returns Promise with current inventory data
     */
    fetchEnCoursInventory(): Promise<any>;
    /**
     * Fetch operations by inventaire ID
     * @param id Inventaire ID
     * @returns Promise with operations data
     */
    fetchOperationsByInventaireId(id: number): Promise<any>;
    /**
     * Fetch operations by inventaire ID on specific lieu
     * @param inventaire_id Inventaire ID
     * @param lieu_id Lieu ID
     * @returns Promise with operations data
     */
    fetchOperationsByInventaireIdOnLieu(inventaire_id: number, lieu_id: number): Promise<any>;
    /**
     * @deprecated
     * Finalize inventaire on lieu
     * @param inventaire_id Inventaire ID
     * @param lieu_id Lieu ID
     * @returns Promise with finalization result
     */
    finalizeInventaireOnLieu(inventaire_id: number, lieu_id: number): Promise<any>;
    /**
     * Create operation for inventaire
     * @param operation Operation object
     * @param inventaire_id Inventaire ID
     * @param lieu_id Lieu ID
     * @returns Promise with created operation
     */
    createOperation(operation: any, inventaire_id: number, lieu_id: number): Promise<any>;
    /**
     * Remove operation from inventaire
     * @param operation Operation object with id, inventaire_id, and lieuInventorier_id
     * @returns Promise with deletion result
     */
    removeOperationInventaire(operation: any): Promise<any>;
}
