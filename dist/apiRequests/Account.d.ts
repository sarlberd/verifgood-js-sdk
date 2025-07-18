import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Accoun, AccounCreateRequest, AccounUpdateRequest } from "../types/Account";
/**
 * Account API request class
 * Service for managing user accounts
 */
export declare class Account extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    constructor(auth: any, apiBaseUrl: string);
    /**
     * Updates account information
     * @param data Account data to update
     * @returns Promise with updated account data
     */
    updateAccount(data: AccounUpdateRequest): Promise<Accoun>;
    /**
     * Fetches account data
     * @returns Promise with account data
     */
    fetchAccount(): Promise<Accoun>;
    /**
     * Creates a new account
     * @param account Account data for creation
     * @returns Promise with the created account data
     */
    createAccount(account: AccounCreateRequest): Promise<Accoun>;
    getAll(metadatas: Metadatas): Promise<Accoun[]>;
    getById(id: number): Promise<Accoun>;
    create(data: any): Promise<Accoun>;
    update(id: number, data: any): Promise<Accoun>;
    remove(id: number): Promise<void>;
}
