import { ApiRequest } from "../core/ApiRequest";
import { ComposantIcon, LibelProblem } from "../types/Composant";
/**
 * Composant API request class
 * Service for managing composants and their associations
 */
export declare class Composant extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Alternative method to create composants (duplicate of create)
     * @param composants Array of composants to create
     * @returns Promise
     */
    postComposants(composants: any[]): Promise<any>;
    /**
     * Alternative method to update a composant (duplicate of update)
     * @param composant Composant to update (must include id)
     * @returns Promise
     */
    putComposant(composant: any): Promise<any>;
    /**
     * Alternative method to delete a composant (legacy endpoint)
     * @param idComposant ID of composant to delete
     * @returns Promise
     */
    deleteComposant(idComposant: number): Promise<any>;
    /**
     * Add a libel problem to a composant
     * @param idComposant Composant ID
     * @param libelProblem Libel problem object
     * @returns Promise
     */
    postLibelProblem(idComposant: number, libelProblem: LibelProblem): Promise<any>;
    /**
     * Delete a libel problem
     * @param idLibelProblem ID of libel problem to delete
     * @returns Promise
     */
    deleteLibelProblem(idLibelProblem: number): Promise<any>;
    /**
     * Get available icons for composants
     * @returns Promise with array of icon objects
     */
    getIcons(): Promise<ComposantIcon[]>;
    /**
     * @deprecated - Legacy method for associating composants
     * Associate composants with equipment
     * @param composantsList List of composants to associate
     * @returns Promise
     */
    associateComposants(composantsList: any[]): Promise<any>;
    /**
     * @deprecated - Legacy method for associating libelle problemes
     * Associate libelle problemes with a composant
     * @param idComposant Composant ID
     * @param lpsList List of libelle problemes
     * @returns Promise
     */
    associateLibelleProblemes(idComposant: number, lpsList: string[]): Promise<any>;
    /**
     * Utility method to get libelle problems for a composant
     * @param composantName Name of the composant
     * @param libelleProblemCollection Collection to search in
     * @returns Filtered array of libelle problems
     */
    getLibelleProblemOf(composantName: string, libelleProblemCollection: LibelProblem[]): LibelProblem[];
    /**
     * Alternative method to get composants (similar to getAll)
     * @param metadatas Optional metadatas for filtering
     * @returns Promise
     */
    getComposants(metadatas?: any): Promise<any>;
}
