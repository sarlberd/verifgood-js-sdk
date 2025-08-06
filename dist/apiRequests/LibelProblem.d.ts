import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * LibelProblem API request class
 * Service for managing libel problems
 */
export declare class LibelProblem extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Override getAll method for libelles probleme
     * @param metadatas Metadatas object
     * @returns Promise with libelles probleme data
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Override create method for libelles probleme
     * @param libellesProblem Array of libelles problem to create
     * @returns Promise with created libelles problem
     */
    create(libellesProblem: any[]): Promise<any>;
    /**
     * Override remove method for libelles probleme
     * @param id Libelle problem ID
     * @returns Promise with deletion result
     */
    remove(id: number): Promise<any>;
    /**
     * Create problems for a specific component
     * @param idComposant Component ID
     * @param problems Array of problems to create
     * @returns Promise with created problems
     */
    createComposantProblems(idComposant: string, problems: any[]): Promise<any>;
    /**
     * Delete a specific component problem
     * @param problem Problem object with id and composant properties
     * @returns Promise with deletion result
     */
    deleteComposantProblem(problem: any): Promise<any>;
    /**
     * Get problems for a specific component
     * @param composantId Component ID
     * @returns Promise with component problems
     */
    getComposantProblems(composantId: string): Promise<any>;
    /**
     * Get libelles problem by category (generic and category-specific)
     * @param metadatas Metadatas object
     * @param idCategorie Category ID
     * @returns Promise with category-specific libelles problem
     */
    getLibellesProblemByCategorie(metadatas: Metadatas, idCategorie: string): Promise<any>;
    /**
     * Get libels for equipment (placeholder method)
     * @returns Promise with equipment libels
     */
    getLibelsEquipement(): Promise<any>;
}
